import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

// Apply width/height to preview by drawing to canvas and replacing preview
export const applyDimensionsToPreview = async (
  previewUrl: string,
  file: File,
  widthRef: React.MutableRefObject<string>,
  heightRef: React.MutableRefObject<string>,
  runId?: number,
  applyCounterRef?: React.MutableRefObject<number>
) => {
  if (!previewUrl || !file) return null;
  
  // Read from refs so we always use latest typed values (avoid stale closures)
  const wNum = Number(widthRef.current);
  const hNum = Number(heightRef.current);
  if (!wNum && !hNum) return null;

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
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!blob) return null;

  // If a newer scheduled run exists, abort this result
  if (runId != null && applyCounterRef && runId !== applyCounterRef.current) {
    return null;
  }

  // cleanup temporary source
  try { URL.revokeObjectURL(tempSrc); } catch { }
  
  return {
    blob,
    width: canvas.width,
    height: canvas.height
  };
};

// Apply crop by baking the selected crop into the working image/preview
export const applyCropToImage = async (
  previewUrl: string,
  crop: { x: number; y: number; w: number; h: number }
) => {
  if (!previewUrl || crop.w <= 0 || crop.h <= 0) return null;
  
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
  if (!ctx) return null;
  
  // Draw the selected region from the current image
  ctx.drawImage(
    img,
    crop.x, crop.y, crop.w, crop.h,
    0, 0, crop.w, crop.h
  );

  const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!blob) return null;

  return {
    blob,
    width: crop.w,
    height: crop.h
  };
};

// Process image with FFmpeg
export const processImageWithFFmpeg = async (
  file: File,
  settings: {
    width: string;
    height: string;
    format: string;
    outputName: string;
    quality: number;
    crop: { x: number; y: number; w: number; h: number };
    rotate: number;
    grayscale: boolean;
    blur: number;
    flipH: boolean;
    flipV: boolean;
    brightness: number;
    contrast: number;
    saturation: number;
  },
  onProgress: (progress: number) => void,
  onStatus: (status: string) => void
) => {
  // Create a fresh FFmpeg instance per run to reduce memory fragmentation
  const localFFmpeg = new FFmpeg();
  await localFFmpeg.load();

  const inputFileName = file.name;
  const fileExtension = settings.format === 'original'
    ? inputFileName.split('.').pop()?.toLowerCase() || 'jpg'
    : settings.format;
  const baseInputName = file.name;
  const baseNoExt = baseInputName.replace(/\.[^/.]+$/, '');
  // Default out name uses outputName when provided; otherwise use original base name.
  // Prevent writing output with the same name as the input (which causes FS collisions in wasm FS).
  let outName = settings.outputName
    ? `${settings.outputName}.${fileExtension}`
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
      onProgress(99);
    }
  };

  localFFmpeg.on('log', logHandler);

  onStatus('Resizing');

  // Build ffmpeg command
  const args = ['-i', inputFileName];

  // Compose filters in correct order
  const filters: string[] = [];
  // Flip filters FIRST
  if (settings.flipH) filters.push('hflip');
  if (settings.flipV) filters.push('vflip');
  // Crop filter
  if (settings.crop.w > 0 && settings.crop.h > 0) {
    filters.push(`crop=${settings.crop.w}:${settings.crop.h}:${settings.crop.x}:${settings.crop.y}`);
  }
  // Resize filter
  if (settings.width && settings.height) {
    filters.push(`scale=${settings.width}:${settings.height}`);
  } else if (settings.width) {
    filters.push(`scale=${settings.width}:-1`);
  } else if (settings.height) {
    filters.push(`scale=-1:${settings.height}`);
  }
  // Rotate filter
  if (settings.rotate) {
    filters.push(`rotate=${(settings.rotate * Math.PI / 180).toFixed(4)}`);
  }
  // Grayscale
  if (settings.grayscale) {
    filters.push('format=gray');
  }
  // Blur
  if (settings.blur > 0) {
    filters.push(`boxblur=${settings.blur}:1`);
  }
  // Brightness/contrast/saturation
  // FFmpeg's eq brightness is additive while CSS brightness is multiplicative. Use a lut to multiply RGB channels for brightness
  if (settings.brightness !== 100) {
    const m = (settings.brightness / 100).toFixed(3);
    // Use colorchannelmixer to multiply RGB channels (avoids quoting issues with lut expressions)
    filters.push(`colorchannelmixer=rr=${m}:gg=${m}:bb=${m}`);
  }
  // Use eq for contrast and saturation (multiplicative)
  const eqParts: string[] = [];
  if (settings.contrast !== 100) eqParts.push(`contrast=${(settings.contrast / 100).toFixed(3)}`);
  if (settings.saturation !== 100) eqParts.push(`saturation=${(settings.saturation / 100).toFixed(3)}`);
  if (eqParts.length) {
    filters.push(`eq=${eqParts.join(':')}`);
  }
  if (filters.length) {
    args.push('-vf', filters.join(','));
  }

  // Debug: surface filter list so users can see what will be applied
  const filterDebug = filters.length ? filters.join(',') : 'none';
  onStatus(`Resizing (filters: ${filterDebug})`);

  // Add quality settings
  if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
    args.push('-q:v', (Math.floor(31 - (settings.quality * 0.31))).toString());
  } else if (fileExtension === 'png') {
    args.push('-compression_level', (Math.floor(10 - (settings.quality * 0.1))).toString());
  } else if (fileExtension === 'webp') {
    // Use quantizer for WebP 0-100 where higher is better
    args.push('-q:v', settings.quality.toString());
  }

  // Restrict threads to reduce wasm memory pressure
  args.push('-threads', '1');
  args.push(outName);

  await localFFmpeg.exec(args);

  onStatus('Finalizing');
  onProgress(99.9);

  const data = await localFFmpeg.readFile(outName);
  const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;
  const blob = new Blob([data.slice()], { type: mimeType });

  // Clean up
  await localFFmpeg.deleteFile(inputFileName);
  await localFFmpeg.deleteFile(outName);
  localFFmpeg.off('log', logHandler);

  // Terminate to free memory
  try { 
    localFFmpeg.terminate?.(); 
  } catch { }

  return {
    blob,
    data,
    mimeType,
    fileName: outName
  };
};
