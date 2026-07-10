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

const audioSampleRates = [
  { value: "original", label: "Keep Original" },
  { value: "48000", label: "48 kHz" },
  { value: "44100", label: "44.1 kHz" },
  { value: "32000", label: "32 kHz" },
  { value: "22050", label: "22.05 kHz" },
  { value: "16000", label: "16 kHz" },
];

const audioChannelModes = [
  { value: "original", label: "Keep Original" },
  { value: "2", label: "Stereo" },
  { value: "1", label: "Mono" },
];

const audioBitDepthModes = [
  { value: "original", label: "Keep Original When Possible" },
  { value: "16", label: "16-bit" },
  { value: "24", label: "24-bit" },
  { value: "32", label: "32-bit" },
];

const audioCompressionPresets = [
  { value: "custom", label: "Custom settings" },
  { value: "speech", label: "Speech / voice notes" },
  { value: "podcast", label: "Podcast / interviews" },
  { value: "music", label: "Music / mixed audio" },
];

const imageQualities = [
  { value: "90", label: "High (90%)" },
  { value: "75", label: "Medium (75%)" },
  { value: "60", label: "Low (60%)" },
  { value: "40", label: "Maximum Compression (40%)" },
];

const transparencyHandlingModes = [
  { value: "auto", label: "Auto (preserve when supported)" },
  { value: "flatten", label: "Flatten onto a background color" },
];

const videoCodecStrategies = [
  { value: "auto", label: "Auto (match the output container)" },
  { value: "copy", label: "Stream copy when possible" },
  { value: "h264", label: "H.264 (best compatibility)" },
  { value: "vp9", label: "VP9 (smaller web-friendly output)" },
  { value: "mpeg4", label: "MPEG-4 legacy encode" },
];

const videoExportPresets = [
  { value: "custom", label: "Custom settings" },
  { value: "general", label: "General sharing" },
  { value: "youtube", label: "YouTube upload" },
  { value: "instagram", label: "Instagram / Reels" },
  { value: "tiktok", label: "TikTok / Shorts" },
  { value: "whatsapp", label: "WhatsApp sharing" },
];

const audioHandlingStrategies = [
  { value: "auto", label: "Auto (recommended)" },
  { value: "copy", label: "Keep original audio when possible" },
  { value: "aac", label: "AAC audio" },
  { value: "mp3", label: "MP3 audio" },
  { value: "opus", label: "Opus audio" },
  { value: "mute", label: "No audio" },
];

const subtitleHandlingStrategies = [
  { value: "auto", label: "Auto (preserve when the output format supports it)" },
  { value: "drop", label: "Drop subtitle tracks" },
];

function resolveSubtitleCodec(outputExt: string) {
  if (outputExt === "mkv") return "copy";
  if (outputExt === "mp4" || outputExt === "mov" || outputExt === "m4v") return "mov_text";
  return null;
}

function isSameVideoContainer(inputExt: string, outputExt: string) {
  if (inputExt === outputExt) return true;
  return (inputExt === "m4v" && outputExt === "mp4") || (inputExt === "mp4" && outputExt === "m4v");
}

function resolveVideoCodec(outputExt: string, strategy: string) {
  if (strategy === "h264") {
    if (outputExt === "webm") return "libvpx-vp9";
    if (outputExt === "avi") return "mpeg4";
    if (outputExt === "wmv") return "wmv2";
    if (outputExt === "flv") return "flv";
    return "libx264";
  }
  if (strategy === "vp9") {
    return outputExt === "webm" || outputExt === "mkv" ? "libvpx-vp9" : "libx264";
  }
  if (strategy === "mpeg4") {
    if (outputExt === "wmv") return "wmv2";
    if (outputExt === "flv") return "flv";
    return "mpeg4";
  }

  switch (outputExt) {
    case "webm":
      return "libvpx-vp9";
    case "avi":
      return "mpeg4";
    case "wmv":
      return "wmv2";
    case "flv":
      return "flv";
    default:
      return "libx264";
  }
}

function resolveAudioCodec(outputExt: string, strategy: string) {
  if (strategy === "aac") return outputExt === "webm" ? "libopus" : "aac";
  if (strategy === "mp3") return outputExt === "webm" ? "libopus" : "libmp3lame";
  if (strategy === "opus") return outputExt === "webm" ? "libopus" : "aac";

  switch (outputExt) {
    case "webm":
      return "libopus";
    case "avi":
    case "wmv":
      return "libmp3lame";
    default:
      return "aac";
  }
}

function toFFmpegColor(value: string) {
  if (!value) return "0xFFFFFF";
  return value.startsWith("#") ? `0x${value.slice(1)}` : value;
}

function resolvePcmCodec(bitDepth: string) {
  if (bitDepth === "24") return "pcm_s24le";
  if (bitDepth === "32") return "pcm_s32le";
  return "pcm_s16le";
}

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
    {
      label: "Export Preset",
      key: "preset",
      type: "select",
      options: videoExportPresets,
      defaultValue: "custom",
      description: "Choose a ready-made export profile for common platforms or keep full manual control.",
    },
    {
      label: "Output Format",
      key: "format",
      type: "select",
      options: videoFormats,
      defaultValue: "mp4",
      description: "This controls the container you export, such as MP4, WebM, MOV, or MKV.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "Video Codec Strategy",
      key: "videoCodec",
      type: "select",
      options: videoCodecStrategies,
      defaultValue: "auto",
      description: "Choose whether to match the container automatically, force a codec, or stream copy the video when possible.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "Audio Handling",
      key: "audioMode",
      type: "select",
      options: audioHandlingStrategies,
      defaultValue: "auto",
      description: "Keep the original audio when possible, transcode it for compatibility, or remove it entirely.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "Subtitle Tracks",
      key: "subtitleMode",
      type: "select",
      options: subtitleHandlingStrategies,
      defaultValue: "auto",
      description: "Keep embedded subtitle tracks when the destination format supports them, or export video without subtitle streams.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "Video Quality",
      key: "quality",
      type: "select",
      options: qualities,
      defaultValue: "23",
      description: "Only applies when the video is re-encoded. Lower CRF means higher quality and larger files.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "Resolution",
      key: "resolution",
      type: "select",
      options: resolutions,
      defaultValue: "original",
      description: "Keep the original size or downscale to a target resolution before exporting.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "MP4 Fast Start",
      key: "faststart",
      type: "toggle",
      defaultValue: "true",
      visibility: { field: "format", equals: "mp4" },
      description: "Moves playback metadata to the front of MP4 files so streaming and browser playback can start sooner.",
    },
  ],
  buildArgs: (_file, values, outputExt) => {
    const preset = values.preset ?? "custom";
    const presetOverrides: Record<string, { format: string; quality: string; resolution: string; videoCodec: string; audioMode: string; subtitleMode: string; faststart: string }> = {
      general: { format: "mp4", quality: "23", resolution: "original", videoCodec: "h264", audioMode: "aac", subtitleMode: "auto", faststart: "true" },
      youtube: { format: "mp4", quality: "18", resolution: "1920x1080", videoCodec: "h264", audioMode: "aac", subtitleMode: "drop", faststart: "true" },
      instagram: { format: "mp4", quality: "23", resolution: "1080x1920", videoCodec: "h264", audioMode: "aac", subtitleMode: "drop", faststart: "true" },
      tiktok: { format: "mp4", quality: "23", resolution: "1080x1920", videoCodec: "h264", audioMode: "aac", subtitleMode: "drop", faststart: "true" },
      whatsapp: { format: "mp4", quality: "28", resolution: "1280x720", videoCodec: "h264", audioMode: "aac", subtitleMode: "drop", faststart: "true" },
    };
    const effectiveValues = preset !== "custom" && presetOverrides[preset]
      ? { ...values, ...presetOverrides[preset] }
      : values;

    const inputExt = _file.name.split(".").pop()?.toLowerCase() || "";
    const effectiveOutputExt = preset !== "custom" && presetOverrides[preset]
      ? presetOverrides[preset].format
      : outputExt;
    const sameContainer = isSameVideoContainer(inputExt, effectiveOutputExt);
    const canCopyVideo = effectiveValues.resolution === "original" && sameContainer;
    const wantsCopyVideo = effectiveValues.videoCodec === "copy" && canCopyVideo;
    const wantsAutoCopyVideo = effectiveValues.videoCodec === "auto" && canCopyVideo;
    const copyVideo = wantsCopyVideo || wantsAutoCopyVideo;

    const canCopyAudio = sameContainer;
    const wantsCopyAudio = effectiveValues.audioMode === "copy" && canCopyAudio;
    const wantsAutoCopyAudio = effectiveValues.audioMode === "auto" && canCopyAudio && copyVideo;
    const copyAudio = wantsCopyAudio || wantsAutoCopyAudio;

    const subtitleCodec = effectiveValues.subtitleMode === "drop"
      ? null
      : resolveSubtitleCodec(effectiveOutputExt);

    const args = ["-i", "input", "-map", "0:v:0", "-map", "0:a?", "-map_metadata", "0", "-map_chapters", "0"];
    if (subtitleCodec) {
      args.push("-map", "0:s?");
    }

    if (copyVideo) {
      args.push("-c:v", "copy");
    } else {
      const videoCodec = resolveVideoCodec(effectiveOutputExt, effectiveValues.videoCodec);
      args.push("-c:v", videoCodec);

      if (videoCodec === "libvpx-vp9") {
        args.push("-b:v", "0", "-crf", effectiveValues.quality, "-deadline", "good", "-cpu-used", "2");
      } else {
        args.push("-crf", effectiveValues.quality);
      }

      if (effectiveValues.resolution !== "original") {
        args.push("-vf", `scale=${effectiveValues.resolution}`);
      }
    }

    if (effectiveValues.audioMode === "mute") {
      args.push("-an");
    } else if (copyAudio) {
      args.push("-c:a", "copy");
    } else {
      const audioCodec = resolveAudioCodec(effectiveOutputExt, effectiveValues.audioMode);
      args.push("-c:a", audioCodec, "-b:a", effectiveOutputExt === "webm" ? "160k" : "192k");
    }

    if (subtitleCodec) {
      args.push("-c:s", subtitleCodec);
    }

    if (effectiveOutputExt === "mp4" && effectiveValues.faststart === "true") {
      args.push("-movflags", "+faststart");
    }

    args.push(`output.${effectiveOutputExt}`);
    return args;
  },
  outputName: (values) => {
    const preset = values.preset ?? "custom";
    if (preset === "custom") {
      return `converted.${values.format}`;
    }
    const presetExt = {
      general: "mp4",
      youtube: "mp4",
      instagram: "mp4",
      tiktok: "mp4",
      whatsapp: "mp4",
    }[preset] ?? values.format;
    return `converted.${presetExt}`;
  },
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
    {
      label: "Output Format",
      key: "format",
      type: "select",
      options: audioFormats,
      defaultValue: "mp3",
      description: "Choose the destination format for compatibility, editing, or archive use.",
    },
    {
      label: "Audio Bitrate",
      key: "bitrate",
      type: "select",
      options: audioBitrates,
      defaultValue: "192",
      description: "Mainly affects lossy outputs such as MP3, AAC, OGG, M4A, and WMA.",
    },
    {
      label: "Sample Rate",
      key: "sampleRate",
      type: "select",
      options: audioSampleRates,
      defaultValue: "original",
      description: "Lower sample rates can reduce file size for speech and lightweight delivery.",
    },
    {
      label: "Channels",
      key: "channels",
      type: "select",
      options: audioChannelModes,
      defaultValue: "original",
      description: "Keep the source layout, force stereo, or export mono for smaller speech-friendly files.",
    },
    {
      label: "Bit Depth",
      key: "bitDepth",
      type: "select",
      options: audioBitDepthModes,
      defaultValue: "original",
      description: "Mainly affects lossless-style exports such as WAV or FLAC. Lossy formats may ignore this setting.",
    },
  ],
  buildArgs: (_file, values, outputExt) => {
      const codecMap: Record<string, string> = {
        mp3: "libmp3lame", wav: "pcm_s16le", aac: "aac",
        ogg: "libvorbis", flac: "flac", m4a: "aac", wma: "wmav2",
      };
      const args = ["-i", "input"];
      const codec = outputExt === "wav" && values.bitDepth !== "original"
        ? resolvePcmCodec(values.bitDepth)
        : codecMap[outputExt];
      if (codec) args.push("-c:a", codec);

      if (!["wav", "flac"].includes(outputExt)) {
        args.push("-b:a", `${values.bitrate}k`);
      }

      if (values.sampleRate !== "original") {
        args.push("-ar", values.sampleRate);
      }

      if (values.channels !== "original") {
        args.push("-ac", values.channels);
      }

      if (outputExt === "flac" && values.bitDepth !== "original") {
        args.push("-sample_fmt", values.bitDepth === "16" ? "s16" : "s32");
      }

      args.push(`output.${outputExt}`);
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
    {
      label: "Compression Preset",
      key: "preset",
      type: "select",
      options: audioCompressionPresets,
      defaultValue: "custom",
      description: "Start with a speech, podcast, or music profile, or keep full manual control.",
    },
    {
      label: "Output Format",
      key: "format",
      type: "select",
      options: [
        { value: "mp3", label: "MP3" },
        { value: "aac", label: "AAC" },
        { value: "ogg", label: "OGG (Vorbis)" },
      ],
      defaultValue: "mp3",
      description: "Pick the compressed format you want to export.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "Target Bitrate",
      key: "bitrate",
      type: "select",
      options: audioBitrates,
      defaultValue: "128",
      description: "Lower bitrates reduce file size more aggressively, especially for speech and voice recordings.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "Sample Rate",
      key: "sampleRate",
      type: "select",
      options: audioSampleRates,
      defaultValue: "original",
      description: "Lower sample rates can shrink podcasts, meetings, and other speech-heavy files further.",
      visibility: { field: "preset", equals: "custom" },
    },
    {
      label: "Channels",
      key: "channels",
      type: "select",
      options: [
        { value: "2", label: "Stereo" },
        { value: "1", label: "Mono (Smaller)" },
      ],
      defaultValue: "2",
      description: "Mono is often the better choice for speech, interviews, and voice notes.",
      visibility: { field: "preset", equals: "custom" },
    },
  ],
  buildArgs: (_file, values, outputExt) => {
    const preset = values.preset ?? "custom";
    const presetOverrides: Record<string, { format: string; bitrate: string; sampleRate: string; channels: string }> = {
      speech: { format: "mp3", bitrate: "64", sampleRate: "22050", channels: "1" },
      podcast: { format: "mp3", bitrate: "96", sampleRate: "32000", channels: "1" },
      music: { format: "aac", bitrate: "192", sampleRate: "44100", channels: "2" },
    };
    const effectiveValues = preset !== "custom" && presetOverrides[preset]
      ? { ...values, ...presetOverrides[preset] }
      : values;
    const effectiveOutputExt = preset !== "custom" && presetOverrides[preset]
      ? presetOverrides[preset].format
      : outputExt;
    const codecMap: Record<string, string> = {
      mp3: "libmp3lame",
      aac: "aac",
      ogg: "libvorbis",
    };
    const args = ["-i", "input"];
    const codec = codecMap[effectiveOutputExt];
    if (codec) {
      args.push("-c:a", codec);
    }
    args.push("-b:a", `${effectiveValues.bitrate}k`);
    if (effectiveValues.sampleRate !== "original") {
      args.push("-ar", effectiveValues.sampleRate);
    }
    args.push("-ac", effectiveValues.channels, `output.${effectiveOutputExt}`);
    return args;
  },
  outputName: (values) => {
    const preset = values.preset ?? "custom";
    const presetExt = {
      speech: "mp3",
      podcast: "mp3",
      music: "aac",
    }[preset] ?? values.format;
    return `compressed.${presetExt}`;
  },
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
        label: "Transparency Handling",
        key: "alphaMode",
        type: "select",
        options: transparencyHandlingModes,
        defaultValue: "auto",
        description: "Preserve transparency where the output format supports it, or flatten the image onto a solid background.",
      },
      {
        label: "Background Color",
        key: "backgroundColor",
        type: "color",
        defaultValue: "#ffffff",
        visibility: { field: "alphaMode", equals: "flatten" },
        helpText: "Used when transparent areas need to be converted into a solid background.",
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
        if (values.alphaMode === "flatten") {
          const ffmpegColor = toFFmpegColor(values.backgroundColor);
          args.push(
            "-filter_complex",
            `color=c=${ffmpegColor}:s=16x16[bg];[bg][0:v]scale2ref[bgscaled][fg];[bgscaled][fg]overlay=format=auto,format=rgb24[outv]`,
            "-map",
            "[outv]"
          );
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
