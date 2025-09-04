import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import JSZip from 'jszip'
import { getMemoryOptimizedDimensions } from './constants'

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

    // Check file size and warn about large files
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > 100) {
      setStatus(`Processing large video (${fileSizeMB.toFixed(1)}MB) - this may take longer...`)
    }

    // Set up timeout (longer for large files)
    const timeoutMs = fileSizeMB > 500 ? 300000 : this.TIMEOUT_MS // 5 minutes for very large files
    const timeoutId = setTimeout(() => {
      throw new Error('Operation timed out. Video may be too large for browser processing.')
    }, timeoutMs)

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

      // For large files (>50MB), create a smaller working copy, otherwise use original
      const fileSizeMB = file.size / (1024 * 1024)
      
      if (fileSizeMB > 50) {
        setProgress(15)
        setStatus('Creating optimized copy for large video...')
        
        const originalInputName = 'original_input.mp4'
        await ffmpeg.writeFile(originalInputName, await fetchFile(file))
        
        setProgress(20)
        setStatus('Optimizing video for processing...')
        
        try {
          // More conservative preprocessing for very large files
          await ffmpeg.exec([
            '-i', originalInputName,
            '-vf', 'scale=854:480:force_original_aspect_ratio=decrease',
            '-c:v', 'libx264',
            '-preset', 'ultrafast',
            '-crf', '30',
            '-an', // Remove audio to save memory
            '-t', '60', // Limit to first 60 seconds for very large files
            '-y',
            inputFileName
          ])
          
          // Clean up original large file immediately
          await ffmpeg.deleteFile(originalInputName)
          setProgress(25)
        } catch (error) {
          // If preprocessing fails, use original but with size limits
          console.warn('Video preprocessing failed, using original with limits:', error)
          try {
            await ffmpeg.deleteFile(inputFileName)
            await ffmpeg.deleteFile(originalInputName)
          } catch {}
          
          // Limit file size if too large
          if (fileSizeMB > 200) {
            throw new Error('Video file is too large for browser processing. Please use a smaller file or compress it first.')
          }
          
          await ffmpeg.writeFile(inputFileName, await fetchFile(file))
        }
      } else {
        // For smaller files, use original directly
        await ffmpeg.writeFile(inputFileName, await fetchFile(file))
        setProgress(25)
      }
      
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

      // Force memory cleanup before processing
      await this.forceMemoryCleanup(ffmpeg)

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

      // Force memory cleanup after processing
      await this.forceMemoryCleanup(ffmpeg)

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

    setStatus(`Extracting frame at ${time.toFixed(1)}s`)
    setProgress(30)

    // Get video info first for memory optimization
    let videoWidth: number | undefined
    let videoHeight: number | undefined
    
    try {
      setStatus('Analyzing video...')
      await ffmpeg.exec(['-i', 'input.mp4', '-t', '0.1', '-f', 'null', '-'])
    } catch (error) {
      // FFmpeg outputs video info to stderr, so we expect this to "fail"
      // The video dimensions will be logged
    }

    // Use memory-optimized dimensions based on source video size
    const { safeWidth, safeHeight } = getMemoryOptimizedDimensions(width, height, videoWidth, videoHeight)

    setStatus(`Generating ${safeWidth}×${safeHeight} thumbnail...`)
    setProgress(50)

    // Clean up any existing output file first
    try {
      await ffmpeg.deleteFile(outputFileName)
    } catch {
      // File doesn't exist, continue
    }

    // Memory optimized FFmpeg command
    try {
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-ss', `${time}`,
        '-vframes', '1',
        '-vf', `scale=${safeWidth}:${safeHeight}:flags=fast_bilinear`,
        '-q:v', '5', // Slightly lower quality to reduce memory usage
        '-an', // No audio processing
        '-threads', '1', // Single thread to reduce memory usage
        '-y',
        outputFileName
      ])
    } catch (error) {
      // Try fallback with even more aggressive memory settings
      try {
        setStatus('Retrying with optimized settings...')
        const fallbackWidth = Math.min(safeWidth, 640)
        const fallbackHeight = Math.min(safeHeight, 360)
        
        await ffmpeg.exec([
          '-i', 'input.mp4',
          '-ss', `${time}`,
          '-vframes', '1',
          '-vf', `scale=${fallbackWidth}:${fallbackHeight}:flags=fast_bilinear`,
          '-q:v', '6',
          '-an',
          '-threads', '1',
          '-preset', 'ultrafast',
          '-y',
          outputFileName
        ])
      } catch (fallbackError) {
        throw new Error(`FFmpeg execution failed even with optimized settings: ${fallbackError}`)
      }
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

    // Clean up any preprocessing files
    try {
      await ffmpeg.deleteFile('original_input.mp4')
    } catch {
      // Ignore cleanup errors
    }

    // Clean up any remaining temp files
    const tempFilePatterns = ['scrub_', 'frames_', 'thumbnail.jpg', 'scrub_joined.jpg', 'temp_']
    
    for (const pattern of tempFilePatterns) {
      for (let i = 0; i < 100; i++) { // Increased range for more thorough cleanup
        try {
          const fileName = pattern.includes('_') ? `${pattern}${String(i).padStart(3, '0')}.jpg` : pattern
          await ffmpeg.deleteFile(fileName)
        } catch {
          // File doesn't exist, continue
        }
      }
    }

    // Force garbage collection if available
    if (typeof window !== 'undefined' && (window as any).gc) {
      (window as any).gc()
    }
  }

  // Add memory management method
  private static async forceMemoryCleanup(ffmpeg: FFmpeg) {
    // Force garbage collection in FFmpeg context
    try {
      // This helps free up WebAssembly memory
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Force garbage collection if available
      if (typeof window !== 'undefined' && (window as any).gc) {
        (window as any).gc()
      }
    } catch (error) {
      console.error('Memory cleanup failed:', ffmpeg, error)
      // Ignore errors in memory cleanup
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
