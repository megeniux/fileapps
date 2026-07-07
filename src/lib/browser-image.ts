/**
 * Browser-native image processing via Canvas / OffscreenCanvas.
 * No FFmpeg, no wasm — instant processing for common formats.
 *
 * Supported output formats: jpeg, png, webp, avif
 * Unsupported (need FFmpeg): gif, bmp, tiff
 */

export type CanvasFormat = "jpeg" | "png" | "webp" | "avif";

const CANVAS_MIME: Record<CanvasFormat, string> = {
  jpeg: "image/jpeg",
  png:  "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

/** Normalise user-supplied extension to a canonical key. */
export function normalizeFormatExt(ext: string): string {
  return ext.toLowerCase() === "jpg" ? "jpeg" : ext.toLowerCase();
}

/** Return the file extension to use in the output filename. */
export function outputExt(format: string): string {
  return normalizeFormatExt(format) === "jpeg" ? "jpg" : normalizeFormatExt(format);
}

/** True when the browser Canvas API can encode this format. */
export function isBrowserFormat(fmt: string): fmt is CanvasFormat {
  return normalizeFormatExt(fmt) in CANVAS_MIME;
}

// ─── Options ─────────────────────────────────────────────────────────────────

export interface BrowserImageOptions {
  /** Output format extension, e.g. "webp", "jpg", "png", "avif" */
  outputFormat: string;
  /** Encoding quality 0–100 (ignored for PNG lossless). Default 90. */
  quality?: number;
  /** If set together with maxHeight, cap the image without upscaling. */
  maxWidth?: number;
  maxHeight?: number;
  /** Scale to an exact width, keeping aspect ratio. */
  exactWidth?: number;
  /** Exact width AND height — only used when maintainAspect is false. */
  exactHeight?: number;
  /** When true (default) resize preserves aspect ratio. */
  maintainAspect?: boolean;
}

export interface BrowserImageResult {
  data: Uint8Array;
  mime: string;
  /** Extension without dot, e.g. "jpg" */
  ext: string;
  width: number;
  height: number;
  originalSize: number;
}

// ─── Core processor ──────────────────────────────────────────────────────────

export async function processBrowserImage(
  file: File,
  options: BrowserImageOptions,
  onProgress?: (pct: number) => void,
): Promise<BrowserImageResult> {
  onProgress?.(5);

  const normFmt = normalizeFormatExt(options.outputFormat);
  if (!isBrowserFormat(normFmt)) {
    throw new Error(
      `Format .${options.outputFormat} is not supported for browser-native processing. ` +
      `Use JPEG, PNG, WebP, or AVIF instead.`,
    );
  }

  const mime    = CANVAS_MIME[normFmt as CanvasFormat];
  const quality = (options.quality ?? 90) / 100;
  const fileExt = outputExt(options.outputFormat);

  // ── Decode ──────────────────────────────────────────────────────────────
  onProgress?.(15);
  const bitmap = await createImageBitmap(file);
  onProgress?.(40);

  // ── Compute output size ─────────────────────────────────────────────────
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
    const mw = options.maxWidth  ?? Infinity;
    const mh = options.maxHeight ?? Infinity;
    if (bitmap.width > mw || bitmap.height > mh) {
      const scale = Math.min(mw / bitmap.width, mh / bitmap.height);
      outW = Math.round(bitmap.width  * scale);
      outH = Math.round(bitmap.height * scale);
    }
  }

  // ── Draw ─────────────────────────────────────────────────────────────────
  onProgress?.(55);
  const canvas = new OffscreenCanvas(outW, outH);
  const ctx    = canvas.getContext("2d");
  if (!ctx) throw new Error("OffscreenCanvas 2D context unavailable in this browser.");

  // JPEG has no alpha channel — fill white so transparent PNGs don't go black.
  if (normFmt === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outW, outH);
  }

  ctx.drawImage(bitmap, 0, 0, outW, outH);
  bitmap.close();

  // ── Encode ───────────────────────────────────────────────────────────────
  onProgress?.(75);
  const blob        = await canvas.convertToBlob({ type: mime, quality });
  const arrayBuffer = await blob.arrayBuffer();
  onProgress?.(100);

  return {
    data:         new Uint8Array(arrayBuffer),
    mime,
    ext:          fileExt,
    width:        outW,
    height:       outH,
    originalSize: file.size,
  };
}
