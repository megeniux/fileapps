import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';

// MUI
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// Icons
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

// Add a ref to keep track of the current ffmpeg instance for termination
const ffmpegRef = { current: ffmpeg };

const outputFormats = [
  { label: 'MP3 (High Quality)', value: 'mp3', bitrate: '320k' },
  { label: 'MP3 (Medium Quality)', value: 'mp3', bitrate: '192k' },
  { label: 'MP3 (Low Quality)', value: 'mp3', bitrate: '128k' },
  { label: 'WAV (Lossless)', value: 'wav', codec: 'pcm_s16le' },
  { label: 'AAC (High Quality)', value: 'aac', bitrate: '256k' },
  { label: 'AAC (Medium Quality)', value: 'aac', bitrate: '192k' },
  { label: 'OGG (Vorbis)', value: 'ogg', codec: 'libvorbis', bitrate: '192k' },
  { label: 'FLAC (Lossless)', value: 'flac', codec: 'flac' },
  { label: 'M4A (AAC)', value: 'm4a', codec: 'aac', bitrate: '256k' },
];

export const description = "Convert audio files between different formats like MP3, WAV, AAC, FLAC, and more. Fast and secure audio conversion with no quality loss.";

function AudioConvert() {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [outputQuality, setOutputQuality] = useState(1); // Index in the outputFormats array
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const selectedFile = event.target.files[0];
      // Check if it's an audio file
      if (!selectedFile.type.startsWith('audio/')) {
        setErrorMsg('Please select an audio file.');
        return;
      }
      
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
      setErrorMsg(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
  };

  const handleFormatChange = (event: any) => {
    setOutputFormat(event.target.value);
    // Find the first quality option for this format
    const formatOptions = outputFormats.filter(f => f.value === event.target.value);
    if (formatOptions.length > 0) {
      setOutputQuality(outputFormats.indexOf(formatOptions[0]));
    }
  };

  const handleQualityChange = (event: any) => {
    setOutputQuality(event.target.value);
  };

  const handleConvert = async () => {
    if (!file) {
      setErrorMsg('Please select an audio file.');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing');
    setConsoleLogs([]);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);

    try {
      if (!isFFmpegLoaded) {
        await ffmpeg.load();
        isFFmpegLoaded = true;
      }

      ffmpegRef.current = ffmpeg;

      const inputFileName = file.name;
      const selectedFormat = outputFormats[outputQuality];
      const outputExtension = selectedFormat.value;
      const outputFileName = `converted_${inputFileName.replace(/\.[^/.]+$/, '')}.${outputExtension}`;

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message]);
        if (message.includes('size=')) {
          setProgress(prev => Math.min(prev + 5, 99));
        }
      };
      
      ffmpeg.on('log', logHandler);

      setStatus('Converting');
      
      // Build ffmpeg command based on selected format and quality
      const args = ['-i', inputFileName];
      
      if (selectedFormat.codec) {
        args.push('-c:a', selectedFormat.codec);
      }
      
      if (selectedFormat.bitrate) {
        args.push('-b:a', selectedFormat.bitrate);
      }
      
      args.push(outputFileName);
      
      await ffmpeg.exec(args);
      
      setStatus('Finalizing');
      setProgress(99.9);
      
      const data = await ffmpeg.readFile(outputFileName);
      const mimeType = `audio/${outputExtension}`;
      const url = URL.createObjectURL(new Blob([data], { type: mimeType }));
      
      setDownloadUrl(url);
      setDownloadSize(data.length);
      
      // Clean up
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
      
      setProgress(100);
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err) {
      setStatus('Failed');
      setConsoleLogs(logs => [...logs, String(err)]);
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setStatus(null);
      }, 2000);
    }
  };

  // Update handleStop to terminate ffmpeg
  const handleStop = () => {
    ffmpegRef.current?.terminate?.();
    setIsProcessing(false);
    setStatus('Stopped');
    setProgress(0);
  };

  const handleDownload = () => {
    if (downloadUrl && file) {
      const selectedFormat = outputFormats[outputQuality];
      const outputExtension = selectedFormat.value;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `converted_${file.name.replace(/\.[^/.]+$/, '')}.${outputExtension}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  };

  // Add reset handler
  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
    setOutputFormat('mp3');
    setOutputQuality(1);
  };

  return (
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Card sx={{ px: 2, py: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Box display="flex" flexDirection="column" alignItems="center">
            <SwapHorizIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h5" gutterBottom>Audio Convert</Typography>
            <Typography variant="body1" align="center">
              Convert audio files to different formats with custom quality settings.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          {/* Upload area */}
          <Box
            onDragOver={e => { e.preventDefault(); setIsDragActive?.(true); }}
            onDragLeave={e => { e.preventDefault(); setIsDragActive?.(false); }}
            onDrop={e => {
              e.preventDefault();
              setIsDragActive?.(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const selectedFile = e.dataTransfer.files[0];
                if (!selectedFile.type.startsWith('audio/')) {
                  setErrorMsg('Please select an audio file.');
                  return;
                }
                setFile(selectedFile);
                setPreviewUrl(URL.createObjectURL(selectedFile));
                setDownloadUrl(null);
                setDownloadSize(null);
                setProgress(0);
                setStatus(null);
                setConsoleLogs([]);
                setErrorMsg(null);
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
            bgcolor={isDragActive ? 'primary.lighter' : 'divider'}
            border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
            mb={2}
            sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
          >
            {!file ? (
              <Box textAlign="center">
                <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body1">
                  Drag & drop an audio file here, or click to select
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Supported: MP3, WAV, AAC, FLAC, OGG, and more
                </Typography>
              </Box>
            ) : (
              <Box textAlign="center" width="100%">
                <audio ref={audioRef} src={previewUrl || undefined} controls style={{ width: '100%', maxWidth: 500 }} />
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
              id="audio-file-input"
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" gutterBottom>Output Format</Typography>
                <Select
                  fullWidth
                  value={outputFormat}
                  onChange={handleFormatChange}
                  disabled={isProcessing}
                  size="small"
                >
                  {Array.from(new Set(outputFormats.map(f => f.value))).map((format) => (
                    <MenuItem key={format} value={format}>
                      {format.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" gutterBottom>Quality</Typography>
                <Select
                  fullWidth
                  value={outputQuality}
                  onChange={handleQualityChange}
                  disabled={isProcessing}
                  size="small"
                >
                  {outputFormats
                    .filter(f => f.value === outputFormat)
                    .map((option, index) => (
                      <MenuItem key={index} value={outputFormats.indexOf(option)}>
                        {option.label.split('(')[1]?.replace(')', '') || option.label}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ display: !!file ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleConvert} disabled={isProcessing || !file} size="small">
            {isProcessing ? 'Converting' : 'Convert'}
          </Button>
          <Button variant="outlined" onClick={handleReset} disabled={isProcessing} size="small">
            Reset to Default
          </Button>
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

export default AudioConvert;