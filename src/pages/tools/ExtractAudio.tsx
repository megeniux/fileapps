import React, { useState, useRef } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

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
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';

// Icons
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';

const ffmpeg = new FFmpeg()
let isFFmpegLoaded = false

function ExtractAudio() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadSize, setDownloadSize] = useState<number | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [duration, setDuration] = useState<number>(0)
  const [range, setRange] = useState<[number, number]>([0, 0])

  const videoRef = useRef<HTMLVideoElement>(null)

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0])
      setPreviewUrl(URL.createObjectURL(event.target.files[0]))
      setProgress(0)
      setStatus(null)
      setErrorMsg(null)
      setDownloadUrl(null)
      setDownloadSize(null)
      setConsoleLogs([])
      setDuration(0)
      setRange([0, 0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);
    setDuration(0);
    setRange([0, 0]);
  };

  const handleExtract = async () => {
    if (!file) return
    if (!isFFmpegLoaded) {
      await ffmpeg.load()
      isFFmpegLoaded = true
    }
    setIsProcessing(true)
    setProgress(0)
    setStatus('Preparing...')
    setErrorMsg(null)
    setDownloadUrl(null)
    setDownloadSize(null)
    setConsoleLogs([])

    const inputFileName = file.name
    const outputFileName = `audio_${inputFileName.replace(/\.[^/.]+$/, "")}.mp3`
    try {
      await ffmpeg.writeFile(inputFileName, await fetchFile(file))
      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message])
        if (message.includes('size=')) {
          setProgress(prev => Math.min(prev + 5, 99))
        }
      }
      ffmpeg.on('log', logHandler)
      setStatus('Extracting')
      await ffmpeg.exec([
        '-i', inputFileName,
        '-ss', `${range[0]}`,
        '-to', `${range[1]}`,
        '-vn',
        '-acodec', 'mp3',
        outputFileName
      ])
      setStatus('Finalizing')
      setProgress(99.9)
      const data = await ffmpeg.readFile(outputFileName)
      const url = URL.createObjectURL(new Blob([data], { type: 'audio/mp3' }))
      setDownloadUrl(url)
      setDownloadSize(data.length)
      await ffmpeg.deleteFile(inputFileName)
      await ffmpeg.deleteFile(outputFileName)
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
    }
  }

  const handleDownload = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `audio_${file.name.replace(/\.[^/.]+$/, "")}.mp3`
      a.click()
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000)
    }
  }

  return (
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Card sx={{ px: 2, py: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Box display="flex" flexDirection="column" alignItems="center">
            <MusicNoteIcon color="success" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h5" color="success" gutterBottom>Extract Audio</Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Select a video, extract the audio track, and download the result.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          {/* Unified Upload/Preview UI */}
          <Box display="flex" alignItems="center" flexDirection="column" position="relative" p={2}>
            <Box display="flex" justifyContent="center" alignItems="center" width={120} height={72} borderRadius={1} bgcolor="divider" mb={1}>
              {previewUrl ? (
                <video
                  ref={videoRef}
                  src={previewUrl}
                  controls={false}
                  style={{ width: 120, height: 72, background: '#000' }}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center">No Preview</Typography>
              )}
            </Box>
            <Box flex={1} height={72} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              {!file && <>
                <Typography variant='body2' color='text.secondary'>Click or Drop a file to start the process</Typography>
                <input type="file" accept="video/*" onChange={handleFileChange} style={{ width: '100%', height: '100%', top: 0, opacity: 0, position: 'absolute' }} />
              </>}
              {!!file &&
                <Typography variant="body2" color="success" noWrap>
                  {file.name}
                  <IconButton size="small" color='error' onClick={handleRemoveFile} sx={{ ml: 1 }}>
                    <CloseIcon fontSize='small'/>
                  </IconButton>
                </Typography>
              }
            </Box>
          </Box>
          {/* End Unified Upload/Preview UI */}
          {file && duration > 0 && !isProcessing && (
            <Box mb={2}>
              <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Select Duration: <small>{`${range[0]}s - ${range[1]}s`}</small>
              </Typography>
              <Slider
                min={0}
                max={Math.floor(duration)}
                step={0.1}
                value={range}
                onChange={handleRangeChange}
                valueLabelDisplay="auto"
                disableSwap
                size='small'
              />
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ display: !!file ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleExtract} disabled={!file || isProcessing || range[1] <= range[0]}>
            {isProcessing ? 'Extracting' : 'Extract Audio'}
          </Button>
          {downloadUrl && downloadSize !== null && (
            <Button variant="outlined" color="success" onClick={handleDownload}>
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
    </Container>
  )
}

export default ExtractAudio
