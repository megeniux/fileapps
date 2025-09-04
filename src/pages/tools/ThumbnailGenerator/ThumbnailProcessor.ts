import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import JSZip from 'jszip'
import { getSafeDimensions } from './constants'

export interface ThumbnailProcessingOptions {
  mode: number
  time: number
  startTime: number
  endTime: number
  width: number
  height: number
  scrubInterval: number
  frameInterval: number
}

export interface ProgressCallbacks {
  setProgress: (progress: number) => void
  setStatus: (status: string) => void
  setConsoleLogs: (logs: string[] | ((prev: string[]) => string[])) => void
}

export class ThumbnailProcessor {
  private static readonly MAX_FRAMES_SCRUB = 10
  private static readonly MAX_FRAMES_EXTRACT = 20
  private static readonly TIMEOUT_MS = 120000 // 2 minutes

  static async processThumbnails(
    file: File,
    ffmpeg: FFmpeg,
    options: ThumbnailProcessingOptions,
    callbacks: ProgressCallbacks
  ): Promise<string[]> {
    const { setProgress, setStatus } = callbacks
    const inputFileName = 'input.mp4'

    // Set up timeout
    const timeoutId = setTimeout(() => {
      throw new Error('Operation timed out. This usually happens with very long videos.')
    }, this.TIMEOUT_MS)

    try {
      setStatus('Preparing video...')
      setProgress(10)

      // Ensure any existing input file is cleaned up first
      try {
        await ffmpeg.deleteFile(inputFileName)
      } catch {
        // File doesn't exist, continue
      }

      // Wait a moment for cleanup to complete
      await new Promise(resolve => setTimeout(resolve, 100))

      await ffmpeg.writeFile(inputFileName, await fetchFile(file))
      
      // Verify the file was written successfully
      try {
        const fileData = await ffmpeg.readFile(inputFileName)
        if (!fileData || (fileData as Uint8Array).length === 0) {
          throw new Error('Failed to write input file to FFmpeg')
        }
      } catch (error) {
        throw new Error('Input file validation failed')
      }

      let urls: string[] = []

      switch (options.mode) {
        case 0:
          urls = await this.processSingleThumbnail(ffmpeg, options, callbacks)
          break
        case 1:
          urls = await this.processScrubThumbnails(ffmpeg, options, callbacks)
          break
        case 2:
          urls = await this.processFrameThumbnails(ffmpeg, options, callbacks)
          break
        default:
          throw new Error('Invalid processing mode')
      }

      clearTimeout(timeoutId)
      return urls
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    } finally {
      await this.cleanup(ffmpeg, inputFileName)
    }
  }

  private static async processSingleThumbnail(
    ffmpeg: FFmpeg,
    options: ThumbnailProcessingOptions,
    callbacks: ProgressCallbacks
  ): Promise<string[]> {
    const { setStatus, setProgress } = callbacks
    const { time, width, height } = options
    const outputFileName = 'thumbnail.jpg'

    // Use safe dimensions to prevent memory issues
    const { safeWidth, safeHeight } = getSafeDimensions(width, height)

    setStatus(`Extracting frame at ${time.toFixed(1)}s`)
    setProgress(50)

    // Clean up any existing output file first
    try {
      await ffmpeg.deleteFile(outputFileName)
    } catch {
      // File doesn't exist, continue
    }

    // Execute FFmpeg command with better error handling
    try {
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-ss', `${time}`,
        '-vframes', '1',
        '-vf', `scale=${safeWidth}:${safeHeight}`,
        '-q:v', '3',
        '-y',
        outputFileName
      ])
    } catch (error) {
      throw new Error(`FFmpeg execution failed: ${error}`)
    }

    setProgress(80)
    
    // Verify output file exists and has content
    let data: any
    try {
      data = await ffmpeg.readFile(outputFileName)
      
      if (!data || (new Uint8Array(data)).length === 0) {
        throw new Error('Generated thumbnail file is empty')
      }
    } catch (error) {
      throw new Error(`Failed to read generated thumbnail: ${error}`)
    }

    setProgress(90)
    const blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' })
    const url = URL.createObjectURL(blob)

    // Clean up output file
    try {
      await ffmpeg.deleteFile(outputFileName)
    } catch {
      // Ignore cleanup errors
    }
    
    return [url]
  }

  private static async processScrubThumbnails(
    ffmpeg: FFmpeg,
    options: ThumbnailProcessingOptions,
    callbacks: ProgressCallbacks
  ): Promise<string[]> {
    const { setStatus, setProgress } = callbacks
    const { startTime, endTime } = options

    setStatus(`Generating scrub from ${startTime}s to ${endTime}s`)
    
    const actualInterval = Math.max((endTime - startTime) / (this.MAX_FRAMES_SCRUB - 1), 0.5)
    const frameNames: string[] = []

    // Extract frames
    for (let i = 0; i < this.MAX_FRAMES_SCRUB; i++) {
      const t = startTime + (i * actualInterval)
      if (t > endTime) break

      const outName = `scrub_${i}.jpg`
      setProgress(10 + (i / this.MAX_FRAMES_SCRUB) * 60)

      try {
        await ffmpeg.exec([
          '-i', 'input.mp4',
          '-ss', `${t}`,
          '-vframes', '1',
          '-vf', 'scale=240:135',
          '-q:v', '4',
          '-y',
          outName
        ])
        frameNames.push(outName)
      } catch (error) {
        console.warn(`Failed to extract frame at ${t}s:`, error)
      }
    }

    if (frameNames.length === 0) {
      throw new Error('No frames could be extracted')
    }

    setProgress(75)
    setStatus('Joining frames...')

    // Join frames
    try {
      await ffmpeg.exec([
        ...frameNames.flatMap(name => ['-i', name]),
        '-filter_complex', `hstack=inputs=${frameNames.length}`,
        '-q:v', '4',
        '-y',
        'scrub_joined.jpg'
      ])
    } catch {
      // Fallback to tile layout
      const cols = Math.min(frameNames.length, 5)
      const rows = Math.ceil(frameNames.length / cols)
      await ffmpeg.exec([
        ...frameNames.flatMap(name => ['-i', name]),
        '-filter_complex', `tile=${cols}x${rows}`,
        '-q:v', '4',
        '-y',
        'scrub_joined.jpg'
      ])
    }

    setProgress(90)
    const data = await ffmpeg.readFile('scrub_joined.jpg')
    const blob = new Blob([new Uint8Array(data as any)], { type: 'image/jpeg' })
    const url = URL.createObjectURL(blob)

    // Cleanup
    for (const name of frameNames) {
      try {
        await ffmpeg.deleteFile(name)
      } catch {
        // Ignore cleanup errors
      }
    }
    await ffmpeg.deleteFile('scrub_joined.jpg')

    return [url]
  }

  private static async processFrameThumbnails(
    ffmpeg: FFmpeg,
    options: ThumbnailProcessingOptions,
    callbacks: ProgressCallbacks
  ): Promise<string[]> {
    const { setStatus, setProgress } = callbacks
    const { startTime, endTime, frameInterval } = options

    setStatus(`Extracting frames from ${startTime}s to ${endTime}s`)

    await ffmpeg.exec([
      '-i', 'input.mp4',
      '-ss', `${startTime}`,
      '-to', `${endTime}`,
      '-vf', `select=not(mod(n\\,${frameInterval})),scale=480:270`,
      '-vsync', 'vfr',
      '-q:v', '4',
      '-y',
      'frames_%03d.jpg'
    ])

    setProgress(70)

    const urls: string[] = []
    for (let idx = 1; idx <= this.MAX_FRAMES_EXTRACT; idx++) {
      const outName = `frames_${String(idx).padStart(3, '0')}.jpg`
      try {
        const data = await ffmpeg.readFile(outName)
        const blob = new Blob([new Uint8Array(data as any)], { type: 'image/jpeg' })
        const url = URL.createObjectURL(blob)
        urls.push(url)
        await ffmpeg.deleteFile(outName)
        setProgress(70 + (idx / this.MAX_FRAMES_EXTRACT) * 25)
      } catch {
        break // No more frames
      }
    }

    if (urls.length === 0) {
      throw new Error('No frames could be extracted')
    }

    return urls
  }

  private static async cleanup(ffmpeg: FFmpeg, inputFileName: string) {
    try {
      await ffmpeg.deleteFile(inputFileName)
    } catch {
      // Ignore cleanup errors
    }

    // Clean up any remaining temp files
    const tempFilePatterns = ['scrub_', 'frames_', 'thumbnail.jpg', 'scrub_joined.jpg']
    
    for (const pattern of tempFilePatterns) {
      for (let i = 0; i < 50; i++) {
        try {
          const fileName = pattern.includes('_') ? `${pattern}${i}.jpg` : pattern
          await ffmpeg.deleteFile(fileName)
        } catch {
          // File doesn't exist, continue
        }
      }
    }
  }

  static async downloadThumbnails(
    mode: number,
    thumbnailUrl: string | null,
    thumbnails: string[],
    fileName?: string
  ): Promise<void> {
    if (mode === 0 && thumbnailUrl) {
      const a = document.createElement('a')
      a.href = thumbnailUrl
      a.download = `thumbnail_${fileName || 'image'}.jpg`
      a.click()
      setTimeout(() => URL.revokeObjectURL(thumbnailUrl), 5000)
    } else if (thumbnails.length > 0) {
      const zip = new JSZip()
      
      for (let idx = 0; idx < thumbnails.length; idx++) {
        const response = await fetch(thumbnails[idx])
        const blob = await response.blob()
        zip.file(`thumb_${idx + 1}_${fileName || 'image'}.jpg`, blob)
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const zipUrl = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = zipUrl
      a.download = `thumbnails_${fileName || 'images'}.zip`
      a.click()
      setTimeout(() => URL.revokeObjectURL(zipUrl), 5000)
    }
  }
}
