import React, { useState, useRef } from 'react'

// MUI imports
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

// Icons
import CloseIcon from '@mui/icons-material/Close'
import ReplayIcon from '@mui/icons-material/Replay'
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

const ratioOptions = [
  { label: 'Custom', value: 'custom', ratio: null },
  { label: '1:1', value: '1:1', ratio: 1 },
  { label: '4:3', value: '4:3', ratio: 4 / 3 },
  { label: '16:9', value: '16:9', ratio: 16 / 9 },
  { label: '9:16', value: '9:16', ratio: 9 / 16 },
  { label: '21:9', value: '21:9', ratio: 21 / 9 },
]

const resizeModes = [
  { label: 'Fit (letterbox)', value: 'fit' },
  { label: 'Fill (crop)', value: 'fill' },
  { label: 'Stretch', value: 'stretch' },
  { label: 'Crop (manual)', value: 'crop' },
]

const defaultState = {
  width: '',
  height: '',
  ratio: 'custom',
  mode: 'fit',
  fps: '' as number | '',
}

const ffmpeg = new FFmpeg()
let isFFmpegLoaded = false

// Add a ref to keep track of the current ffmpeg instance for termination
const ffmpegRef = { current: ffmpeg };


function VideoResize() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [width, setWidth] = useState<string>(defaultState.width)
  const [height, setHeight] = useState<string>(defaultState.height)
  const [resolutionRatio, setResolutionRatio] = useState<string>(defaultState.ratio)
  const [resizeMode, setResizeMode] = useState<string>(defaultState.mode)
  const [fps, setFps] = useState<number | ''>(defaultState?.fps)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadSize, setDownloadSize] = useState<number | null>(null)
  const [isDragActive, setIsDragActive] = useState(false);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
      setPreviewUrl(URL.createObjectURL(e.target.files[0]))
      setErrorMsg(null)
      setWidth('')
      setHeight('')
      setResolutionRatio('custom')
    }
  }

  // Remove file
  const handleRemoveFile = () => {
    setFile(null)
    setPreviewUrl(null)
    setWidth('')
    setHeight('')
    setResolutionRatio('custom')
    setErrorMsg(null)
  }

  // Get video natural size
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setWidth(String(Math.round(videoRef.current.videoWidth)))
      setHeight(String(Math.round(videoRef.current.videoHeight)))
    }
  }

  // Ratio logic
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setWidth(val)
    const selected = ratioOptions.find(r => r.value === resolutionRatio)
    if (selected && selected.ratio && val) {
      const w = parseInt(val, 10)
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)))
      }
    }
  }
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setHeight(val)
    const selected = ratioOptions.find(r => r.value === resolutionRatio)
    if (selected && selected.ratio && val) {
      const h = parseInt(val, 10)
      if (!isNaN(h)) {
        setWidth(String(Math.round(h * selected.ratio)))
      }
    }
  }
  const handleRatioChange = (e: any) => {
    const val = e.target.value
    setResolutionRatio(val)
    const selected = ratioOptions.find(r => r.value === val)
    if (selected && selected.ratio && width) {
      const w = parseInt(width, 10)
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)))
      }
    }
  }

  // Remove handleReset logic and replace with reload
  const handleReset = () => {
    window.location.reload();
  };

  // Parse duration from ffmpeg logs
  const parseDuration = (msg: string) => {
    const match = msg.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/)
    if (match) {
      const [, h, m, s] = match
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s)
    }
    return 0
  }

  // Parse current time from ffmpeg logs
  const parseCurrentTime = (msg: string) => {
    const match = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/)
    if (match) {
      const [, h, m, s] = match
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s)
    }
    return null
  }

  // Resize handler using ffmpeg
  const handleResize = async () => {
    if (!file) {
      setErrorMsg('Please select a video file.')
      return
    }
    if (!width || !height) {
      setErrorMsg('Please enter width and height.')
      return
    }
    setErrorMsg(null)
    setIsProcessing(true)
    setProgress(0)
    setStatus('Preparing')
    setConsoleLogs([])
    setDownloadUrl(null)
    setDownloadSize(null)

    if (!isFFmpegLoaded) {
      await ffmpeg.load()
      isFFmpegLoaded = true
    }

    ffmpegRef.current = ffmpeg;

    const inputFileName = file.name
    const outputFileName = `resized_${inputFileName.replace(/\.[^/.]+$/, '')}.mp4`

    try {
      await ffmpeg.writeFile(inputFileName, await fetchFile(file))
      let durationParsed = false
      let videoDuration = 0
      const logHandler = ({ message }: { message: string }) => {
        if (!durationParsed && message.includes('Duration:')) {
          videoDuration = parseDuration(message)
          durationParsed = true
        }
        const current = parseCurrentTime(message)
        if (current && videoDuration > 0) {
          setProgress(Math.min((current / videoDuration) * 100, 99.5))
        }
        setConsoleLogs(logs => [...logs, message])
      }
      ffmpeg.on('log', logHandler)

      // Build ffmpeg args
      let args = ['-i', inputFileName]
      // Resize filter
      args.push('-vf', `scale=${width}:${height}`)
      // FPS
      if (fps) {
        args.push('-r', `${fps}`)
      }
      // Resize mode (objectFit for preview only, not for ffmpeg)
      // Output file
      args.push('-c:v', 'libx264')
      args.push('-preset', 'fast')
      args.push('-crf', '23')
      args.push('-c:a', 'aac')
      args.push('-b:a', '128k')
      args.push(outputFileName)

      setStatus('Resizing')
      await ffmpeg.exec(args)

      setStatus('Finalizing')
      setProgress(99.9)

  const data = await ffmpeg.readFile(outputFileName)
  const blob = new Blob([new Uint8Array(data as any)], { type: 'video/mp4' })
  const url = URL.createObjectURL(blob)
  setDownloadUrl(url)
  setDownloadSize(data.length)

      await ffmpeg.deleteFile(inputFileName)
      await ffmpeg.deleteFile(outputFileName)

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
    }
  }

  // Add stop handler
  const handleStop = () => {
    ffmpegRef.current?.terminate?.();
    setStatus('Stopped');
    setIsProcessing(false);
    setErrorMsg(null); // Clear error on stop
  };

  const handleDownload = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `resized_${file.name.replace(/\.[^/.]+$/, '')}.mp4`
      a.click()
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ my: 'auto' }}>
      <Card sx={{ p: 1.5 }} elevation={3}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center">
            <AspectRatioIcon color="warning" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
              Video Resizer
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
            Resize videos to custom resolutions and aspect ratios. Choose fit/fill/stretch modes, change FPS, and preview before exporting — processed locally in your browser.
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
                setErrorMsg(null);
                setWidth('');
                setHeight('');
                setResolutionRatio('custom');
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
            border={isDragActive ? theme => `2px dashed ${theme.palette.primary.main}` : theme => `2px dashed ${theme.palette.divider}`}
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
                    aspectRatio: `${width || 16} / ${height || 9}`,
                    maxWidth: '100%',
                    maxHeight: 220,
                    background: '#000',
                    objectFit: resizeMode === 'fit' ? 'contain'
                      : resizeMode === 'fill' ? 'cover'
                      : resizeMode === 'stretch' ? 'fill'
                      : 'contain'
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
              <IconButton color="error" onClick={handleRemoveFile}><CloseIcon fontSize="small" /></IconButton>
            </Box>
          )}
          {/* Resize Controls */}
          {file && (
            <Grid container spacing={1} mt={2}>
              <Grid size={{xs: 12}}>
                <Typography variant="subtitle2">Resolution (px):</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    type="number"
                    value={width}
                    onChange={resolutionRatio === 'custom' ? e => setWidth(e.target.value) : handleWidthChange}
                    placeholder="Width"
                    sx={{ flex: 1 }}
                  />
                  <Typography color="text.secondary">x</Typography>
                  <TextField
                    type="number"
                    value={height}
                    onChange={resolutionRatio === 'custom' ? e => setHeight(e.target.value) : handleHeightChange}
                    placeholder="Height"
                    sx={{ flex: 1 }}
                  />
                  <Select
                    value={resolutionRatio}
                    onChange={handleRatioChange}
                    sx={{ minWidth: 100 }}
                  >
                    {ratioOptions.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <IconButton color="inherit" onClick={handleReset} title="Reset to default">
                    <ReplayIcon fontSize="small" />
                  </IconButton>
                </Box>
                {resolutionRatio !== 'custom' && (
                  <Typography variant="caption" color="text.secondary">
                    Ratio locked: {ratioOptions.find(r => r.value === resolutionRatio)?.label}
                  </Typography>
                )}
              </Grid>
              <Grid size={{xs: 12, md: 6}}>
                <Typography variant="subtitle2">Resize Mode:</Typography>
                <Select
                  fullWidth
                  value={resizeMode}
                  onChange={e => setResizeMode(e.target.value)}
                >
                  {resizeModes.map(m => (
                    <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" color="text.secondary">
                  {resizeMode === 'fit' && 'Fit: Keeps aspect ratio, may add borders.'}
                  {resizeMode === 'fill' && 'Fill: Crops to fill, keeps aspect ratio.'}
                  {resizeMode === 'stretch' && 'Stretch: Ignores aspect ratio.'}
                  {resizeMode === 'crop' && 'Crop: Manual crop (not implemented).'}
                </Typography>
              </Grid>
              <Grid size={{xs: 12, md: 6}}>
                <Typography variant="subtitle2">FPS (optional):</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={fps}
                  onChange={e => setFps(e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="e.g. 30"
                />
              </Grid>
              {/* Advanced options could go here */}
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleResize} disabled={isProcessing}>
            {isProcessing ? 'Resizing' : 'Resize'}
          </Button>
          {/* Reset button only visible when not processing */}
          {!isProcessing && (
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          )}
          {/* Add Stop button */}
          {isProcessing && (
            <Button variant="contained" color="error" onClick={handleStop}>
              Stop
            </Button>
          )}
          {downloadUrl && downloadSize !== null && (
            <Button variant="contained" color="success" onClick={handleDownload}>
              Download ({(downloadSize / 1024 / 1024).toFixed(2)} MB)
            </Button>
          )}
        </CardActions>
        {isProcessing && (
          <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
            <LinearProgress color='success' variant="determinate" value={progress} />
            <Typography variant="body2" my={1}>{`${status} ${progress.toFixed(1)}%`}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
            </Typography>
          </Box>
        )}
      </Card>
      {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
    </Container>
  )
}

export default VideoResize