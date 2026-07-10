import type { ToolSeoData } from "@/lib/seo-types";

export const toolSeoOverrides: Record<string, Partial<ToolSeoData>> = {
  "video-convert": {
    h1: "Free online video converter",
    metaTitle: "Video Converter Online Free - Change Video Format to MP4, MOV, WebM",
    metaDescription:
      "Use this free online video converter to change video format in your browser. Convert video to MP4, MOV, WebM, AVI, MKV, and more without uploading your file.",
    keywords: [
      "video converter",
      "online video converter",
      "video converter online free",
      "online video converter free",
      "free online video converter",
      "video converter free",
      "convert video",
      "change video format",
      "video format converter",
      "video file converter",
      "how to convert video formats",
    ],
    howToTitle: "How to convert video online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a file from your device or drag it into the editor. You can convert common formats like MP4, MOV, WebM, AVI, MKV, FLV, and M4V.",
      },
      {
        name: "Choose the new video format",
        text: "Pick the output format you want, then adjust resolution and quality if needed. This is useful when you need better compatibility, a smaller file, or a format a device or app accepts.",
      },
      {
        name: "Convert and download",
        text: "Start the conversion and download the new file when it finishes. The processing runs in your browser, so you can convert video without sending it to a remote server.",
      },
    ],
    settingsGuide:
      "If you want the safest format for everyday playback, choose MP4 with H.264. It works well on phones, laptops, TVs, and most social platforms. WebM is a strong choice for web delivery because it can stay smaller at similar quality, while MOV is often preferred in Apple-focused workflows. Lower quality settings and smaller resolutions reduce file size, but if you keep the same codec and only change the container, conversion can be much faster and may avoid extra quality loss.",
    formatTable: [
      {
        format: "MP4 (H.264)",
        useCase: "General sharing and playback",
        size: "Medium",
        quality: "Excellent compatibility",
      },
      {
        format: "WebM (VP9)",
        useCase: "Website delivery",
        size: "Small",
        quality: "High efficiency",
      },
      {
        format: "MOV",
        useCase: "Apple and editing workflows",
        size: "Medium",
        quality: "High",
      },
      {
        format: "MKV",
        useCase: "Archiving and desktop playback",
        size: "Varies",
        quality: "Flexible",
      },
      {
        format: "AVI",
        useCase: "Older software and legacy systems",
        size: "Large",
        quality: "Good",
      },
    ],
    faqs: [
      {
        question: "What is the best format to convert video to?",
        answer:
          "MP4 with H.264 is usually the best default because it plays on almost everything and keeps a strong balance between quality and file size. If you need a format for a website, WebM is also a smart option.",
      },
      {
        question: "Can I change video format without uploading the file?",
        answer:
          "Yes. This online video converter is designed to run in your browser, which means you can change video format locally instead of uploading the full file to a remote conversion service.",
      },
      {
        question: "Why is the converted video larger than the original?",
        answer:
          "That usually happens when the new codec is less efficient, the quality setting is too high, or the output keeps a larger resolution than necessary. Try MP4 or WebM with a more balanced quality setting if you want a smaller file.",
      },
      {
        question: "What is the difference between MP4 and WebM?",
        answer:
          "MP4 is the safer compatibility choice for general playback, messaging, and social apps. WebM is often better for websites because it can deliver smaller files at similar visual quality, though some older devices and workflows still favor MP4.",
      },
      {
        question: "How do I convert video formats for social media?",
        answer:
          "In most cases, convert the file to MP4 with H.264 and keep the resolution close to the platform's recommendation. That gives you a format social networks commonly accept while keeping playback reliable across devices.",
      },
    ],
  },
  "video-compress": {
    h1: "Free online video compressor",
    metaTitle: "Compress Video Online Free - Reduce MP4, MOV, AVI & WebM File Size",
    metaDescription:
      "Use this free online video compressor to reduce video file size in your browser. Compress MP4, MOV, AVI, and WebM for WhatsApp, email, websites, and everyday sharing without uploading your file.",
    keywords: [
      "compress video",
      "video compressor",
      "compress video online",
      "free video compressor",
      "video compressor online free",
      "reduce video file size",
      "video file compressor",
      "compress mp4",
      "compress mov video",
      "compress video for whatsapp",
      "compress video for email",
    ],
    howToTitle: "How to compress video online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Drag your file into the compressor or choose it from your device. You can compress common formats like MP4, MOV, AVI, WebM, and MKV.",
      },
      {
        name: "Choose a preset or custom settings",
        text: "Start with a preset like WhatsApp, Email, Web, or Archive, or fine-tune the quality and resolution yourself. This helps you reduce video file size based on where the file will be shared.",
      },
      {
        name: "Compress and download",
        text: "Run the compression and download the smaller file when it finishes. The process happens in your browser, so you can compress video online without sending it to a remote server.",
      },
    ],
    settingsGuide:
      "If you want the safest balance between size and compatibility, start with MP4 and a moderate quality setting. Lowering resolution usually makes a bigger difference than tiny quality tweaks, so moving from 1080p to 720p can cut file size substantially while still looking good for messaging, email, and web use. WebM can create even smaller files for browser delivery, while Archive-style settings are better when you want to keep more detail and accept a larger result.",
    formatTable: [
      {
        format: "MP4 (H.264)",
        useCase: "WhatsApp, email, and general sharing",
        size: "Medium",
        quality: "Best compatibility",
      },
      {
        format: "WebM (VP9)",
        useCase: "Website and browser delivery",
        size: "Small",
        quality: "High efficiency",
      },
      {
        format: "MKV",
        useCase: "Archive and desktop playback",
        size: "Varies",
        quality: "Flexible",
      },
    ],
    faqs: [
      {
        question: "How can I compress a video without losing too much quality?",
        answer:
          "Start with a moderate compression setting and only lower the resolution if the file is still too large. In most cases, 720p with balanced quality gives a much smaller file while still looking good on phones, laptops, and social platforms.",
      },
      {
        question: "What is the best way to reduce video file size for WhatsApp?",
        answer:
          "Use a WhatsApp-friendly preset or export as MP4 at a smaller resolution like 720p. That usually gives you the best chance of staying within messaging limits while keeping the clip clear enough to watch comfortably.",
      },
      {
        question: "Can I compress MP4 videos online without uploading them?",
        answer:
          "Yes. This video compressor is designed to run in your browser, so you can compress MP4 and other common video formats locally instead of uploading the source file to an external service.",
      },
      {
        question: "Is WebM or MP4 better for video compression?",
        answer:
          "WebM is often more efficient and can create smaller files at similar visual quality, especially for web playback. MP4 is still the safer choice when you want the broadest compatibility across phones, apps, and devices.",
      },
      {
        question: "Why is my video still too large after compression?",
        answer:
          "The source may be too long, too high-resolution, or still using a quality setting that is too aggressive for the target file size. If compression alone is not enough, lower the resolution further or trim the clip before compressing again.",
      },
    ],
  },
  "audio-convert": {
    h1: "Free online audio converter",
    metaTitle: "Audio Converter Online Free - Convert MP3, WAV, FLAC, M4A & More",
    metaDescription:
      "Use this free online audio converter to convert audio files in your browser. Change MP3, WAV, FLAC, M4A, AAC, OGG, and more without uploading your file.",
    keywords: [
      "audio converter",
      "online audio converter",
      "free audio converter",
      "audio converter online free",
      "convert audio",
      "audio file converter",
      "audio format converter",
      "mp3 converter",
      "wav to mp3",
      "flac to mp3",
      "convert audio file online",
    ],
    howToTitle: "How to convert audio online",
    howToSteps: [
      {
        name: "Upload your audio file",
        text: "Choose a file from your device or drag it into the converter. Common formats like MP3, WAV, FLAC, M4A, AAC, OGG, and even many video sources are supported.",
      },
      {
        name: "Choose the output format",
        text: "Pick the format you need, then adjust bitrate if you want a different balance between quality and file size. This is helpful when you need broad compatibility, a smaller file, or a format a device prefers.",
      },
      {
        name: "Convert and download",
        text: "Start the conversion and download the new audio file when it finishes. The conversion runs in your browser, so you can convert audio online without handing the source file to a remote service.",
      },
    ],
    settingsGuide:
      "MP3 is the safest everyday choice when you want an audio file that works almost everywhere. M4A with AAC is a strong fit for Apple devices, while WAV and FLAC are better when you want lossless output for editing or archiving. Lower bitrates create smaller files, but they also discard more detail, so for general listening a balanced MP3 setting is usually the right place to start. If the source is already lossy, converting it again will not restore the information that was lost in the original file.",
    formatTable: [
      {
        format: "MP3",
        useCase: "General sharing and playback",
        size: "Small",
        quality: "Good compatibility",
      },
      {
        format: "M4A (AAC)",
        useCase: "Apple devices and modern mobile playback",
        size: "Small",
        quality: "Efficient lossy audio",
      },
      {
        format: "WAV",
        useCase: "Editing and production workflows",
        size: "Large",
        quality: "Lossless",
      },
      {
        format: "FLAC",
        useCase: "Archiving and high-quality listening",
        size: "Medium to large",
        quality: "Lossless",
      },
      {
        format: "OGG",
        useCase: "Web and app delivery",
        size: "Small",
        quality: "Efficient lossy audio",
      },
    ],
    faqs: [
      {
        question: "What is the best audio format for everyday use?",
        answer:
          "MP3 is usually the best default because it is widely supported across phones, laptops, cars, and apps. If you mainly use Apple devices, M4A with AAC is also an excellent everyday choice.",
      },
      {
        question: "Can I convert WAV to MP3 online without uploading it?",
        answer:
          "Yes. This online audio converter is designed to run in your browser, so you can change WAV, FLAC, MP3, and other common formats locally instead of uploading the file to a remote converter.",
      },
      {
        question: "Does converting MP3 to WAV improve audio quality?",
        answer:
          "No. WAV can store lossless audio, but converting an existing MP3 to WAV does not restore the detail that was already removed by MP3 compression. It only changes the container and usually creates a larger file.",
      },
      {
        question: "Should I use MP3, FLAC, or WAV?",
        answer:
          "Use MP3 when you want smaller files and broad compatibility, FLAC when you want lossless quality with better compression than WAV, and WAV when you need a simple uncompressed format for editing or production work.",
      },
      {
        question: "Can I extract audio from a video with this converter?",
        answer:
          "Yes. If the input contains an audio track, you can convert it to formats like MP3, WAV, M4A, or FLAC, which makes this tool useful when you want the sound from a video without keeping the video file itself.",
      },
    ],
  },
  "audio-compress": {
    h1: "Free online audio compressor",
    metaTitle: "Compress Audio Online Free - Reduce MP3, WAV, M4A & FLAC File Size",
    metaDescription:
      "Use this free online audio compressor to reduce audio file size in your browser. Compress MP3, WAV, M4A, OGG, and more for email, sharing, podcasts, and voice recordings without uploading your file.",
    keywords: [
      "compress audio",
      "audio compressor",
      "compress audio online",
      "free audio compressor",
      "audio compressor online free",
      "reduce audio file size",
      "audio file compressor",
      "compress mp3",
      "compress wav",
      "compress audio for email",
      "reduce mp3 size",
    ],
    howToTitle: "How to compress audio online",
    howToSteps: [
      {
        name: "Upload your audio file",
        text: "Drag your file into the compressor or select it from your device. You can compress common formats like MP3, WAV, M4A, OGG, FLAC, and more.",
      },
      {
        name: "Choose compression settings",
        text: "Lower the bitrate to reduce audio file size, and switch to mono or a lower sample rate when the file is mostly speech. This helps you shrink the file based on whether it is music, a podcast, a meeting, or a voice note.",
      },
      {
        name: "Compress and download",
        text: "Start the compression and download the smaller file when it is ready. The process runs in your browser, so you can compress audio online without uploading the recording to a remote service.",
      },
    ],
    settingsGuide:
      "Bitrate is usually the biggest factor when you want to reduce audio file size. For music, staying around 128 kbps or 192 kbps often keeps quality acceptable while cutting size. For podcasts, meetings, and voice recordings, lower settings can work well, especially if you switch to mono. Sample rate can also help, but it matters less than bitrate for most casual use. If you are unsure where to start, compress to MP3 with balanced settings first, then go lower only if the file is still too large.",
    formatTable: [
      {
        format: "MP3",
        useCase: "General sharing, email, and playback",
        size: "Small",
        quality: "Best compatibility",
      },
      {
        format: "M4A (AAC)",
        useCase: "Mobile playback and Apple devices",
        size: "Small",
        quality: "Efficient lossy audio",
      },
      {
        format: "WAV",
        useCase: "Editing or source format before compression",
        size: "Large",
        quality: "Lossless",
      },
      {
        format: "FLAC",
        useCase: "Lossless archive before creating smaller copies",
        size: "Medium to large",
        quality: "Lossless",
      },
    ],
    faqs: [
      {
        question: "How can I reduce audio file size without losing too much quality?",
        answer:
          "Start by lowering bitrate moderately instead of pushing it to the minimum right away. For music, a balanced MP3 setting usually keeps the sound acceptable, while speech can often handle stronger compression with much smaller files.",
      },
      {
        question: "What is the best format to compress audio for email?",
        answer:
          "MP3 is usually the safest choice because it stays relatively small and plays on almost everything. If the file is mainly speech, using mono audio can reduce the size even further.",
      },
      {
        question: "Can I compress MP3 files online without uploading them?",
        answer:
          "Yes. This online audio compressor is designed to run in your browser, so you can compress MP3 and other audio files locally instead of sending them to an external upload service.",
      },
      {
        question: "Should I use mono or stereo when compressing audio?",
        answer:
          "Use stereo for music when left-right separation matters. Use mono for speech, podcasts, meetings, and voice notes when you want a smaller file and do not need stereo width.",
      },
      {
        question: "Why is my audio still too large after compression?",
        answer:
          "The original file may be long, lossless, or still using settings that are too generous for your size target. If the file is mainly speech, try a lower bitrate and mono output. If it is music, you may need to accept a larger file to keep the quality usable.",
      },
    ],
  },
  "image-convert": {
    h1: "Free online image converter",
    metaTitle: "Image Converter Online Free - Convert JPG, PNG, WebP & AVIF",
    metaDescription:
      "Use this free online image converter to convert image files in your browser. Change JPG, PNG, WebP, and AVIF formats without uploading your file.",
    keywords: [
      "image converter",
      "online image converter",
      "free image converter",
      "image converter online free",
      "convert image",
      "image format converter",
      "jpg to png",
      "png to jpg",
      "png to webp",
      "webp to jpg",
      "avif converter",
    ],
    howToTitle: "How to convert images online",
    howToSteps: [
      {
        name: "Upload your image",
        text: "Choose one image or a small batch from your device, or drag the files into the converter. Common formats like JPG, PNG, WebP, and AVIF are supported.",
      },
      {
        name: "Choose the new image format",
        text: "Pick the output format you need, then adjust quality if the format supports lossy compression. This is useful when you want a smaller file, better compatibility, or a format that preserves transparency.",
      },
      {
        name: "Convert and download",
        text: "Run the conversion and download the new image files when they are ready. The process happens in your browser, so you can convert image files online without sending them to a remote server.",
      },
    ],
    settingsGuide:
      "JPEG is usually the safest choice for photos when you want broad compatibility and smaller files. PNG is better for screenshots, graphics, and images that need transparency. WebP is a strong modern format for websites because it often keeps good quality at a smaller size, while AVIF can be even more efficient when your target workflow supports it. If the source already contains compression artefacts, converting it to a lossless format will not restore the missing detail.",
    formatTable: [
      {
        format: "JPEG",
        useCase: "Photos and broad compatibility",
        size: "Small",
        quality: "Lossy",
      },
      {
        format: "PNG",
        useCase: "Screenshots, graphics, and transparency",
        size: "Large",
        quality: "Lossless",
      },
      {
        format: "WebP",
        useCase: "Website images and modern delivery",
        size: "Small",
        quality: "Efficient lossy or lossless",
      },
      {
        format: "AVIF",
        useCase: "Next-generation web optimization",
        size: "Very small",
        quality: "High efficiency",
      },
    ],
    faqs: [
      {
        question: "What is the best image format for websites?",
        answer:
          "WebP is usually the safest modern choice because it often creates smaller files than JPEG while keeping good visual quality. AVIF can be even smaller, but WebP is still the more predictable option across everyday website workflows.",
      },
      {
        question: "Can I convert JPG to PNG online without uploading it?",
        answer:
          "Yes. This online image converter runs in your browser, so you can change JPG, PNG, WebP, and AVIF files locally instead of uploading them to an external conversion service.",
      },
      {
        question: "Should I use JPG, PNG, WebP, or AVIF?",
        answer:
          "Use JPG for photos and broad compatibility, PNG for graphics or transparency, WebP for modern web delivery, and AVIF when you want stronger compression and know the target workflow supports it.",
      },
      {
        question: "Will converting JPG to PNG improve image quality?",
        answer:
          "No. PNG can store lossless data, but converting an existing JPG to PNG does not recover the detail that JPG compression already removed. It usually only creates a larger file.",
      },
      {
        question: "Why did my converted PNG become larger?",
        answer:
          "PNG is lossless and often much less efficient than JPG for photographic images. If the original was a photo, a PNG version can become much larger even though the visual quality does not improve.",
      },
      {
        question: "Can I batch convert multiple images?",
        answer:
          "Yes. The current browser-based image converter can process a small batch with the same format and quality settings, which is useful when you need several images exported consistently in one pass.",
      },
    ],
  },
  "image-compress": {
    h1: "Free online image compressor",
    metaTitle: "Compress Image Online Free - Reduce JPG, PNG & WebP File Size",
    metaDescription:
      "Use this free online image compressor to reduce image file size in your browser. Compress JPG, PNG, and WebP images for websites, email, forms, and faster loading pages without uploading your files.",
    keywords: [
      "compress image",
      "image compressor",
      "compress image online",
      "free image compressor",
      "image compressor online free",
      "reduce image size",
      "reduce image file size",
      "compress jpg",
      "compress png",
      "compress webp",
      "photo compressor",
    ],
    howToTitle: "How to compress images online",
    howToSteps: [
      {
        name: "Upload your image",
        text: "Choose an image from your device or drag it into the compressor. Common formats like JPG, PNG, and WebP are supported.",
      },
      {
        name: "Choose quality and output settings",
        text: "Pick a compression preset or adjust quality yourself. This helps you reduce image size based on whether you need a lighter website asset, a smaller email attachment, or a cleaner upload for forms and listings.",
      },
      {
        name: "Compare and download",
        text: "Run the compression, compare the original and compressed image, then download the smaller file when you are happy with the result.",
      },
    ],
    settingsGuide:
      "If you want the safest starting point, use a balanced quality setting and keep an eye on whether the image is a photo, a screenshot, or a graphic. JPG usually works well for photos, while PNG is better for graphics or images that need transparency. WebP is often the best format for website delivery because it can keep similar visual quality at a smaller size. Compression reduces stored image data, but it does not fix oversized dimensions, so resizing may still be the better move for very large images.",
    formatTable: [
      {
        format: "JPG to JPG",
        useCase: "Photo size reduction",
        size: "Smaller",
        quality: "Balanced lossy output",
      },
      {
        format: "JPG to WebP",
        useCase: "Website optimization",
        size: "Smaller",
        quality: "Efficient modern format",
      },
      {
        format: "PNG to WebP",
        useCase: "Web graphics with better compression",
        size: "Smaller",
        quality: "Good visual efficiency",
      },
      {
        format: "PNG to PNG",
        useCase: "Lossless cleanup",
        size: "Slightly smaller",
        quality: "Lossless",
      },
    ],
    faqs: [
      {
        question: "How can I reduce image size without losing too much quality?",
        answer:
          "Start with a moderate quality reduction instead of pushing compression too hard. For most photos, a balanced setting gives you a noticeably smaller file while still looking clean on websites, phones, and laptops.",
      },
      {
        question: "What is the best format to compress images for websites?",
        answer:
          "WebP is often the best choice for websites because it usually creates smaller files than JPG or PNG at similar visual quality. If you need the broadest fallback, JPG is still a safe option for photos.",
      },
      {
        question: "Can I compress JPG and PNG images online without uploading them?",
        answer:
          "Yes. This online image compressor runs in your browser, so you can compress JPG, PNG, and WebP files locally instead of sending them to an external compression service.",
      },
      {
        question: "Why is my PNG still large after compression?",
        answer:
          "PNG is a lossless format, so it usually does not shrink as dramatically as JPG or WebP. If the image is a photo and does not need transparency, converting it to WebP or JPG often produces a much smaller result.",
      },
      {
        question: "Does image compression remove EXIF or camera metadata?",
        answer:
          "Yes, in the current browser-based workflow the exported image does not keep the original EXIF and similar metadata. That can be helpful for privacy, but it also means camera details and GPS tags are not preserved.",
      },
      {
        question: "Does compressing an image change its width and height?",
        answer:
          "No. Compression reduces file size by changing how image data is stored, not by changing pixel dimensions. If the image is still too heavy after compression, resizing it may help more than lowering quality further.",
      },
    ],
  },
  "video-trim": {
    h1: "Free online video trimmer",
    metaTitle: "Trim Video Online Free - Cut MP4, WebM, MOV & AVI Clips",
    metaDescription:
      "Use this free online video trimmer to cut video clips in your browser. Trim MP4, WebM, MOV, and AVI files without uploading them to a remote server.",
    keywords: [
      "trim video",
      "video trimmer",
      "cut video online",
      "video cutter",
      "trim video online free",
      "video trimmer online",
      "cut mp4 video",
      "trim mp4",
      "cut video clip",
      "trim video without uploading",
    ],
    howToTitle: "How to trim video online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a file from your device or drag it into the trimmer. A visual timeline and filmstrip preview help you see where the clip should begin and end.",
      },
      {
        name: "Set the start and end points",
        text: "Drag the trim handles or use the playhead controls to select the exact section you want to keep. This makes it easy to cut a longer recording down to a shorter clip for sharing or editing.",
      },
      {
        name: "Trim and download",
        text: "Export the selected section and download the trimmed video when it is ready. The process runs in your browser, so you can cut video online without sending the full file to a remote service.",
      },
    ],
    settingsGuide:
      "If the output format stays the same as the input, trimming can often use stream copy, which is much faster and avoids re-encoding the video. That is the best option when you only want to remove extra footage without changing quality. If you switch formats, the video must be re-encoded, which gives more exact control but takes longer. Trimming is often the first step before compressing, especially when the easiest way to reduce file size is simply to remove the part you do not need.",
    faqs: [
      {
        question: "Can I trim a video without losing quality?",
        answer:
          "Yes. If the output format matches the source, trimming can often use stream copy, which keeps the original video data instead of re-encoding it. That makes the trim much faster and avoids quality loss.",
      },
      {
        question: "How accurate is an online video trimmer?",
        answer:
          "It depends on whether the trim uses stream copy or re-encoding. Stream copy is very fast but can align to nearby keyframes, while re-encoding gives more exact cuts at the cost of longer processing time.",
      },
      {
        question: "Can I cut MP4 videos online without uploading them?",
        answer:
          "Yes. This online video trimmer is designed to run in your browser, so you can cut MP4 and other common video formats locally instead of uploading the source file to an external editor.",
      },
      {
        question: "Should I trim or compress a video first?",
        answer:
          "If you only need part of the recording, trim first. Removing unused footage usually saves more time and can reduce file size before you even start compression.",
      },
      {
        question: "Can I make multiple cuts from one video?",
        answer:
          "This tool trims one continuous section at a time. If you need several separate clips, you can run it again on the original file or on the first trimmed result.",
      },
    ],
  },
  "audio-trim": {
    h1: "Free online audio trimmer",
    metaTitle: "Trim Audio Online Free - Cut MP3, WAV, M4A & FLAC Files",
    metaDescription:
      "Use this free online audio trimmer to cut audio files in your browser. Trim MP3, WAV, M4A, FLAC, and OGG files without uploading them to a remote service.",
    keywords: [
      "trim audio",
      "audio trimmer",
      "cut audio online",
      "audio cutter",
      "trim mp3",
      "cut mp3 online",
      "trim audio online free",
      "audio trimmer online",
      "cut ringtone from song",
      "trim audio without uploading",
    ],
    howToTitle: "How to trim audio online",
    howToSteps: [
      {
        name: "Upload your audio file",
        text: "Choose an audio file from your device or drag it into the trimmer. The waveform preview helps you see the shape of the recording before you cut it.",
      },
      {
        name: "Set the part you want to keep",
        text: "Drag the start and end handles to select the section you want. This makes it easy to cut a song, shorten a voice note, remove extra silence, or prepare a ringtone clip.",
      },
      {
        name: "Trim and download",
        text: "Export the selected section and download the trimmed audio when it is ready. The process runs in your browser, so you can cut audio online without sending the recording to a remote service.",
      },
    ],
    settingsGuide:
      "If the output format stays the same, trimming can often use stream copy, which is faster and avoids unnecessary re-encoding. That is the best choice when you only want to remove unwanted audio without changing quality. If you switch formats, the audio has to be re-encoded, which can help compatibility but takes a little longer. For short clips like ringtones, trimming first is usually more important than changing bitrate, because duration often affects file size more than anything else.",
    faqs: [
      {
        question: "Can I trim audio without losing quality?",
        answer:
          "Yes. If the output format matches the source, trimming can often use stream copy, which keeps the original audio data instead of re-encoding it. That means the result stays extremely close to the original quality.",
      },
      {
        question: "How accurate is an online audio trimmer?",
        answer:
          "Audio trimming is usually very precise, especially compared with video trimming. Copy mode can already be very accurate, and re-encoding can provide even tighter control when needed.",
      },
      {
        question: "Can I cut MP3 files online without uploading them?",
        answer:
          "Yes. This online audio trimmer is designed to run in your browser, so you can cut MP3, WAV, FLAC, M4A, and other supported formats locally instead of uploading them to an external editor.",
      },
      {
        question: "Can I make a ringtone from a song or recording?",
        answer:
          "Yes. Trim the part you want to keep, then export it in a format that matches your device. Short clips in MP3 or M4A are common choices for ringtone workflows.",
      },
      {
        question: "Can this tool remove silence automatically?",
        answer:
          "The main workflow is manual trimming with the waveform so you can decide exactly what to keep. That gives you more predictable results when pauses are intentional or when you only want to remove part of the silence.",
      },
    ],
  },
  "video-merge": {
    h1: "Free online video merger",
    metaTitle: "Merge Videos Online Free - Combine MP4, MOV, WebM & AVI Clips",
    metaDescription:
      "Use this free online video merger to combine video clips in your browser. Merge MP4, MOV, WebM, AVI, and MKV files without uploading them to a remote server.",
    keywords: [
      "merge videos",
      "video merger",
      "combine videos",
      "join video files",
      "merge videos online",
      "video merger online free",
      "merge mp4 files",
      "combine video clips",
      "join mp4 videos",
      "merge videos without uploading",
    ],
    howToTitle: "How to merge videos online",
    howToSteps: [
      {
        name: "Upload your video clips",
        text: "Choose two or more video files from your device or drag them into the merger. Common formats like MP4, MOV, WebM, AVI, and MKV are supported.",
      },
      {
        name: "Arrange the clip order",
        text: "Drag the clips into the sequence you want. This lets you combine short recordings, split exports, or multiple scenes into one final video.",
      },
      {
        name: "Merge and download",
        text: "Start the merge and download the combined video when it is ready. The process runs in your browser, so you can merge videos online without sending the files to a remote server.",
      },
    ],
    settingsGuide:
      "If the clips already share the same format, resolution, and similar encoding settings, merging can often happen much faster because the tool can avoid heavy re-encoding. If the clips are very different, the merge may need to normalize them first so the final video plays properly. In general, keeping your clips in the same format before merging produces the most predictable result and the fastest processing experience.",
    faqs: [
      {
        question: "Can I merge videos without losing quality?",
        answer:
          "Yes, in cases where the clips can be combined without full re-encoding. When the source files are already compatible, merging can preserve quality much better than workflows that force everything through a fresh encode.",
      },
      {
        question: "Can I merge MP4 videos online without uploading them?",
        answer:
          "Yes. This online video merger is designed to run in your browser, so you can combine MP4 and other supported video files locally instead of uploading them to an external editor.",
      },
      {
        question: "Do my clips need to have the same format?",
        answer:
          "Not always, but matching formats, resolutions, and codecs usually make merging easier and faster. If the clips are different, the tool may need to re-encode them to create a stable final output.",
      },
      {
        question: "Can I reorder videos before merging?",
        answer:
          "Yes. You can arrange the clips in the order you want before starting the merge, which is useful when you are building a simple sequence from multiple recordings.",
      },
      {
        question: "Should I trim or merge videos first?",
        answer:
          "If each clip contains extra footage you do not need, trimming first is often the cleaner workflow. That reduces unnecessary content before you combine everything into one file.",
      },
    ],
  },
  "audio-merge": {
    h1: "Free online audio merger",
    metaTitle: "Merge Audio Files Online Free - Join MP3, WAV, M4A & FLAC Tracks",
    metaDescription:
      "Use this free online audio merger to join audio files in your browser. Merge MP3, WAV, M4A, FLAC, and OGG tracks without uploading them to a remote server.",
    keywords: [
      "merge audio files",
      "audio merger",
      "join audio files",
      "combine audio files",
      "merge mp3 files",
      "audio merger online free",
      "join mp3 files",
      "combine audio tracks",
      "merge songs online",
      "merge audio without uploading",
    ],
    howToTitle: "How to merge audio files online",
    howToSteps: [
      {
        name: "Upload your audio files",
        text: "Choose two or more audio files from your device or drag them into the merger. Common formats like MP3, WAV, M4A, FLAC, and OGG are supported.",
      },
      {
        name: "Reorder the tracks",
        text: "Arrange the files in the order you want them to play. This is useful when you want to join songs, combine voice notes, or turn multiple recordings into one file.",
      },
      {
        name: "Merge and download",
        text: "Start the merge and download the combined file when it is ready. The process runs in your browser, so you can merge audio files online without sending them to a remote service.",
      },
    ],
    settingsGuide:
      "Matching formats and sample rates usually make audio merging faster and more predictable. If the files are very different, they may need to be re-encoded into a common format before they can be joined cleanly. For most everyday use, exporting the final result as MP3 is the simplest option because it stays broadly compatible across phones, laptops, and apps.",
    faqs: [
      {
        question: "Can I merge audio files without losing quality?",
        answer:
          "Yes, when the files are already compatible enough to be joined without heavy re-encoding. If the merge has to normalize different formats first, there can be some quality tradeoff depending on the output settings.",
      },
      {
        question: "Can I merge MP3 files online without uploading them?",
        answer:
          "Yes. This online audio merger is designed to run in your browser, so you can join MP3 and other supported audio files locally instead of uploading them to an external tool.",
      },
      {
        question: "Can I combine songs and voice recordings in one file?",
        answer:
          "Yes. You can place the files in the order you want and merge them into one continuous track, as long as the final output format supports the workflow.",
      },
      {
        question: "Does this tool overlay tracks or place them one after another?",
        answer:
          "This workflow joins files one after another in sequence. If you want simultaneous layering, like background music under speech, that is a different type of audio editing task.",
      },
      {
        question: "What is the best output format after merging audio?",
        answer:
          "MP3 is usually the safest default because it is widely supported and easy to share. If you need a different format for editing or archiving, you can choose a format that better fits that workflow.",
      },
    ],
  },
  "image-resize": {
    h1: "Free online image resizer",
    metaTitle: "Resize Image Online Free - Change JPG, PNG & WebP Dimensions",
    metaDescription:
      "Use this free online image resizer to change image dimensions in your browser. Resize JPG, PNG, and WebP files by pixels, percentage, or presets without uploading them.",
    keywords: [
      "resize image",
      "image resizer",
      "resize image online",
      "free image resizer",
      "image resizer online free",
      "change image size",
      "resize jpg",
      "resize png",
      "resize photo online",
      "change image dimensions",
    ],
    howToTitle: "How to resize images online",
    howToSteps: [
      {
        name: "Upload your image",
        text: "Choose an image from your device or drag it into the resizer. Common formats like JPG, PNG, and WebP are supported.",
      },
      {
        name: "Set dimensions or choose a preset",
        text: "Enter exact width and height, resize by percentage, or use a preset for common social and web sizes. This helps when you need a specific layout size, upload requirement, or aspect ratio.",
      },
      {
        name: "Resize and download",
        text: "Run the resize and download the updated image when it is ready. The process happens in your browser, so you can resize images online without uploading them to a remote service.",
      },
    ],
    settingsGuide:
      "If you want to avoid distortion, keep the aspect ratio locked so the image scales proportionally. Downscaling usually looks clean and is a good way to make large images easier to upload or faster to load. Upscaling can make images softer because the browser has to invent extra pixels, so resizing larger is best kept modest unless you plan to use a dedicated upscaling workflow. If your goal is a smaller file, combining resizing with compression often works better than using either one alone.",
    faqs: [
      {
        question: "Can I resize an image without losing quality?",
        answer:
          "Making an image smaller usually preserves quality well, especially for normal web and document use. Making it larger is more likely to soften details because new pixels have to be generated.",
      },
      {
        question: "Can I resize JPG and PNG images online without uploading them?",
        answer:
          "Yes. This online image resizer runs in your browser, so you can resize JPG, PNG, WebP, and similar files locally instead of sending them to an external tool.",
      },
      {
        question: "Should I resize or compress an image first?",
        answer:
          "If the dimensions are much larger than you actually need, resize first. Reducing unnecessary pixels often has a bigger impact than compression alone.",
      },
      {
        question: "How do I resize an image for social media?",
        answer:
          "Use the target platform's recommended dimensions or a preset when one is available. That helps you avoid unwanted cropping, scaling, or blurry uploads after the platform processes the image.",
      },
      {
        question: "Does resizing remove metadata?",
        answer:
          "Browser-based resizing often strips metadata during processing, which can be helpful for privacy. If preserving camera or EXIF information matters, that is something to verify before relying on the output.",
      },
    ],
  },
  "pdf-merge": {
    h1: "Free online PDF merger",
    metaTitle: "Merge PDF Files Online Free - Combine PDFs in Your Browser",
    metaDescription:
      "Use this free online PDF merger to combine PDF files in your browser. Reorder pages, merge documents, and download one file without uploading PDFs to a remote server.",
    keywords: [
      "merge pdf",
      "merge pdf files",
      "pdf merger",
      "combine pdf",
      "join pdf files",
      "merge pdf online",
      "pdf merger online free",
      "combine pdf files",
      "join pdfs",
      "merge pdf without uploading",
    ],
    howToTitle: "How to merge PDF files online",
    howToSteps: [
      {
        name: "Upload your PDF files",
        text: "Choose two or more PDF files from your device or drag them into the merger. The files appear in a list so you can organize them before combining.",
      },
      {
        name: "Reorder the documents",
        text: "Drag the files into the order you want. This helps when you need to combine invoices, reports, forms, or split exports into one final PDF.",
      },
      {
        name: "Merge and download",
        text: "Start the merge and download the combined PDF when it is ready. The process runs in your browser, so you can merge PDF files online without sending documents to a remote server.",
      },
    ],
    settingsGuide:
      "The final PDF follows the order shown in the list, so arranging the files before merging is the most important step. Merging is useful when you want one cleaner document for sharing, printing, or archiving. Because the process runs locally in the browser, it is especially helpful for private documents that you would rather not upload to a third-party service just to combine pages.",
    faqs: [
      {
        question: "Can I merge PDF files without uploading them?",
        answer:
          "Yes. This online PDF merger is designed to run in your browser, so your documents stay on your device instead of being uploaded to a remote service.",
      },
      {
        question: "Can I reorder PDFs before merging?",
        answer:
          "Yes. You can arrange the files in the order you want before creating the final merged PDF, which is helpful when you are combining separate sections into one finished document.",
      },
      {
        question: "Will merging PDFs change the page layout?",
        answer:
          "The goal is to keep each source document's pages intact while combining them into one file. Page sizes and orientations are typically preserved in the final document.",
      },
      {
        question: "Can I merge password-protected PDF files?",
        answer:
          "Protected PDFs usually need to be unlocked first before they can be merged. Once you have a version that can be opened normally, you can combine it with the other files.",
      },
      {
        question: "What is the best use case for a PDF merger?",
        answer:
          "It is especially useful when you need to combine reports, invoices, contracts, scans, or exported pages into one document that is easier to share, store, or print.",
      },
    ],
  },
  "video-gif": {
    h1: "Free online video to GIF converter",
    metaTitle: "Video to GIF Converter Online Free - Convert MP4, MOV & WebM to GIF",
    metaDescription:
      "Use this free online video to GIF converter to turn video clips into animated GIFs in your browser. Convert MP4, MOV, WebM, and AVI without uploading your file.",
    keywords: [
      "video to gif",
      "gif maker from video",
      "convert video to gif",
      "video to gif converter",
      "mp4 to gif",
      "video to gif online",
      "gif converter online free",
      "make gif from video",
      "turn video into gif",
      "video to animated gif",
    ],
    howToTitle: "How to convert video to GIF online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a video from your device or drag it into the converter. Common formats like MP4, MOV, WebM, and AVI are supported.",
      },
      {
        name: "Choose GIF settings",
        text: "Set the frame rate, width, start time, and clip duration. This helps you control smoothness, file size, and the exact part of the video you want to turn into a GIF.",
      },
      {
        name: "Convert and download",
        text: "Create the GIF and download it when it is ready. The process runs in your browser, so you can convert video to GIF without uploading your file to a remote service.",
      },
    ],
    settingsGuide:
      "Shorter clips almost always make better GIFs because GIF is much less efficient than video. Lower frame rates and smaller widths can dramatically reduce file size while still keeping the animation useful for sharing. If you want the best balance, start with a short clip and a moderate width rather than trying to convert a long high-resolution section all at once.",
    faqs: [
      {
        question: "Why is my GIF file so large?",
        answer:
          "GIF is much less efficient than modern video formats, so even short clips can become large quickly. Reducing the clip length, width, or frame rate usually helps more than anything else.",
      },
      {
        question: "Can I convert MP4 to GIF online without uploading it?",
        answer:
          "Yes. This online video to GIF converter runs in your browser, so you can turn MP4 and other supported videos into GIFs locally instead of uploading them to an external service.",
      },
      {
        question: "What is the best frame rate for a GIF?",
        answer:
          "A moderate frame rate is usually the safest choice because it keeps motion reasonably smooth without making the file unnecessarily large. Very high frame rates often produce bigger GIFs with less practical benefit.",
      },
      {
        question: "How long should a GIF be?",
        answer:
          "Shorter is usually better. Keeping the clip brief makes the GIF easier to share, faster to load, and less likely to become too large for websites or messaging apps.",
      },
      {
        question: "Can I choose where the GIF starts in the video?",
        answer:
          "Yes. You can set a start point and duration so the GIF captures the exact moment you want instead of converting the entire video.",
      },
    ],
  },
  "video-extract-audio": {
    h1: "Free online audio extractor",
    metaTitle: "Extract Audio from Video Online Free - Save MP3, WAV, AAC & More",
    metaDescription:
      "Use this free online audio extractor to pull sound from video files in your browser. Extract audio from MP4, MOV, WebM, AVI, and MKV without uploading your file.",
    keywords: [
      "extract audio from video",
      "audio extractor",
      "video to audio",
      "extract mp3 from video",
      "extract audio online",
      "mp4 to mp3",
      "save audio from video",
      "get audio from video",
      "extract sound from video",
      "video audio extractor online free",
    ],
    howToTitle: "How to extract audio from video online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a video from your device or drag it into the extractor. Common formats like MP4, MOV, WebM, AVI, and MKV are supported.",
      },
      {
        name: "Choose the output audio format",
        text: "Pick the format you want, such as MP3, AAC, WAV, OGG, or FLAC. This lets you choose between compatibility, smaller size, or higher-fidelity output.",
      },
      {
        name: "Extract and download",
        text: "Start the extraction and download the audio file when it is ready. The process runs in your browser, so you can extract audio from video without uploading the source file to a remote service.",
      },
    ],
    settingsGuide:
      "MP3 is usually the safest output when you want broad compatibility and easy sharing. AAC is also a strong choice for modern mobile and Apple workflows, while WAV and FLAC are better when you want higher-fidelity files for editing or archiving. If the original video already contains compressed audio, converting it to a lossless format preserves the extracted signal cleanly but does not recreate detail that was never in the source.",
    faqs: [
      {
        question: "Can I extract audio from MP4 online without uploading it?",
        answer:
          "Yes. This online audio extractor runs in your browser, so you can pull audio from MP4 and other supported video formats locally instead of uploading them to an external service.",
      },
      {
        question: "What is the best format after extracting audio from video?",
        answer:
          "MP3 is usually the easiest choice for sharing and playback. If you need better editing compatibility or want a larger lossless output, WAV or FLAC may fit better.",
      },
      {
        question: "Will extracting audio reduce quality?",
        answer:
          "That depends on the output format. Saving to a lossy format like MP3 or AAC can reduce quality slightly, while lossless formats preserve the extracted signal more faithfully.",
      },
      {
        question: "Can I extract audio from WebM or MKV files?",
        answer:
          "Yes. As long as the input contains an audio track, you can extract it from common video containers such as WebM, MKV, MP4, MOV, and AVI.",
      },
      {
        question: "Can I preview the extracted audio before keeping it?",
        answer:
          "Yes. The tool supports checking the result after extraction so you can confirm the audio before deciding to keep the file.",
      },
    ],
  },
  "video-mute": {
    h1: "Free online video muter",
    metaTitle: "Mute Video Online Free - Remove Audio From MP4, MOV & WebM",
    metaDescription:
      "Use this free online video muter to remove audio from video files in your browser. Mute MP4, MOV, WebM, AVI, and MKV without uploading your file.",
    keywords: [
      "mute video",
      "remove audio from video",
      "video muter",
      "remove sound from video",
      "mute video online",
      "remove audio from mp4",
      "silent video maker",
      "video without sound",
      "mute mp4 online",
      "remove sound from mp4",
    ],
    howToTitle: "How to mute video online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a video from your device or drag it into the tool. Common formats like MP4, MOV, WebM, AVI, and MKV are supported.",
      },
      {
        name: "Choose the output option",
        text: "Keep the same format for the fastest mute workflow, or choose a different format if you need a new output container at the same time.",
      },
      {
        name: "Remove audio and download",
        text: "Start the mute process and download the silent video when it is ready. The process runs in your browser, so you can remove audio from video without uploading it to a remote service.",
      },
    ],
    settingsGuide:
      "If you keep the same format, muting can often happen much faster because the video stream itself does not need heavy processing. That is the best option when you simply want a silent version of the original clip. If you also change formats, the file may need additional re-encoding, which can take longer but may help with compatibility.",
    faqs: [
      {
        question: "Can I remove audio from video without losing quality?",
        answer:
          "Yes, especially when the output keeps the same video format and the tool can preserve the original video stream while dropping only the sound track.",
      },
      {
        question: "Can I mute MP4 videos online without uploading them?",
        answer:
          "Yes. This online video muter runs in your browser, so you can remove audio from MP4 and other supported video files locally instead of uploading them to an external editor.",
      },
      {
        question: "Will muting a video make the file smaller?",
        answer:
          "Usually yes, because the audio track is removed. The exact reduction depends on how much of the original file size was coming from audio versus video.",
      },
      {
        question: "Can I mute only part of a video?",
        answer:
          "This workflow removes the audio track from the exported file. If you only want a specific section, trimming first is often the simplest workaround.",
      },
      {
        question: "Why should I keep the same output format when muting?",
        answer:
          "Keeping the same format usually makes the process faster and helps preserve the original video quality because less extra conversion work is needed.",
      },
    ],
  },
  "image-crop": {
    h1: "Free online image cropper",
    metaTitle: "Crop Image Online Free - Crop JPG, PNG & WebP Photos",
    metaDescription:
      "Use this free online image cropper to trim photos and graphics in your browser. Crop JPG, PNG, and WebP images without uploading them to a remote service.",
    keywords: [
      "crop image",
      "image cropper",
      "crop photo online",
      "crop image online free",
      "crop jpg",
      "crop png",
      "photo cropper",
      "crop image to size",
      "crop picture online",
      "image crop tool",
    ],
    howToTitle: "How to crop images online",
    howToSteps: [
      {
        name: "Upload your image",
        text: "Choose an image from your device or drag it into the cropper. Common formats like JPG, PNG, and WebP are supported.",
      },
      {
        name: "Adjust the crop area",
        text: "Move and resize the crop box to keep the part you want. You can use free cropping or an aspect ratio preset when you need a more specific shape.",
      },
      {
        name: "Crop and download",
        text: "Apply the crop and download the result when it is ready. The process happens in your browser, so you can crop images online without sending them to a remote service.",
      },
    ],
    settingsGuide:
      "Cropping is most useful when you want to remove distractions, focus attention on a subject, or fit an image into a specific layout. Aspect ratio presets help keep the crop proportional for common use cases such as profile images, thumbnails, or social posts. If you need an exact final dimension after cropping, you can combine this workflow with resizing afterward.",
    faqs: [
      {
        question: "Can I crop JPG and PNG images online without uploading them?",
        answer:
          "Yes. This online image cropper runs in your browser, so you can crop JPG, PNG, WebP, and similar files locally instead of uploading them to an external tool.",
      },
      {
        question: "Can I crop an image to a specific shape or ratio?",
        answer:
          "You can crop using a freeform box or by choosing an aspect ratio preset, which helps keep the selection proportional for social, web, and design use cases.",
      },
      {
        question: "Does cropping reduce image quality?",
        answer:
          "Cropping removes unwanted areas but does not automatically harm the part you keep. The final quality depends more on the output format and any later compression than on the crop itself.",
      },
      {
        question: "Should I crop or resize an image first?",
        answer:
          "If you need to focus on one part of the image, crop first. After that, resizing the cropped result is usually the cleaner way to hit an exact width or height.",
      },
      {
        question: "Will cropping preserve transparency?",
        answer:
          "If the output format supports transparency, such as PNG or WebP, the cropped image can preserve that transparent background behavior.",
      },
    ],
  },
  "image-rotate": {
    h1: "Free online image rotator",
    metaTitle: "Rotate Image Online Free - Rotate or Flip JPG, PNG & WebP",
    metaDescription:
      "Use this free online image rotator to rotate or flip images in your browser. Rotate JPG, PNG, and WebP files without uploading them to a remote service.",
    keywords: [
      "rotate image",
      "image rotator",
      "flip image",
      "rotate image online free",
      "rotate jpg",
      "rotate png",
      "flip photo online",
      "image rotate tool",
      "mirror image online",
      "rotate picture online",
    ],
    howToTitle: "How to rotate images online",
    howToSteps: [
      {
        name: "Upload your image",
        text: "Choose an image from your device or drag it into the rotator. Common formats like JPG, PNG, and WebP are supported.",
      },
      {
        name: "Rotate or flip the image",
        text: "Use the rotation controls to turn the image left, right, or upside down, and flip it horizontally or vertically when needed.",
      },
      {
        name: "Download the result",
        text: "Apply the changes and download the updated image when it is ready. The process happens in your browser, so you can rotate images online without uploading them to a remote service.",
      },
    ],
    settingsGuide:
      "Rotation is useful when a photo was saved with the wrong orientation or when you need a different layout for a design or document. Flipping is helpful for mirrored compositions, scanned items, or correcting direction. If the image has transparency, keeping a transparency-friendly format like PNG or WebP usually makes the safest output choice.",
    faqs: [
      {
        question: "Can I rotate JPG and PNG images online without uploading them?",
        answer:
          "Yes. This online image rotator runs in your browser, so you can rotate JPG, PNG, WebP, and similar files locally instead of uploading them to an external tool.",
      },
      {
        question: "What is the difference between rotate and flip?",
        answer:
          "Rotate turns the whole image around an angle, while flip mirrors the image across a horizontal or vertical axis. They solve different layout and orientation problems.",
      },
      {
        question: "Why does my photo appear sideways in some apps?",
        answer:
          "Some images rely on orientation metadata rather than physically rotated pixels. Rotating and saving the image again can make the orientation more consistent across different apps and devices.",
      },
      {
        question: "Will rotating an image reduce quality?",
        answer:
          "The quality impact depends on the output format you choose. Lossless-friendly formats are safer when you want to preserve sharp details, while lossy formats may apply additional compression on export.",
      },
      {
        question: "Can I rotate and flip an image in the same edit?",
        answer:
          "Yes. You can combine rotation and flipping when you need both adjustments before downloading the final image.",
      },
    ],
  },
  "pdf-to-images": {
    h1: "Free online PDF to image converter",
    metaTitle: "PDF to JPG or PNG Online Free - Convert PDF Pages to Images",
    metaDescription:
      "Use this free online PDF to image converter to turn PDF pages into JPG or PNG files in your browser. Convert PDFs without uploading them to a remote server.",
    keywords: [
      "pdf to jpg",
      "pdf to png",
      "convert pdf to images",
      "pdf to image converter",
      "pdf page to image",
      "pdf to jpg online",
      "pdf to png online",
      "save pdf pages as images",
      "convert pdf pages to jpg",
      "pdf to photo converter",
    ],
    howToTitle: "How to convert PDF to images online",
    howToSteps: [
      {
        name: "Upload your PDF",
        text: "Choose a PDF from your device or drag it into the converter. The pages are processed locally in your browser instead of being uploaded to a remote service.",
      },
      {
        name: "Choose image format and quality",
        text: "Select JPG or PNG and choose a resolution that matches your goal. This helps you balance clarity, download size, and whether the pages are text-heavy or image-heavy.",
      },
      {
        name: "Download the pages",
        text: "Convert the PDF and download the resulting images individually or as a ZIP when the pages are ready.",
      },
    ],
    settingsGuide:
      "PNG is usually the better choice for PDFs that contain text, diagrams, forms, or sharp line work because it preserves edges more cleanly. JPG is often smaller and can work well for photograph-heavy PDFs where file size matters more than perfectly crisp text. Higher resolution makes the output sharper, but it also increases file size and processing time, so it is worth matching the setting to whether you need screen viewing, sharing, or printing.",
    faqs: [
      {
        question: "Can I convert PDF to JPG without uploading the file?",
        answer:
          "Yes. This online PDF to image converter runs in your browser, so your PDF stays on your device instead of being uploaded to a remote service.",
      },
      {
        question: "Should I choose JPG or PNG for PDF pages?",
        answer:
          "PNG is usually better for text and graphics because it keeps edges cleaner. JPG is often smaller and can be a better choice for photo-heavy pages when file size matters more.",
      },
      {
        question: "Can I download all PDF pages at once?",
        answer:
          "Yes. After conversion, the pages can be collected in one downloadable ZIP so you do not have to save each image manually.",
      },
      {
        question: "What resolution should I use when converting PDF pages to images?",
        answer:
          "Use a moderate setting for everyday screen use and a higher setting when you need sharper images for print or close inspection. Higher resolution improves clarity but also increases file size.",
      },
      {
        question: "Can I convert protected PDFs to images?",
        answer:
          "Protected files are more limited and may need to be unlocked first before they can be processed normally in the browser.",
      },
    ],
  },
  "image-batch-compress": {
    h1: "Free online batch image compressor",
    metaTitle: "Batch Image Compressor Online Free - Compress JPG, PNG & WebP Files",
    metaDescription:
      "Use this free online batch image compressor to reduce multiple image files in your browser. Compress JPG, PNG, and WebP files together without uploading them.",
    keywords: [
      "batch image compressor",
      "compress multiple images",
      "bulk image compression",
      "batch compress jpg",
      "batch compress png",
      "batch image optimizer",
      "compress images in bulk",
      "multiple image compressor",
      "batch photo compressor",
      "compress many images at once",
    ],
    howToTitle: "How to batch compress images online",
    howToSteps: [
      {
        name: "Upload multiple images",
        text: "Choose several images from your device or drag them into the batch compressor. Common formats like JPG, PNG, and WebP are supported.",
      },
      {
        name: "Choose one set of compression settings",
        text: "Pick the quality and output format you want to apply across the batch. This works well when you need a consistent result for website assets, listings, or large photo sets.",
      },
      {
        name: "Compress and download the results",
        text: "Start the batch compression and download the finished images individually or as a ZIP once the run completes.",
      },
    ],
    settingsGuide:
      "Batch compression is most useful when all images need roughly the same treatment. If some files need lighter compression and others need stronger changes, individual editing is still the better route. For consistent web delivery, using one reasonable quality level across the whole set can save time while still producing predictable results.",
    faqs: [
      {
        question: "Can I compress multiple images at once without uploading them?",
        answer:
          "Yes. This online batch image compressor runs in your browser, so you can process multiple image files locally instead of sending them to an external service.",
      },
      {
        question: "Can I batch compress JPG, PNG, and WebP together?",
        answer:
          "Yes. Mixed batches are supported, and the output can stay close to each file's natural format or be normalized depending on the settings you choose.",
      },
      {
        question: "Should every image use the same quality setting in a batch?",
        answer:
          "For speed and consistency, yes. If some images need special treatment, individual compression usually gives better control than forcing one setting across everything.",
      },
      {
        question: "Can I download all compressed images as one ZIP?",
        answer:
          "Yes. A ZIP download is the most convenient way to save the full batch when you are processing many files together.",
      },
      {
        question: "When should I use batch compression instead of single-image compression?",
        answer:
          "Use batch compression when you have many images that need similar settings. Use single-image compression when you want closer visual review and more control over each file.",
      },
    ],
  },
  "audio-effects": {
    h1: "Free online audio effects editor",
    metaTitle: "Audio Effects Editor Online Free - Speed, Volume, Fade & Normalize",
    metaDescription:
      "Use this free online audio effects editor to change speed, boost volume, add fades, and normalize recordings in your browser without uploading your file.",
    keywords: [
      "audio effects editor",
      "change audio speed",
      "normalize audio",
      "fade audio in and out",
      "audio volume booster",
      "audio editor online free",
      "adjust audio volume",
      "audio fade tool",
      "audio speed changer",
      "audio normalize online",
    ],
    howToTitle: "How to apply audio effects online",
    howToSteps: [
      {
        name: "Upload your audio file",
        text: "Choose an audio file from your device or drag it into the editor. Common formats like MP3, WAV, AAC, OGG, and FLAC are supported.",
      },
      {
        name: "Adjust the effects you need",
        text: "Change playback speed, boost or reduce volume, add fade in or fade out, and normalize loudness depending on the result you want.",
      },
      {
        name: "Apply the effects and download",
        text: "Process the audio and download the result when it is ready. The edit runs in your browser, so you can apply audio effects without uploading your file to a remote service.",
      },
    ],
    settingsGuide:
      "Audio effects are most useful when you are trying to improve clarity, fix level differences, or prepare a file for sharing. Normalize is often the safest first step when a recording is too quiet or inconsistent, while fade effects help create cleaner starts and endings. Speed changes can also help with practice tracks, voice recordings, and quick review workflows.",
    faqs: [
      {
        question: "Can I change audio speed without changing pitch too much?",
        answer:
          "Yes. Modern speed adjustment can preserve the feel of the original voice or music much better than older simple playback-rate changes, especially at moderate speed shifts.",
      },
      {
        question: "What does normalize audio mean?",
        answer:
          "Normalization adjusts loudness so the recording plays at a more consistent level. It is especially useful when the original file sounds quieter or less balanced than expected.",
      },
      {
        question: "Can I boost volume without uploading the file?",
        answer:
          "Yes. This online audio effects editor runs in your browser, so you can boost volume, normalize, and apply other audio changes locally instead of sending the file to an external service.",
      },
      {
        question: "Can I apply more than one audio effect at once?",
        answer:
          "Yes. You can combine several effects in the same processing run, which is often more efficient than exporting multiple intermediate versions.",
      },
      {
        question: "When should I use fade in and fade out?",
        answer:
          "Fade effects are useful when you want cleaner starts and endings, especially for music clips, intros, outros, ambient recordings, or edited spoken content.",
      },
    ],
  },
  "video-speed": {
    h1: "Free online video speed changer",
    metaTitle: "Change Video Speed Online Free - Slow Down or Speed Up Video",
    metaDescription:
      "Use this free online video speed changer to slow down or speed up video in your browser. Adjust MP4, MOV, WebM, and AVI files without uploading them.",
    keywords: [
      "change video speed",
      "speed up video",
      "slow down video",
      "video speed changer",
      "slow motion video editor",
      "fast forward video",
      "video speed editor online",
      "change mp4 speed",
      "slow down mp4",
      "speed up video online free",
    ],
    howToTitle: "How to change video speed online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a video from your device or drag it into the speed editor. Common formats like MP4, MOV, WebM, and AVI are supported.",
      },
      {
        name: "Choose a slower or faster speed",
        text: "Pick a speed setting that matches your goal, whether you want slow motion for emphasis or faster playback for condensed viewing.",
      },
      {
        name: "Apply the new speed and download",
        text: "Process the video and download the result when it is ready. The edit runs in your browser, so you can change video speed without uploading the file to a remote server.",
      },
    ],
    settingsGuide:
      "Slowing a video down is best when the source already has enough frames to stay smooth, while speeding it up is useful for tutorials, walkthroughs, and quick summaries. Audio can become less useful at extreme speeds, so there are cases where muting or simplifying the audio is the cleaner choice. For everyday edits, moderate speed changes usually give the most natural result.",
    faqs: [
      {
        question: "Can I slow down a video without uploading it?",
        answer:
          "Yes. This online video speed changer runs in your browser, so you can slow down or speed up video locally instead of uploading it to an external service.",
      },
      {
        question: "Will slow motion look smooth on every video?",
        answer:
          "Not always. Smoother slow motion depends heavily on the original frame rate, so footage shot at higher frame rates usually performs better when slowed down.",
      },
      {
        question: "Can I speed up video and keep the audio?",
        answer:
          "Yes, depending on the workflow and speed setting. For moderate changes, keeping audio often works well, though extreme changes may sound less natural.",
      },
      {
        question: "What is the best use for a video speed changer?",
        answer:
          "It is useful for slow motion highlights, faster tutorials, condensed recordings, sports clips, and review workflows where pacing matters.",
      },
      {
        question: "Will changing video speed reduce quality?",
        answer:
          "The main quality risk usually comes from reprocessing the file rather than the speed idea itself. Moderate edits are generally suitable for everyday sharing and viewing.",
      },
    ],
  },
  "pdf-from-images": {
    h1: "Free online images to PDF converter",
    metaTitle: "Images to PDF Online Free - Convert JPG, PNG & WebP to PDF",
    metaDescription:
      "Use this free online images to PDF converter to combine photos and image files into one PDF in your browser without uploading them to a remote server.",
    keywords: [
      "images to pdf",
      "jpg to pdf",
      "png to pdf",
      "photo to pdf",
      "convert images to pdf",
      "image to pdf converter",
      "combine photos into pdf",
      "pictures to pdf",
      "save images as pdf",
      "jpg to pdf online free",
    ],
    howToTitle: "How to convert images to PDF online",
    howToSteps: [
      {
        name: "Upload your images",
        text: "Choose one or more images from your device or drag them into the converter. Common formats like JPG, PNG, and WebP are supported.",
      },
      {
        name: "Arrange the pages and choose layout settings",
        text: "Set the order you want, then choose options like page size, orientation, or margins depending on how the PDF should look.",
      },
      {
        name: "Generate the PDF and download it",
        text: "Create the PDF and download the finished file when it is ready. The process runs in your browser, so your images stay on your device.",
      },
    ],
    settingsGuide:
      "Converting images to PDF is useful when you want a cleaner document for printing, sharing, or archiving. The page size you choose affects how much whitespace appears around each image and how natural the final document feels. If the images are scans or document captures, keeping the order clean before export usually matters more than anything else.",
    faqs: [
      {
        question: "Can I convert JPG to PDF without uploading it?",
        answer:
          "Yes. This online images to PDF converter runs in your browser, so your photos and screenshots stay on your device instead of being uploaded to a remote service.",
      },
      {
        question: "Can I combine multiple images into one PDF?",
        answer:
          "Yes. You can upload several images, arrange them in order, and create a single combined PDF from the full set.",
      },
      {
        question: "What page size should I use for images to PDF?",
        answer:
          "That depends on whether the PDF is meant for printing, archiving, or screen viewing. Standard document sizes are a good default, while image-fit workflows can work better for photos and scans.",
      },
      {
        question: "Will image quality be preserved in the PDF?",
        answer:
          "The goal is to keep the images clear enough for their intended use, though the exact result depends on the source files and PDF generation settings.",
      },
      {
        question: "Why convert images to PDF instead of sharing them individually?",
        answer:
          "A single PDF is often easier to print, send, review, and archive than a folder full of separate image files.",
      },
    ],
  },
  "image-filters": {
    h1: "Free online image filters editor",
    metaTitle: "Image Filters Online Free - Brightness, Contrast, Blur & More",
    metaDescription:
      "Use this free online image filters editor to adjust brightness, contrast, saturation, blur, and more in your browser without uploading your image.",
    keywords: [
      "image filters",
      "photo filters online",
      "edit image brightness",
      "adjust image contrast",
      "image filter editor",
      "photo editor filters",
      "blur image online",
      "change image saturation",
      "apply photo filters online",
      "image effects editor",
    ],
    howToTitle: "How to apply image filters online",
    howToSteps: [
      {
        name: "Upload your image",
        text: "Choose an image from your device or drag it into the editor. A preview appears so you can adjust the look before downloading.",
      },
      {
        name: "Choose a preset or adjust the sliders",
        text: "Use one-click looks or fine-tune brightness, contrast, saturation, blur, and related settings to get the style you want.",
      },
      {
        name: "Apply the filters and download",
        text: "Save the filtered image when you are happy with the result. The edits run in your browser, so you can apply image filters without uploading the file to a remote service.",
      },
    ],
    settingsGuide:
      "Image filters are most useful when you want quick visual improvement without moving into heavy editing software. Small adjustments often work better than extreme ones, especially for brightness, contrast, and saturation. If you are editing for websites or product imagery, subtle changes usually produce more trustworthy results than aggressive stylized effects.",
    faqs: [
      {
        question: "Can I apply image filters without uploading my photo?",
        answer:
          "Yes. This online image filters editor runs in your browser, so your image stays on your device instead of being uploaded to a remote service.",
      },
      {
        question: "Can I combine multiple filters in one image edit?",
        answer:
          "Yes. You can stack several adjustments together, which makes it easy to create a custom result instead of relying on one preset alone.",
      },
      {
        question: "What is the best output format after applying image filters?",
        answer:
          "That depends on the image type and how you plan to use it. Some formats are better for photos, while others are safer for graphics or transparent assets.",
      },
      {
        question: "Why does the preview sometimes look different from the downloaded image?",
        answer:
          "Live previews are often scaled for speed, while the exported image is rendered from the full source. The overall effect should stay similar even if fine details look slightly different.",
      },
      {
        question: "When should I use blur, brightness, and contrast changes?",
        answer:
          "Brightness and contrast are good for quick correction, while blur is more useful for stylistic softening or reducing distracting detail in the background.",
      },
    ],
  },
  "image-watermark": {
    h1: "Free online image watermark tool",
    metaTitle: "Add Watermark to Image Online Free - Text Watermark Tool",
    metaDescription:
      "Use this free online image watermark tool to add text watermarks to JPG, PNG, and WebP images in your browser without uploading them to a remote service.",
    keywords: [
      "watermark image",
      "add watermark to image",
      "text watermark tool",
      "watermark photos online",
      "image watermark online free",
      "add text watermark",
      "photo watermark maker",
      "watermark jpg",
      "watermark png",
      "protect image with watermark",
    ],
    howToTitle: "How to add a watermark to an image online",
    howToSteps: [
      {
        name: "Upload your image",
        text: "Choose an image from your device or drag it into the watermark tool. Common formats like JPG, PNG, and WebP are supported.",
      },
      {
        name: "Set your watermark text and style",
        text: "Enter the text you want, then adjust size, color, opacity, and placement until the watermark looks right for the image.",
      },
      {
        name: "Apply the watermark and download",
        text: "Save the watermarked image when it is ready. The process happens in your browser, so you can watermark images without uploading them to a remote service.",
      },
    ],
    settingsGuide:
      "Watermarks work best when they are visible enough to deter casual reuse but not so heavy that they ruin the image itself. Position, opacity, and contrast matter more than flashy styling. For portfolio, product, or proofing workflows, a clean consistent watermark usually looks more professional than a large aggressive overlay.",
    faqs: [
      {
        question: "Can I add a text watermark without uploading my image?",
        answer:
          "Yes. This online image watermark tool runs in your browser, so your image stays on your device instead of being uploaded to a remote service.",
      },
      {
        question: "What is the best position for a watermark?",
        answer:
          "That depends on the image and how strongly you want to discourage reuse. Corners are common for subtle branding, while more central placement is harder to crop out.",
      },
      {
        question: "Should a watermark be fully opaque?",
        answer:
          "Usually not. A moderate opacity often looks cleaner and less distracting while still making the ownership mark visible.",
      },
      {
        question: "Can I watermark many images at once?",
        answer:
          "This page is best for one image at a time. Batch watermarking is a different workflow and is usually handled separately.",
      },
      {
        question: "What is the best use case for an image watermark?",
        answer:
          "It is especially useful for portfolio previews, client proofs, product previews, branded media, and any image you want to identify more clearly before sharing.",
      },
    ],
  },
  "video-reverse": {
    h1: "Free online video reverser",
    metaTitle: "Reverse Video Online Free - Play MP4, MOV & WebM Backwards",
    metaDescription:
      "Use this free online video reverser to play video clips backwards in your browser. Reverse MP4, MOV, WebM, and AVI files without uploading them.",
    keywords: [
      "reverse video",
      "play video backwards",
      "video reverser",
      "reverse video online",
      "reverse mp4",
      "video backwards effect",
      "reverse clip online free",
      "play mp4 backwards",
      "reverse video with audio",
      "video reverse tool",
    ],
    howToTitle: "How to reverse video online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a video from your device or drag it into the reverser. Common formats like MP4, MOV, WebM, and AVI are supported.",
      },
      {
        name: "Choose whether to reverse the audio",
        text: "Decide if you want only the video to play backwards or if you also want the sound reversed for a stronger effect.",
      },
      {
        name: "Reverse and download",
        text: "Process the clip and download the reversed video when it is ready. The edit runs in your browser, so you can reverse video without uploading it to a remote service.",
      },
    ],
    settingsGuide:
      "Video reversal is more demanding than simpler edits because the whole clip has to be reprocessed in reverse order. Shorter clips are easier to handle, so trimming before reversing is often the smartest workflow. Reversing only the visual motion is useful for effect shots, while reversing audio as well creates a much more obvious backwards result.",
    faqs: [
      {
        question: "Can I reverse a video without uploading it?",
        answer:
          "Yes. This online video reverser runs in your browser, so you can reverse MP4 and other supported video files locally instead of sending them to an external service.",
      },
      {
        question: "Why does reversing a video take longer than trimming or muting?",
        answer:
          "Reversal is a heavier effect because the clip has to be reprocessed in reverse order instead of simply cutting or removing one track.",
      },
      {
        question: "Can I reverse only part of a video?",
        answer:
          "Yes, but the cleaner workflow is usually to trim the exact section first and then reverse that smaller clip instead of processing the whole original video.",
      },
      {
        question: "Can I reverse the audio too?",
        answer:
          "Yes. You can choose whether the reversed result keeps backwards audio or outputs only the visual reverse effect.",
      },
      {
        question: "Will reversing reduce video quality?",
        answer:
          "The result usually needs fresh processing, so some generation loss is possible, but it is generally acceptable for normal sharing and effect-based edits.",
      },
    ],
  },
  "video-crop": {
    h1: "Free online video cropper",
    metaTitle: "Crop Video Online Free - Remove Black Bars and Change Aspect Ratio",
    metaDescription:
      "Use this free online video cropper to remove unwanted edges, black bars, or empty space from videos in your browser without uploading them.",
    keywords: [
      "crop video",
      "video cropper",
      "remove black bars from video",
      "change video aspect ratio",
      "crop video online",
      "crop mp4 online",
      "video crop tool",
      "cut edges off video",
      "resize video frame area",
      "video cropper online free",
    ],
    howToTitle: "How to crop video online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a video from your device or drag it into the cropper. The preview helps you see the frame before exporting.",
      },
      {
        name: "Set the crop area",
        text: "Drag the crop box or enter exact values to define the part of the frame you want to keep. Aspect ratio presets help when you need a specific layout.",
      },
      {
        name: "Crop and download",
        text: "Process the cropped video and download the result when it is ready. The edit runs in your browser, so you can crop video without uploading it to a remote service.",
      },
    ],
    settingsGuide:
      "Cropping is especially useful when you need to remove black bars, reframe a subject, or adapt a clip to a different aspect ratio. Exact controls matter more when you are targeting a platform format, while free cropping is better when the goal is simply removing unwanted edges. Trimming before cropping can also help if the original file is very large and you only need part of it.",
    faqs: [
      {
        question: "Can I remove black bars from a video without uploading it?",
        answer:
          "Yes. This online video cropper runs in your browser, so you can remove black bars and crop video locally instead of sending it to an external service.",
      },
      {
        question: "Can I crop a video to a specific aspect ratio?",
        answer:
          "Yes. Aspect ratio presets help you keep the frame proportional when you need a shape that fits a platform, player, or layout requirement.",
      },
      {
        question: "Does cropping a video reduce quality?",
        answer:
          "Because the frame dimensions change, cropping usually requires fresh processing. In practice, the result is often suitable for normal publishing and sharing when the settings stay reasonable.",
      },
      {
        question: "Should I crop or trim first?",
        answer:
          "If the video is long and you only need a section, trimming first can save processing time before you apply the crop.",
      },
      {
        question: "Can I use exact pixel values instead of dragging?",
        answer:
          "Yes. Exact numeric input is useful when you need more precise cropping than visual dragging alone can provide.",
      },
    ],
  },
  "video-effects": {
    h1: "Free online video effects editor",
    metaTitle: "Video Effects Editor Online Free - Speed, Filters, Rotate & More",
    metaDescription:
      "Use this free online video effects editor to adjust speed, rotate video, add visual effects, and make quick changes in your browser without uploading your file.",
    keywords: [
      "video effects editor",
      "edit video online",
      "video filter tool",
      "change video speed",
      "video enhancer",
      "video editor effects",
      "apply effects to video",
      "online video effects",
      "video adjustments editor",
      "simple video editor online",
    ],
    howToTitle: "How to apply video effects online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a video from your device or drag it into the editor. Common formats like MP4, MOV, and WebM are supported.",
      },
      {
        name: "Choose the effects you want",
        text: "Adjust the available video effects such as speed, rotation, and other quick visual changes based on the result you need.",
      },
      {
        name: "Apply the effects and download",
        text: "Process the video and download the edited result when it is ready. The workflow runs in your browser, so you can apply video effects without uploading the file to a remote service.",
      },
    ],
    settingsGuide:
      "This type of editor is best for practical adjustments and lightweight effects rather than full timeline production work. Combining a few focused changes usually produces better results than stacking too many edits at once. If the goal is speed, compatibility, or a clearer presentation, a simple effects workflow is often enough without moving into a larger desktop editor.",
    faqs: [
      {
        question: "Can I edit video effects online without uploading the file?",
        answer:
          "Yes. This online video effects editor runs in your browser, so your video stays on your device instead of being uploaded to a remote service.",
      },
      {
        question: "What kind of changes are best for a quick video effects editor?",
        answer:
          "It works best for practical edits such as speed changes, orientation fixes, light effect adjustments, and quick cleanup before sharing.",
      },
      {
        question: "Can I combine multiple video effects in one pass?",
        answer:
          "Yes. Combining several compatible edits in one run is usually more efficient than exporting multiple intermediate versions.",
      },
      {
        question: "Will adding effects reduce video quality?",
        answer:
          "Some effects require fresh processing, so there can be a quality tradeoff depending on the export path. For everyday use, the results are usually suitable for normal sharing and publishing.",
      },
      {
        question: "When should I use a dedicated single-purpose tool instead of the effects editor?",
        answer:
          "If you already know you only need one specific task like trimming, muting, cropping, or reversing, a dedicated tool is often simpler and easier to control.",
      },
    ],
  },
  "video-burn-caption": {
    h1: "Free online caption burner",
    metaTitle: "Add Captions to Video Online Free - Burn Subtitles Into Video",
    metaDescription:
      "Use this free online caption burner to add captions or subtitles directly into video files in your browser without uploading them to a remote service.",
    keywords: [
      "add captions to video",
      "burn subtitles into video",
      "video subtitle burner",
      "add subtitles to mp4",
      "caption video online",
      "hardcode subtitles",
      "burn captions online free",
      "subtitle video editor",
      "add text captions to video",
      "embed subtitles in video",
    ],
    howToTitle: "How to burn captions into a video online",
    howToSteps: [
      {
        name: "Upload your video",
        text: "Choose a video from your device or drag it into the caption tool. Common formats like MP4, MOV, and WebM are supported.",
      },
      {
        name: "Add or configure the captions",
        text: "Set the subtitle or caption content and make sure it appears the way you want before export. This is useful when you need always-visible captions that stay part of the video itself.",
      },
      {
        name: "Burn the captions and download",
        text: "Process the video and download the captioned result when it is ready. The workflow runs in your browser, so you can add captions to video without uploading the file to a remote service.",
      },
    ],
    settingsGuide:
      "Burned captions become part of the video frame, which makes them useful when you want guaranteed visibility across players and platforms. This is different from optional subtitle tracks that viewers can turn on or off. Hardcoded captions are especially useful for social clips, previews, and situations where you do not want subtitle support to depend on the playback app.",
    faqs: [
      {
        question: "What does it mean to burn subtitles into a video?",
        answer:
          "It means the captions become part of the visible video itself rather than being kept as a separate optional subtitle track.",
      },
      {
        question: "Can I add captions to video without uploading it?",
        answer:
          "Yes. This online caption burner runs in your browser, so you can add captions or subtitles locally instead of uploading the source video to an external service.",
      },
      {
        question: "When should I burn captions instead of attaching subtitle files?",
        answer:
          "Burned captions are better when you need the text to always appear, especially on social platforms, previews, or players that may not handle subtitle tracks consistently.",
      },
      {
        question: "Will burned captions be removable later?",
        answer:
          "No. Once the captions are burned into the video image, they become part of the exported file and cannot be turned off like a separate subtitle track.",
      },
      {
        question: "Why use hardcoded captions on short videos?",
        answer:
          "They improve visibility and consistency, especially in mobile and social contexts where viewers often watch without ideal subtitle support or where always-on text improves comprehension.",
      },
    ],
  },
};
