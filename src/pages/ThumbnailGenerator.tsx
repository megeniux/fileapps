import React, { useState, useRef, useCallback, useEffect } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import JSZip from 'jszip'

// MUI Imports
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

import ImageIcon from '@mui/icons-material/Image'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CollectionsIcon from '@mui/icons-material/Collections'
import FilterFramesIcon from '@mui/icons-material/FilterFrames'
import TimerIcon from '@mui/icons-material/Timer'

function ThumbnailGenerator() {
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
  const [mode, setMode] = useState(0) // 0: Single, 1: Scrub, 2: Frames, 3: Interval
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(1)
  const [scrubInterval, setScrubInterval] = useState(1)
  const [frameInterval, setFrameInterval] = useState(10)
  const [intervalSeconds, setIntervalSeconds] = useState(1)
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])

  const videoRef = useRef<HTMLVideoElement>(null)
  const ffmpegRef = useRef<FFmpeg | null>(null)

  const MAX_INTERVAL_FRAMES = 50

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

  const handleIntervalSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(event.target.value)
    if (!isNaN(val) && val > 0) setIntervalSeconds(val)
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
      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message])
        if (message.includes('frame=')) {
          setProgress(prev => Math.min(prev + 10, 99))
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
        const url = URL.createObjectURL(new Blob([data], { type: 'image/jpeg' }))
        setThumbnailUrl(url)
        urls = [url]
        await ffmpeg.deleteFile(outputFileName)
      } else if (mode === 1) {
        setStatus(`Extracting frames every ${scrubInterval}s from ${startTime}s to ${endTime}s`)
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
        const url = URL.createObjectURL(new Blob([data], { type: 'image/jpeg' }))
        setThumbnailUrl(url)
        urls = [url]
        // Cleanup
        for (const name of frameNames) {
          await ffmpeg.deleteFile(name)
        }
        await ffmpeg.deleteFile('scrub_joined.jpg')
      } else if (mode === 2) {
        setStatus(`Extracting every ${frameInterval}th frame from ${startTime}s to ${endTime}s`)
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
            const url = URL.createObjectURL(new Blob([data], { type: 'image/jpeg' }))
            urls.push(url)
            await ffmpeg.deleteFile(outName)
            idx++
          } catch {
            break
          }
        }
      } else if (mode === 3) {
        // Interval mode: limit number of frames
        const frameCount = Math.floor((endTime - startTime) / intervalSeconds) + 1
        if (frameCount > MAX_INTERVAL_FRAMES) {
          setErrorMsg(`Too many frames (${frameCount}). Please increase interval or reduce range (max ${MAX_INTERVAL_FRAMES}).`)
          setIsProcessing(false)
          ffmpeg.off('log', logHandler)
          return
        }
        setStatus(`Extracting every ${intervalSeconds}s from ${startTime}s to ${endTime}s`)
        await ffmpeg.exec([
          '-i', inputFileName,
          '-ss', `${startTime}`,
          '-to', `${endTime}`,
          '-vf', `fps=1/${intervalSeconds},scale=${width}:${height}`,
          '-pix_fmt', 'yuv420p',
          'interval_%03d.jpg'
        ])
        let idx = 1
        while (true) {
          const outName = `interval_${String(idx).padStart(3, '0')}.jpg`
          try {
            const data = await ffmpeg.readFile(outName)
            const url = URL.createObjectURL(new Blob([data], { type: 'image/jpeg' }))
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
    } catch (err) {
      setStatus('Failed')
      setConsoleLogs(logs => [...logs, String(err)])
      setErrorMsg(err instanceof Error ? err.message : String(err))
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
      setErrorMsg(null)
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
    <Container maxWidth="sm" sx={{ my: 'auto' }}>
      <Card sx={{ px: 2, py: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Box display="flex" flexDirection="column" alignItems="center">
            <ImageIcon color="error" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h5" color="error" gutterBottom>Thumbnail Generator</Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Select a video, choose the extraction mode and options.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" alignItems="center" mb={2} p={1} borderRadius={0.5} border={1} borderColor="divider" bgcolor="action.hover">
            <Box display="flex" justifyContent="center" alignItems="center" width={120} height={72} border={1} borderColor="divider" mr={2}>
              {previewUrl ? (
                <video
                  ref={videoRef}
                  src={previewUrl}
                  controls={false}
                  style={{ width: 120, height: 72, background: '#000' }}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center">No video selected</Typography>
              )}
            </Box>
            <Box flex={1}>
              <input type="file" accept="video/*" onChange={handleFileChange} style={{ width: '100%' }} />
            </Box>
          </Box>
          {/* Tabs for extraction modes, only visible when video is loaded */}
          {file && !isProcessing && duration > 0 && (
            <Tabs
              value={mode}
              onChange={handleModeChange}
              variant="fullWidth"
              sx={{ mb: 2 }}
            >
              <Tab icon={<PhotoCameraIcon />} label="Single Frame" />
              <Tab icon={<CollectionsIcon />} label="Scrub" />
              <Tab icon={<FilterFramesIcon />} label="Frames" />
              <Tab icon={<TimerIcon />} label="Interval" />
            </Tabs>
          )}
          {/* Start/End time slider for all modes except Single Frame */}
          {file && duration > 0 && !isProcessing && mode !== 0 && (
            <Box mb={2}>
              <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Select Range: <small>{`${startTime.toFixed(1)}s - ${endTime.toFixed(1)}s`}</small>
              </Typography>
              <Slider
                color="error"
                min={0}
                max={Math.floor(duration)}
                step={0.1}
                value={[startTime, endTime]}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                disableSwap
                size="small"
              />
            </Box>
          )}
          {/* Controls for each mode */}
          {file && duration > 0 && !isProcessing && (
            <>
              {mode === 0 && (
                <Box mb={2}>
                  <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Select Time: <small>{`${time.toFixed(1)}s`}</small>
                  </Typography>
                  <Slider
                    color="error"
                    min={0}
                    max={Math.floor(duration)}
                    step={0.1}
                    value={time}
                    onChange={handleTimeChange}
                    valueLabelDisplay="auto"
                    size="small"
                  />
                  <Box display="flex" gap={2} mt={2}>
                    <TextField
                      label="Width"
                      type="number"
                      size="small"
                      value={width}
                      onChange={handleWidthChange}
                      inputProps={{ min: 1 }}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Height"
                      type="number"
                      size="small"
                      value={height}
                      onChange={handleHeightChange}
                      inputProps={{ min: 1 }}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Box>
              )}
              {mode === 1 && (
                <Box mb={2}>
                  <TextField
                    label="Interval (s)"
                    type="number"
                    size="small"
                    value={scrubInterval}
                    onChange={handleScrubIntervalChange}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    sx={{ mb: 2, width: '100%' }}
                  />
                  <Box display="flex" gap={2}>
                    <TextField
                      label="Width"
                      type="number"
                      size="small"
                      value={width}
                      onChange={handleWidthChange}
                      inputProps={{ min: 1 }}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Height"
                      type="number"
                      size="small"
                      value={height}
                      onChange={handleHeightChange}
                      inputProps={{ min: 1 }}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Box>
              )}
              {mode === 2 && (
                <Box mb={2}>
                  <TextField
                    label="Frame Interval"
                    type="number"
                    size="small"
                    value={frameInterval}
                    onChange={handleFrameIntervalChange}
                    inputProps={{ min: 1 }}
                    sx={{ mb: 2, width: '100%' }}
                  />
                  <Box display="flex" gap={2}>
                    <TextField
                      label="Width"
                      type="number"
                      size="small"
                      value={width}
                      onChange={handleWidthChange}
                      inputProps={{ min: 1 }}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Height"
                      type="number"
                      size="small"
                      value={height}
                      onChange={handleHeightChange}
                      inputProps={{ min: 1 }}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Box>
              )}
              {mode === 3 && (
                <Box mb={2}>
                  <TextField
                    label="Interval (s)"
                    type="number"
                    size="small"
                    value={intervalSeconds}
                    onChange={handleIntervalSecondsChange}
                    inputProps={{ min: 0.1, step: 0.1 }}
                    sx={{ mb: 2, width: '100%' }}
                  />
                  <Box display="flex" gap={2}>
                    <TextField
                      label="Width"
                      type="number"
                      size="small"
                      value={width}
                      onChange={handleWidthChange}
                      inputProps={{ min: 1 }}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Height"
                      type="number"
                      size="small"
                      value={height}
                      onChange={handleHeightChange}
                      inputProps={{ min: 1 }}
                      sx={{ flex: 1 }}
                    />
                  </Box>
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
        <CardActions sx={{ display: !!file ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" color="error" onClick={handleExtractThumbnail} disabled={!file || isProcessing}>
            {isProcessing ? 'Extracting' : 'Extract'}
          </Button>
          {isProcessing && (
            <Button variant="contained" color="error" onClick={handleStop}>
              Stop
            </Button>
          )}
          {(thumbnailUrl || thumbnails.length > 0) && (
            <Button variant="outlined" color="success" onClick={handleDownload}>
              {(thumbnails.length > 1 && mode !== 0 && mode !== 1) ? 'Download All' : 'Download'}
            </Button>
          )}
        </CardActions>
        {isProcessing && (
          <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
            <LinearProgress color="error" variant="determinate" value={progress} />
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
