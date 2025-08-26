import React, { useState, useRef } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import JSZip from 'jszip'

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
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

// Icons
import ImageIcon from '@mui/icons-material/Image'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import CollectionsIcon from '@mui/icons-material/Collections'
import FilterFramesIcon from '@mui/icons-material/FilterFrames'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'


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

  const videoRef = useRef<HTMLVideoElement>(null)
  const ffmpegRef = useRef<FFmpeg | null>(null)

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
    const ffmpeg = new FFmpeg()
    ffmpegRef.current = ffmpeg
    try {
      await ffmpeg.load()
      await ffmpeg.writeFile(inputFileName, await fetchFile(file))
      let totalScrubFrames = 0
      let scrubFramesDone = 0
      if (mode === 1) {
        totalScrubFrames = Math.floor((endTime - startTime) / scrubInterval) + 1
      }
      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message])
        if (mode === 1 && message.includes('frame=')) {
          // Scrub mode: update progress by frames
          scrubFramesDone++
          setProgress(Math.min(100, (scrubFramesDone / totalScrubFrames) * 100))
        } else {
          // Extract time= from ffmpeg log (Single/Frames)
          const timeMatch = message.match(/time=([0-9:.]+)/)
          if (timeMatch) {
            const timeStr = timeMatch[1]
            const parts = timeStr.split(':').map(Number)
            let seconds = 0
            if (parts.length === 3) {
              seconds = parts[0] * 3600 + parts[1] * 60 + parts[2]
            } else if (parts.length === 2) {
              seconds = parts[0] * 60 + parts[1]
            } else if (parts.length === 1) {
              seconds = parts[0]
            }
            const rangeStart = mode === 0 ? time : startTime
            const rangeEnd = mode === 0 ? time : endTime
            const totalRange = Math.max(rangeEnd - rangeStart, 0.01)
            const percent = Math.min(100, ((seconds - rangeStart) / totalRange) * 100)
            setProgress(percent)
          }
          // Fallback for frame= log (Frames mode)
          if (mode === 2 && message.includes('frame=')) {
            setProgress(prev => Math.min(prev + 10, 99))
          }
        }
      }
      ffmpeg.on('log', logHandler)

      let urls: string[] = []
      if (mode === 0) {
        setStatus(`Extracting frame at ${time.toFixed(1)}s`)
        const outputFileName = 'thumbnail.jpg'
        await ffmpeg.exec([
          '-i', inputFileName,
          '-ss', `${time}`,
          '-vframes', '1',
          '-vf', `scale=${width}:${height}`,
          '-pix_fmt', 'yuv420p',
          outputFileName
        ])
  const data = await ffmpeg.readFile(outputFileName)
  const blob = new Blob([new Uint8Array(data as any)], { type: 'image/jpeg' })
  const url = URL.createObjectURL(blob)
        setThumbnailUrl(url)
        urls = [url]
        await ffmpeg.deleteFile(outputFileName)
      } else if (mode === 1) {
        setStatus(`Generating Scrub from ${startTime}s to ${endTime}s`)
        let idx = 0
        let frameNames: string[] = []
        for (let t = startTime; t <= endTime; t += scrubInterval) {
          const outName = `scrub_${idx}.jpg`
          await ffmpeg.exec([
            '-i', inputFileName,
            '-ss', `${t}`,
            '-vframes', '1',
            '-vf', `scale=${width}:${height}`,
            '-pix_fmt', 'yuv420p',
            outName
          ])
          frameNames.push(outName)
          idx++
        }
        // Join frames horizontally using hstack
        setStatus('Joining frames...')
        await ffmpeg.exec([
          ...frameNames.flatMap(name => ['-i', name]),
          '-filter_complex', `hstack=inputs=${frameNames.length}`,
          '-pix_fmt', 'yuv420p',
          'scrub_joined.jpg'
        ])
  const data = await ffmpeg.readFile('scrub_joined.jpg')
  const blob = new Blob([new Uint8Array(data as any)], { type: 'image/jpeg' })
  const url = URL.createObjectURL(blob)
        setThumbnailUrl(url)
        urls = [url]
        // Cleanup
        for (const name of frameNames) {
          await ffmpeg.deleteFile(name)
        }
        await ffmpeg.deleteFile('scrub_joined.jpg')
      } else if (mode === 2) {
        setStatus(`Extracting frame after every ${frameInterval} frame(s) from ${startTime}s to ${endTime}s`)
        await ffmpeg.exec([
          '-i', inputFileName,
          '-ss', `${startTime}`,
          '-to', `${endTime}`,
          '-vf', `select=not(mod(n\\,${frameInterval})),scale=${width}:${height}`,
          '-vsync', 'vfr',
          '-pix_fmt', 'yuv420p',
          'frames_%03d.jpg'
        ])
        let idx = 1
        while (true) {
          const outName = `frames_${String(idx).padStart(3, '0')}.jpg`
          try {
            const data = await ffmpeg.readFile(outName)
            const blob = new Blob([new Uint8Array(data as any)], { type: 'image/jpeg' })
            const url = URL.createObjectURL(blob)
            urls.push(url)
            await ffmpeg.deleteFile(outName)
            idx++
          } catch {
            break
          }
        }
      }
      setThumbnails(urls)
      setProgress(100)
      setStatus('Completed')
      ffmpeg.off('log', logHandler)
    } catch (err:any) {
      setStatus('Failed')
      setConsoleLogs(logs => [...logs, String(err)])
      // Only set errorMsg if not stopped
      if (err.message !== 'called FFmpeg.terminate()') {
        setErrorMsg(err instanceof Error ? err.message : String(err))
      }
    } finally {
      setIsProcessing(false)
      setTimeout(() => {
        setProgress(0)
        setStatus(null)
      }, 2000)
      try {
        await ffmpeg.deleteFile(inputFileName)
      } catch { }
      ffmpeg.terminate && ffmpeg.terminate()
      ffmpegRef.current = null
    }
  }

  const handleStop = () => {
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate()
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
    <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
      {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
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
                  Drag & drop a video file here<br/>or<br/>Click to select
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
                    />
                    <TextField
                      label="Height"
                      type="number"
                      value={height}
                      onChange={handleHeightChange}
                      sx={{ flex: 1 }}
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
      </Card>
    </Container>
  )
}

export default ThumbnailGenerator
