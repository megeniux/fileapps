import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';

// MUI imports
import type { Theme } from '@emotion/react';
import { useTheme, type SxProps } from '@mui/material/styles';
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
import Tooltip from '@mui/material/Tooltip';

// Icons
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

// Add a ref to keep track of the current ffmpeg instance for termination
const ffmpegRef = { current: ffmpeg };

const defaultState = {
  width: '',
  height: '',
  maintainAspectRatio: true,
  quality: 90,
  format: 'original',
  crop: { x: 0, y: 0, w: 0, h: 0 },
  rotate: 0,
  grayscale: false,
  blur: 0,
  outputName: '',
  flipH: false,
  flipV: false,
  brightness: 100,
  contrast: 100,
  saturation: 100,
};

export const description = "Convert images to specific dimensions while maintaining quality. Perfect for web and social media.";

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
  const [crop, setCrop] = useState<{ x: number, y: number, w: number, h: number }>(defaultState.crop);
  const [rotate, setRotate] = useState<number>(defaultState.rotate);
  const [grayscale, setGrayscale] = useState<boolean>(defaultState.grayscale);
  const [blur, setBlur] = useState<number>(defaultState.blur);
  const [outputName, setOutputName] = useState<string>(defaultState.outputName);
  const [flipH, setFlipH] = useState<boolean>(defaultState.flipH);
  const [flipV, setFlipV] = useState<boolean>(defaultState.flipV);
  const [brightness, setBrightness] = useState<number>(defaultState.brightness);
  const [contrast, setContrast] = useState<number>(defaultState.contrast);
  const [saturation, setSaturation] = useState<number>(defaultState.saturation);
  const [cropStack, setCropStack] = useState<{ x: number, y: number, w: number, h: number }[]>([]);
  const [redoStack, setRedoStack] = useState<{ x: number, y: number, w: number, h: number }[]>([]);

  const imageRef = useRef<HTMLImageElement>(null);

  // For crop selection
  const [isSelectingCrop, setIsSelectingCrop] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number, y: number } | null>(null);
  const [drawingCrop, setDrawingCrop] = useState<{ x: number, y: number, w: number, h: number } | null>(null);

  // Helper to get displayed image size (for overlay scaling)
  const [displaySize, setDisplaySize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

  // Mouse/touch crop handlers
  const handleCropMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!originalDimensions) return;
    setIsSelectingCrop(true);
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.round((clientX - rect.left) * (originalDimensions.width / displaySize.width)));
    const y = Math.max(0, Math.round((clientY - rect.top) * (originalDimensions.height / displaySize.height)));
    setCropStart({ x, y });
    setDrawingCrop({ x, y, w: 0, h: 0 });
  };

  const handleCropMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isSelectingCrop || !cropStart || !originalDimensions) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    let x2 = Math.max(0, Math.round((clientX - rect.left) * (originalDimensions.width / displaySize.width)));
    let y2 = Math.max(0, Math.round((clientY - rect.top) * (originalDimensions.height / displaySize.height)));
    let x = Math.min(cropStart.x, x2);
    let y = Math.min(cropStart.y, y2);
    let w = Math.abs(x2 - cropStart.x);
    let h = Math.abs(y2 - cropStart.y);
    setDrawingCrop({ x, y, w, h });
  };

  const handleCropMouseUp = () => {
    if (isSelectingCrop && drawingCrop) {
      setIsSelectingCrop(false);
      setCropStack([...cropStack, crop]);
      setCrop(drawingCrop);
      setDrawingCrop(null);
      setRedoStack([]);
    }
  };

  const pushCrop = (newCrop: typeof crop) => {
    setCropStack([...cropStack, crop]);
    setCrop(newCrop);
    setRedoStack([]);
  };

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
      // Get displayed size for overlay scaling
      setTimeout(() => {
        if (imageRef.current) {
          setDisplaySize({
            width: imageRef.current.width,
            height: imageRef.current.height
          });
        }
      }, 0);
    }
  };

  const handleAspectRatioToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaintainAspectRatio(event.target.checked);
  };

  const handleFormatChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string || 'original');
  };

  const handleUndoCrop = () => {
    if (cropStack.length > 0) {
      setRedoStack([crop, ...redoStack]);
      setCrop(cropStack[cropStack.length - 1]);
      setCropStack(cropStack.slice(0, -1));
    }
  };

  const handleRedoCrop = () => {
    if (redoStack.length > 0) {
      setCropStack([...cropStack, crop]);
      setCrop(redoStack[0]);
      setRedoStack(redoStack.slice(1));
    }
  };

  const handleResetCrop = () => {
    setCrop(defaultState.crop);
    setCropStack([]);
    setRedoStack([]);
  };

  const handleOutputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputName(e.target.value);
  };

  const handleFlipH = () => setFlipH(f => !f);
  const handleFlipV = () => setFlipV(f => !f);
  const handleBrightnessChange = (_: any, v: number | number[]) => setBrightness(v as number);
  const handleContrastChange = (_: any, v: number | number[]) => setContrast(v as number);
  const handleSaturationChange = (_: any, v: number | number[]) => setSaturation(v as number);

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
      const outName = outputName
        ? `${outputName}.${fileExtension}`
        : `resized_${inputFileName.replace(/\.[^/.]+$/, '')}.${fileExtension}`;

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

      // Compose filters in correct order
      let filters: string[] = [];
      // Flip filters FIRST
      if (flipH) filters.push('hflip');
      if (flipV) filters.push('vflip');
      // Crop filter
      if (crop.w > 0 && crop.h > 0) {
        filters.push(`crop=${crop.w}:${crop.h}:${crop.x}:${crop.y}`);
      }
      // Resize filter
      if (width && height) {
        filters.push(`scale=${width}:${height}`);
      } else if (width) {
        filters.push(`scale=${width}:-1`);
      } else if (height) {
        filters.push(`scale=-1:${height}`);
      }
      // Rotate filter
      if (rotate) {
        filters.push(`rotate=${(rotate * Math.PI / 180).toFixed(4)}`);
      }
      // Grayscale
      if (grayscale) {
        filters.push('format=gray');
      }
      // Blur
      if (blur > 0) {
        filters.push(`boxblur=${blur}:1`);
      }
      // Brightness/contrast/saturation
      if (brightness !== 100 || contrast !== 100 || saturation !== 100) {
        filters.push(`eq=brightness=${(brightness - 100) / 100}:contrast=${contrast / 100}:saturation=${saturation / 100}`);
      }
      if (filters.length) {
        args.push('-vf', filters.join(','));
      }

      // Add quality settings
      if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
        args.push('-q:v', (Math.floor(31 - (quality * 0.31))).toString());
      } else if (fileExtension === 'png') {
        args.push('-compression_level', (Math.floor(10 - (quality * 0.1))).toString());
      } else if (fileExtension === 'webp') {
        args.push('-quality', quality.toString());
      }

      args.push(outName);

      await ffmpeg.exec(args);

      setStatus('Finalizing');
      setProgress(99.9);

      const data = await ffmpeg.readFile(outName);
      const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;
      const url = URL.createObjectURL(new Blob([data], { type: mimeType }));

      setDownloadUrl(url);
      setDownloadSize(data.length);

      // Clean up
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outName);

      setProgress(100);
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err: any) {
      setStatus('Failed');
      // Only set errorMsg if not stopped
      if (err.message !== 'called FFmpeg.terminate()') {
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
      const name = outputName
        ? `${outputName}.${fileExtension}`
        : `resized_${file.name.replace(/\.[^/.]+$/, '')}.${fileExtension}`;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = name;
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

  // Slider ranges
  const cropMax = originalDimensions ? Math.max(originalDimensions.width, originalDimensions.height) : 4096;
  const rotateMin = -180, rotateMax = 180;
  const blurMin = 0, blurMax = 10;

  return (
    <Container maxWidth="lg" sx={{ my: 'auto' }}>
      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
      <Card sx={{ p: 1.5 }} elevation={3}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center">
            <AspectRatioIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
              Convert Image
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
            Resize images to specific dimensions while maintaining quality.
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
            height={300}
            borderRadius={1}
            bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
            border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
            sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
          >
            {previewUrl ? (
              <Box sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  ref={imageRef}
                  src={previewUrl}
                  alt="Simulated Preview"
                  onLoad={handleImageLoad}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    width: 'auto',
                    height: 'auto',
                    display: 'block',
                    filter: `
                      ${grayscale ? 'grayscale(1)' : ''}
                      ${blur ? `blur(${blur}px)` : ''}
                      brightness(${brightness}%)
                      contrast(${contrast}%)
                      saturate(${saturation}%)
                    `,
                    transform: `
                      rotate(${rotate}deg)
                      scaleX(${flipH ? -1 : 1})
                      scaleY(${flipV ? -1 : 1})
                    `
                  } as React.CSSProperties}
                />
                {/* Crop selection overlay */}
                {originalDimensions && displaySize.width > 0 && displaySize.height > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0, top: 0, width: displaySize.width, height: displaySize.height,
                      pointerEvents: 'auto',
                      cursor: 'crosshair',
                      zIndex: 3,
                      background: isSelectingCrop ? 'rgba(0,0,0,0.05)' : 'transparent'
                    }}
                    onMouseDown={handleCropMouseDown}
                    onTouchStart={handleCropMouseDown}
                    onMouseMove={isSelectingCrop ? handleCropMouseMove : undefined}
                    onTouchMove={isSelectingCrop ? handleCropMouseMove : undefined}
                    onMouseUp={handleCropMouseUp}
                    onTouchEnd={handleCropMouseUp}
                  >
                    {/* Draw crop rectangle */}
                    {(drawingCrop && drawingCrop.w > 0 && drawingCrop.h > 0)
                      ? (
                        <div
                          style={{
                            position: 'absolute',
                            left: `${(drawingCrop.x / originalDimensions.width) * displaySize.width}px`,
                            top: `${(drawingCrop.y / originalDimensions.height) * displaySize.height}px`,
                            width: `${(drawingCrop.w / originalDimensions.width) * displaySize.width}px`,
                            height: `${(drawingCrop.h / originalDimensions.height) * displaySize.height}px`,
                            border: '2px dashed #1976d2',
                            background: 'rgba(25, 118, 210, 0.1)',
                            pointerEvents: 'none'
                          }}
                        />
                      )
                      : (crop.w > 0 && crop.h > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            left: `${(crop.x / originalDimensions.width) * displaySize.width}px`,
                            top: `${(crop.y / originalDimensions.height) * displaySize.height}px`,
                            width: `${(crop.w / originalDimensions.width) * displaySize.width}px`,
                            height: `${(crop.h / originalDimensions.height) * displaySize.height}px`,
                            border: '2px dashed #1976d2',
                            background: 'rgba(25, 118, 210, 0.1)',
                            pointerEvents: 'none'
                          }}
                        />
                      ))
                    }
                  </div>
                )}
              </Box>
            ) : (
              <Box textAlign="center">
                <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Drag & drop an image here<br/>or<br/>Click to select
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
              {/* Quality */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Quality: {quality}%</Typography>
                <Slider
                  value={quality}
                  onChange={(_, value) => setQuality(value as number)}
                  min={10}
                  max={100}
                  step={1}
                  disabled={isProcessing}
                  size="small"
                  valueLabelDisplay="auto"
                />
              </Grid>
              {/* Maintain aspect ratio */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
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
                      <Typography variant="body2" sx={{ mr: 1 }}>Lock ratio</Typography>
                      {maintainAspectRatio ? <LinkIcon fontSize="small" /> : <LinkOffIcon fontSize="small" />}
                    </Box>
                  }
                />
              </Grid>
              {/* Width */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Width (px): {width}</Typography>
                <Slider
                  value={Number(width) || 0}
                  min={1}
                  max={originalDimensions?.width || 4096}
                  step={1}
                  onChange={(_, v) => setWidth(String(v))}
                  disabled={isProcessing}
                  size="small"
                  valueLabelDisplay="auto"
                />
              </Grid>
              {/* Height */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Height (px): {height}</Typography>
                <Slider
                  value={Number(height) || 0}
                  min={1}
                  max={originalDimensions?.height || 4096}
                  step={1}
                  onChange={(_, v) => setHeight(String(v))}
                  disabled={isProcessing}
                  size="small"
                  valueLabelDisplay="auto"
                />
              </Grid>
              {/* Blur */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Blur: {blur}</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => setBlur(Math.max(blurMin, blur - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider
                    value={blur}
                    min={blurMin}
                    max={blurMax}
                    step={1}
                    onChange={(_, v) => setBlur(v as number)}
                    disabled={isProcessing}
                    size="small"
                    valueLabelDisplay="auto"
                    sx={{ mx: 1, flex: 1 }}
                  />
                  <IconButton size="small" onClick={() => setBlur(Math.min(blurMax, blur + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Brightness */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Brightness: {brightness}%</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => setBrightness(Math.max(0, brightness - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider value={brightness} onChange={handleBrightnessChange} min={0} max={200} step={1} disabled={isProcessing} size="small" valueLabelDisplay="auto" sx={{ mx: 1, flex: 1 }} />
                  <IconButton size="small" onClick={() => setBrightness(Math.min(200, brightness + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Contrast */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Contrast: {contrast}%</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => setContrast(Math.max(0, contrast - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider value={contrast} onChange={handleContrastChange} min={0} max={200} step={1} disabled={isProcessing} size="small" valueLabelDisplay="auto" sx={{ mx: 1, flex: 1 }} />
                  <IconButton size="small" onClick={() => setContrast(Math.min(200, contrast + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Saturation */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Saturation: {saturation}%</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => setSaturation(Math.max(0, saturation - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider value={saturation} onChange={handleSaturationChange} min={0} max={200} step={1} disabled={isProcessing} size="small" valueLabelDisplay="auto" sx={{ mx: 1, flex: 1 }} />
                  <IconButton size="small" onClick={() => setSaturation(Math.min(200, saturation + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Rotate */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2" noWrap>Rotate: {rotate}°</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => setRotate(Math.max(rotateMin, rotate - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider
                    value={rotate}
                    min={rotateMin}
                    max={rotateMax}
                    step={1}
                    onChange={(_, v) => setRotate(v as number)}
                    disabled={isProcessing}
                    size="small"
                    valueLabelDisplay="auto"
                    sx={{ mx: 1, flex: 1 }}
                  />
                  <IconButton size="small" onClick={() => setRotate(Math.min(rotateMax, rotate + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Flip Horizontal */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <FormControlLabel
                  control={<Switch checked={flipH} onChange={handleFlipH} size="small" disabled={isProcessing} />}
                  label={<Typography variant="body2">Flip Horizontal</Typography>}
                />
              </Grid>
              {/* Flip Vertical */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <FormControlLabel
                  control={<Switch checked={flipV} onChange={handleFlipV} size="small" disabled={isProcessing} />}
                  label={<Typography variant="body2">Flip Vertical</Typography>}
                />
              </Grid>
              {/* Grayscale */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={grayscale}
                      onChange={e => setGrayscale(e.target.checked)}
                      size="small"
                      disabled={isProcessing}
                    />
                  }
                  label={<Typography variant="body2">Grayscale</Typography>}
                />
              </Grid>
              {/* Output Filename */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <TextField
                  fullWidth
                  label="Output Filename (optional)"
                  value={outputName}
                  onChange={handleOutputNameChange}
                  size="small"
                  disabled={isProcessing}
                />
              </Grid>
              {/* Output Format */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
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
              {/* Crop Undo/Redo/Reset */}
              <Grid size={{ xs: 12, sm: 4, lg: 3 }} display="flex" alignItems="center" justifyContent="center" gap={1} mx="auto">
                <Tooltip title="Undo Crop"><IconButton onClick={handleUndoCrop} disabled={cropStack.length === 0}><UndoIcon /></IconButton></Tooltip>
                <Button onClick={handleResetCrop} size="small" sx={{ whiteSpace: 'nowrap' }}>Reset Crop</Button>
                <Tooltip title="Redo Crop"><IconButton onClick={handleRedoCrop} disabled={redoStack.length === 0}><RedoIcon /></IconButton></Tooltip>
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
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