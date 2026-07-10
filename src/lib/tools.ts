import type {
  ToolCategory,
  ToolCategoryDefinition,
  ToolDefinition,
  ToolId,
} from "@/lib/tool-types";
import { FILE_SIZE_LIMITS } from "@/lib/constants";

export type { ToolCategory, ToolDefinition } from "@/lib/tool-types";

export const categoryDefinitions: ToolCategoryDefinition[] = [
  {
    id: "video",
    label: "Video Tools",
    description: "Convert, trim, compress, merge, and edit videos online for free",
    icon: "Video",
    gradient: "from-blue-600 to-blue-400",
  },
  {
    id: "audio",
    label: "Audio Tools",
    description: "Convert, trim, compress, merge, and enhance audio files for free",
    icon: "AudioLines",
    gradient: "from-pink-600 to-purple-500",
  },
  {
    id: "image",
    label: "Image Tools",
    description: "Resize, compress, convert, and optimize images online for free",
    icon: "Image",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    id: "pdf",
    label: "PDF Tools",
    description: "Convert, split, and manipulate PDF files directly in your browser for free",
    icon: "FileText",
    gradient: "from-red-600 to-orange-500",
  },
];

export const toolCatalog: ToolDefinition[] = [
  {
    id: "video-convert",
    title: "Video Converter",
    description: "Convert videos between MP4, WebM, AVI, MOV, MKV, and more with quality control.",
    category: "video",
    icon: "Video",
    href: "/tools/video/convert",
    formats: ["MP4", "WebM", "AVI", "MOV", "MKV", "FLV", "WMV", "M4V"],
    runtime: {
      action: "convert",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, AVI, MOV, MKV, FLV, WMV, M4V",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Convert between 8+ popular video formats",
      "Adjust CRF quality from High to Low",
      "Change resolution (4K, 1080p, 720p, etc.)",
      "Control audio bitrate independently",
    ],
    howItWorks: [
      "Upload your video file by dragging it into the drop zone or clicking to browse.",
      "Select your desired output format, quality level, resolution, and audio bitrate.",
      "Start the conversion and download your processed file once complete.",
    ],
  },
  {
    id: "video-compress",
    title: "Video Compressor",
    description: "Reduce video file size without significant quality loss using CRF optimization.",
    category: "video",
    icon: "FileDown",
    href: "/tools/video/compress",
    formats: ["MP4", "WebM"],
    runtime: {
      action: "compress",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "CRF-based compression with adjustable quality",
      "Preview estimated size before processing",
      "Side-by-side quality comparison",
      "Preserve audio quality while compressing video",
    ],
    howItWorks: [
      "Drag and drop your video file into the upload area.",
      "Choose your compression level from the preset options or set a custom quality.",
      "Process the video and download the compressed file.",
    ],
  },
  {
    id: "video-trim",
    title: "Video Trimmer",
    description: "Cut and trim video segments with precise start and end time controls.",
    category: "video",
    icon: "Scissors",
    href: "/tools/video/trim",
    formats: ["MP4", "WebM", "MOV"],
    runtime: {
      action: "trim",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Precise start and end time selection in seconds",
      "Live video preview with current time indicator",
      "Cut without re-encoding for fast processing",
      "Preview trimmed segment before downloading",
    ],
    howItWorks: [
      "Upload your video and preview it in the built-in player.",
      "Set the start and end points using the time inputs or slider.",
      "Trim the video and download the selected segment.",
    ],
  },
  {
    id: "video-merge",
    title: "Video Merger",
    description: "Join multiple video files together in any order without quality loss.",
    category: "video",
    icon: "Combine",
    href: "/tools/video/merge",
    formats: ["MP4", "WebM"],
    runtime: {
      action: "merge",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV, AVI",
        minCount: 2,
        maxCount: 20,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: {
        multiFile: true,
        metadataInspection: true,
        outputPreview: true,
        outputDownload: true,
      },
    },
    features: [
      "Join multiple video clips in sequence",
      "Reorder files with drag-and-drop",
      "Concat without re-encoding for same-format files",
      "Automatic format normalization when needed",
    ],
    howItWorks: [
      "Upload multiple video files and arrange them in your desired order.",
      "The merger will concatenate them sequentially.",
      "Download the single merged video file.",
    ],
  },
  {
    id: "video-effects",
    title: "Video Effects",
    description: "Apply filters, speed changes, reverse, rotation, and more to your videos.",
    category: "video",
    icon: "Sparkles",
    href: "/tools/video/effects",
    formats: ["MP4", "WebM", "MOV"],
    runtime: {
      action: "effects",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Change playback speed (0.25x to 4x)",
      "Reverse video playback",
      "Rotate and flip video orientation",
      "Apply grayscale, sepia, and other filters",
    ],
    howItWorks: [
      "Upload your video file to apply effects.",
      "Choose from speed, reverse, rotate, flip, and color filter options.",
      "Process the video with your selected effects and download the result.",
    ],
  },
  {
    id: "video-burn-caption",
    title: "Burn Captions",
    description: "Permanently burn subtitles or text captions into your video files.",
    category: "video",
    icon: "Subtitles",
    href: "/tools/video/burn-caption",
    formats: ["MP4", "WebM", "MOV"],
    runtime: {
      action: "burn-caption",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
        auxiliaryInputs: [
          {
            key: "subtitleFile",
            label: "Subtitle File",
            description: "Optional SRT or VTT subtitle file for burning timed captions into the video.",
            optional: true,
            requirement: {
              accept: ".srt,.vtt,text/vtt,application/x-subrip",
              formats: "SRT, VTT",
              minCount: 1,
            maxCount: 1,
            warningFileSizeBytes: 2 * 1024 * 1024,
            maxFileSizeBytes: 10 * 1024 * 1024,
            },
          },
          {
            key: "watermarkImage",
            label: "Watermark Image",
            description: "Optional PNG, WEBP, or JPG overlay image to place on top of the captioned video.",
            optional: true,
            requirement: {
              accept: "image/png,image/webp,image/jpeg,.png,.webp,.jpg,.jpeg",
              formats: "PNG, WEBP, JPG",
              minCount: 1,
              maxCount: 1,
              warningFileSizeBytes: 5 * 1024 * 1024,
              maxFileSizeBytes: 20 * 1024 * 1024,
            },
          },
        ],
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Upload SRT or VTT subtitle files",
      "Custom text captions with position and style",
      "Adjust font size, color, and background",
      "Preview captions before burning",
    ],
    howItWorks: [
      "Upload a video and a subtitle file (SRT/VTT) or enter custom text.",
      "Customize the caption appearance and position.",
      "Burn captions into the video and download.",
    ],
  },
  {
    id: "audio-convert",
    title: "Audio Converter",
    description: "Convert audio files between MP3, WAV, AAC, OGG, FLAC, M4A, and WMA.",
    category: "audio",
    icon: "AudioLines",
    href: "/tools/audio/convert",
    formats: ["MP3", "WAV", "AAC", "OGG", "FLAC", "M4A", "WMA"],
    runtime: {
      action: "convert",
      engines: ["ffmpeg"],
      input: {
        accept: "audio/*",
        formats: "MP3, WAV, AAC, OGG, FLAC, M4A, WMA",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Convert between 7+ audio formats",
      "Adjustable audio bitrate and sample rate",
      "Preserve or convert channel layout",
      "Set bit depth for WAV and FLAC style exports",
    ],
    howItWorks: [
      "Upload your audio file in any supported format.",
      "Select your target format and quality settings.",
      "Convert and download your audio file.",
    ],
  },
  {
    id: "audio-compress",
    title: "Audio Compressor",
    description: "Reduce audio file size with adjustable bitrate and quality optimization.",
    category: "audio",
    icon: "FileDown",
    href: "/tools/audio/compress",
    formats: ["MP3", "AAC", "OGG"],
    runtime: {
      action: "compress",
      engines: ["ffmpeg"],
      input: {
        accept: "audio/*",
        formats: "MP3, AAC, OGG",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Bitrate-based compression (96kbps to 320kbps)",
      "Sample rate adjustment",
      "Mono/stereo channel control",
      "Size estimator before processing",
    ],
    howItWorks: [
      "Upload your audio file to compress.",
      "Choose a target bitrate and sample rate.",
      "Process and download the compressed audio file.",
    ],
  },
  {
    id: "audio-trim",
    title: "Audio Trimmer",
    description: "Cut and trim audio segments with precise start/end time controls.",
    category: "audio",
    icon: "Scissors",
    href: "/tools/audio/trim",
    formats: ["MP3", "WAV", "AAC", "OGG", "FLAC"],
    runtime: {
      action: "trim",
      engines: ["ffmpeg"],
      input: {
        accept: "audio/*",
        formats: "MP3, WAV, AAC, OGG, FLAC",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Precise start and end time trimming",
      "Visual waveform display for accuracy",
      "Cut without re-encoding for supported formats",
      "Preview trimmed segment before download",
    ],
    howItWorks: [
      "Upload your audio file and view its waveform.",
      "Drag the handles or enter times to select a segment.",
      "Trim and download the selected portion.",
    ],
  },
  {
    id: "audio-merge",
    title: "Audio Merger",
    description: "Join multiple audio files together in sequence or layered arrangement.",
    category: "audio",
    icon: "Combine",
    href: "/tools/audio/merge",
    formats: ["MP3", "WAV", "AAC", "OGG", "FLAC"],
    runtime: {
      action: "merge",
      engines: ["ffmpeg"],
      input: {
        accept: "audio/*",
        formats: "MP3, WAV, AAC, OGG, FLAC",
        minCount: 2,
        maxCount: 20,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: {
        multiFile: true,
        metadataInspection: true,
        outputPreview: true,
        outputDownload: true,
      },
    },
    features: [
      "Sequential concatenation of audio files",
      "Layering/mixing multiple tracks together",
      "Reorder files with simple controls",
      "Crossfade between tracks",
    ],
    howItWorks: [
      "Upload multiple audio files and arrange them in order.",
      "Optionally enable crossfade between files.",
      "Merge and download the combined audio file.",
    ],
  },
  {
    id: "audio-effects",
    title: "Audio Effects",
    description: "Apply filters, speed changes, reverse, and volume adjustments to audio.",
    category: "audio",
    icon: "Sparkles",
    href: "/tools/audio/effects",
    formats: ["MP3", "WAV", "AAC", "OGG", "FLAC"],
    runtime: {
      action: "effects",
      engines: ["ffmpeg"],
      input: {
        accept: "audio/*",
        formats: "MP3, WAV, AAC, OGG, FLAC",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { metadataInspection: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Change playback speed without pitch shifting",
      "Reverse audio playback",
      "Adjust volume with gain control",
      "Apply equalizer presets and filters",
    ],
    howItWorks: [
      "Upload your audio track to apply effects.",
      "Select speed, reverse, volume, or filter options.",
      "Process and download the modified audio file.",
    ],
  },
  {
    id: "image-convert",
    title: "Image Converter",
    description: "Convert images between JPG, PNG, WebP, GIF, BMP, TIFF, and AVIF formats.",
    category: "image",
    icon: "ImageUp",
    href: "/tools/image/convert",
    formats: ["JPG", "PNG", "WebP", "GIF", "BMP", "TIFF", "AVIF"],
    runtime: {
      action: "convert",
      engines: ["ffmpeg", "browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, GIF, BMP, TIFF, AVIF",
        minCount: 1,
        maxCount: 20,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: {
        browserNativePreferred: true,
        metadataInspection: true,
        outputPreview: true,
        outputDownload: true,
      },
    },
    features: [
      "Convert between 7+ image formats",
      "Adjust output quality percentage",
      "Preserve transparency where supported",
      "Batch conversion for multiple images",
    ],
    howItWorks: [
      "Upload one image or a small batch in any supported format.",
      "Choose your target format and quality setting.",
      "Convert and download the new image files.",
    ],
  },
  {
    id: "image-compress",
    title: "Image Compressor",
    description: "Optimize and compress images to reduce file size while maintaining quality.",
    category: "image",
    icon: "FileDown",
    href: "/tools/image/compress",
    formats: ["JPG", "PNG", "WebP"],
    runtime: {
      action: "compress",
      engines: ["ffmpeg", "browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: {
        browserNativePreferred: true,
        metadataInspection: true,
        outputPreview: true,
        outputDownload: true,
      },
    },
    features: [
      "Quality-based compression with preview",
      "Lossy and lossless compression options",
      "Real-time file size comparison",
      "Choose privacy-first stripping or slower metadata-preserve export",
    ],
    howItWorks: [
      "Upload your image to compress.",
      "Adjust quality, output format, and metadata handling to balance size, compatibility, and privacy.",
      "Compress and download the optimized image.",
    ],
  },
  {
    id: "image-resize",
    title: "Image Resizer",
    description: "Resize images to exact dimensions or scale by percentage with aspect ratio lock.",
    category: "image",
    icon: "Maximize",
    href: "/tools/image/resize",
    formats: ["JPG", "PNG", "WebP", "GIF", "BMP", "TIFF"],
    runtime: {
      action: "resize",
      engines: ["ffmpeg", "browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, GIF, BMP, TIFF",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: {
        browserNativePreferred: true,
        metadataInspection: true,
        outputPreview: true,
        outputDownload: true,
      },
    },
    features: [
      "Resize by exact pixel dimensions",
      "Scale by percentage (50%, 200%, etc.)",
      "Lock or unlock aspect ratio",
      "Preset sizes for social media platforms",
    ],
    howItWorks: [
      "Upload your image to resize.",
      "Enter target dimensions or choose a preset.",
      "Resize and download the adjusted image.",
    ],
  },
  {
    id: "image-batch-compress",
    title: "Batch Image Compressor",
    description: "Compress multiple images at once with consistent quality settings.",
    category: "image",
    icon: "Files",
    href: "/tools/image/batch-compress",
    formats: ["JPG", "PNG", "WebP"],
    runtime: {
      action: "batch-compress",
      engines: ["ffmpeg", "browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP",
        minCount: 2,
        maxCount: 50,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: {
        multiFile: true,
        browserNativePreferred: true,
        metadataInspection: true,
        outputPreview: true,
        outputDownload: true,
      },
    },
    features: [
      "Process multiple images simultaneously",
      "Consistent quality settings across all files",
      "Download individual or ZIP archive",
      "Real-time progress per image",
    ],
    howItWorks: [
      "Upload multiple images to the batch area.",
      "Set your preferred quality and format settings.",
      "Compress all images and download them individually or as a ZIP.",
    ],
  },
  {
    id: "video-gif",
    title: "Video to GIF",
    description: "Convert video clips to animated GIF with custom FPS, size, and duration controls.",
    category: "video",
    icon: "Clapperboard",
    href: "/tools/video/gif",
    formats: ["GIF"],
    runtime: {
      action: "gif",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV, AVI",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputPreview: true, outputDownload: true },
    },
    features: [
      "Palette-optimised GIF for sharp colors",
      "Control FPS (5–20) and output width",
      "Set start time and clip duration",
      "No upload — processed locally in browser",
    ],
    howItWorks: [
      "Drop or select a video file.",
      "Choose FPS, width, start time, and duration.",
      "Click Convert and download your GIF.",
    ],
  },
  {
    id: "video-extract-audio",
    title: "Extract Audio",
    description: "Extract the audio track from any video file and save it as MP3, AAC, WAV, OGG, or FLAC.",
    category: "video",
    icon: "Music",
    href: "/tools/video/extract-audio",
    formats: ["MP3", "AAC", "WAV", "OGG", "FLAC"],
    runtime: {
      action: "extract-audio",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV, AVI, MKV",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputPreview: true, outputDownload: true },
    },
    features: [
      "Output to MP3, AAC, WAV, OGG, or FLAC",
      "High-quality audio extraction",
      "Preview audio before downloading",
      "Works entirely in your browser",
    ],
    howItWorks: [
      "Drop or select a video file.",
      "Choose your preferred audio format.",
      "Extract and download the audio track.",
    ],
  },
  {
    id: "video-mute",
    title: "Mute Video",
    description: "Remove the audio track from a video without re-encoding. Fast stream-copy output.",
    category: "video",
    icon: "VolumeX",
    href: "/tools/video/mute",
    formats: ["MP4", "WebM"],
    runtime: {
      action: "mute",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV, MKV, AVI",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputPreview: true, outputDownload: true },
    },
    features: [
      "Remove audio without re-encoding video",
      "Instant stream-copy — same quality",
      "Output to same format, MP4, or WebM",
      "100% private — no server upload",
    ],
    howItWorks: [
      "Drop or select a video file.",
      "Choose output format (or keep same).",
      "Click Remove audio and download.",
    ],
  },
  {
    id: "image-crop",
    title: "Image Crop",
    description: "Crop images with a draggable crop box. Supports free crop and common aspect ratios.",
    category: "image",
    icon: "Crop",
    href: "/tools/image/crop",
    formats: ["JPG", "PNG", "WebP"],
    runtime: {
      action: "crop",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, GIF, BMP",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { browserNativePreferred: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Drag-to-crop with corner handles",
      "Aspect ratio presets: 1:1, 4:3, 16:9, and more",
      "Rule-of-thirds grid overlay",
      "Instant Canvas-based crop — no server",
    ],
    howItWorks: [
      "Drop or select an image file.",
      "Drag the crop handles to select the area.",
      "Click Crop and download the result.",
    ],
  },
  {
    id: "image-rotate",
    title: "Image Rotate",
    description: "Rotate images 90°/180°/270° or flip horizontally/vertically. Save as PNG, JPG, or WebP.",
    category: "image",
    icon: "RotateCw",
    href: "/tools/image/rotate",
    formats: ["JPG", "PNG", "WebP"],
    runtime: {
      action: "rotate",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, GIF, BMP",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { browserNativePreferred: true, outputPreview: true, outputDownload: true },
    },
    features: [
      "Rotate left, right, or 180°",
      "Flip horizontal or vertical",
      "Live transform preview",
      "Save as PNG, JPG, or WebP",
    ],
    howItWorks: [
      "Drop or select an image file.",
      "Click rotation/flip buttons to transform.",
      "Apply and download the result.",
    ],
  },
  {
    id: "pdf-to-images",
    title: "PDF to Images",
    description: "Convert PDF pages to high-resolution PNG or JPG images — rendered in your browser via PDF.js.",
    category: "pdf" as ToolCategory,
    icon: "FileImage",
    href: "/tools/pdf/to-images",
    formats: ["PNG", "JPG"],
    runtime: {
      action: "pdf-to-images",
      engines: ["document"],
      input: {
        accept: "application/pdf,.pdf",
        formats: "PDF",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputPreview: true, outputDownload: true },
    },
    features: [
      "Renders each PDF page to an image",
      "Choose 1×–4× resolution (72–288 dpi)",
      "Output as PNG or JPG",
      "Download all pages as a ZIP",
    ],
    howItWorks: [
      "Drop or select a PDF file.",
      "Choose image format and resolution.",
      "Convert and download pages individually or as ZIP.",
    ],
  },

  // ── Sprint 6 ─────────────────────────────────────────────────────────────

  {
    id: "image-filters",
    title: "Image Filters",
    description: "Apply brightness, contrast, saturation, grayscale, sepia, blur and more.",
    category: "image",
    icon: "Sparkles",
    href: "/tools/image/filters",
    formats: ["JPG", "PNG", "WebP", "GIF"],
    features: [
      "Adjust brightness, contrast, saturation",
      "Grayscale, sepia, invert presets",
      "Blur slider",
      "Live preview — no upload needed",
    ],
    howItWorks: [
      "Upload an image.",
      "Drag sliders or pick a preset.",
      "Download the filtered image.",
    ],
    runtime: {
      action: "image-filters",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, GIF",
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputPreview: true, outputDownload: true },
    },
  },

  {
    id: "image-watermark",
    title: "Image Watermark",
    description: "Add a custom text watermark to any image. Control position, opacity, color and size.",
    category: "image",
    icon: "PenTool",
    href: "/tools/image/watermark",
    formats: ["JPG", "PNG", "WebP"],
    features: [
      "9-position placement grid",
      "Opacity and font-size controls",
      "Custom color picker",
      "Live preview before download",
    ],
    howItWorks: [
      "Upload an image.",
      "Type your watermark text and adjust settings.",
      "Download the watermarked image.",
    ],
    runtime: {
      action: "image-watermark",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP",
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputPreview: true, outputDownload: true },
    },
  },

  {
    id: "video-reverse",
    title: "Reverse Video",
    description: "Play your video backwards. Optionally reverse the audio track too.",
    category: "video",
    icon: "RotateCcw",
    href: "/tools/video/reverse",
    formats: ["MP4", "WebM", "MOV", "AVI"],
    features: [
      "Full video reversal using FFmpeg",
      "Optional audio reversal",
      "MP4 and WebM output",
      "100% private — no upload",
    ],
    howItWorks: [
      "Drop your video.",
      "Choose whether to reverse audio.",
      "Download the reversed video.",
    ],
    runtime: {
      action: "video-reverse",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV, AVI",
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputPreview: true, outputDownload: true },
    },
  },

  {
    id: "pdf-merge",
    title: "Merge PDF",
    description: "Combine multiple PDF files into a single document. Drag to reorder pages.",
    category: "pdf" as ToolCategory,
    icon: "FilePlus",
    href: "/tools/pdf/merge",
    formats: ["PDF"],
    features: [
      "Merge unlimited PDFs",
      "Drag-to-reorder files",
      "Preserves original quality",
      "Browser-native — no upload",
    ],
    howItWorks: [
      "Upload 2 or more PDF files.",
      "Drag to set the order.",
      "Merge and download the combined PDF.",
    ],
    runtime: {
      action: "pdf-merge",
      engines: ["document"],
      input: {
        accept: "application/pdf,.pdf",
        formats: "PDF",
        minCount: 2,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { multiFile: true, outputDownload: true },
    },
  },
  {
    id: "pdf-split",
    title: "Split PDF",
    description: "Split one PDF into separate pages or custom page ranges directly in your browser.",
    category: "pdf" as ToolCategory,
    icon: "Scissors",
    href: "/tools/pdf/split",
    formats: ["PDF"],
    features: [
      "Split every page into its own PDF",
      "Create custom page-range files like 1-3, 4-6, 10",
      "Download individual outputs or one ZIP archive",
      "Browser-only workflow with no document upload",
    ],
    howItWorks: [
      "Upload a PDF file and choose whether to split every page or export custom ranges.",
      "Enter page ranges when needed and review the planned output groups.",
      "Split the document and download each PDF separately or as a ZIP archive.",
    ],
    runtime: {
      action: "pdf-split",
      engines: ["document"],
      input: {
        accept: "application/pdf,.pdf",
        formats: "PDF",
        minCount: 1,
        maxCount: 1,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputDownload: true },
    },
  },
  {
    id: "pdf-reorder",
    title: "Reorder PDF Pages",
    description: "Rearrange PDF page order in your browser and save the updated document without uploading it.",
    category: "pdf" as ToolCategory,
    icon: "Combine",
    href: "/tools/pdf/reorder",
    formats: ["PDF"],
    features: [
      "Move pages up or down before saving",
      "Keep the document private in your browser",
      "Save a clean reordered PDF",
      "Useful for reports, contracts, and scan packets",
    ],
    howItWorks: [
      "Upload one PDF and review its page list.",
      "Move pages into the order you want and confirm the sequence.",
      "Save the reordered PDF and download the updated file.",
    ],
    runtime: {
      action: "pdf-reorder",
      engines: ["document"],
      input: {
        accept: "application/pdf,.pdf",
        formats: "PDF",
        minCount: 1,
        maxCount: 1,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputDownload: true },
    },
  },
  {
    id: "pdf-compress",
    title: "Compress PDF",
    description: "Reduce PDF size in the browser by rebuilding pages with lighter image settings for sharing and upload limits.",
    category: "pdf" as ToolCategory,
    icon: "FileDown",
    href: "/tools/pdf/compress",
    formats: ["PDF"],
    features: [
      "Reduce PDF size with lower render scale and JPEG quality",
      "Useful for email, portals, and strict upload limits",
      "Runs locally in your browser with no upload",
      "Shows before-and-after file size so the tradeoff is clear",
    ],
    howItWorks: [
      "Upload your PDF and choose a compression preset or custom quality.",
      "The tool redraws each page with lighter settings to reduce size.",
      "Download the rebuilt PDF once compression finishes.",
    ],
    runtime: {
      action: "pdf-compress",
      engines: ["document"],
      input: {
        accept: "application/pdf,.pdf",
        formats: "PDF",
        minCount: 1,
        maxCount: 1,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputDownload: true },
    },
  },
  {
    id: "pdf-extract-images",
    title: "Extract Images from PDF",
    description: "Pull embedded raster images out of a PDF in your browser and download them individually or as a ZIP.",
    category: "pdf" as ToolCategory,
    icon: "FileImage",
    href: "/tools/pdf/extract-images",
    formats: ["PNG"],
    features: [
      "Best-effort extraction of embedded raster images",
      "Download each extracted image or one ZIP archive",
      "Keeps the source PDF on your device",
      "Useful for brochures, scans, and design PDFs that contain placed images",
    ],
    howItWorks: [
      "Upload a PDF and let the tool inspect each page for embedded raster images.",
      "Review the extracted images that were found in the document.",
      "Download individual files or export everything as a ZIP archive.",
    ],
    runtime: {
      action: "pdf-extract-images",
      engines: ["document"],
      input: {
        accept: "application/pdf,.pdf",
        formats: "PDF",
        minCount: 1,
        maxCount: 1,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputDownload: true },
    },
  },

  {
    id: "video-crop",
    title: "Crop Video",
    description: "Crop any video to remove unwanted edges or change aspect ratio.",
    category: "video",
    icon: "Crop",
    href: "/tools/video/crop",
    formats: ["MP4", "WebM", "MOV"],
    features: [
      "Visual drag-to-crop on first frame",
      "Aspect ratio presets (16:9, 9:16, 1:1, 4:3)",
      "Numeric pixel inputs for precise crop",
      "FFmpeg crop filter — lossless region cut",
    ],
    howItWorks: [
      "Upload a video.",
      "Drag the crop region or enter pixel values.",
      "Export the cropped video.",
    ],
    runtime: {
      action: "video-crop",
      engines: ["ffmpeg"],
      input: {
        accept: "video/*",
        formats: "MP4, WebM, MOV",
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { outputPreview: true, outputDownload: true },
    },
  },
  {
    id: "image-thumbnail",
    title: "Thumbnail Generator",
    description: "Create clean image thumbnails for YouTube, blogs, product cards, and social previews.",
    category: "image",
    icon: "ImageUp",
    href: "/tools/image/thumbnail",
    formats: ["JPG", "PNG", "WebP"],
    features: [
      "One-click thumbnail presets for video, blog, store, and social use",
      "Keep aspect ratio or force an exact thumbnail size",
      "Choose JPG, PNG, or WebP output",
      "Fast browser-native resizing with no uploads",
    ],
    howItWorks: [
      "Upload an image and choose a thumbnail preset or set custom dimensions.",
      "Pick the output format and quality that fit your destination.",
      "Generate the thumbnail and download the resized image instantly.",
    ],
    runtime: {
      action: "image-thumbnail",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, AVIF",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: {
        browserNativePreferred: true,
        metadataInspection: true,
        outputPreview: true,
        outputDownload: true,
      },
    },
  },
  {
    id: "image-metadata",
    title: "Image Metadata Remover",
    description: "Strip EXIF and similar metadata from images in your browser for privacy-safe sharing.",
    category: "image",
    icon: "Sparkles",
    href: "/tools/image/metadata",
    formats: ["JPG", "PNG", "WebP"],
    features: [
      "Remove EXIF, GPS, and camera metadata from exported images",
      "Keep image work local in the browser",
      "Choose JPG, PNG, or WebP output",
      "Useful before sharing photos or screenshots publicly",
    ],
    howItWorks: [
      "Upload your image and choose the output format you want.",
      "The tool rebuilds the image without carrying over embedded metadata.",
      "Download the privacy-clean export and share it with less hidden data attached.",
    ],
    runtime: {
      action: "image-metadata",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, AVIF",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { browserNativePreferred: true, metadataInspection: true, outputPreview: true, outputDownload: true },
    },
  },
  {
    id: "image-blur-redact",
    title: "Blur or Redact Image",
    description: "Hide part of an image with a blur region or solid redaction block directly in your browser.",
    category: "image",
    icon: "Crop",
    href: "/tools/image/blur-redact",
    formats: ["JPG", "PNG", "WebP"],
    features: [
      "Select a region to hide on the image preview",
      "Choose blur for softer hiding or redact for solid blocking",
      "Control blur strength and redaction color",
      "Keep everything local in your browser with no upload",
    ],
    howItWorks: [
      "Upload an image and drag over the area you want to hide.",
      "Choose blur or redact mode and fine-tune the settings.",
      "Apply the change and download the protected image.",
    ],
    runtime: {
      action: "image-blur-redact",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, AVIF",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { browserNativePreferred: true, metadataInspection: true, outputPreview: true, outputDownload: true },
    },
  },
  {
    id: "image-icons",
    title: "Favicon and App Icon Generator",
    description: "Generate a practical favicon and app-icon PNG set from one source image in your browser.",
    category: "image",
    icon: "Files",
    href: "/tools/image/icons",
    formats: ["PNG", "ZIP"],
    features: [
      "Generate multiple favicon and app-icon sizes from one image",
      "Includes common browser, Apple touch, and PWA icon dimensions",
      "Download individual PNGs or one ZIP archive",
      "Useful for websites, web apps, and installable PWAs",
    ],
    howItWorks: [
      "Upload a square-friendly source image with enough resolution for larger icons.",
      "Generate the icon set and review the common favicon and app sizes.",
      "Download the whole PNG pack or save individual sizes you need.",
    ],
    runtime: {
      action: "image-icons",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, AVIF",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { browserNativePreferred: true, metadataInspection: true, outputPreview: true, outputDownload: true },
    },
  },
  {
    id: "image-social-resize",
    title: "Social Media Image Resizer",
    description: "Resize images for common social, blog, and ad placements with ready-to-use browser-side presets.",
    category: "image",
    icon: "Maximize",
    href: "/tools/image/social-resize",
    formats: ["JPG", "PNG", "WebP"],
    features: [
      "Preset sizes for Instagram, X, Facebook, LinkedIn, YouTube, and Open Graph",
      "Generate one size or a whole platform pack",
      "Choose JPG, PNG, or WebP output",
      "Fast browser-native resizing without uploads",
    ],
    howItWorks: [
      "Upload your image and choose the social placement you want to target.",
      "Generate one preset or a batch of related sizes for that platform.",
      "Download the ready-to-post exports individually or as a ZIP archive.",
    ],
    runtime: {
      action: "image-social-resize",
      engines: ["browser-image"],
      input: {
        accept: "image/*",
        formats: "JPG, PNG, WebP, AVIF",
        minCount: 1,
        maxCount: 1,
        warningFileSizeBytes: FILE_SIZE_LIMITS.warning,
        maxFileSizeBytes: FILE_SIZE_LIMITS.max,
      },
      capabilities: { browserNativePreferred: true, metadataInspection: true, outputPreview: true, outputDownload: true },
    },
  },
];

export const categories = categoryDefinitions;
export const tools = toolCatalog;

const relatedToolOrder: Partial<Record<ToolId, ToolId[]>> = {
  "video-convert": ["video-compress", "video-trim", "video-merge", "video-burn-caption", "video-extract-audio"],
  "video-compress": ["video-convert", "video-trim", "video-mute", "video-gif", "video-crop"],
  "video-trim": ["video-convert", "video-compress", "video-gif", "video-burn-caption", "video-merge"],
  "video-merge": ["video-trim", "video-convert", "video-compress", "video-effects", "video-burn-caption"],
  "video-effects": ["video-convert", "video-trim", "video-reverse", "video-speed", "video-crop"],
  "video-burn-caption": ["video-convert", "video-trim", "video-compress", "video-mute", "video-merge"],
  "video-extract-audio": ["audio-convert", "audio-compress", "audio-trim", "video-mute", "video-convert"],
  "video-gif": ["video-trim", "video-compress", "video-convert", "video-crop", "image-compress"],
  "video-mute": ["video-compress", "video-convert", "video-trim", "video-extract-audio", "video-merge"],
  "video-reverse": ["video-effects", "video-trim", "video-convert", "video-speed", "video-compress"],
  "video-speed": ["video-effects", "video-trim", "video-convert", "audio-effects", "video-compress"],
  "video-crop": ["video-trim", "video-compress", "video-convert", "video-gif", "video-burn-caption"],
  "audio-convert": ["audio-compress", "audio-trim", "audio-effects", "audio-merge", "video-extract-audio"],
  "audio-compress": ["audio-convert", "audio-trim", "audio-effects", "video-extract-audio", "audio-merge"],
  "audio-trim": ["audio-convert", "audio-compress", "audio-merge", "audio-effects", "video-trim"],
  "audio-merge": ["audio-trim", "audio-convert", "audio-compress", "audio-effects", "video-merge"],
  "audio-effects": ["audio-trim", "audio-convert", "audio-compress", "video-speed", "video-extract-audio"],
  "image-convert": ["image-compress", "image-resize", "image-crop", "image-rotate", "image-batch-compress"],
  "image-compress": ["image-convert", "image-resize", "image-batch-compress", "image-crop", "image-filters"],
  "image-resize": ["image-compress", "image-convert", "image-crop", "image-watermark", "image-filters"],
  "image-batch-compress": ["image-compress", "image-convert", "image-resize", "image-watermark", "image-filters"],
  "image-crop": ["image-resize", "image-convert", "image-rotate", "image-watermark", "image-filters"],
  "image-rotate": ["image-crop", "image-resize", "image-convert", "image-filters", "image-watermark"],
  "image-filters": ["image-compress", "image-watermark", "image-crop", "image-resize", "image-convert"],
  "image-watermark": ["image-resize", "image-crop", "image-compress", "image-convert", "image-filters"],
  "pdf-to-images": ["pdf-from-images", "pdf-merge", "image-convert", "image-compress", "image-resize"],
  "pdf-from-images": ["pdf-to-images", "pdf-merge", "image-resize", "image-compress", "image-convert"],
  "pdf-merge": ["pdf-to-images", "pdf-from-images", "image-convert", "image-compress", "image-resize"],
  "pdf-split": ["pdf-merge", "pdf-to-images", "pdf-from-images", "image-thumbnail", "image-resize"],
  "image-thumbnail": ["image-resize", "image-convert", "image-compress", "image-crop", "pdf-to-images"],
  "pdf-reorder": ["pdf-split", "pdf-merge", "pdf-compress", "pdf-to-images", "pdf-extract-images"],
  "pdf-compress": ["pdf-split", "pdf-merge", "pdf-to-images", "pdf-extract-images", "image-compress"],
  "pdf-extract-images": ["pdf-to-images", "pdf-split", "image-convert", "image-thumbnail", "image-social-resize"],
  "image-metadata": ["image-convert", "image-compress", "image-social-resize", "image-thumbnail", "image-icons"],
  "image-blur-redact": ["image-crop", "image-resize", "image-watermark", "image-social-resize", "image-convert"],
  "image-icons": ["image-thumbnail", "image-social-resize", "image-resize", "image-convert", "image-compress"],
  "image-social-resize": ["image-resize", "image-thumbnail", "image-convert", "image-compress", "image-icons"],
};

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return toolCatalog.filter((tool) => tool.category === category);
}

export function getToolById(id: ToolId | string): ToolDefinition | undefined {
  return toolCatalog.find((tool) => tool.id === id);
}

export function getToolByHref(href: string): ToolDefinition | undefined {
  return toolCatalog.find((tool) => tool.href === href);
}

export function getRelatedTools(toolId: ToolId | string, limit = 4): ToolDefinition[] {
  const baseTool = getToolById(toolId);
  if (!baseTool) return [];

  const seen = new Set<string>([baseTool.id]);
  const related: ToolDefinition[] = [];

  const pushTool = (tool: ToolDefinition | undefined) => {
    if (!tool || seen.has(tool.id)) return;
    seen.add(tool.id);
    related.push(tool);
  };

  for (const candidateId of relatedToolOrder[baseTool.id] ?? []) {
    pushTool(getToolById(candidateId));
    if (related.length >= limit) return related;
  }

  for (const candidate of toolCatalog) {
    if (candidate.id === baseTool.id) continue;
    if (candidate.category === baseTool.category && candidate.runtime.action === baseTool.runtime.action) {
      pushTool(candidate);
      if (related.length >= limit) return related;
    }
  }

  for (const candidate of toolCatalog) {
    if (candidate.id === baseTool.id) continue;
    if (candidate.category === baseTool.category) {
      pushTool(candidate);
      if (related.length >= limit) return related;
    }
  }

  for (const candidate of toolCatalog) {
    if (candidate.id === baseTool.id) continue;
    if (candidate.runtime.action === baseTool.runtime.action) {
      pushTool(candidate);
      if (related.length >= limit) return related;
    }
  }

  return related;
}

export function getCategoryById(category: ToolCategory): ToolCategoryDefinition | undefined {
  return categoryDefinitions.find((item) => item.id === category);
}
