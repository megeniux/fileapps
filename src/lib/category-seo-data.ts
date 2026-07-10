import type { ToolCategory } from "@/lib/tool-types";

export interface CategorySeoData {
  intro: string[];
  useCases: string[];
  howToTitle: string;
  howToSteps: string[];
  bestForTitle: string;
  bestForPoints: string[];
  privacyTitle: string;
  privacyBody: string;
  decisionGuideTitle: string;
  decisionGuide: string[];
  comparisonTitle: string;
  comparisonPoints: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const categorySeoDataMap: Record<ToolCategory, CategorySeoData> = {
  video: {
    intro: [
      "Use these browser-based video tools to convert formats, cut clips, reduce file size, extract audio, and prepare exports for sharing without uploading your footage to a remote server.",
      "The collection is designed for practical jobs that people do every day: make a video small enough for WhatsApp, trim a clean clip for social media, remove audio, turn a section into a GIF, or join several clips into one file.",
    ],
    useCases: [
      "Compress large phone recordings for email, messaging apps, and web upload",
      "Convert between MP4, WebM, MOV, MKV, and other common containers",
      "Trim highlights, remove dead space, or isolate a single clip from a longer recording",
      "Extract audio, mute a video, crop the frame, reverse motion, or change playback speed",
    ],
    howToTitle: "How to use the video tools",
    howToSteps: [
      "Choose the task you need, such as convert, compress, trim, mute, crop, or extract audio.",
      "Drop your file into the tool, inspect the preview, and choose the output settings that fit your device or destination platform.",
      "Process the file locally in your browser, review the output, and download the result when it is ready.",
    ],
    bestForTitle: "Best for",
    bestForPoints: [
      "Creators preparing exports for YouTube, Instagram, TikTok, X, or WhatsApp",
      "Students and office users who need smaller files without installing editing software",
      "Privacy-conscious users who do not want personal recordings uploaded to third-party servers",
    ],
    privacyTitle: "Why these video tools are privacy-friendly",
    privacyBody:
      "Video files often contain personal footage, screen recordings, meeting captures, or family clips. Keeping processing in the browser reduces the need to trust an external upload pipeline for routine edits.",
    decisionGuideTitle: "How to choose the right video tool",
    decisionGuide: [
      "Use Video Compress when the file already works but is simply too large for upload, email, or chat apps.",
      "Use Video Convert when the real problem is compatibility, container format, codec choice, or a destination platform requirement.",
      "Use Video Trim before compression when only a short highlight matters. Removing extra footage first usually saves more bytes than pushing compression harder.",
    ],
    comparisonTitle: "Common video workflow patterns",
    comparisonPoints: [
      "Trim -> compress is usually the smartest order when you only need a short section from a long source.",
      "Convert -> compress is useful when the source format is awkward for your destination or player.",
      "Compress only is enough when the file already plays correctly and you mainly need a smaller upload.",
    ],
    faqs: [
      {
        question: "Which video tool should I use first if my file is too large?",
        answer:
          "Start with Video Compress. It is the fastest path for shrinking file size for email, messaging apps, and uploads. If you only need a shorter clip, trim first, then compress the smaller segment.",
      },
      {
        question: "Can I use these video tools on phone recordings?",
        answer:
          "Yes. Phone footage is one of the main use cases. MP4 and MOV recordings from Android and iPhone are common inputs for compression, trimming, and conversion.",
      },
      {
        question: "What if I need several edits on the same file?",
        answer:
          "Use the tools in sequence. For example, trim a long clip first, then compress it, then mute or extract audio if needed. This often saves time and produces smaller outputs.",
      },
    ],
  },
  audio: {
    intro: [
      "These audio tools help you convert formats, trim segments, merge recordings, apply effects, and reduce file size directly in your browser without sending voice notes, podcasts, or music files to a server.",
      "They are built for everyday practical tasks like turning a voice memo into MP3, clipping a ringtone, joining multiple tracks, or shrinking a podcast episode for sharing.",
    ],
    useCases: [
      "Convert audio between MP3, WAV, AAC, OGG, FLAC, M4A, and other common formats",
      "Trim songs, podcasts, lectures, and voice notes to the exact section you need",
      "Reduce file size by adjusting bitrate, sample rate, and channel layout",
      "Merge tracks or apply simple effects like speed, fades, and normalization-style processing",
    ],
    howToTitle: "How to use the audio tools",
    howToSteps: [
      "Pick the audio task you need, such as convert, compress, trim, merge, or apply effects.",
      "Upload your file, check the waveform or file details, and choose output settings for compatibility, quality, or file size.",
      "Run the job locally in the browser and download the processed track when it finishes.",
    ],
    bestForTitle: "Best for",
    bestForPoints: [
      "Podcast and voice-note cleanup before sharing or publishing",
      "Creating ringtones, short clips, or compact speech recordings",
      "Converting files for phones, editors, archive use, or general playback compatibility",
    ],
    privacyTitle: "Why local audio processing matters",
    privacyBody:
      "Audio can contain meetings, interviews, medical notes, lectures, or personal voice messages. Running conversions and trims locally gives users a safer default for sensitive recordings.",
    decisionGuideTitle: "How to choose the right audio tool",
    decisionGuide: [
      "Use Audio Convert when playback compatibility is the main issue and you need MP3, AAC, WAV, FLAC, or another destination format.",
      "Use Audio Compress when the file already works but takes too much space for sharing, publishing, or storage.",
      "Use Audio Trim when the easiest size reduction is simply removing silence, intro material, or unused sections first.",
    ],
    comparisonTitle: "Common audio workflow patterns",
    comparisonPoints: [
      "Trim -> compress is usually best for podcasts, meetings, and voice notes with extra dead space.",
      "Convert -> compress is useful when a device or app rejects the source format and you also need a smaller file.",
      "Higher bitrates matter more for music than for speech, so voice recordings can often be reduced more aggressively.",
    ],
    faqs: [
      {
        question: "Which audio format is safest for compatibility?",
        answer:
          "MP3 is still the safest general-purpose output for broad playback support. If you are targeting Apple devices or apps, M4A/AAC is also a strong choice.",
      },
      {
        question: "Should I trim before compressing audio?",
        answer:
          "Usually yes. Removing silence or unused sections first means there is less audio to encode, which often speeds up processing and produces a smaller final file.",
      },
      {
        question: "Are these audio tools useful for speech as well as music?",
        answer:
          "Yes. Speech and music are both supported, but the best bitrate and channel settings differ. Speech can often be compressed much more aggressively than music.",
      },
    ],
  },
  image: {
    intro: [
      "The image tools are built for format conversion, compression, resizing, cropping, watermarking, rotation, and lightweight edits that people often need for websites, listings, forms, and social platforms.",
      "Because most image tasks are handled with browser-native APIs, simple jobs can stay fast and private without relying on a backend image-processing service.",
    ],
    useCases: [
      "Convert JPG, PNG, WebP, GIF, BMP, TIFF, and AVIF for web or general compatibility",
      "Compress large images before uploading them to a website, marketplace, or CMS",
      "Resize images for blog posts, hero sections, social cards, avatars, or product thumbnails",
      "Crop, rotate, watermark, batch-compress, or apply visual filter adjustments",
    ],
    howToTitle: "How to use the image tools",
    howToSteps: [
      "Choose the image task that matches your goal, such as compress, resize, convert, crop, or watermark.",
      "Upload the image, preview the source, and adjust output settings for quality, dimensions, or target format.",
      "Process the image locally and download the result once the browser finishes generating it.",
    ],
    bestForTitle: "Best for",
    bestForPoints: [
      "Web publishers who need smaller images for faster page loads",
      "Sellers and marketers preparing cleaner assets for listings and social posts",
      "Teams that need quick private image cleanup without opening desktop software",
    ],
    privacyTitle: "Why browser-based image editing is useful",
    privacyBody:
      "Screenshots, scanned forms, invoices, mockups, and personal photos often contain sensitive information. Local image processing is a strong default for privacy and for quick turnaround.",
    decisionGuideTitle: "How to choose the right image tool",
    decisionGuide: [
      "Use Image Compress when the format is already acceptable and the main goal is reducing file size.",
      "Use Image Convert when the destination needs a different format such as WebP, PNG, JPG, or AVIF.",
      "Use Image Resize when the real problem is oversized dimensions rather than compression quality alone.",
    ],
    comparisonTitle: "Common image workflow patterns",
    comparisonPoints: [
      "Resize -> compress is often the best sequence for website images because oversized dimensions waste more bytes than many people expect.",
      "Convert -> compress is useful when a more efficient format like WebP or AVIF fits the destination workflow.",
      "PNG is better for transparency and graphics, while JPG or WebP is usually better for photographic size reduction.",
    ],
    faqs: [
      {
        question: "Which image tool should I use to improve website speed?",
        answer:
          "Start with Image Compress or Image Convert to WebP/AVIF, then resize the image to the actual dimensions your page needs. Compression and right-sized dimensions together usually matter most.",
      },
      {
        question: "Should I convert or compress first?",
        answer:
          "If you know the target format already, convert and compress as part of the same decision. In practice, choosing a more efficient format like WebP plus a sensible quality level gives the best result.",
      },
      {
        question: "Can I use these tools for product photos and graphics?",
        answer:
          "Yes. They are suitable for product photos, banners, logos, screenshots, blog images, and other common web assets, though each format has different tradeoffs for quality and transparency.",
      },
    ],
  },
  pdf: {
    intro: [
      "The PDF tools cover high-utility document jobs like turning PDFs into images, building PDFs from images, and merging multiple PDF files into one output directly in the browser.",
      "These workflows are especially useful for forms, scans, receipts, print-ready handouts, and document sharing where users want fast results without installing desktop utilities.",
    ],
    useCases: [
      "Convert PDF pages into PNG or JPG for previews, presentations, or uploads",
      "Combine several PDFs into one file in the correct order",
      "Create a PDF from photos, screenshots, or scanned image pages",
      "Handle everyday document preparation while keeping files on the local device",
    ],
    howToTitle: "How to use the PDF tools",
    howToSteps: [
      "Choose the document task you need, such as PDF to images, images to PDF, or merge PDFs.",
      "Upload the files, check page order or image settings, and choose the output format that fits your workflow.",
      "Generate the result in your browser and download the final file or exported pages when processing completes.",
    ],
    bestForTitle: "Best for",
    bestForPoints: [
      "Students, office workers, and freelancers handling scans, reports, and forms",
      "People who need quick PDF utility work without Adobe or desktop converters",
      "Users who prefer private browser-side processing for basic document tasks",
    ],
    privacyTitle: "Why browser-side PDF handling is valuable",
    privacyBody:
      "PDFs often contain contracts, IDs, invoices, academic records, or business documents. Keeping routine document manipulation on-device is a better privacy posture than uploading every file to an online converter.",
    decisionGuideTitle: "How to choose the right PDF tool",
    decisionGuide: [
      "Use PDF to Images when the destination needs separate pages, previews, or page graphics instead of a document file.",
      "Use Images to PDF when the source starts as screenshots, scans, or photos that need to become one document.",
      "Use Merge PDF when you already have document files and only need to combine them in the correct order.",
    ],
    comparisonTitle: "Common PDF workflow patterns",
    comparisonPoints: [
      "Images -> PDF is the better starting point for mobile scans, receipts, and photographed paperwork.",
      "PDF -> images is useful when a page needs to be reused in a presentation, website, or upload flow that does not accept PDF directly.",
      "Merge only is enough when the files are already PDFs and you mainly need a single final document.",
    ],
    faqs: [
      {
        question: "What is the best PDF tool to start with for scanned pages?",
        answer:
          "If you have images from a phone scanner, use Images to PDF. If you already have separate PDF files, use Merge PDF to combine them into one document.",
      },
      {
        question: "Why would I convert a PDF to images?",
        answer:
          "PDF to images is useful when a website or app needs JPG/PNG uploads, when you want per-page thumbnails, or when you need slides and pages as separate assets.",
      },
      {
        question: "Are these PDF tools enough for advanced editing?",
        answer:
          "They are aimed at high-frequency utility jobs rather than full document authoring. For advanced layout editing, OCR, or annotation workflows, more specialized software is still useful.",
      },
    ],
  },
};
