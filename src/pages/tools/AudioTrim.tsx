import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';

// MUI imports
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
import Grid from '@mui/material/Grid';

// Icons
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

// Add a ref to keep track of the current ffmpeg instance for termination
const ffmpegRef = { current: ffmpeg };


function AudioTrim() {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const selectedFile = event.target.files[0];
      if (!selectedFile.type.startsWith('audio/')) {
        setErrorMsg('Please select an audio file.');
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
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (!selectedFile.type.startsWith('audio/')) {
        setErrorMsg('Please select an audio file.');
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
  };

  const handleRemoveFile = () => {
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

  // Remove handleRemoveFile logic and replace with reload for reset
  const handleReset = () => {
    window.location.reload();
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      setDuration(dur);
      setRange([0, Math.floor(dur)]);
    }
  };

  const handleRangeChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setRange([Math.floor(newValue[0]), Math.ceil(newValue[1])]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrim = async () => {
    if (!file) {
      setErrorMsg('Please select an audio file.');
      return;
    }
    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing');
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);
    try {
      if (!isFFmpegLoaded) {
        await ffmpeg.load();
        isFFmpegLoaded = true;
      }
      ffmpegRef.current = ffmpeg;
      const inputFileName = file.name;
      const outputFileName = `trimmed_${inputFileName}`;
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));
      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message]);
        if (message.includes('size=')) {
          setProgress(prev => Math.min(prev + 5, 99));
        }
      };
      ffmpeg.on('log', logHandler);
      setStatus('Trimming');
      await ffmpeg.exec([
        '-i', inputFileName,
        '-ss', `${range[0]}`,
        '-to', `${range[1]}`,
        '-c', 'copy',
        outputFileName
      ]);
      setStatus('Finalizing');
      setProgress(99.9);
      const data = await ffmpeg.readFile(outputFileName);
      const mimeType = file.type;
      const blob = new Blob([data.slice()], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setDownloadSize(data.length);
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
      setProgress(100);
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err:any) {
      setStatus('Failed');
      setConsoleLogs(logs => [...logs, String(err)]);
      // Only set errorMsg if not stopped
      if (err.message !== 'called FFmpeg.terminate()') {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      }
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setStatus(null);
      }, 2000);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `trimmed_${file.name}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  };

  // Update handleStop to terminate ffmpeg
  const handleStop = () => {
    ffmpegRef.current?.terminate?.();
    setIsProcessing(false);
    setStatus('Stopped');
    setProgress(0);
    setErrorMsg(null); // Clear error on stop
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
      {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
      <Card sx={{ p: 1.5 }} elevation={3}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center">
            <ContentCutIcon color="secondary" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
              Audio Trimmer
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
            Trim and cut audio files online with precision.
          </Typography>
          {/* Upload & Preview area, styled like ImageConvert */}
          <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
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
                  Drag & drop an audio file here<br/>or<br/>Click to select
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Supported: MP3, WAV, AAC, FLAC, OGG, and more
                </Typography>
              </Box>
            ) : (
              <Box textAlign="center" width="100%">
                <audio ref={audioRef} src={previewUrl || undefined} controls style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1000 }} onLoadedMetadata={handleLoadedMetadata} />
              </Box>
            )}
            <input
              accept="audio/*"
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
              id="audio-trim-file-input"
              type="file"
              onChange={handleFileChange}
              tabIndex={-1}
            />
          </Box>
          {/* Filename and remove button */}
          {file && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Typography variant="body2" noWrap>
                {file.name} ({formatBytes(file.size)})
              </Typography>
              <IconButton onClick={handleRemoveFile} size="small" color="error" sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {/* Controls */}
          {file && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ mb: 3, width: '100%' }}>
                <Typography variant="subtitle2" gutterBottom>
                    Trim Range: {formatTime(range[0])} - {formatTime(range[1])} (Duration: {formatTime(range[1] - range[0])})
                  </Typography>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => setRange([Math.max(0, range[0] - 1), range[1]])} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider
                    value={range}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatTime}
                    min={0}
                    max={duration}
                    disabled={isProcessing || duration === 0}
                    size="small"
                    sx={{ mx: 1, flex: 1 }}
                  />
                  <IconButton size="small" onClick={() => setRange([range[0], Math.min(duration, range[1] + 1)])} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Box>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleTrim} disabled={isProcessing || !file || duration === 0} size="small">
            {isProcessing ? 'Trimming' : 'Trim Audio'}
          </Button>
          {/* Reset button only visible when not processing */}
          {!isProcessing && (
            <Button variant="outlined" onClick={handleReset} size="small">
              Reset
            </Button>
          )}
          {/* Add Stop button */}
          {isProcessing && (
            <Button color="error" variant='contained' onClick={handleStop} disabled={!isProcessing} size="small">
              Stop
            </Button>
          )}
          {downloadUrl && downloadSize !== null && (
            <Button color="success" variant='contained' onClick={handleDownload} size="small">
              Download ({formatBytes(downloadSize)})
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
    </Container>
  );
}

export default AudioTrim;