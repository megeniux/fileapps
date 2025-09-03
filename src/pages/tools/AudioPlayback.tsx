import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Icons
import SpeedIcon from '@mui/icons-material/Speed';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Components
import PerformanceInfoDialog from '../../components/PerformanceInfoDialog';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;
const ffmpegRef = { current: ffmpeg };


function AudioPlayback() {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(1);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false);

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
      setSpeed(1);
      setIsReversed(false);
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
      setSpeed(1);
      setIsReversed(false);
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
    setSpeed(1);
    setIsReversed(false);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleSpeedChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') setSpeed(value);
  };

  const handleProcess = async () => {
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
      const outputFileName = `${isReversed ? 'reversed_' : ''}speed_${speed}x_${inputFileName}`;
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));
      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message]);
        if (message.includes('size=')) {
          setProgress(prev => Math.min(prev + 5, 99));
        }
      };
      ffmpeg.on('log', logHandler);
      setStatus('Processing');
      // FFmpeg atempo filter supports 0.5-2.0, so for other speeds, chain filters
      // Handle reverse audio and speed change
      let args = ['-i', inputFileName];
      const effectiveSpeed = speed; // Always positive now

      if (isReversed) {
        if (effectiveSpeed !== 1) {
          // Reverse and change speed
          let filters = [];
          let s = effectiveSpeed;
          while (s > 2.0) {
            filters.push('atempo=2.0');
            s /= 2.0;
          }
          while (s < 0.5) {
            filters.push('atempo=0.5');
            s /= 0.5;
          }
          filters.push(`atempo=${s}`);
          args.push('-filter_complex', `${filters.join(',')},areverse`);
        } else {
          // Just reverse, no speed change
          args.push('-filter_complex', 'areverse');
        }
      } else if (effectiveSpeed !== 1) {
        // Just change speed, no reverse
        let s = effectiveSpeed;
        let filters = [];
        while (s > 2.0) {
          filters.push('atempo=2.0');
          s /= 2.0;
        }
        while (s < 0.5) {
          filters.push('atempo=0.5');
          s /= 0.5;
        }
        filters.push(`atempo=${s}`);
        args.push('-filter:a', filters.join(','));
      }
      args.push(outputFileName);
      await ffmpeg.exec(args);
      setStatus('Finalizing');
      setProgress(99.9);
      const data = await ffmpeg.readFile(outputFileName);
      const mimeType = file.type;
      const blob = new Blob([new Uint8Array(data as any)], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadSize(data.length);
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
      setProgress(100);
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err: any) {
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
      a.download = `${isReversed ? 'reversed_' : ''}speed_${speed}x_${file.name}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  };

  const handleStop = () => {
    ffmpegRef.current?.terminate?.();
    setIsProcessing(false);
    setStatus('Stopped');
    setProgress(0);
    setErrorMsg(null);
  };

  const handlePerformanceDialogOpen = () => {
    setIsPerformanceDialogOpen(true);
  };

  const handlePerformanceDialogClose = () => {
    setIsPerformanceDialogOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Audio Playback Speed Editor - Change Audio Speed Online Free</title>
        <meta name="description" content="Free online audio playback speed editor to change audio speed with pitch correction or reverse tracks completely. Export processed audio with no watermarks, 100% browser-based." />
        <meta name="keywords" content="audio speed editor, change audio speed, audio pitch correction, reverse audio, audio playback speed, free audio tools, audio tempo" />
        <meta property="og:title" content="Audio Playback Speed Editor - Change Audio Speed Online Free" />
        <meta property="og:description" content="Free online audio playback speed editor to change audio speed with pitch correction or reverse tracks completely. Export processed audio with no watermarks, 100% browser-based." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/audio-playback" />
        <link rel="canonical" href="https://fileapps.click/tools/audio-playback" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        <Card sx={{ p: 1.5 }} elevation={3}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <SpeedIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Audio Playback Speed Editor
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Change audio speed with pitch correction or reverse tracks completely. Export processed audio with no watermark — 100% browser-based.
            </Typography>
            {/* Upload & Preview area */}
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
                    Drag & drop an audio file here<br />or<br />Click to select
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    Supported: MP3, WAV, AAC, FLAC, OGG, and more
                  </Typography>
                </Box>
              ) : (
                <Box textAlign="center" width="100%">
                  <audio ref={audioRef} src={previewUrl || undefined} controls style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1000 }} />
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
                id="audio-playback-file-input"
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
            {/* Speed controls */}
            {file && (
              <Box sx={{ mb: 3, width: '100%' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Playback Speed: {speed}x {isReversed ? '(Reversed)' : ''}
                </Typography>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => setSpeed(prev => Math.max(0.1, Number((prev - 0.1).toFixed(1))))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider
                    value={speed}
                    min={-5}
                    max={5}
                    step={0.1}
                    onChange={handleSpeedChange}
                    valueLabelDisplay="auto"
                    disabled={isProcessing}
                    size="small"
                    sx={{ mx: 1, flex: 1 }}
                  />
                  <IconButton size="small" onClick={() => setSpeed(prev => Math.min(20, Number((prev + 0.1).toFixed(1))))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isReversed}
                      onChange={(e) => setIsReversed(e.target.checked)}
                      disabled={isProcessing}
                      size="small"
                    />
                  }
                  label={<Typography variant="subtitle2">Reverse audio</Typography>}
                  title="Use the checkbox to reverse audio. Speed adjustment applies to both normal and reversed audio. 1x is normal speed."
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
          </CardContent>
          <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={handleProcess} disabled={isProcessing || !file} size="small">
              {isProcessing ? 'Processing' : 'Process'}
            </Button>
            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset} size="small">
                Reset
              </Button>
            )}
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

          {isProcessing && (
            <Alert severity="info" sx={{ alignItems: 'center', mt: 2, py: 0 }}>
              <Typography variant='body2' component="p"> <strong>Feels Slow?</strong> - Be on this same tab! processing depends on your system performance. <Link color="info" sx={{ cursor: 'pointer' }} onClick={handlePerformanceDialogOpen}>Learn more</Link></Typography>
            </Alert>
          )}
        </Card>

        <PerformanceInfoDialog
          open={isPerformanceDialogOpen}
          onClose={handlePerformanceDialogClose}
        />

        {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
      </Container>
    </>
  );
}

export default AudioPlayback;
