import { useState, useRef, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

// Types
import type { SelectChangeEvent } from '@mui/material/Select';
import type { CropArea, ImageDimensions } from './types';

// Constants
import { defaultState } from './constants';

// Utils
import { applyDimensionsToPreview, applyCropToImage } from './utils';

// FFmpeg instance ref (per run) - will be used when processing is added
const ffmpegRef = { current: null as any };

export function useImageConverter() {
  // File input ref for clearing value
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Core state
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
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [crop, setCrop] = useState<CropArea>(defaultState.crop);
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

  const applyTimerRef = useRef<number | null>(null);
  const applyCounterRef = useRef(0);
  // Keep the true original dimensions (base file) so reset/restore can use them
  const baseOriginalDimensionsRef = useRef<ImageDimensions | null>(null);

  // Crop selection state
  const [isSelectingCrop, setIsSelectingCrop] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number, y: number } | null>(null);
  const [drawingCrop, setDrawingCrop] = useState<CropArea | null>(null);

  // Helper to get displayed image size (for overlay scaling)
  const [displaySize, setDisplaySize] = useState<ImageDimensions>({ width: 0, height: 0 });

  // Mouse/touch crop handlers
  const handleCropMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!originalDimensions) return;
    setIsSelectingCrop(true);
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.round((clientX - rect.left) * (originalDimensions.width / displaySize.width)));
    const y = Math.max(0, Math.round((clientY - rect.top) * (originalDimensions.height / displaySize.height)));
    setCropStart({ x, y });
    setDrawingCrop({ x, y, w: 0, h: 0 });
  }, [originalDimensions, displaySize]);

  const handleCropMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isSelectingCrop || !cropStart || !originalDimensions) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x2 = Math.max(0, Math.round((clientX - rect.left) * (originalDimensions.width / displaySize.width)));
    const y2 = Math.max(0, Math.round((clientY - rect.top) * (originalDimensions.height / displaySize.height)));
    const x = Math.min(cropStart.x, x2);
    const y = Math.min(cropStart.y, y2);
    const w = Math.abs(x2 - cropStart.x);
    const h = Math.abs(y2 - cropStart.y);
    setDrawingCrop({ x, y, w, h });
  }, [isSelectingCrop, cropStart, originalDimensions, displaySize]);

  const handleCropMouseUp = useCallback(() => {
    if (isSelectingCrop && drawingCrop) {
      setIsSelectingCrop(false);
      setCrop(drawingCrop);
      setDrawingCrop(null);
    }
  }, [isSelectingCrop, drawingCrop]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [previewUrl]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
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
  }, [previewUrl]);

  const handleRemoveFile = useCallback(() => {
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
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
  }, [previewUrl]);

  const handleReset = useCallback(() => {
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Reset all state to defaults
    setFile(null);
    setPreviewUrl(null);
    setWidth(defaultState.width);
    setHeight(defaultState.height);
    setMaintainAspectRatio(defaultState.maintainAspectRatio);
    setQuality(defaultState.quality);
    setFormat(defaultState.format);
    setErrorMsg(null);
    setIsProcessing(false);
    setProgress(0);
    setStatus(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setOriginalDimensions(null);
    setIsDragActive(false);
    setCrop(defaultState.crop);
    setRotate(defaultState.rotate);
    setGrayscale(defaultState.grayscale);
    setBlur(defaultState.blur);
    setOutputName(defaultState.outputName);
    setFlipH(defaultState.flipH);
    setFlipV(defaultState.flipV);
    setBrightness(defaultState.brightness);
    setContrast(defaultState.contrast);
    setSaturation(defaultState.saturation);
    
    // Reset refs
    widthRef.current = defaultState.width;
    heightRef.current = defaultState.height;
    originalFileRef.current = null;
    originalPreviewUrlRef.current = null;
    baseOriginalDimensionsRef.current = null;
    
    // Terminate any running ffmpeg and reset state
    if (ffmpegRef.current) {
      try { ffmpegRef.current.terminate(); } catch { }
      ffmpegRef.current = null;
    }
  }, []);

  const handleImageLoad = useCallback(() => {
    // This will be called from ImagePreview component
    if (!baseOriginalDimensionsRef.current && originalDimensions) {
      baseOriginalDimensionsRef.current = originalDimensions;
    }
    if (!originalDimensions && baseOriginalDimensionsRef.current) {
      setOriginalDimensions(baseOriginalDimensionsRef.current);
    }
    if (!width && originalDimensions) {
      setWidth(String(originalDimensions.width));
      widthRef.current = String(originalDimensions.width);
    }
    if (!height && originalDimensions) {
      setHeight(String(originalDimensions.height));
      heightRef.current = String(originalDimensions.height);
    }
  }, [originalDimensions, width, height]);

  // Continue with more handlers...
  
  // Width/height handlers for individual inputs
  const handleWidthInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [maintainAspectRatio, originalDimensions]);

  const handleHeightInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [maintainAspectRatio, originalDimensions]);

  // Debounced apply for dimensions
  const scheduleApply = useCallback(() => {
    if (applyTimerRef.current) {
      window.clearTimeout(applyTimerRef.current);
    }
    applyCounterRef.current += 1;
    const myId = applyCounterRef.current;
    applyTimerRef.current = window.setTimeout(async () => {
      if (!previewUrl || !file) return;
      try {
        const result = await applyDimensionsToPreview(
          previewUrl,
          file,
          widthRef,
          heightRef,
          myId,
          applyCounterRef
        );
        if (result && myId === applyCounterRef.current) {
          // Revoke previous working preview URL (but keep originalPreviewUrlRef for reset)
          if (previewUrl && previewUrl !== originalPreviewUrlRef.current) {
            try { URL.revokeObjectURL(previewUrl); } catch { }
          }
          const nextUrl = URL.createObjectURL(result.blob);
          setPreviewUrl(nextUrl);
          setWidth(String(result.width));
          setHeight(String(result.height));
          widthRef.current = String(result.width);
          heightRef.current = String(result.height);
        }
      } catch (error) {
        console.error('Error applying dimensions:', error);
      }
      applyTimerRef.current = null;
    }, 600);
  }, [previewUrl, file]);

  const handleFormatChange = useCallback((event: SelectChangeEvent) => {
    setFormat(event.target.value as string || 'original');
  }, []);

  // Apply crop by baking the selected crop into the working image/preview
  const handleApplyCrop = useCallback(async () => {
    if (!previewUrl || !file || crop.w <= 0 || crop.h <= 0) return;
    try {
      const result = await applyCropToImage(previewUrl, crop);
      if (!result) return;

      // Revoke previous working preview URL (but keep original for reset)
      if (previewUrl && previewUrl !== originalPreviewUrlRef.current) {
        try { URL.revokeObjectURL(previewUrl); } catch { }
      }

      const nextUrl = URL.createObjectURL(result.blob);
      setPreviewUrl(nextUrl);
      
      // Update working "file" to the cropped image using a proper .png filename
      const originalBase = (originalFileRef.current?.name || file.name || 'image').replace(/\.[^/.]+$/, '');
      const croppedFileName = `${originalBase}.png`;
      const croppedFile = new File([result.blob], croppedFileName, { type: 'image/png' });
      setFile(croppedFile);

      // Update dimensions and clear crop selection
      setOriginalDimensions({ width: result.width, height: result.height });
      setWidth(String(result.width));
      setHeight(String(result.height));
      setCrop(defaultState.crop);
    } catch (error) {
      setErrorMsg(`Failed to apply crop: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [previewUrl, file, crop]);

  const handleResetCrop = useCallback(() => {
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
  }, [previewUrl]);

  // Simple handlers
  const handleOutputNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputName(e.target.value);
  }, []);

  const handleFlipH = useCallback(() => setFlipH(f => !f), []);
  const handleFlipV = useCallback(() => setFlipV(f => !f), []);
  const handleBrightnessChange = useCallback((_: any, v: number | number[]) => setBrightness(v as number), []);
  const handleContrastChange = useCallback((_: any, v: number | number[]) => setContrast(v as number), []);
  const handleSaturationChange = useCallback((_: any, v: number | number[]) => setSaturation(v as number), []);

  // Image conversion function
  const handleConvert = useCallback(async () => {
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
        outName = `${baseNoExt}_converted.${fileExtension}`;
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

      setStatus('Converting');

      // Build ffmpeg command
      const args = ['-i', inputFileName];

      // Compose filters in correct order
      const filters: string[] = [];
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
      setStatus(`Converting (filters: ${filterDebug})`);
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
  }, [file, width, height, format, outputName, originalFileRef, crop, flipH, flipV, rotate, grayscale, blur, brightness, contrast, saturation, quality, setErrorMsg, setIsProcessing, setProgress, setStatus, setDownloadUrl, setDownloadSize]);

  const handleStop = useCallback(() => {
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate();
      ffmpegRef.current = null; // Clear the FFmpeg instance
    }
    setIsProcessing(false);
    setStatus('Stopped');
    setTimeout(() => {
      setStatus(null);
    }, 2000);
    setProgress(0);
    setErrorMsg(null); // Clear error on stop
  }, [setIsProcessing, setStatus, setProgress, setErrorMsg]);

  return {
    // State
    file,
    previewUrl,
    width,
    height,
    maintainAspectRatio,
    quality,
    format,
    errorMsg,
    isProcessing,
    progress,
    status,
    downloadUrl,
    downloadSize,
    originalDimensions,
    isDragActive,
    crop,
    rotate,
    grayscale,
    blur,
    outputName,
    flipH,
    flipV,
    brightness,
    contrast,
    saturation,
    isSelectingCrop,
    cropStart,
    drawingCrop,
    displaySize,

    // Setters for simple state
    setIsDragActive,
    setDisplaySize,
    setWidth,
    setHeight,
    setMaintainAspectRatio,
    setQuality,
    setBlur,
    setBrightness,
    setContrast,
    setSaturation,
    setRotate,
    setFlipH,
    setFlipV,
    setGrayscale,
    setOutputName,
    setFormat,
    setIsProcessing,
    setOriginalDimensions,

    // Event handlers
    handleFileChange,
    handleCropMouseDown,
    handleCropMouseMove,
    handleCropMouseUp,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveFile,
    handleReset,
    handleImageLoad,
    handleWidthInput,
    handleHeightInput,
    handleFormatChange,
    handleApplyCrop,
    handleResetCrop,
    handleOutputNameChange,
    handleFlipH,
    handleFlipV,
    handleBrightnessChange,
    handleContrastChange,
    handleSaturationChange,
    handleConvert,
    handleStop,

    // Refs for complex logic
    widthRef,
    heightRef,
    originalFileRef,
    originalPreviewUrlRef,
    baseOriginalDimensionsRef,
    applyTimerRef,
    applyCounterRef,
    ffmpegRef,
    fileInputRef
  };
}
