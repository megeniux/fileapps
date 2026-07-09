/**
 * Browser-native image processing via Canvas / OffscreenCanvas.
 * No FFmpeg, no wasm - fast processing for common image formats.
 *
 * Supported output formats: jpeg, png, webp, avif
 * Unsupported (need FFmpeg): gif, bmp, tiff
 */

export type CanvasFormat = "jpeg" | "png" | "webp" | "avif";

const CANVAS_MIME: Record<CanvasFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

export function normalizeFormatExt(ext: string): string {
  return ext.toLowerCase() === "jpg" ? "jpeg" : ext.toLowerCase();
}

export function outputExt(format: string): string {
  return normalizeFormatExt(format) === "jpeg" ? "jpg" : normalizeFormatExt(format);
}

export function isBrowserFormat(fmt: string): fmt is CanvasFormat {
  return normalizeFormatExt(fmt) in CANVAS_MIME;
}

export interface BrowserImageOptions {
  outputFormat: string;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  exactWidth?: number;
  exactHeight?: number;
  maintainAspect?: boolean;
}

export interface BrowserImageResult {
  data: Uint8Array;
  mime: string;
  ext: string;
  width: number;
  height: number;
  originalSize: number;
}

export async function processBrowserImageBlob(
  source: Blob,
  sourceSize: number,
  options: BrowserImageOptions,
  onProgress?: (pct: number) => void,
): Promise<BrowserImageResult> {
  onProgress?.(5);

  const normFmt = normalizeFormatExt(options.outputFormat);
  if (!isBrowserFormat(normFmt)) {
    throw new Error(
      `Format .${options.outputFormat} is not supported for browser-native processing. ` +
        "Use JPEG, PNG, WebP, or AVIF instead.",
    );
  }

  const mime = CANVAS_MIME[normFmt as CanvasFormat];
  const quality = (options.quality ?? 90) / 100;
  const fileExt = outputExt(options.outputFormat);

  onProgress?.(15);
  const bitmap = await createImageBitmap(source);
  onProgress?.(40);

  let outW = bitmap.width;
  let outH = bitmap.height;

  if (options.exactWidth && options.exactHeight && options.maintainAspect === false) {
    outW = options.exactWidth;
    outH = options.exactHeight;
  } else if (options.exactWidth) {
    const scale = options.exactWidth / bitmap.width;
    outW = options.exactWidth;
    outH = Math.round(bitmap.height * scale);
  } else if (options.maxWidth || options.maxHeight) {
    const mw = options.maxWidth ?? Infinity;
    const mh = options.maxHeight ?? Infinity;
    if (bitmap.width > mw || bitmap.height > mh) {
      const scale = Math.min(mw / bitmap.width, mh / bitmap.height);
      outW = Math.round(bitmap.width * scale);
      outH = Math.round(bitmap.height * scale);
    }
  }

  onProgress?.(55);
  const canvas = new OffscreenCanvas(outW, outH);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("OffscreenCanvas 2D context unavailable in this browser.");
  }

  if (normFmt === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outW, outH);
  }

  ctx.drawImage(bitmap, 0, 0, outW, outH);
  bitmap.close();

  onProgress?.(75);
  const blob = await canvas.convertToBlob({ type: mime, quality });
  const arrayBuffer = await blob.arrayBuffer();
  onProgress?.(100);

  return {
    data: new Uint8Array(arrayBuffer),
    mime,
    ext: fileExt,
    width: outW,
    height: outH,
    originalSize: sourceSize,
  };
}

export async function processBrowserImage(
  file: File,
  options: BrowserImageOptions,
  onProgress?: (pct: number) => void,
): Promise<BrowserImageResult> {
  return processBrowserImageBlob(file, file.size, options, onProgress);
}
