import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';

// MUI imports
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';

// Icons
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

// Add a ref to keep track of the current ffmpeg instance for termination
const ffmpegRef = { current: ffmpeg };

const defaultState = {
  width: '',
  height: '',
  maintainAspectRatio: true,
  quality: 90,
  format: 'original'
};

export const description = "Resize images to specific dimensions while maintaining quality. Perfect for web and social media.";

function ImageResize() {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<string>(defaultState.width);
  const [height, setHeight] = useState<string>(defaultState.height);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(defaultState.maintainAspectRatio);
  const [quality, setQuality] = useState<number>(defaultState.quality);
  const [format, setFormat] = useState<string>(defaultState.format);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number, height: number } | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const selectedFile = event.target.files[0];
      // Check if it's an image file
      if (!selectedFile.type.startsWith('image/')) {
        setErrorMsg('Please select an image file.');
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setErrorMsg(null);
      setOriginalDimensions(null);

      // Reset dimensions
      setWidth('');
      setHeight('');

      // Set format to original by default
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
      if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fileExtension)) {
        setFormat(fileExtension === 'jpeg' ? 'jpg' : fileExtension);
      } else {
        setFormat('jpg'); // Default to jpg for unsupported formats
      }
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
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setDownloadUrl(null);
        setDownloadSize(null);
        setProgress(0);
        setStatus(null);
        setErrorMsg(null);
        setOriginalDimensions(null);
        setWidth('');
        setHeight('');
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
        if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fileExtension)) {
          setFormat(fileExtension === 'jpeg' ? 'jpg' : fileExtension);
        } else {
          setFormat('jpg');
        }
      } else {
        setErrorMsg('Please select an image file.');
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setOriginalDimensions(null);
    setWidth(defaultState.width);
    setHeight(defaultState.height);
    setFormat(defaultState.format);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const imgWidth = imageRef.current.naturalWidth;
      const imgHeight = imageRef.current.naturalHeight;
      setOriginalDimensions({ width: imgWidth, height: imgHeight });
      // Set width and height fields to original dimensions if not already set
      setWidth(String(imgWidth));
      setHeight(String(imgHeight));
    }
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = event.target.value;
    setWidth(newWidth);

    if (maintainAspectRatio && originalDimensions && newWidth) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newHeight = Math.round(parseInt(newWidth) / aspectRatio).toString();
      setHeight(newHeight);
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = event.target.value;
    setHeight(newHeight);

    if (maintainAspectRatio && originalDimensions && newHeight) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newWidth = Math.round(parseInt(newHeight) * aspectRatio).toString();
      setWidth(newWidth);
    }
  };

  const handleAspectRatioToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaintainAspectRatio(event.target.checked);
  };

  const handleFormatChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string || 'original');
  };

  const handleResize = async () => {
    if (!file) {
      setErrorMsg('Please select an image file.');
      return;
    }

    if (!width && !height) {
      setErrorMsg('Please specify at least one dimension (width or height).');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing');
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
      const fileExtension = format === 'original'
        ? inputFileName.split('.').pop()?.toLowerCase() || 'jpg'
        : format;
      const outputFileName = `resized_${inputFileName.replace(/\.[^/.]+$/, '')}.${fileExtension}`;

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      const logHandler = ({ message }: { message: string }) => {
        if (message.includes('frame=')) {
          setProgress(prev => Math.min(prev + 10, 99));
        }
      };

      ffmpeg.on('log', logHandler);

      setStatus('Resizing');

      // Build ffmpeg command
      const args = ['-i', inputFileName];

      // Add resize filter
      let filterComplex = '';
      if (width && height) {
        filterComplex = `scale=${width}:${height}`;
      } else if (width) {
        filterComplex = `scale=${width}:-1`;
      } else if (height) {
        filterComplex = `scale=-1:${height}`;
      }

      if (filterComplex) {
        args.push('-vf', filterComplex);
      }

      // Add quality settings
      if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
        args.push('-q:v', (Math.floor(31 - (quality * 0.31))).toString());
      } else if (fileExtension === 'png') {
        args.push('-compression_level', (Math.floor(10 - (quality * 0.1))).toString());
      } else if (fileExtension === 'webp') {
        args.push('-quality', quality.toString());
      }

      args.push(outputFileName);

      await ffmpeg.exec(args);

      setStatus('Finalizing');
      setProgress(99.9);

      const data = await ffmpeg.readFile(outputFileName);
      const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;
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
      // Only set errorMsg if not stopped
      if (status !== 'Stopped') {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && file) {
      const fileExtension = format === 'original'
        ? file.name.split('.').pop()?.toLowerCase() || 'jpg'
        : format;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `resized_${file.name.replace(/\.[^/.]+$/, '')}.${fileExtension}`;
      a.click();
    }
  };

  const handleStop = () => {
    ffmpegRef.current?.terminate?.();
    setIsProcessing(false);
    setStatus('Stopped');
    setProgress(0);
    setErrorMsg(null); // Clear error on stop
  };

  return (
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Card sx={{ px: 3, py: 3 }} elevation={3}>
        <CardContent sx={{ p: 0 }}>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Box display="flex" flexDirection="column" alignItems="center">
            <AspectRatioIcon sx={{ fontSize: 40, mb: 2 }} color="primary" />
            <Typography variant="h5" component="h1" gutterBottom>Image Resize</Typography>
            <Typography color="text.secondary" variant="body1" component="h2" align="center">
              Resize images to specific dimensions while maintaining quality.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          {/* Upload & Preview area, styled like VideoResize */}
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
            height={300}
            borderRadius={1}
            bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
            border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
            sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
          >
            {previewUrl ? (
              <img
                ref={imageRef}
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                onLoad={handleImageLoad}
              />
            ) : (
              <Box textAlign="center">
                <CloudUploadIcon sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Drag & drop an image here, or click to select
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Supported: JPG, PNG, WebP, GIF, and more
                </Typography>
              </Box>
            )}
            {/* Overlay file input */}
            <input
              accept="image/*"
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
              id="image-file-input"
              type="file"
              onChange={handleFileChange}
              tabIndex={-1}
            />
          </Box>
          {/* Filename and remove button, like VideoResize */}
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
              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={maintainAspectRatio}
                      onChange={handleAspectRatioToggle}
                      size="small"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" sx={{ mr: 1 }}>Maintain aspect ratio</Typography>
                      {maintainAspectRatio ? <LinkIcon fontSize="small" /> : <LinkOffIcon fontSize="small" />}
                    </Box>
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Width (pixels)"
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  disabled={isProcessing}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Height (pixels)"
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  disabled={isProcessing}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" gutterBottom>Quality: {quality}%</Typography>
                <Slider
                  value={quality}
                  onChange={(_, value) => setQuality(value as number)}
                  min={10}
                  max={100}
                  step={1}
                  disabled={isProcessing}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Output Format</InputLabel>
                  <Select
                    value={format}
                    onChange={handleFormatChange}
                    label="Output Format"
                    disabled={isProcessing}
                    size="small"
                  >
                    <MenuItem value="original">Original Format</MenuItem>
                    <MenuItem value="jpg">JPG</MenuItem>
                    <MenuItem value="png">PNG</MenuItem>
                    <MenuItem value="webp">WebP</MenuItem>
                    <MenuItem value="gif">GIF</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ display: !!file ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleResize} disabled={isProcessing || !file || (!width && !height)} size="small">
            {isProcessing ? 'Resizing' : 'Resize'}
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
          </Box>
        )}
      </Card>
    </Container>
  );
}

export default ImageResize;