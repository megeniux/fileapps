import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';
import { Helmet } from 'react-helmet-async';

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
import Tooltip from '@mui/material/Tooltip';

// Icons
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CropIcon from '@mui/icons-material/Crop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// FFmpeg instance ref (per run)
const ffmpegRef = { current: null as FFmpeg | null };

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

function ImageConvert() {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<string>(defaultState.width);
  const [height, setHeight] = useState<string>(defaultState.height);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(defaultState.maintainAspectRatio);
  const widthRef = useRef<string>(defaultState.width);
  const heightRef = useRef<string>(defaultState.height);
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

  // Keep the original file/preview so we can restore on Reset Crop
  const originalFileRef = useRef<File | null>(null);
  const originalPreviewUrlRef = useRef<string | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const applyTimerRef = useRef<number | null>(null);
  const applyCounterRef = useRef(0);
  // Keep the true original dimensions (base file) so reset/restore can use them
  const baseOriginalDimensionsRef = useRef<{ width: number, height: number } | null>(null);

  // Crop selection state
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
      setCrop(drawingCrop);
      setDrawingCrop(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const selectedFile = event.target.files[0];
      // Check if it's an image file
      if (!selectedFile.type.startsWith('image/')) {
        setErrorMsg('Please select an image file.');
        return;
      }

      // Revoke any existing working preview (not the original)
      if (previewUrl && previewUrl !== originalPreviewUrlRef.current) {
        try { URL.revokeObjectURL(previewUrl); } catch { }
      }

      // Set working and original references
      setFile(selectedFile);
      const nextUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(nextUrl);
      originalFileRef.current = selectedFile;
      originalPreviewUrlRef.current = nextUrl;
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setErrorMsg(null);
      setOriginalDimensions(null);
      // Default output name to the original file base (user can edit it)
      const base = (selectedFile.name || 'image').replace(/\.[^/.]+$/, '');
      setOutputName(base);

      // Reset dimensions and crop state
      setWidth('');
      setHeight('');
      widthRef.current = '';
      heightRef.current = '';
      setCrop(defaultState.crop);

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
        if (previewUrl && previewUrl !== originalPreviewUrlRef.current) {
          try { URL.revokeObjectURL(previewUrl); } catch { }
        }
        setFile(file);
        const nextUrl = URL.createObjectURL(file);
        setPreviewUrl(nextUrl);
        originalFileRef.current = file;
        originalPreviewUrlRef.current = nextUrl;
        setDownloadUrl(null);
        setDownloadSize(null);
        setProgress(0);
        setStatus(null);
        setErrorMsg(null);
        setOriginalDimensions(null);
        // Default output name to the original file base (user can edit it)
        const base = (file.name || 'image').replace(/\.[^/.]+$/, '');
        setOutputName(base);
        setWidth('');
        setHeight('');
        widthRef.current = '';
        heightRef.current = '';
        setCrop(defaultState.crop);
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
    // Revoke any working preview URL (and original)
    if (previewUrl) {
      try { URL.revokeObjectURL(previewUrl); } catch { }
    }
    if (originalPreviewUrlRef.current && originalPreviewUrlRef.current !== previewUrl) {
      try { URL.revokeObjectURL(originalPreviewUrlRef.current); } catch { }
    }
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
    widthRef.current = defaultState.width;
    heightRef.current = defaultState.height;
    setFormat(defaultState.format);
    setCrop(defaultState.crop);
    originalFileRef.current = null;
    originalPreviewUrlRef.current = null;
    setOutputName(defaultState.outputName);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      const imgWidth = imageRef.current.naturalWidth;
      const imgHeight = imageRef.current.naturalHeight;
      // Remember the base/original dimensions on first load
      if (!baseOriginalDimensionsRef.current) {
        baseOriginalDimensionsRef.current = { width: imgWidth, height: imgHeight };
      }
      // If no crop has been applied (originalDimensions not set), initialize it to the base dimensions
      if (!originalDimensions) {
        setOriginalDimensions({ width: imgWidth, height: imgHeight });
      }
      // Initialize width/height inputs only when empty
      if (!width) {
        setWidth(String(imgWidth));
        widthRef.current = String(imgWidth);
      }
      if (!height) {
        setHeight(String(imgHeight));
        heightRef.current = String(imgHeight);
      }
      // initialize dimension inputs
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


  // Aspect ratio is toggled via the IconButton in the UI

  // Width/height handlers for individual inputs
  const handleWidthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9]/g, '');
    if (maintainAspectRatio && originalDimensions && Number(v)) {
      const ratio = originalDimensions.width / originalDimensions.height;
      const computedH = Math.round(Number(v) / ratio);
      setWidth(v);
      setHeight(String(computedH));
      widthRef.current = v;
      heightRef.current = String(computedH);
    } else {
      setWidth(v);
      widthRef.current = v;
    }
    scheduleApply();
  };

  const handleHeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9]/g, '');
    if (maintainAspectRatio && originalDimensions && Number(v)) {
      const ratio = originalDimensions.width / originalDimensions.height;
      const computedW = Math.round(Number(v) * ratio);
      setHeight(v);
      setWidth(String(computedW));
      heightRef.current = v;
      widthRef.current = String(computedW);
    } else {
      setHeight(v);
      heightRef.current = v;
    }
    scheduleApply();
  };

  // Apply width/height to preview by drawing to canvas and replacing preview
  const applyDimensionsToPreview = async (runId?: number) => {
    if (!previewUrl || !file) return;
    // Read from refs so we always use latest typed values (avoid stale closures)
    const wNum = Number(widthRef.current);
    const hNum = Number(heightRef.current);
    if (!wNum && !hNum) return;

    const img = new Image();
    // Use the current working file as the source (guarantees full-resolution source and avoids cascading downsizes)
    const tempSrc = URL.createObjectURL(file);
    img.src = tempSrc;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image for resize'));
    });

    const canvas = document.createElement('canvas');
    canvas.width = wNum || img.naturalWidth;
    canvas.height = hNum || img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return;

    // If a newer scheduled run exists, abort this result
    if (runId != null && runId !== applyCounterRef.current) {
      // drop blob
      return;
    }

    // revoke any previous working preview URL (but keep originalPreviewUrlRef for reset)
    if (previewUrl && previewUrl !== originalPreviewUrlRef.current) {
      try { URL.revokeObjectURL(previewUrl); } catch { }
    }
    const nextUrl = URL.createObjectURL(blob);
    // Update preview only; do NOT overwrite the working `file` to avoid cascaded resizes
    setPreviewUrl(nextUrl);
    // Keep originalDimensions unchanged (so lock-ratio stays based on original/cropped source)
    // Ensure width/height fields reflect applied size
    setWidth(String(canvas.width));
    setHeight(String(canvas.height));
    widthRef.current = String(canvas.width);
    heightRef.current = String(canvas.height);
    // cleanup temporary source
    try { URL.revokeObjectURL(tempSrc); } catch { }
  };

  // debounce scheduler: waits 600ms after last change before applying
  const scheduleApply = () => {
    if (applyTimerRef.current) {
      window.clearTimeout(applyTimerRef.current);
    }
    applyCounterRef.current += 1;
    const myId = applyCounterRef.current;
    applyTimerRef.current = window.setTimeout(() => {
      applyDimensionsToPreview(myId).catch(() => { });
      applyTimerRef.current = null;
    }, 600);
  };

  // Cleanup on unmount: clear timer and revoke created preview URL if needed
  React.useEffect(() => {
    return () => {
      if (applyTimerRef.current) {
        window.clearTimeout(applyTimerRef.current);
      }
      if (previewUrl && previewUrl !== originalPreviewUrlRef.current) {
        try { URL.revokeObjectURL(previewUrl); } catch { }
      }
    };
  }, []);

  const handleFormatChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string || 'original');
  };

  // Apply crop by baking the selected crop into the working image/preview
  const handleApplyCrop = async () => {
    if (!previewUrl || !file || crop.w <= 0 || crop.h <= 0) return;
    // Load current preview image
    const img = new Image();
    img.src = previewUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image for cropping'));
    });

    const canvas = document.createElement('canvas');
    canvas.width = crop.w;
    canvas.height = crop.h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Draw the selected region from the current image
    ctx.drawImage(
      img,
      crop.x, crop.y, crop.w, crop.h,
      0, 0, crop.w, crop.h
    );

    const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return;

    // Revoke previous working preview URL (but keep original for reset)
    if (previewUrl && previewUrl !== originalPreviewUrlRef.current) {
      try { URL.revokeObjectURL(previewUrl); } catch { }
    }

    const nextUrl = URL.createObjectURL(blob);
    setPreviewUrl(nextUrl);
    // Update working "file" to the cropped image using a proper .png filename (content must match extension)
    const originalBase = (originalFileRef.current?.name || file.name || 'image').replace(/\.[^/.]+$/, '');
    const croppedFileName = `${originalBase}.png`;
    const croppedFile = new File([blob], croppedFileName, { type: 'image/png' });
    setFile(croppedFile);

    // Update dimensions and clear crop selection
    setOriginalDimensions({ width: crop.w, height: crop.h });
    setWidth(String(crop.w));
    setHeight(String(crop.h));
    setCrop(defaultState.crop);
  };

  const handleResetCrop = () => {
    // Restore original file and preview
    if (originalFileRef.current && originalPreviewUrlRef.current) {
      // Revoke current working preview URL if it differs from original
      if (previewUrl && previewUrl !== originalPreviewUrlRef.current) {
        try { URL.revokeObjectURL(previewUrl); } catch { }
      }
      setFile(originalFileRef.current);
      setPreviewUrl(originalPreviewUrlRef.current);
      setCrop(defaultState.crop);
      // Restore original dimensions from the base values
      if (baseOriginalDimensionsRef.current) {
        setOriginalDimensions(baseOriginalDimensionsRef.current);
      } else {
        setOriginalDimensions(null);
      }
      setDisplaySize({ width: 0, height: 0 });
    } else {
      setCrop(defaultState.crop);
    }
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
      // Create a fresh FFmpeg instance per run to reduce memory fragmentation
      const localFFmpeg = new FFmpeg();
      ffmpegRef.current = localFFmpeg;
      await localFFmpeg.load();

      const inputFileName = file.name;
      const fileExtension = format === 'original'
        ? inputFileName.split('.').pop()?.toLowerCase() || 'jpg'
        : format;
      const baseInputName = originalFileRef.current?.name || inputFileName;
      const baseNoExt = baseInputName.replace(/\.[^/.]+$/, '');
      // Default out name uses outputName when provided; otherwise use original base name.
      // Prevent writing output with the same name as the input (which causes FS collisions in wasm FS).
      let outName = outputName
        ? `${outputName}.${fileExtension}`
        : `${baseNoExt}.${fileExtension}`;
      if (outName === inputFileName) {
        outName = `${baseNoExt}_resized.${fileExtension}`;
      }

      try {
        await localFFmpeg.writeFile(inputFileName, await fetchFile(file));
      } catch (werr) {
        throw new Error(`Failed to write input file to FFmpeg FS: ${(werr as Error).message || String(werr)}`);
      }

      const logHandler = ({ message }: { message: string }) => {
        if (message.includes('frame=')) {
          setProgress(prev => Math.min(prev + 10, 99));
        }
      };

      localFFmpeg.on('log', logHandler);

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
      // FFmpeg's eq brightness is additive while CSS brightness is multiplicative. Use a lut to multiply RGB channels for brightness
      if (brightness !== 100) {
        const m = (brightness / 100).toFixed(3);
        // Use colorchannelmixer to multiply RGB channels (avoids quoting issues with lut expressions)
        filters.push(`colorchannelmixer=rr=${m}:gg=${m}:bb=${m}`);
      }
      // Use eq for contrast and saturation (multiplicative)
      const eqParts: string[] = [];
      if (contrast !== 100) eqParts.push(`contrast=${(contrast / 100).toFixed(3)}`);
      if (saturation !== 100) eqParts.push(`saturation=${(saturation / 100).toFixed(3)}`);
      if (eqParts.length) {
        filters.push(`eq=${eqParts.join(':')}`);
      }
      if (filters.length) {
        args.push('-vf', filters.join(','));
      }

      // Debug: surface filter list so users can see what will be applied
      const filterDebug = filters.length ? filters.join(',') : 'none';
      setStatus(`Resizing (filters: ${filterDebug})`);
      try { console.log('FFmpeg args:', args); } catch { }

      // Add quality settings
      if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
        args.push('-q:v', (Math.floor(31 - (quality * 0.31))).toString());
      } else if (fileExtension === 'png') {
        args.push('-compression_level', (Math.floor(10 - (quality * 0.1))).toString());
      } else if (fileExtension === 'webp') {
        // Use quantizer for WebP 0-100 where higher is better
        args.push('-q:v', quality.toString());
      }

      // Restrict threads to reduce wasm memory pressure
      args.push('-threads', '1');

      args.push(outName);

      await localFFmpeg.exec(args);

      setStatus('Finalizing');
      setProgress(99.9);

      const data = await localFFmpeg.readFile(outName);
      const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;
      const blob = new Blob([data.slice()], { type: mimeType });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadSize(data.length);

      // Clean up
      await localFFmpeg.deleteFile(inputFileName);
      await localFFmpeg.deleteFile(outName);

      setProgress(100);
      setStatus('Completed');
      localFFmpeg.off('log', logHandler);
    } catch (err: any) {
      setStatus('Failed');
      // Only set errorMsg if not stopped
      if (err.message !== 'called FFmpeg.terminate()') {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      }
    } finally {
      // Terminate to free memory
      try { ffmpegRef.current?.terminate?.(); } catch { }
      ffmpegRef.current = null;
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
        : `${file.name.replace(/\.[^/.]+$/, '')}.${fileExtension}`;
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
  const rotateMin = -180, rotateMax = 180;
  const blurMin = 0, blurMax = 10;

  return (
    <>
      <Helmet>
        <title>Image Converter & Editor - Convert JPG PNG WebP GIF Online Free</title>
        <meta name="description" content="Free online image converter and editor. Convert between JPG, PNG, WebP, GIF formats. Resize, crop, rotate, and apply filters to images. Local processing with no watermarks." />
        <meta name="keywords" content="image converter, photo editor, JPG to PNG, PNG to JPG, WebP converter, image resize, crop image, rotate image, free image tools" />
        <meta property="og:title" content="Image Converter & Editor - Convert JPG PNG WebP GIF Online Free" />
        <meta property="og:description" content="Free online image converter and editor. Convert between JPG, PNG, WebP, GIF formats. Resize, crop, rotate, and apply filters to images. Local processing with no watermarks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/image-convert" />
        <link rel="canonical" href="https://fileapps.click/tools/image-convert" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
      <Card sx={{ p: 1.5 }} elevation={3}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center">
            <AspectRatioIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
              Image Converter & Editor
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
            Convert, resize, crop, rotate, and apply filters to JPG, PNG, WebP, GIF images. Local processing in your browser — fast, secure, no watermark.
          </Typography>
          {/* Drag area (shown only before file is selected) */}
          {!file && (
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
              <Box textAlign="center">
                <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Drag & drop an image here<br />or<br />Click to select
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Supported: JPG, PNG, WebP, GIF, and more
                </Typography>
              </Box>
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
          )}

          {/* Converter workspace (appears after file is selected) */}
          {file && (
            <Box flex={1} minHeight={320} display="flex" alignItems="center" justifyContent="center" position="relative" bgcolor="action.hover" borderRadius={1}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <img
                  ref={imageRef}
                  src={previewUrl || ''}
                  alt="Preview"
                  onLoad={handleImageLoad}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 480,
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
            </Box>
          )}
          {/* Filename and remove button */}
          {file && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Typography variant="body2" noWrap>
                {file.name} ({formatBytes(file.size)})
              </Typography>
              {originalDimensions &&
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  ({originalDimensions.width}x{originalDimensions.height})
                </Typography>
              }
              <IconButton onClick={handleRemoveFile} color="error" sx={{ ml: 1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {/* Controls */}
          {file && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* Crop Apply/Reset */}
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} display="flex" alignItems="center" gap={1}>
                <Button
                  variant="contained"
                    
                  onClick={handleApplyCrop}
                  disabled={isProcessing || !(crop.w > 0 && crop.h > 0)}
                  sx={{ mr: 1 }}
                  fullWidth
                  startIcon={<CropIcon />}
                >
                  Crop
                </Button>
                <Button
                  variant='outlined'
                  onClick={handleResetCrop}
                  
                  sx={{ whiteSpace: 'nowrap' }}
                  disabled={isProcessing}
                  fullWidth
                  startIcon={<RestartAltIcon />}
                >
                  Reset
                </Button>
              </Grid>
              {/* Width & Height inputs + apply button */}
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} position="relative">
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Width (px)"
                    value={width}
                    onChange={handleWidthInput}
                    disabled={isProcessing}
                  />
                  {/* Aspect ratio lock */}
                  <Tooltip title={maintainAspectRatio ? 'Lock aspect ratio' : 'Unlock aspect ratio'}>
                    <span>
                      <IconButton
                        onClick={() => setMaintainAspectRatio(m => !m)}
                        disabled={isProcessing}
                        color={maintainAspectRatio ? 'primary' : 'default'}
                        aria-label={maintainAspectRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                      >
                        {maintainAspectRatio ? <LinkIcon fontSize="small" /> : <LinkOffIcon fontSize="small" />}
                      </IconButton>
                    </span>
                  </Tooltip>
                  <TextField
                    label="Height (px)"
                    value={height}
                    onChange={handleHeightInput}
                    disabled={isProcessing}
                  />
                </Box>
              </Grid>
              {/* Output Filename */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <TextField
                  label="Output Filename (optional)"
                  fullWidth
                  value={outputName}
                  onChange={handleOutputNameChange}
                  disabled={isProcessing}
                />
              </Grid>
              {/* Output Format */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Output Format</InputLabel>
                  <Select
                    value={format}
                    onChange={handleFormatChange}
                    label="Output Format"
                    disabled={isProcessing}
                    
                  >
                    <MenuItem value="original">Original Format</MenuItem>
                    <MenuItem value="jpg">JPG</MenuItem>
                    <MenuItem value="png">PNG</MenuItem>
                    <MenuItem value="webp">WebP</MenuItem>
                    <MenuItem value="gif">GIF</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Quality */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Quality: {quality}%</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => setQuality(Math.max(10, quality - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider
                    value={quality}
                    onChange={(_, value) => setQuality(value as number)}
                    min={10}
                    max={100}
                    step={1}
                    disabled={isProcessing}
                    
                    valueLabelDisplay="auto"
                    sx={{ mx: 1, flex: 1 }}
                  />
                  <IconButton onClick={() => setQuality(Math.min(100, quality + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Blur */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Blur: {blur}</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => setBlur(Math.max(blurMin, blur - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider
                    value={blur}
                    min={blurMin}
                    max={blurMax}
                    step={1}
                    onChange={(_, v) => setBlur(v as number)}
                    disabled={isProcessing}
                    
                    valueLabelDisplay="auto"
                    sx={{ mx: 1, flex: 1 }}
                  />
                  <IconButton onClick={() => setBlur(Math.min(blurMax, blur + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Brightness */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Brightness: {brightness}%</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => setBrightness(Math.max(0, brightness - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider value={brightness} onChange={handleBrightnessChange} min={0} max={200} step={1} disabled={isProcessing} valueLabelDisplay="auto" sx={{ mx: 1, flex: 1 }} />
                  <IconButton onClick={() => setBrightness(Math.min(200, brightness + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Contrast */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Contrast: {contrast}%</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => setContrast(Math.max(0, contrast - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider value={contrast} onChange={handleContrastChange} min={0} max={200} step={1} disabled={isProcessing} valueLabelDisplay="auto" sx={{ mx: 1, flex: 1 }} />
                  <IconButton onClick={() => setContrast(Math.min(200, contrast + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Saturation */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2">Saturation: {saturation}%</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => setSaturation(Math.max(0, saturation - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider value={saturation} onChange={handleSaturationChange} min={0} max={200} step={1} disabled={isProcessing} valueLabelDisplay="auto" sx={{ mx: 1, flex: 1 }} />
                  <IconButton onClick={() => setSaturation(Math.min(200, saturation + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Rotate */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <Typography variant="body2" noWrap>Rotate: {rotate}°</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => setRotate(Math.max(rotateMin, rotate - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                  <Slider
                    value={rotate}
                    min={rotateMin}
                    max={rotateMax}
                    step={1}
                    onChange={(_, v) => setRotate(v as number)}
                    disabled={isProcessing}
                    valueLabelDisplay="auto"
                    sx={{ mx: 1, flex: 1 }}
                  />
                  <IconButton onClick={() => setRotate(Math.min(rotateMax, rotate + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              {/* Flip Horizontal */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <FormControlLabel
                  control={<Switch checked={flipH} onChange={handleFlipH} disabled={isProcessing} />}
                  label={<Typography variant="body2">Flip Horizontal</Typography>}
                />
              </Grid>
              {/* Flip Vertical */}
              <Grid size={{ xs: 6, sm: 4, lg: 3 }}>
                <FormControlLabel
                  control={<Switch checked={flipV} onChange={handleFlipV} disabled={isProcessing} />}
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
                      disabled={isProcessing}
                    />
                  }
                  label={<Typography variant="body2">Grayscale</Typography>}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleResize} disabled={isProcessing || !file || (!width && !height)}>
            {isProcessing ? 'Resizing' : 'Resize'}
          </Button>
          {!isProcessing && (
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          )}
          {isProcessing && (
            <Button color="error" variant='contained' onClick={handleStop} disabled={!isProcessing}>
              Stop
            </Button>
          )}
          {downloadUrl && downloadSize !== null && (
            <Button color="success" variant='contained' onClick={handleDownload}>
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
      {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
    </Container>
    </>
  );
}

export default ImageConvert;