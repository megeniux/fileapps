import React, { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import JSZip from 'jszip'

// Global FFmpeg instance and state
const ffmpeg = new FFmpeg()
let isFFmpegLoaded = false
const ffmpegRef = { current: ffmpeg }

// Helper function to reset FFmpeg
const resetFFmpeg = async () => {
  try {
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate()
    }
  } catch (error) {
    console.warn('Error terminating FFmpeg:', error)
  }

  // Create new instance
  const newFFmpeg = new FFmpeg()
  ffmpegRef.current = newFFmpeg
  isFFmpegLoaded = false
}

// Helper function to ensure FFmpeg is ready
const ensureFFmpegReady = async () => {
  if (!isFFmpegLoaded || !ffmpegRef.current) {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg()
    }
    await ffmpegRef.current.load()
    isFFmpegLoaded = true
  }
}

// MUI Imports
import { useTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Slider from '@mui/material/Slider'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

// Icons
import ImageIcon from '@mui/icons-material/Image'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import CollectionsIcon from '@mui/icons-material/Collections'
import FilterFramesIcon from '@mui/icons-material/FilterFrames'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

// Components
import PerformanceInfoDialog from '../../components/PerformanceInfoDialog'

function ThumbnailGenerator() {
  const theme = useTheme()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [width, setWidth] = useState<number>(320)
  const [height, setHeight] = useState<number>(180)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [mode, setMode] = useState(0) // 0: Single, 1: Scrub, 2: Frames
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(1)
  const [scrubInterval, setScrubInterval] = useState(1)
  const [frameInterval, setFrameInterval] = useState(10)
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0])
      setPreviewUrl(URL.createObjectURL(event.target.files[0]))
      setDuration(0)
      setTime(0)
      setStartTime(0)
      setEndTime(1)
      setProgress(0)
      setStatus(null)
      setErrorMsg(null)
      setThumbnailUrl(null)
      setThumbnails([])
      setConsoleLogs([])
    }
  }

  const handleReset = () => {
    window.location.reload();
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration
      setWidth(videoRef.current.videoWidth)
      setHeight(videoRef.current.videoHeight)
      setDuration(dur)
      setTime(0)
      setStartTime(0)
      setEndTime(Math.floor(dur))
    }
  }

  // Slider for start/end time
  const handleRangeChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setStartTime(Number(newValue[0]))
      setEndTime(Number(newValue[1]))
      setTime(Number(newValue[0]))
    }
  }

  const handleTimeChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') setTime(newValue)
  }

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value)
    if (!isNaN(val) && val > 0) setWidth(val)
  }

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value)
    if (!isNaN(val) && val > 0) setHeight(val)
  }

  const handleModeChange = (_: React.SyntheticEvent, newValue: number) => {
    setMode(newValue)
    setThumbnails([])
    setThumbnailUrl(null)
    setErrorMsg(null)
    setProgress(0)
    setStatus(null)
  }

  const handleScrubIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(event.target.value)
    if (!isNaN(val) && val > 0) setScrubInterval(val)
  }

  const handleFrameIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value)
    if (!isNaN(val) && val > 0) setFrameInterval(val)
  }

  const handlePerformanceDialogOpen = () => {
    setIsPerformanceDialogOpen(true)
  }

  const handlePerformanceDialogClose = () => {
    setIsPerformanceDialogOpen(false)
  }

  const handleExtractThumbnail = async () => {
    if (!file) return
    setIsProcessing(true)
    setProgress(0)
    setStatus('Preparing')
    setErrorMsg(null)
    setThumbnailUrl(null)
    setThumbnails([])
    setConsoleLogs([])

    const inputFileName = 'input.mp4'

    // Set up a timeout to prevent infinite hanging
    const timeoutId = setTimeout(async () => {
      try {
        await resetFFmpeg()
        setStatus('Timeout - operation cancelled')
        setIsProcessing(false)
        setErrorMsg('Operation timed out. This usually happens with very long videos. Please try with a shorter video segment or reduce the time range.')
      } catch (error) {
        console.error('Error during timeout cleanup:', error)
        setIsProcessing(false)
        setStatus('Failed')
        setErrorMsg('Operation failed due to timeout. Please refresh the page and try again.')
      }
    }, 120000) // 2 minute timeout for longer videos

    try {
      // Always check if FFmpeg is properly loaded and ready
      // Force reload if the current instance is not loaded or terminated
      setStatus('Loading FFmpeg...')
      try {
        await ensureFFmpegReady()
      } catch (loadError) {
        console.error('FFmpeg loading failed:', loadError)
        // Try to reset and reload
        await resetFFmpeg()
        setStatus('Retrying FFmpeg load...')
        await ensureFFmpegReady()
      }

      setStatus('Preparing video...')
      setProgress(10)

      try {
        await ffmpegRef.current.writeFile(inputFileName, await fetchFile(file))
      } catch (writeError) {
        console.error('Failed to write input file:', writeError)
        throw new Error('Failed to load video file. The file might be corrupted or in an unsupported format.')
      }

      let urls: string[] = []

      if (mode === 0) {
        // Single thumbnail mode - simplified approach
        setStatus(`Extracting frame at ${time.toFixed(1)}s`)
        const outputFileName = 'thumbnail.jpg'

        try {
          await ffmpegRef.current.exec([
            '-i', inputFileName,
            '-ss', `${time}`,
            '-vframes', '1',
            '-vf', `scale=${Math.min(width, 1280)}:${Math.min(height, 720)}`,
            '-q:v', '3',
            '-y', // Overwrite output file
            outputFileName
          ])

          setProgress(90)
          const data = await ffmpegRef.current.readFile(outputFileName)
          const blob = new Blob([new Uint8Array(data as any)], { type: 'image/jpeg' })
          const url = URL.createObjectURL(blob)
          setThumbnailUrl(url)
          urls = [url]

          try {
            await ffmpegRef.current.deleteFile(outputFileName)
          } catch {
            // Ignore cleanup errors
          }
        } catch (extractError) {
          console.error('Frame extraction failed:', extractError)
          throw new Error(`Failed to extract frame: ${extractError}`)
        }
      } else if (mode === 1) {
        // Scrub mode - simplified and more robust
        setStatus(`Generating scrub from ${startTime}s to ${endTime}s`)
        const maxFrames = 10 // Reduced to prevent memory issues
        const actualInterval = Math.max((endTime - startTime) / (maxFrames - 1), 0.5)
        let frameNames: string[] = []

        // Extract frames one by one with progress tracking
        for (let i = 0; i < maxFrames; i++) {
          const t = startTime + (i * actualInterval)
          if (t > endTime) break

          const outName = `scrub_${i}.jpg`
          setProgress(10 + (i / maxFrames) * 60) // 10-70% for extraction

          try {
            await ffmpegRef.current.exec([
              '-i', inputFileName,
              '-ss', `${t}`,
              '-vframes', '1',
              '-vf', `scale=240:135`, // Fixed small size to prevent memory issues
              '-q:v', '4',
              '-y',
              outName
            ])
            frameNames.push(outName)
          } catch (frameError) {
            console.warn(`Failed to extract frame at ${t}s:`, frameError)
            // Continue with other frames
          }
        }

        if (frameNames.length === 0) {
          throw new Error('No frames could be extracted')
        }

        setProgress(75)
        setStatus('Joining frames...')

        try {
          // Simple horizontal join
          await ffmpegRef.current.exec([
            ...frameNames.flatMap(name => ['-i', name]),
            '-filter_complex', `hstack=inputs=${frameNames.length}`,
            '-q:v', '4',
            '-y',
            'scrub_joined.jpg'
          ])
        } catch (joinError) {
          console.warn('hstack failed, trying tile layout:', joinError)
          // Fallback to tile layout
          const cols = Math.min(frameNames.length, 5)
          const rows = Math.ceil(frameNames.length / cols)

          await ffmpegRef.current.exec([
            ...frameNames.flatMap(name => ['-i', name]),
            '-filter_complex', `tile=${cols}x${rows}`,
            '-q:v', '4',
            '-y',
            'scrub_joined.jpg'
          ])
        }

        setProgress(90)
        const data = await ffmpegRef.current.readFile('scrub_joined.jpg')
        const blob = new Blob([new Uint8Array(data as any)], { type: 'image/jpeg' })
        const url = URL.createObjectURL(blob)
        setThumbnailUrl(url)
        urls = [url]

        // Cleanup
        for (const name of frameNames) {
          try {
            await ffmpegRef.current.deleteFile(name)
          } catch {
            // Ignore cleanup errors
          }
        }
        try {
          await ffmpegRef.current.deleteFile('scrub_joined.jpg')
        } catch {
          // Ignore cleanup errors
        }

      } else if (mode === 2) {
        // Frames mode - simplified
        setStatus(`Extracting frames from ${startTime}s to ${endTime}s`)
        const maxFrames = 20

        try {
          await ffmpegRef.current.exec([
            '-i', inputFileName,
            '-ss', `${startTime}`,
            '-to', `${endTime}`,
            '-vf', `select=not(mod(n\\,${frameInterval})),scale=480:270`,
            '-vsync', 'vfr',
            '-q:v', '4',
            '-y',
            'frames_%03d.jpg'
          ])

          setProgress(70)

          // Read extracted frames
          for (let idx = 1; idx <= maxFrames; idx++) {
            const outName = `frames_${String(idx).padStart(3, '0')}.jpg`
            try {
              const data = await ffmpegRef.current.readFile(outName)
              const blob = new Blob([new Uint8Array(data as any)], { type: 'image/jpeg' })
              const url = URL.createObjectURL(blob)
              urls.push(url)
              await ffmpegRef.current.deleteFile(outName)
              setProgress(70 + (idx / maxFrames) * 25) // 70-95%
            } catch {
              break // No more frames
            }
          }

          if (urls.length === 0) {
            throw new Error('No frames could be extracted')
          }
        } catch (extractError) {
          console.error('Frame extraction failed:', extractError)
          throw new Error(`Failed to extract frames: ${extractError}`)
        }
      }

      setThumbnails(urls)
      setProgress(100)
      setStatus('Completed')
      clearTimeout(timeoutId) // Clear the timeout since we completed successfully
    } catch (err: any) {
      clearTimeout(timeoutId) // Clear timeout on error
      setStatus('Failed')
      setConsoleLogs(logs => [...logs, String(err)])

      // Handle specific FFmpeg errors
      if (err.message && (err.message.includes('memory') || err.message.includes('out of bounds'))) {
        setErrorMsg('Memory error: Video is too large or complex. Please try with a shorter video or smaller resolution.')
        // Reset FFmpeg after memory errors
        await resetFFmpeg()
      } else if (err.message !== 'called FFmpeg.terminate()') {
        setErrorMsg(err instanceof Error ? err.message : String(err))
      }
    } finally {
      clearTimeout(timeoutId) // Ensure timeout is always cleared
      setIsProcessing(false)
      setTimeout(() => {
        setProgress(0)
        setStatus(null)
      }, 2000)

      // More robust cleanup
      try {
        // Try to delete input file
        if (ffmpegRef.current && inputFileName) {
          await ffmpegRef.current.deleteFile(inputFileName)
        }
      } catch (cleanupError) {
        console.warn('Failed to cleanup input file:', cleanupError)
      }

      // Clean up any remaining temp files
      const tempFilePatterns = [
        'scrub_',
        'frames_',
        'thumbnail.jpg',
        'scrub_joined.jpg'
      ]

      for (const pattern of tempFilePatterns) {
        for (let i = 0; i < 50; i++) { // Check up to 50 temp files
          try {
            if (!ffmpegRef.current) break
            const fileName = pattern.includes('_') ? `${pattern}${i}.jpg` : pattern
            await ffmpegRef.current.deleteFile(fileName)
          } catch {
            // File doesn't exist or already deleted, continue
          }
        }
      }
    }
  }

  const handleStop = () => {
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate()
      isFFmpegLoaded = false // Reset loaded flag
      setStatus('Stopped')
      setIsProcessing(false)
      setErrorMsg(null) // Clear error on stop
    }
  }

  const handleDownload = async () => {
    if (mode === 0 && thumbnailUrl) {
      const a = document.createElement('a')
      a.href = thumbnailUrl
      a.download = `thumbnail_${file?.name || 'image'}.jpg`
      a.click()
      setTimeout(() => URL.revokeObjectURL(thumbnailUrl), 5000)
    } else if (thumbnails.length > 0) {
      // Download all images as a zip
      const zip = new JSZip()
      // Fetch blobs for each image
      const fetchBlob = async (url: string) => {
        const res = await fetch(url)
        return await res.blob()
      }
      for (let idx = 0; idx < thumbnails.length; idx++) {
        const url = thumbnails[idx]
        const blob = await fetchBlob(url)
        zip.file(`thumb_${idx + 1}_${file?.name || 'image'}.jpg`, blob)
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const zipUrl = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = zipUrl
      a.download = `thumbnails_${file?.name || 'images'}.zip`
      a.click()
      setTimeout(() => URL.revokeObjectURL(zipUrl), 5000)
    }
  }

  return (
    <>
      <Helmet>
        <title>Video Thumbnail Generator - Extract Preview Images from Videos Free</title>
        <meta name="description" content="Free online video thumbnail generator. Extract high-quality preview images from videos instantly. Generate thumbnails in multiple sizes with no watermarks or signups required." />
        <meta name="keywords" content="video thumbnail generator, extract video thumbnails, video preview images, thumbnail maker, video screenshots, free thumbnail generator" />
        <meta property="og:title" content="Video Thumbnail Generator - Extract Preview Images from Videos Free" />
        <meta property="og:description" content="Free online video thumbnail generator. Extract high-quality preview images from videos instantly. Generate thumbnails in multiple sizes with no watermarks or signups required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/thumbnail-generator" />
        <link rel="canonical" href="https://fileapps.click/tools/thumbnail-generator" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
        <Card sx={{ p: 1.5 }} elevation={3}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <PhotoSizeSelectActualIcon color="secondary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Video Thumbnail Generator
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Extract high-quality thumbnails from videos instantly. Generate preview images in multiple sizes — no watermark, no signup required.
            </Typography>
            <Box
              onDragOver={e => { e.preventDefault(); setIsDragActive(true); }}
              onDragLeave={e => { e.preventDefault(); setIsDragActive(false); }}
              onDrop={e => {
                e.preventDefault();
                setIsDragActive(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  const selectedFile = e.dataTransfer.files[0];
                  if (!selectedFile.type.startsWith('video/')) {
                    setErrorMsg('Please select a video file.');
                    return;
                  }
                  setFile(selectedFile);
                  setPreviewUrl(URL.createObjectURL(selectedFile));
                  setDuration(0)
                  setTime(0)
                  setStartTime(0)
                  setEndTime(1)
                  setProgress(0)
                  setStatus(null)
                  setErrorMsg(null)
                  setThumbnailUrl(null)
                  setThumbnails([])
                  setConsoleLogs([])
                }
              }}
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              width="100%"
              height={220}
              borderRadius={1}
              bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
              border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
              sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
            >
              {!file ? (
                <Box textAlign="center">
                  <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Drag & drop a video file here<br />or<br />Click to select
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    Supported: MP4, MOV, AVI, MKV, and more
                  </Typography>
                </Box>
              ) : (
                <Box textAlign="center" width="100%">
                  <video
                    ref={videoRef}
                    src={previewUrl || undefined}
                    controls
                    style={{
                      aspectRatio: '16 / 9',
                      maxWidth: '100%',
                      maxHeight: 220,
                      background: '#000',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 10
                    }}
                    onLoadedMetadata={handleLoadedMetadata}
                  />
                </Box>
              )}
              <input
                accept="video/*"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  left: 0,
                  top: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  zIndex: 2
                }}
                id="video-file-input"
                type="file"
                onChange={handleFileChange}
                tabIndex={-1}
              />
            </Box>
            {/* Filename and remove button */}
            {file && (
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="body2" noWrap>
                  {file.name}
                </Typography>
                <IconButton onClick={handleReset} color="error" sx={{ ml: 1 }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
            {/* Tabs for extraction modes, only visible when video is loaded */}
            {file && !isProcessing && duration > 0 && (
              <Tabs
                value={mode}
                onChange={handleModeChange}
                variant="fullWidth"
                sx={{ mb: 2 }}
              >
                <Tab icon={<ImageIcon fontSize="small" />} label="Single Frame" />
                <Tab icon={<CollectionsIcon fontSize="small" />} label="Scrub" />
                <Tab icon={<FilterFramesIcon fontSize="small" />} label="Frames" />
              </Tabs>
            )}
            {/* Start/End time slider for all modes except Single Frame */}
            {file && duration > 0 && !isProcessing && mode !== 0 && (
              <Box mb={2}>
                <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Select Range: <small>{`${startTime.toFixed(1)}s - ${endTime.toFixed(1)}s`}</small>
                </Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => setStartTime(prev => Math.max(0, Number((prev - 1).toFixed(1))))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider
                    min={0}
                    max={Math.floor(duration)}
                    step={0.1}
                    value={[startTime, endTime]}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                    disableSwap

                    sx={{ mx: 1, flex: 1 }}
                  />
                  <IconButton onClick={() => setEndTime(prev => Math.min(Math.floor(duration), Number((prev + 1).toFixed(1))))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Box>
            )}
            {/* Controls for each mode */}
            {file && duration > 0 && !isProcessing && (
              <>
                {mode === 0 && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      Select Time: <small>{`${time.toFixed(1)}s`}</small>
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => setTime(prev => Math.max(0, Number((prev - 0.5).toFixed(1))))} disabled={isProcessing}><RemoveIcon /></IconButton>
                      <Slider
                        min={0}
                        max={Math.floor(duration)}
                        step={0.1}
                        value={time}
                        onChange={handleTimeChange}
                        valueLabelDisplay="auto"

                        sx={{ mx: 1, flex: 1 }}
                      />
                      <IconButton onClick={() => setTime(prev => Math.min(Math.floor(duration), Number((prev + 0.5).toFixed(1))))} disabled={isProcessing}><AddIcon /></IconButton>
                    </Box>
                    <Box display="flex" gap={2} mt={2}>
                      <TextField
                        label="Width"
                        type="number"
                        value={width}
                        onChange={handleWidthChange}
                        sx={{ flex: 1 }}
                        helperText="Max: 1000 is recommended"
                      />
                      <TextField
                        label="Height"
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        sx={{ flex: 1 }}
                        helperText="Max: 1000 is recommended"
                      />
                    </Box>
                  </Box>
                )}
                {mode === 1 && (
                  <Box display="flex" mb={2} gap={2}>
                    <TextField
                      label="Interval (s)"
                      type="number"
                      value={scrubInterval}
                      onChange={handleScrubIntervalChange}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Width"
                      type="number"
                      value={width}
                      onChange={handleWidthChange}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Height"
                      type="number"
                      value={height}
                      onChange={handleHeightChange}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                )}
                {mode === 2 && (
                  <Box display="flex" mb={2} gap={2}>
                    <TextField
                      label="Frame Interval"
                      type="number"
                      value={frameInterval}
                      onChange={handleFrameIntervalChange}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Width"
                      type="number"
                      value={width}
                      onChange={handleWidthChange}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Height"
                      type="number"
                      value={height}
                      onChange={handleHeightChange}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                )}
              </>
            )}
            {/* Show thumbnails */}
            {(mode === 0 && thumbnailUrl) && (
              <Box display="flex" justifyContent="center" mb={2}>
                <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 4, border: '1px solid #ccc' }} />
              </Box>
            )}
            {(mode === 1 && thumbnailUrl) && (
              <Box display="flex" justifyContent="center" mb={2}>
                <img src={thumbnailUrl} alt="Scrub Strip" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 4, border: '1px solid #ccc' }} />
              </Box>
            )}
            {(mode !== 0 && mode !== 1 && thumbnails.length > 0) && (
              <Box display="flex" gap={1} mb={2} sx={{ overflowX: 'auto' }}>
                {thumbnails.map((url, idx) => (
                  <img key={idx} src={url} alt={`Thumbnail ${idx + 1}`} style={{ maxWidth: 120, maxHeight: 90, borderRadius: 4, border: '1px solid #ccc' }} />
                ))}
              </Box>
            )}
          </CardContent>
          <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={handleExtractThumbnail} disabled={!file || isProcessing}>
              {isProcessing ? 'Extracting' : 'Extract'}
            </Button>
            {isProcessing && (
              <Button color="error" variant="contained" onClick={handleStop}>
                Stop
              </Button>
            )}
            {/* Reset button only visible when not processing */}
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            )}
            {(thumbnailUrl || thumbnails.length > 0) && (
              <Button color="success" variant="contained" onClick={handleDownload}>
                {(thumbnails.length > 1 && mode !== 0 && mode !== 1) ? 'Download All' : 'Download'}
              </Button>
            )}
          </CardActions>
          {isProcessing && (
            <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
              <LinearProgress color="success" variant="determinate" value={progress} />
              <Typography variant="body2" my={1}>{`${status} (${progress.toFixed(1)}%)`}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
              </Typography>
            </Box>
          )}

          <Alert icon={false} severity="warning" sx={{ alignItems: 'center', mt: 2, py: 0 }}>
            <Typography variant='subtitle1' fontWeight={600} component="h4">Recommendations:</Typography>
            <ol style={{ paddingLeft: 15 }}>
              <li><Typography variant='body2' component="p"> <strong>Go with lower resolution:</strong> Lower resolution videos are faster to process and can still produce good thumbnails.</Typography></li>
              <li><Typography variant='body2' component="p"> <strong>Exports less thumbnails:</strong> If you need fewer thumbnails, consider adjusting the extraction settings.</Typography></li>
            </ol>
            <Typography variant='body2' component="p">Progress depends on the system hardware mostly <Link color="info" sx={{ cursor: 'pointer' }} onClick={handlePerformanceDialogOpen}>Learn more</Link></Typography>
          </Alert>
        </Card>

        <PerformanceInfoDialog
          open={isPerformanceDialogOpen}
          onClose={handlePerformanceDialogClose}
        />
      </Container>
    </>
  )
}

export default ThumbnailGenerator
