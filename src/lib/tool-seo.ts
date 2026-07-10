import type { ToolSeoData } from "@/lib/seo-types";
import { seoDataMap } from "@/lib/seo-data";
import { toolSeoOverrides } from "@/lib/tool-seo-overrides";
import { getToolById } from "@/lib/tools";

const metaTitleOverrides: Record<string, string> = {
  "video-convert": "Online Video Converter Free - Convert MP4, MOV, WebM & More",
  "video-compress": "Compress Video Online Free - Reduce MP4, MOV & WebM File Size",
  "video-trim": "Trim Video Online Free - Cut MP4, WebM & MOV Clips",
  "video-merge": "Merge Videos Online Free - Combine MP4, MOV & WebM Clips",
  "video-effects": "Video Effects Editor Online Free - Speed, Filters & More",
  "video-burn-caption": "Add Captions to Video Online Free - Burn Subtitles Into Video",
  "audio-convert": "Online Audio Converter Free - Convert MP3, WAV, FLAC & More",
  "audio-compress": "Compress Audio Online Free - Reduce MP3, WAV & FLAC File Size",
  "audio-trim": "Trim Audio Online Free - Cut MP3, WAV & FLAC Files",
  "audio-merge": "Merge Audio Files Online Free - Join MP3, WAV & FLAC Tracks",
  "audio-effects": "Audio Effects Editor Online Free - Speed, Fade, Normalize & Volume",
  "image-convert": "Online Image Converter Free - Convert JPG, PNG, WebP & AVIF",
  "image-compress": "Compress Image Online Free - Reduce JPG, PNG & WebP File Size",
  "image-resize": "Resize Image Online Free - Change JPG, PNG & WebP Dimensions",
  "image-batch-compress": "Batch Image Compressor Online Free - Compress JPG, PNG & WebP Files",
  "video-gif": "Video to GIF Converter Online Free - Make Animated GIFs",
  "video-extract-audio": "Extract Audio from Video Online Free - Save MP3, WAV, AAC & More",
  "video-mute": "Mute Video Online Free - Remove Audio From MP4, MOV & WebM",
  "image-crop": "Crop Image Online Free - JPG, PNG & WebP Crop Tool",
  "image-rotate": "Rotate Image Online Free - Rotate or Flip JPG, PNG & WebP",
  "pdf-to-images": "PDF to JPG or PNG Online Free - Convert PDF Pages to Images",
  "video-speed": "Change Video Speed Online Free - Slow Down or Speed Up Video",
  "pdf-from-images": "Images to PDF Online Free - Convert JPG, PNG & WebP to PDF",
  "image-filters": "Image Filters Online Free - Brightness, Contrast, Blur & More",
  "image-watermark": "Add Watermark to Image Online Free - Text Watermark Tool",
  "video-reverse": "Reverse Video Online Free - Play MP4 & WebM Backwards",
  "pdf-merge": "Merge PDF Files Online Free - Combine PDFs in Your Browser",
  "video-crop": "Crop Video Online Free - Remove Black Bars and Change Aspect Ratio",
  "pdf-split": "Split PDF Online Free - Separate Pages or Export Page Ranges",
  "image-thumbnail": "Thumbnail Generator Online Free - Resize Images for Cards and Previews",
  "pdf-reorder": "Reorder PDF Pages Online Free - Rearrange PDF Page Order",
  "pdf-compress": "Compress PDF Online Free - Reduce PDF File Size in Your Browser",
  "pdf-extract-images": "Extract Images from PDF Online Free - Save Embedded PDF Images",
  "image-metadata": "Remove Image Metadata Online Free - Strip EXIF and GPS Data",
  "image-blur-redact": "Blur or Redact Image Online Free - Hide Sensitive Parts of a Photo",
  "image-icons": "Favicon and App Icon Generator Online Free - Create PNG Icon Sets",
  "image-social-resize": "Social Media Image Resizer Online Free - Resize for Instagram, X and More",
};

const keywordOverrides: Record<string, string[]> = {
  "video-convert": [
    "video converter",
    "online video converter",
    "video converter online free",
    "free online video converter",
    "convert video",
    "video convert",
    "video format converter",
    "change video format",
    "how to convert video formats",
  ],
  "video-compress": [
    "compress video",
    "video compressor",
    "compress video online",
    "reduce video file size",
    "video file compressor",
    "compress mp4",
  ],
  "video-trim": [
    "trim video",
    "video trimmer",
    "cut video online",
    "video cutter",
    "trim mp4",
    "cut video clips",
  ],
  "video-merge": [
    "merge videos",
    "video merger",
    "combine videos",
    "join video files",
    "merge mp4 files",
    "combine video clips",
  ],
  "video-effects": [
    "video effects editor",
    "edit video online",
    "video filter tool",
    "change video speed",
    "video enhancer",
  ],
  "video-burn-caption": [
    "add captions to video",
    "burn subtitles into video",
    "video subtitle burner",
    "add subtitles to mp4",
  ],
  "audio-convert": [
    "audio converter",
    "online audio converter",
    "convert audio",
    "mp3 converter",
    "wav to mp3",
    "audio format converter",
  ],
  "audio-compress": [
    "compress audio",
    "audio compressor",
    "reduce audio file size",
    "compress mp3",
    "compress wav",
  ],
  "audio-trim": [
    "trim audio",
    "audio trimmer",
    "cut audio online",
    "mp3 cutter",
    "trim mp3",
  ],
  "audio-merge": [
    "merge audio files",
    "audio merger",
    "join audio files",
    "combine mp3 files",
    "merge mp3",
  ],
  "audio-effects": [
    "audio effects editor",
    "change audio speed",
    "normalize audio",
    "fade audio in and out",
    "audio volume booster",
  ],
  "image-convert": [
    "image converter",
    "online image converter",
    "convert image",
    "jpg to png",
    "png to webp",
    "image format converter",
  ],
  "image-compress": [
    "compress image",
    "image compressor",
    "reduce image size",
    "compress jpg",
    "compress png",
    "compress webp",
  ],
  "image-resize": [
    "resize image",
    "image resizer",
    "change image size",
    "resize jpg",
    "resize png",
  ],
  "image-batch-compress": [
    "batch image compressor",
    "compress multiple images",
    "bulk image compression",
    "batch compress jpg",
    "batch compress png",
  ],
  "video-gif": [
    "video to gif",
    "gif maker from video",
    "convert video to gif",
    "mp4 to gif",
    "gif converter",
  ],
  "video-extract-audio": [
    "extract audio from video",
    "video to audio",
    "audio extractor",
    "extract mp3 from video",
    "mp4 to mp3",
  ],
  "video-mute": [
    "mute video",
    "remove audio from video",
    "video muter",
    "remove sound from mp4",
  ],
  "image-crop": [
    "crop image",
    "image cropper",
    "crop photo online",
    "crop jpg",
    "crop png",
  ],
  "image-rotate": [
    "rotate image",
    "flip image",
    "image rotator",
    "rotate jpg",
    "rotate png",
  ],
  "pdf-to-images": [
    "pdf to jpg",
    "pdf to png",
    "convert pdf to images",
    "pdf page to image",
  ],
  "pdf-from-images": [
    "images to pdf",
    "jpg to pdf",
    "png to pdf",
    "photo to pdf",
  ],
  "pdf-merge": [
    "merge pdf",
    "merge pdf files",
    "combine pdf",
    "join pdf files",
    "pdf merger",
  ],
  "image-filters": [
    "image filters",
    "photo filters online",
    "edit image brightness",
    "adjust image contrast",
  ],
  "image-watermark": [
    "watermark image",
    "add watermark to image",
    "text watermark tool",
    "watermark photos online",
  ],
  "video-reverse": [
    "reverse video",
    "play video backwards",
    "video reverser",
    "reverse mp4",
  ],
  "video-speed": [
    "change video speed",
    "speed up video",
    "slow down video",
    "video speed changer",
  ],
  "video-crop": [
    "crop video",
    "video cropper",
    "remove black bars from video",
    "change video aspect ratio",
  ],
  "pdf-split": [
    "split pdf",
    "pdf splitter",
    "split pdf pages",
    "extract pdf pages",
    "separate pdf pages",
  ],
  "image-thumbnail": [
    "thumbnail generator",
    "image thumbnail maker",
    "create thumbnail from image",
    "thumbnail resizer",
    "social thumbnail generator",
  ],
  "pdf-reorder": [
    "reorder pdf pages",
    "rearrange pdf pages",
    "change pdf page order",
    "organize pdf pages",
  ],
  "pdf-compress": [
    "compress pdf",
    "reduce pdf size",
    "pdf compressor",
    "make pdf smaller",
  ],
  "pdf-extract-images": [
    "extract images from pdf",
    "pdf image extractor",
    "save images from pdf",
    "pull images from pdf",
  ],
  "image-metadata": [
    "remove image metadata",
    "strip exif",
    "remove exif data from photo",
    "remove gps from image",
  ],
  "image-blur-redact": [
    "blur image",
    "redact image",
    "hide sensitive part of photo",
    "blur text in image",
  ],
  "image-icons": [
    "favicon generator",
    "app icon generator",
    "website icon generator",
    "pwa icon generator",
  ],
  "image-social-resize": [
    "social media image resizer",
    "instagram image resizer",
    "facebook image size tool",
    "open graph image resizer",
  ],
};

const mojibakeReplacements: Array<[string, string]> = [
  ["â€”", "—"],
  ["â€“", "–"],
  ["â€\"", "—"],
  ["â€˜", "'"],
  ["â€™", "'"],
  ['â€œ', '"'],
  ['â€\x9d', '"'],
  ["â€¦", "..."],
  ["â†’", "→"],
  ["Ã—", "×"],
  ["Â°", "°"],
  ["Â·", "·"],
  ["â‰ˆ", "≈"],
  ["â‰¤", "≤"],
  ["â‰¥", "≥"],
  ["â€²", "'"],
  ["â€³", '"'],
  ["â€", '"'],
  ["Â", ""],
];

function toTitleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function uniqueLowercase(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((item) => normalizeSeoText(item).trim().toLowerCase())
        .filter(Boolean)
    )
  );
}

function getActionKeywordPhrases(toolId: string) {
  const tool = getToolById(toolId);
  if (!tool) return [];

  switch (tool.runtime.action) {
    case "convert":
      return ["converter", "convert", "format converter", "file converter"];
    case "compress":
    case "batch-compress":
      return ["compressor", "compress", "file compressor", "reduce file size"];
    case "trim":
      return ["trimmer", "trim", "cut", "clip cutter"];
    case "merge":
      return ["merger", "merge", "join", "combiner"];
    case "effects":
      return ["editor", "effects", "filters", "enhancer"];
    case "resize":
      return ["resizer", "resize", "dimension changer", "size changer"];
    case "gif":
      return ["gif converter", "gif maker", "video to gif"];
    case "extract-audio":
      return ["audio extractor", "extract audio", "video to audio"];
    case "mute":
      return ["mute tool", "remove audio", "video muter"];
    case "crop":
      return ["crop tool", "cropper", "aspect ratio crop"];
    case "burn-caption":
      return ["caption tool", "subtitle burner", "add captions"];
    case "image-filters":
      return ["filters", "photo filters", "image editor"];
    case "image-watermark":
      return ["watermark tool", "text watermark", "watermark editor"];
    case "video-reverse":
      return ["reverse tool", "play backwards", "video reverser"];
    case "video-speed":
      return ["speed changer", "slow motion", "fast forward"];
    case "pdf-to-images":
      return ["pdf to jpg", "pdf to png", "pdf page converter"];
    case "pdf-from-images":
      return ["images to pdf", "jpg to pdf", "png to pdf"];
    case "pdf-merge":
      return ["pdf merger", "combine pdf", "join pdf"];
    case "pdf-split":
      return ["pdf splitter", "split pdf", "extract pdf pages"];
    case "pdf-reorder":
      return ["pdf organizer", "reorder pdf", "rearrange pdf pages"];
    case "pdf-compress":
      return ["pdf compressor", "compress pdf", "reduce pdf size"];
    case "pdf-extract-images":
      return ["pdf image extractor", "extract images from pdf", "save images from pdf"];
    case "image-metadata":
      return ["metadata remover", "remove exif", "image privacy cleaner"];
    case "image-blur-redact":
      return ["blur tool", "redaction tool", "hide sensitive areas"];
    case "image-icons":
      return ["favicon generator", "app icon maker", "icon pack generator"];
    case "image-social-resize":
      return ["social resizer", "platform image resizer", "open graph resizer"];
    default:
      return [tool.runtime.action];
  }
}

function buildFallbackKeywords(toolId: string) {
  const tool = getToolById(toolId);
  if (!tool) return [];

  const categoryName = toTitleCase(tool.category);
  const actionPhrases = getActionKeywordPhrases(toolId);
  const title = normalizeSeoText(tool.title);
  const formats = tool.formats.slice(0, 4);

  const base = [
    title,
    `${title} online`,
    `${title} free`,
    ...actionPhrases.flatMap((phrase) => [
      `${categoryName} ${phrase}`,
      `online ${categoryName} ${phrase}`,
      `free ${categoryName} ${phrase}`,
      `${phrase} online`,
    ]),
    ...formats.flatMap((format) => [
      `${format} ${categoryName} ${tool.runtime.action}`,
      `${format} ${categoryName} tool`,
    ]),
  ];

  return uniqueLowercase(base);
}

export function normalizeSeoText(value: string) {
  return mojibakeReplacements.reduce(
    (current, [searchValue, replacement]) => current.split(searchValue).join(replacement),
    value
  );
}

export function normalizeToolSeoData(data?: ToolSeoData | null) {
  if (!data) return null;

  return {
    ...data,
    h1: normalizeSeoText(data.h1),
    metaTitle: data.metaTitle ? normalizeSeoText(data.metaTitle) : undefined,
    metaDescription: normalizeSeoText(data.metaDescription),
    keywords: data.keywords?.map(normalizeSeoText),
    howToTitle: normalizeSeoText(data.howToTitle),
    howToSteps: data.howToSteps.map((step) => ({
      ...step,
      name: normalizeSeoText(step.name),
      text: normalizeSeoText(step.text),
    })),
    settingsGuide: normalizeSeoText(data.settingsGuide),
    formatTable: data.formatTable?.map((row) => ({
      ...row,
      format: normalizeSeoText(row.format),
      useCase: normalizeSeoText(row.useCase),
      size: normalizeSeoText(row.size),
      quality: normalizeSeoText(row.quality),
    })),
    bestSettings: data.bestSettings?.map((row) => ({
      ...row,
      label: normalizeSeoText(row.label),
      recommendation: normalizeSeoText(row.recommendation),
      why: normalizeSeoText(row.why),
    })),
    compatibilityNotes: data.compatibilityNotes?.map((note) => ({
      ...note,
      title: normalizeSeoText(note.title),
      body: normalizeSeoText(note.body),
    })),
    limitations: data.limitations?.map(normalizeSeoText),
    privacyNote: data.privacyNote ? normalizeSeoText(data.privacyNote) : undefined,
    editorialSections: data.editorialSections?.map((section) => ({
      title: normalizeSeoText(section.title),
      body: normalizeSeoText(section.body),
      points: section.points?.map(normalizeSeoText),
    })),
    faqs: data.faqs.map((faq) => ({
      ...faq,
      question: normalizeSeoText(faq.question),
      answer: normalizeSeoText(faq.answer),
    })),
  };
}

export function getToolSeoData(toolId: string) {
  const baseData = seoDataMap[toolId];
  const overrideData = toolSeoOverrides[toolId];

  if (!baseData && !overrideData) return null;

  return normalizeToolSeoData({
    ...(baseData ?? { toolId, h1: "", metaDescription: "", howToTitle: "", howToSteps: [], faqs: [] }),
    ...overrideData,
    toolId,
  } as ToolSeoData);
}

export function getToolHeroTitle(toolId: string) {
  const data = getToolSeoData(toolId);
  const tool = getToolById(toolId);
  return data?.h1 ?? normalizeSeoText(tool?.title ?? "Tool");
}

export function getToolMetaTitle(toolId: string) {
  const data = getToolSeoData(toolId);
  const tool = getToolById(toolId);
  return data?.metaTitle
    ?? normalizeSeoText(metaTitleOverrides[toolId] ?? tool?.title ?? "Tool");
}

export function getToolKeywords(toolId: string) {
  const data = getToolSeoData(toolId);
  return uniqueLowercase(data?.keywords ?? keywordOverrides[toolId] ?? buildFallbackKeywords(toolId));
}

export function getToolSeoSummary(toolId: string) {
  const tool = getToolById(toolId);
  const data = getToolSeoData(toolId);

  return {
    tool,
    data,
    heroTitle: getToolHeroTitle(toolId),
    metaTitle: getToolMetaTitle(toolId),
    metaDescription: normalizeSeoText(
      data?.metaDescription ?? tool?.description ?? "Free browser-based file tool."
    ),
    keywords: getToolKeywords(toolId),
  };
}
