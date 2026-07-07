import type { ToolId, ToolPageConfig } from "@/lib/tool-types";
import { FILE_SIZE_LIMITS } from "@/lib/constants";

const videoFormats = [
  { value: "mp4", label: "MP4 (H.264)" },
  { value: "webm", label: "WebM (VP9)" },
  { value: "avi", label: "AVI (Xvid)" },
  { value: "mkv", label: "MKV (Matroska)" },
  { value: "mov", label: "MOV (QuickTime)" },
  { value: "flv", label: "FLV (Flash Video)" },
  { value: "wmv", label: "WMV (Windows Media)" },
  { value: "m4v", label: "M4V (iTunes)" },
];

const audioFormats = [
  { value: "mp3", label: "MP3" },
  { value: "wav", label: "WAV" },
  { value: "aac", label: "AAC" },
  { value: "ogg", label: "OGG (Vorbis)" },
  { value: "flac", label: "FLAC (Lossless)" },
  { value: "m4a", label: "M4A (AAC)" },
  { value: "wma", label: "WMA" },
];

const imageFormats = [
  { value: "jpg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "gif", label: "GIF" },
  { value: "bmp", label: "BMP" },
  { value: "tiff", label: "TIFF" },
  { value: "avif", label: "AVIF" },
];

const qualities = [
  { value: "18", label: "High Quality (CRF 18)" },
  { value: "23", label: "Medium Quality (CRF 23)" },
  { value: "28", label: "Low Quality (CRF 28)" },
];

const resolutions = [
  { value: "original", label: "Keep Original" },
  { value: "3840x2160", label: "4K (3840x2160)" },
  { value: "1920x1080", label: "1080p (1920x1080)" },
  { value: "1280x720", label: "720p (1280x720)" },
  { value: "854x480", label: "480p (854x480)" },
];

const audioBitrates = [
  { value: "320", label: "320 kbps (Highest)" },
  { value: "256", label: "256 kbps (High)" },
  { value: "192", label: "192 kbps (Medium)" },
  { value: "128", label: "128 kbps (Standard)" },
  { value: "96", label: "96 kbps (Low)" },
];

const imageQualities = [
  { value: "90", label: "High (90%)" },
  { value: "75", label: "Medium (75%)" },
  { value: "60", label: "Low (60%)" },
  { value: "40", label: "Maximum Compression (40%)" },
];

export const videoConvertConfig: ToolPageConfig = {
  id: "video-convert",
  title: "Video Converter",
  description: "Convert videos between popular formats with full quality control",
  action: "convert",
  engine: "ffmpeg",
  accept: "video/*",
  formats: "MP4, WebM, AVI, MOV, MKV, FLV",
  outputExtension: "mp4",
  fileRequirement: {
    accept: "video/*",
    formats: "MP4, WebM, AVI, MOV, MKV, FLV",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    { label: "Output Format", key: "format", type: "select", options: videoFormats, defaultValue: "mp4" },
    { label: "Video Quality", key: "quality", type: "select", options: qualities, defaultValue: "23" },
    { label: "Resolution", key: "resolution", type: "select", options: resolutions, defaultValue: "original" },
  ],
  buildArgs: (_file, values, outputExt) => {
    const args = ["-i", "input", "-c:v", "libx264", "-crf", values.quality];
    if (values.resolution !== "original") {
      args.push("-vf", `scale=${values.resolution}`);
    }
    args.push("-c:a", "aac", "-b:a", "192k", `output.${outputExt}`);
    return args;
  },
  outputName: (values) => `converted.${values.format}`,
};

export const videoCompressConfig: ToolPageConfig = {
  id: "video-compress",
  title: "Video Compressor",
  description: "Reduce video file size with adjustable CRF quality optimization",
  action: "compress",
  engine: "ffmpeg",
  accept: "video/*",
  formats: "MP4, WebM, MOV",
  outputExtension: "mp4",
  fileRequirement: {
    accept: "video/*",
    formats: "MP4, WebM, MOV",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    { label: "Compression Level", key: "quality", type: "select", options: [
      { value: "28", label: "Maximum Compression (CRF 28)" },
      { value: "23", label: "Balanced (CRF 23)" },
      { value: "18", label: "High Quality (CRF 18)" },
    ], defaultValue: "23" },
    { label: "Resolution", key: "resolution", type: "select", options: resolutions, defaultValue: "original" },
  ],
  buildArgs: (_file, values, outputExt) => {
    const args = ["-i", "input", "-c:v", "libx264", "-crf", values.quality];
    if (values.resolution !== "original") args.push("-vf", `scale=${values.resolution}`);
    args.push("-c:a", "aac", "-b:a", "128k", `output.${outputExt}`);
    return args;
  },
  outputName: () => "compressed.mp4",
};

export const videoTrimConfig: ToolPageConfig = {
  id: "video-trim",
  title: "Video Trimmer",
  description: "Cut and trim video segments with precise start and end time controls",
  action: "trim",
  engine: "ffmpeg",
  accept: "video/*",
  formats: "MP4, WebM, MOV",
  outputExtension: "mp4",
  fileRequirement: {
    accept: "video/*",
    formats: "MP4, WebM, MOV",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    { label: "Start Time (seconds)", key: "start", type: "select", options: [
      { value: "0", label: "0s (Beginning)" },
      { value: "5", label: "5s" },
      { value: "10", label: "10s" },
      { value: "30", label: "30s" },
      { value: "60", label: "1 min" },
    ], defaultValue: "0" },
    { label: "Duration (seconds)", key: "duration", type: "select", options: [
      { value: "10", label: "10 seconds" },
      { value: "30", label: "30 seconds" },
      { value: "60", label: "1 minute" },
      { value: "300", label: "5 minutes" },
      { value: "600", label: "10 minutes" },
    ], defaultValue: "30" },
  ],
  buildArgs: (_file, values, outputExt) => {
    return ["-i", "input", "-ss", values.start, "-t", values.duration, "-c", "copy", `output.${outputExt}`];
  },
  outputName: () => "trimmed.mp4",
};

export const audioConvertConfig: ToolPageConfig = {
  id: "audio-convert",
  title: "Audio Converter",
  description: "Convert audio files between MP3, WAV, AAC, OGG, FLAC, M4A, and WMA",
  action: "convert",
  engine: "ffmpeg",
  accept: "audio/*",
  formats: "MP3, WAV, AAC, OGG, FLAC, M4A, WMA",
  outputExtension: "mp3",
  fileRequirement: {
    accept: "audio/*",
    formats: "MP3, WAV, AAC, OGG, FLAC, M4A, WMA",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    { label: "Output Format", key: "format", type: "select", options: audioFormats, defaultValue: "mp3" },
    { label: "Audio Bitrate", key: "bitrate", type: "select", options: audioBitrates, defaultValue: "192" },
  ],
  buildArgs: (_file, values, outputExt) => {
    const codecMap: Record<string, string> = {
      mp3: "libmp3lame", wav: "pcm_s16le", aac: "aac",
      ogg: "libvorbis", flac: "flac", m4a: "aac", wma: "wmav2",
    };
    const args = ["-i", "input"];
    const codec = codecMap[outputExt];
    if (codec) args.push("-c:a", codec);
    args.push("-b:a", `${values.bitrate}k`, `output.${outputExt}`);
    return args;
  },
  outputName: (values) => `converted.${values.format}`,
};

export const audioCompressConfig: ToolPageConfig = {
  id: "audio-compress",
  title: "Audio Compressor",
  description: "Reduce audio file size by adjusting bitrate and sample rate",
  action: "compress",
  engine: "ffmpeg",
  accept: "audio/*",
  formats: "MP3, AAC, OGG",
  outputExtension: "mp3",
  fileRequirement: {
    accept: "audio/*",
    formats: "MP3, AAC, OGG",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    { label: "Target Bitrate", key: "bitrate", type: "select", options: audioBitrates, defaultValue: "128" },
    { label: "Channels", key: "channels", type: "select", options: [
      { value: "2", label: "Stereo" },
      { value: "1", label: "Mono (Smaller)" },
    ], defaultValue: "2" },
  ],
  buildArgs: (_file, values, outputExt) => {
    return ["-i", "input", "-b:a", `${values.bitrate}k`, "-ac", values.channels, `output.${outputExt}`];
  },
  outputName: () => "compressed.mp3",
};

export const audioTrimConfig: ToolPageConfig = {
  id: "audio-trim",
  title: "Audio Trimmer",
  description: "Cut and trim audio segments with precise start/end controls",
  action: "trim",
  engine: "ffmpeg",
  accept: "audio/*",
  formats: "MP3, WAV, AAC, OGG, FLAC",
  outputExtension: "mp3",
  fileRequirement: {
    accept: "audio/*",
    formats: "MP3, WAV, AAC, OGG, FLAC",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    { label: "Start Time (seconds)", key: "start", type: "select", options: [
      { value: "0", label: "0s (Beginning)" },
      { value: "10", label: "10s" },
      { value: "30", label: "30s" },
      { value: "60", label: "1 min" },
    ], defaultValue: "0" },
    { label: "Duration (seconds)", key: "duration", type: "select", options: [
      { value: "10", label: "10 seconds" },
      { value: "30", label: "30 seconds" },
      { value: "60", label: "1 minute" },
      { value: "300", label: "5 minutes" },
    ], defaultValue: "30" },
  ],
  buildArgs: (_file, values, outputExt) => {
    return ["-i", "input", "-ss", values.start, "-t", values.duration, "-c", "copy", `output.${outputExt}`];
  },
  outputName: () => "trimmed.mp3",
};

export const imageConvertConfig: ToolPageConfig = {
  id: "image-convert",
  title: "Image Converter",
  description: "Convert images between JPG, PNG, WebP, GIF, BMP, TIFF, and AVIF",
  action: "convert",
  engine: "browser-image",
  accept: "image/*",
  formats: "JPG, PNG, WebP, GIF, BMP, TIFF, AVIF",
  outputExtension: "png",
  fileRequirement: {
    accept: "image/*",
    formats: "JPG, PNG, WebP, GIF, BMP, TIFF, AVIF",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    {
      label: "Output Format",
      key: "format",
      type: "select",
      options: imageFormats,
      defaultValue: "png",
      description: "Choose the target image format for the converted file.",
    },
    {
      label: "Output Quality",
      key: "quality",
      type: "range",
      min: 40,
      max: 100,
      step: 5,
      defaultValue: "90",
      helpText: "Higher values keep more detail but usually create larger files.",
    },
    {
      label: "Strip Metadata",
      key: "stripMetadata",
      type: "toggle",
      defaultValue: "true",
      helpText: "Remove embedded EXIF and other metadata from the exported file.",
    },
    {
      label: "Custom File Name",
      key: "filenameStem",
      type: "text",
      defaultValue: "",
      placeholder: "converted-image",
      helpText: "Optional. Leave empty to use the default converted file name.",
    },
  ],
  buildArgs: (_file, values, outputExt) => {
      const codecMap: Record<string, string> = {
        jpg: "mjpeg", jpeg: "mjpeg", png: "png", webp: "libwebp",
        gif: "gif", bmp: "bmp", tiff: "tiff", avif: "libaom-av1",
      };
      const args = ["-i", "input"];
      const codec = codecMap[outputExt];
      if (codec) args.push("-c:v", codec);
      const q = parseInt(values.quality, 10);
      if (values.stripMetadata === "true") {
        args.push("-map_metadata", "-1");
      }
      if (outputExt === "jpg" || outputExt === "jpeg") {
        args.push("-q:v", String(Math.max(1, Math.round((100 - q) / 10))));
      } else if (outputExt === "webp") {
        args.push("-quality", String(q));
      } else if (outputExt === "png") {
        args.push("-compression_level", String(Math.min(9, Math.max(0, Math.round((100 - q) / 10)))));
      } else if (outputExt === "avif") {
        args.push("-crf", String(Math.min(63, Math.max(0, 63 - Math.round((q / 100) * 40)))));
      }
      args.push(`output.${outputExt}`);
      return args;
    },
    outputName: (values, ext) => {
      const customStem = values.filenameStem?.trim();
      return `${customStem || "converted"}.${ext}`;
    },
  };

export const imageCompressConfig: ToolPageConfig = {
  id: "image-compress",
  title: "Image Compressor",
  description: "Optimize and compress images while maintaining visual quality",
  action: "compress",
  engine: "browser-image",
  accept: "image/*",
  formats: "JPG, PNG, WebP",
  outputExtension: "jpg",
  fileRequirement: {
    accept: "image/*",
    formats: "JPG, PNG, WebP",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    { label: "Compression Level", key: "quality", type: "select", options: imageQualities, defaultValue: "75" },
    { label: "Output Format", key: "format", type: "select", options: [
      { value: "jpg", label: "JPEG" },
      { value: "webp", label: "WebP (Smaller)" },
    ], defaultValue: "jpg" },
  ],
  buildArgs: (_file, values, outputExt) => {
    const args = ["-i", "input"];
    if (outputExt === "webp") args.push("-c:v", "libwebp");
    args.push("-q:v", String(Math.round((100 - parseInt(values.quality)) / 10)), `output.${outputExt}`);
    return args;
  },
  outputName: (values) => `compressed.${values.format}`,
};

export const imageResizeConfig: ToolPageConfig = {
  id: "image-resize",
  title: "Image Resizer",
  description: "Resize images to exact dimensions or scale by percentage",
  action: "resize",
  engine: "browser-image",
  accept: "image/*",
  formats: "JPG, PNG, WebP, GIF, BMP, TIFF",
  outputExtension: "jpg",
  fileRequirement: {
    accept: "image/*",
    formats: "JPG, PNG, WebP, GIF, BMP, TIFF",
    minCount: 1,
    maxCount: 1,
    warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
    maxFileSizeBytes: FILE_SIZE_LIMITS.max,
  },
  sections: [
    { label: "Width (px)", key: "width", type: "select", options: [
      { value: "1920", label: "1920px (Full HD)" },
      { value: "1280", label: "1280px (HD)" },
      { value: "800", label: "800px (Medium)" },
      { value: "400", label: "400px (Small)" },
      { value: "200", label: "200px (Thumbnail)" },
    ], defaultValue: "800" },
    { label: "Maintain Aspect Ratio", key: "aspect", type: "select", options: [
      { value: "true", label: "Yes (Auto height)" },
      { value: "false", label: "No (Exact size)" },
    ], defaultValue: "true" },
    { label: "Output Format", key: "format", type: "select", options: [
      { value: "jpg", label: "JPEG" },
      { value: "png", label: "PNG" },
      { value: "webp", label: "WebP" },
    ], defaultValue: "jpg" },
  ],
  buildArgs: (_file, values, outputExt) => {
    const args = ["-i", "input"];
    if (values.aspect === "true") {
      args.push("-vf", `scale=${values.width}:-1`);
    } else {
      args.push("-vf", `scale=${values.width}:${Math.round(parseInt(values.width) * 0.5625)}`);
    }
    args.push(`output.${outputExt}`);
    return args;
  },
  outputName: (values) => `resized.${values.format}`,
};

export const toolConfigsById: Partial<Record<ToolId, ToolPageConfig>> = {
  "video-convert": videoConvertConfig,
  "video-compress": videoCompressConfig,
  "video-trim": videoTrimConfig,
  "audio-convert": audioConvertConfig,
  "audio-compress": audioCompressConfig,
  "audio-trim": audioTrimConfig,
  "image-convert": imageConvertConfig,
  "image-compress": imageCompressConfig,
  "image-resize": imageResizeConfig,
};
