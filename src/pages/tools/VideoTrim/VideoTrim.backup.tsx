import React, { useState, useRef } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { Helmet } from 'react-helmet-async'

// MUI imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// MUI Icons
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ffmpeg = new FFmpeg()
let isFFmpegLoaded = false

// Add a ref to keep track of the current ffmpeg instance for termination
const ffmpegRef = { current: ffmpeg };


function VideoTrim() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const [range, setRange] = useState<[number, number]>([0, 0])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadSize, setDownloadSize] = useState<number | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [isDragActive, setIsDragActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0])
      setPreviewUrl(URL.createObjectURL(event.target.files[0]))
      setDuration(0)
      setRange([0, 0])
      setProgress(0)
      setStatus(null)
      setErrorMsg(null)
      setDownloadUrl(null)
      setDownloadSize(null)
      setConsoleLogs([])
    }
  }

  const handleRemoveFile = () => {
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setFile(null);
    setPreviewUrl(null);
    setDuration(0);
    setRange([0, 0]);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);
  };

  // Remove handleReset logic and replace with reload
  const handleReset = () => {
    window.location.reload();
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration
      setDuration(dur)
      setRange([0, Math.floor(dur)])
    }
  }

  const handleRangeChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) setRange([Math.floor(newValue[0]), Math.ceil(newValue[1])])
  }

  const handleTrim = async () => {
    if (!file) return
    if (!isFFmpegLoaded) {
      await ffmpeg.load()
      isFFmpegLoaded = true
    }
    setIsProcessing(true)
    setProgress(0)
    setStatus('Preparing')
    setErrorMsg(null)
    setDownloadUrl(null)
    setDownloadSize(null)
    setConsoleLogs([])

    // Assign ffmpeg to ref for stop functionality
    ffmpegRef.current = ffmpeg;

    const inputFileName = file.name
    const outputFileName = `trimmed_${inputFileName}`
    try {
      await ffmpeg.writeFile(inputFileName, await fetchFile(file))
      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message])
        if (message.includes('frame=')) {
          setProgress(prev => Math.min(prev + 5, 99))
        }
      }
      ffmpeg.on('log', logHandler)
      setStatus('Trimming')
      await ffmpeg.exec([
        '-i', inputFileName,
        '-ss', `${range[0]}`,
        '-to', `${range[1]}`,
        '-c', 'copy',
        outputFileName
      ])
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
      a.download = `trimmed_${file.name}`
      a.click()
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000)
    }
  }

  return (
    <>
      <Helmet>
        <title>Video Trimmer Online Free – Cut and Trim Videos Precisely</title>
        <meta name="description" content="Trim and cut videos with frame-accurate precision. Remove unwanted parts locally — no watermark, private & fast." />
        <meta name="keywords" content="trim video online free, cut video online, video trimmer tool, clip video online, remove parts from video, video editor online, trim mp4 online" />
        <meta property="og:title" content="Free Online Video Trimmer – Fast, Private & No Watermark" />
        <meta property="og:description" content="Trim and cut videos with precision in your browser. No uploads required." />
        <meta property="og:image" content="/images/landing/video-trim-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/trim" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="https://fileapps.click/tools/video/trim" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
      <Card sx={{ p: 1.5 }}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center">
            <ContentCutIcon color="info" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>Video Trimmer</Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" component="h2" color="text.secondary" mb={2}>Trim and cut videos with frame-accurate precision. Remove unwanted parts locally — no watermark, no signup, 100% browser-based.</Typography>
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
                setDuration(0);
                setRange([0, 0]);
                setProgress(0);
                setStatus(null);
                setErrorMsg(null);
                setDownloadUrl(null);
                setDownloadSize(null);
                setConsoleLogs([]);
              }
            }}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height={300}
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
                  style={{ maxWidth: '100%', maxHeight: 220, background: '#000', position: 'relative', zIndex: 10 }}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              </Box>
            )}
            <input
              ref={fileInputRef}
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
              <IconButton color='error' onClick={handleRemoveFile} sx={{ ml: 1 }}>
                <CloseIcon fontSize='small'/>
              </IconButton>
            </Box>
          )}
          {/* Range slider and controls */}
          {file && duration > 0 && !isProcessing && (
            <Box mb={2}>
              <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Select Duration: <small>{`${range[0]}s - ${range[1]}s`}</small>
              </Typography>
              <Box display="flex" alignItems="center">
                <IconButton onClick={() => setRange([Math.max(0, Math.floor(range[0] - 1)), range[1]])} disabled={isProcessing}><RemoveIcon /></IconButton>
                <Slider
                  min={0}
                  max={Math.floor(duration)}
                  step={0.1}
                  value={range}
                  onChange={handleRangeChange}
                  valueLabelDisplay="auto"
                  disableSwap
                  
                  sx={{ mx: 1, flex: 1 }}
                />
                <IconButton onClick={() => setRange([range[0], Math.min(Math.floor(duration), Math.ceil(range[1] + 1))])} disabled={isProcessing}><AddIcon /></IconButton>
              </Box>
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleTrim} disabled={!file || isProcessing || range[1] <= range[0]}>
            {isProcessing ? 'Trimming' : 'Trim'}
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
              Download ({(downloadSize / (1024 * 1024)).toFixed(2)} MB)
            </Button>
          )}
        </CardActions>
        {isProcessing && (
          <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
            <LinearProgress color='success' variant="determinate" value={progress} />
            <Typography variant="body2" my={1}>{`${status} (${progress.toFixed(1)}%)`}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
            </Typography>
          </Box>
        )}
      </Card>
      {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
    </Container>
    </>
  )
}

export default VideoTrim
