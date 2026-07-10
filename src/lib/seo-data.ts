import type { ToolSeoData } from "./seo-types";

export const seoDataMap: Record<string, ToolSeoData> = {
  "video-convert": {
    toolId: "video-convert",
    h1: "Convert video online — free, no upload required",
    metaDescription: "Convert MP4, WebM, AVI, MOV, MKV and more directly in your browser. Powered by FFmpeg. Your files never leave your device.",
    howToTitle: "How to convert a video",
    howToSteps: [
      { name: "Drop your video", text: "Click the dropzone or drag your video file in. MP4, WebM, AVI, MOV, MKV, FLV and M4V are all supported." },
      { name: "Choose format and quality", text: "Pick your output format, resolution, and CRF quality level. Hover any option for a description." },
      { name: "Convert and download", text: "Click Convert Video. FFmpeg processes everything locally — download your file when it finishes." },
    ],
    settingsGuide: "The CRF (Constant Rate Factor) slider controls quality vs. file size — lower values mean higher quality and larger files. The resolution dropdown scales the video; downscaling to 720p or 480p can cut file size dramatically. If you only need to change the container (e.g. MKV → MP4) without re-encoding, choose the same codec and select stream copy to make the process instant.",
    formatTable: [
      { format: "MP4 (H.264)", useCase: "Universal sharing", size: "Medium", quality: "Excellent" },
      { format: "WebM (VP9)", useCase: "Web embedding", size: "Small", quality: "Excellent" },
      { format: "MKV", useCase: "Archive / PC", size: "Varies", quality: "Lossless possible" },
      { format: "AVI", useCase: "Legacy compat.", size: "Large", quality: "Good" },
      { format: "MOV", useCase: "Apple ecosystem", size: "Medium", quality: "Excellent" },
    ],
    faqs: [
      { question: "What is the difference between MP4 H.264 and WebM VP9?", answer: "MP4 with H.264 offers near-universal device compatibility and hardware-accelerated playback on most phones and TVs. WebM VP9 achieves roughly 50% better compression at the same visual quality but requires software decoding on older devices. Choose MP4/H.264 for broad compatibility and WebM/VP9 for web streaming where bandwidth matters." },
      { question: "Will converting to a different container lose video quality?", answer: "Converting between containers (e.g., MKV to MP4) without changing the codec is lossless — the video data is untouched. If you change the codec (e.g., H.264 to H.265), re-encoding occurs and introduces some generation loss. Our converter lets you keep the original codec when changing containers to avoid any quality loss." },
      { question: "Why is my output file larger than the input after conversion?", answer: "This typically happens when the target codec is less efficient than the source. For example, converting a well-compressed H.265 video to H.264 will produce a larger file. Lowering the quality preset (higher CRF value) or choosing a more efficient codec resolves this." },
      { question: "Which format should I use for social media?", answer: "Most platforms (YouTube, Instagram, TikTok, Twitter) prefer MP4 with H.264 encoding. For YouTube specifically, upload at the highest resolution you have — their pipeline handles the rest." },
      { question: "Is there a file size limit?", answer: "No artificial limit is imposed. The only constraint is your browser's available RAM. Files up to 2–4 GB work on most modern computers." },
    ],
  },

  "video-compress": {
    toolId: "video-compress",
    h1: "Compress video for WhatsApp, email and web — free",
    metaDescription: "Reduce video file size online with named presets for WhatsApp, email, web and Twitter. No upload. Powered by FFmpeg in your browser.",
    howToTitle: "How to compress a video",
    howToSteps: [
      { name: "Drop your video", text: "Drag your video onto the dropzone or click to browse. MP4, WebM, AVI, MOV and MKV are supported." },
      { name: "Pick a preset or go custom", text: "Choose WhatsApp, Email, Web, Twitter, Archive or Custom. Each preset sets the optimal CRF, resolution and format for that use case." },
      { name: "Compress and download", text: "Click Compress Video. Processing runs locally in your browser — no upload happens at any point." },
    ],
    settingsGuide: "CRF (Constant Rate Factor) controls perceptual quality: 18 is near-lossless, 28 is our recommended balance, and 38 produces the smallest file at the cost of visible quality loss. Resolution has the biggest impact on file size — dropping from 1080p to 720p alone cuts file size by around 50%. The WhatsApp preset targets CRF 28 at 720p, which keeps most clips under the 16 MB sharing limit.",
    formatTable: [
      { format: "MP4 (H.264)", useCase: "WhatsApp, email, social", size: "Medium", quality: "Excellent compat." },
      { format: "WebM (VP9)", useCase: "Web embeds", size: "Smallest", quality: "Great, slower encode" },
      { format: "MKV", useCase: "Archive", size: "Varies", quality: "Flexible" },
    ],
    faqs: [
      { question: "What CRF value gives the best quality-to-size ratio?", answer: "For H.264, CRF 23 is the default sweet spot. Values 18–22 give near-lossless results with larger files; 24–28 reduce file size noticeably with minor quality loss. For WhatsApp specifically, CRF 28 at 720p is the optimal balance." },
      { question: "Does compressing a video reduce quality?", answer: "Yes, but the loss is minimal at sensible settings. CRF 28 is visually near-lossless for most content. Quality only degrades noticeably at CRF 33+ or when you also heavily downscale the resolution." },
      { question: "Will my compressed video be under the WhatsApp 16 MB limit?", answer: "The WhatsApp preset targets that limit for clips up to about 3–4 minutes. Longer clips may need the Email preset (480p) or a higher CRF to fit." },
      { question: "Is MP4 or WebM better for compression?", answer: "WebM (VP9) achieves ~30% smaller files than MP4 (H.264) at the same quality, but takes 3–5× longer to encode. Use MP4 for speed and device compatibility; use WebM for web pages where you control the player." },
      { question: "What is the difference between 2-pass and CRF compression?", answer: "CRF maintains consistent visual quality throughout, letting the bitrate vary. 2-pass targets a fixed average bitrate, useful when file size must be exact. For general use, CRF produces better results with less configuration." },
    ],
  },

  "video-trim": {
    toolId: "video-trim",
    h1: "Trim video online — drag the timeline, no upload",
    metaDescription: "Cut video clips with a visual filmstrip timeline. Drag start and end handles to select your segment. Free, browser-based, no upload required.",
    howToTitle: "How to trim a video",
    howToSteps: [
      { name: "Drop your video", text: "Drag your video onto the dropzone. A filmstrip preview generates automatically from your video frames." },
      { name: "Drag the handles", text: "Drag the left handle to set the start point and the right handle to set the end point. Or use the quick preset buttons (First 10s, Last 30s, etc.)." },
      { name: "Trim and download", text: "Choose an output format and click Trim Video. The selected segment is extracted and downloaded." },
    ],
    settingsGuide: "When the output format matches your input (e.g., MP4 in → MP4 out), the tool uses stream copy — no re-encoding, near-instant processing, zero quality loss. If you change format, FFmpeg re-encodes with H.264/ultrafast for speed. The playhead buttons let you pause the video at a precise moment and set that exact time as the start or end point.",
    faqs: [
      { question: "Can I trim a video without re-encoding it?", answer: "Yes. When the output format matches the input, the tool uses stream copy (-c copy) — no re-encoding, so the trim is instant and lossless. Cuts are accurate to the nearest keyframe, which is typically within 0.5–2 seconds of your chosen point." },
      { question: "How precise is the trim?", answer: "Stream copy trims to the nearest keyframe (typically every 1–2 seconds). If you need frame-accurate cuts, choose a different output format to trigger re-encoding, which is precise to the exact frame." },
      { question: "Does trimming reduce video quality?", answer: "With stream copy (same format in/out) there is zero quality loss — the video data is byte-for-byte identical. Re-encoding introduces a small quality reduction proportional to the CRF setting used." },
      { question: "Can I make multiple cuts from one video?", answer: "Currently the tool extracts one continuous segment per operation. For multiple cuts, run the tool again on the downloaded clip or on the original file." },
      { question: "What formats are supported for output?", answer: "MP4, WebM, AVI, and MOV. MP4 with stream copy is the fastest option when your input is already MP4." },
    ],
  },

  "video-merge": {
    toolId: "video-merge",
    h1: "Merge videos online — combine clips free, no upload",
    metaDescription: "Combine multiple video files into one online. Reorder clips by dragging. Free browser-based tool, powered by FFmpeg. No upload required.",
    howToTitle: "How to merge videos",
    howToSteps: [
      { name: "Upload your clips", text: "Drop two or more video files. The tool accepts MP4, WebM, AVI, MOV and MKV." },
      { name: "Reorder the clips", text: "Drag clips up or down to set the playback order. The final video plays them in the listed order." },
      { name: "Merge and download", text: "Click Merge Videos. FFmpeg concatenates the clips locally in your browser and you download a single output file." },
    ],
    settingsGuide: "For fastest results, use clips in the same format and resolution — FFmpeg can then concatenate without re-encoding (stream copy). If your clips have different resolutions or codecs, enable re-encode mode to unify them; this is slower but handles any combination of inputs. Audio tracks are carried through unchanged in stream copy mode.",
    faqs: [
      { question: "Can I merge videos with different resolutions?", answer: "Yes, using the re-encode option. FFmpeg will scale all clips to a common resolution. In stream copy mode, all input clips must have the same resolution, codec, and frame rate for reliable output." },
      { question: "Does merging reduce video quality?", answer: "Stream copy is lossless — the video data is not touched. Re-encode mode introduces a small quality reduction proportional to the CRF setting." },
      { question: "How many videos can I merge at once?", answer: "There is no hard limit. Practically, available browser memory limits you. Most devices handle 10–20 clips comfortably depending on file sizes." },
      { question: "Can I merge audio and video separately?", answer: "This tool is designed for video-to-video concatenation. To layer an audio track over a video, use a dedicated mux tool or the audio merge feature." },
      { question: "What is the output format?", answer: "The output format matches your first input clip by default. You can change this in the format selector before merging." },
    ],
  },

  "audio-convert": {
    toolId: "audio-convert",
    h1: "Convert audio to MP3, WAV, FLAC and more — free online",
    metaDescription: "Convert audio between MP3, WAV, OGG, FLAC, M4A and AAC in your browser. No upload, no account. Free FFmpeg-powered audio converter.",
    howToTitle: "How to convert audio",
    howToSteps: [
      { name: "Drop your audio file", text: "Drag any audio file onto the dropzone. MP3, WAV, OGG, FLAC, M4A, AAC and WMA are supported as input." },
      { name: "Choose format and bitrate", text: "Select your target format and bitrate. Higher bitrates preserve more detail; lower bitrates give smaller files." },
      { name: "Convert and download", text: "Click Convert Audio. The conversion runs locally in your browser — no file is uploaded anywhere." },
    ],
    settingsGuide: "Bitrate controls audio quality: 320 kbps is CD-quality for music, 192 kbps is transparent for most listeners, 128 kbps is good for speech and podcasts, and 96 kbps is compact for voice recordings. FLAC is lossless and large — ideal for archiving. MP3 at 192 kbps is the best general-purpose choice for broad device compatibility. Converting from a lossy format (MP3) to another lossy format (AAC) will not recover lost detail — start from the highest quality source you have.",
    formatTable: [
      { format: "MP3", useCase: "Universal sharing", size: "Small–Medium", quality: "Good (lossy)" },
      { format: "WAV", useCase: "Editing, DAW", size: "Large", quality: "Lossless" },
      { format: "FLAC", useCase: "Archive, hi-fi", size: "Medium–Large", quality: "Lossless" },
      { format: "OGG", useCase: "Web / games", size: "Small", quality: "Good (lossy)" },
      { format: "M4A (AAC)", useCase: "Apple devices", size: "Small–Medium", quality: "Better than MP3" },
    ],
    faqs: [
      { question: "Does converting MP3 to WAV improve quality?", answer: "No. WAV is an uncompressed container, but converting from a lossy MP3 cannot recover the audio information that was discarded during MP3 encoding. The WAV file will be larger but contain the same quality as the MP3 source." },
      { question: "What is the best format for AirPods and iPhone?", answer: "M4A (AAC) at 256 kbps — it is Apple's native format, hardware-decoded on all Apple devices, and achieves better quality than MP3 at the same file size." },
      { question: "What is the best bitrate for music?", answer: "192 kbps is transparent for most listeners in a blind test. 320 kbps is the maximum MP3 bitrate and is preferred for archiving. For FLAC, bitrate is not applicable — the file is lossless." },
      { question: "Why is my FLAC output so much larger than the MP3 input?", answer: "FLAC is lossless and uncompressed compared to MP3's lossy compression. A 5 MB MP3 at 192 kbps might become a 30–50 MB FLAC file. The quality ceiling is limited by the MP3 source quality." },
      { question: "Can I convert a video file to audio here?", answer: "Yes. Drop a video file (MP4, MKV, etc.) and the converter will extract and convert just the audio track to your chosen format." },
    ],
  },

  "audio-compress": {
    toolId: "audio-compress",
    h1: "Compress audio file online — reduce size free",
    metaDescription: "Reduce audio file size online by adjusting bitrate, sample rate and channels. MP3, WAV, OGG, FLAC supported. Free, no upload.",
    howToTitle: "How to compress audio",
    howToSteps: [
      { name: "Drop your audio", text: "Upload an MP3, WAV, OGG, FLAC or M4A file by dragging it onto the dropzone." },
      { name: "Adjust compression settings", text: "Lower the bitrate for smaller files. Switch stereo to mono to halve the file size for voice content. Reduce the sample rate to 22 kHz for speech." },
      { name: "Compress and download", text: "Click Compress Audio. Your compressed file is ready to download without any server upload." },
    ],
    settingsGuide: "Bitrate is the primary lever: 128 kbps is good for music streaming, 96 kbps works well for podcasts, and 64 kbps is compact for voice memos. Converting stereo to mono halves the file size with no perceptible quality difference for speech. Dropping the sample rate from 44.1 kHz to 22 kHz saves additional space and is appropriate for voice-only content. For music, keep stereo and 44.1 kHz and only reduce the bitrate.",
    faqs: [
      { question: "Does compressing audio reduce quality?", answer: "Yes, all bitrate-based compression is lossy. The quality reduction is minimal at 128 kbps and above for most content. At 64 kbps or below, artefacts become audible — acceptable for voice, not ideal for music." },
      { question: "What bitrate should I use for a podcast?", answer: "96 kbps mono is the industry standard for speech podcasts — it sounds clear and keeps episode files under 50 MB per hour. For music-heavy shows, 128 kbps stereo is more appropriate." },
      { question: "Will changing stereo to mono affect quality?", answer: "For music, mono removes stereo width and can feel flat. For speech and podcasts, mono sounds natural and halves the file size. There is no other quality difference beyond the removal of stereo separation." },
      { question: "What is the smallest I can make a 3-minute MP3?", answer: "At 64 kbps mono, a 3-minute track is about 1.4 MB. At 128 kbps stereo (recommended minimum for music) it is about 2.8 MB. At 320 kbps stereo (CD quality) it is about 7 MB." },
      { question: "Can I reduce FLAC file size without losing quality?", answer: "FLAC uses lossless compression — you cannot reduce its size further without converting to a lossy format like MP3. The file size is determined by the audio content itself." },
    ],
  },

  "audio-trim": {
    toolId: "audio-trim",
    h1: "Cut audio online free — waveform trimmer, no upload",
    metaDescription: "Trim audio with a visual waveform. Drag start and end handles to select your clip. Supports MP3, WAV, OGG, FLAC, M4A. Free, no upload.",
    howToTitle: "How to trim audio",
    howToSteps: [
      { name: "Drop your audio", text: "Upload any audio file. The waveform generates automatically so you can see the sound before trimming." },
      { name: "Drag the handles", text: "Drag the left handle to set the start point and the right handle to set the end point on the waveform. Click anywhere to move the playhead." },
      { name: "Trim and download", text: "Choose an output format and click Trim Audio. The selected region is extracted and downloaded." },
    ],
    settingsGuide: "When the output format matches the input (e.g., MP3 in → MP3 out), stream copy is used — the trim is instant and lossless. If you change the format, FFmpeg re-encodes at 192 kbps. The waveform display uses the Web Audio API to decode your file locally — nothing is uploaded. Click anywhere on the waveform to move the playhead and use the Preview button to hear the selected region before trimming.",
    faqs: [
      { question: "How precise is the trim on audio?", answer: "For most formats, stream copy is accurate to within a single audio frame (around 20–50 ms). Re-encode mode is frame-accurate to the millisecond." },
      { question: "Does trimming reduce audio quality?", answer: "With stream copy (same format in/out), quality is identical to the original — zero re-encoding. Changing the output format triggers re-encoding at 192 kbps, which may introduce a very small quality reduction." },
      { question: "Can I extract a ringtone from a song?", answer: "Yes. Trim to any 30-second segment, export as M4A (AAC) for iPhone ringtones or MP3 for Android. The resulting file can be used as a ringtone after transferring to your device." },
      { question: "What formats support lossless stream copy trimming?", answer: "MP3, WAV, FLAC and OGG all support stream copy when trimming to the same format. M4A/AAC in MP4 containers also supports it." },
      { question: "Can I trim silence from the beginning and end automatically?", answer: "Manual trimming is the current approach — drag the handles to where the audio content starts and ends. Automatic silence detection is planned for a future update." },
    ],
  },

  "audio-merge": {
    toolId: "audio-merge",
    h1: "Merge audio files online — join tracks free",
    metaDescription: "Combine multiple audio files into one online. Join MP3, WAV, OGG, FLAC tracks in order. Free, browser-based, no upload.",
    howToTitle: "How to merge audio",
    howToSteps: [
      { name: "Upload your audio files", text: "Drop two or more audio files. MP3, WAV, OGG, FLAC and M4A are all supported as inputs." },
      { name: "Reorder the tracks", text: "Drag tracks up or down to set the playback order. The merged file plays them in the listed sequence." },
      { name: "Merge and download", text: "Click Merge Audio. FFmpeg concatenates the tracks locally and you download a single combined file." },
    ],
    settingsGuide: "For fastest merging, upload files in the same format at the same sample rate — FFmpeg uses stream copy with no re-encoding. If your files have different sample rates or formats (e.g., 44.1 kHz MP3 + 48 kHz WAV), enable re-encode mode to normalise them before concatenating. The output bitrate defaults to 192 kbps in re-encode mode.",
    faqs: [
      { question: "Can I merge audio files of different formats?", answer: "Yes, using re-encode mode. FFmpeg converts all inputs to a common format before joining them. For stream copy, all inputs should share the same codec, sample rate and channel count." },
      { question: "Does merging reduce audio quality?", answer: "Stream copy is completely lossless. Re-encode mode introduces a small quality reduction proportional to the output bitrate setting." },
      { question: "Can I add a music track under a voice recording?", answer: "The current merge tool concatenates tracks end-to-end. Mixing (overlaying) multiple tracks simultaneously is available in the Audio Effects tool." },
      { question: "What is the maximum number of tracks I can merge?", answer: "There is no enforced limit. Available browser memory is the practical constraint — most devices handle 20+ tracks without issues." },
      { question: "What output format is used?", answer: "The output format defaults to MP3. You can change this in the format selector before merging." },
    ],
  },

  "image-convert": {
    toolId: "image-convert",
    h1: "Convert image to WebP, AVIF, JPEG online — free",
    metaDescription: "Convert images between WebP, AVIF, JPEG, PNG formats in your browser. No upload. Instant Canvas-based processing. Free image converter.",
    howToTitle: "How to convert an image",
    howToSteps: [
      { name: "Drop your image", text: "Upload a JPEG, PNG, WebP or AVIF image by dragging it onto the dropzone or clicking to browse." },
      { name: "Choose format and quality", text: "Select your target format. For WebP and JPEG, pick a quality level — 85% is a good balance of size and sharpness." },
      { name: "Convert and download", text: "Click Convert Image. Processing uses the browser Canvas API — it completes in under a second with no upload." },
    ],
    settingsGuide: "Quality (0–100) only applies to lossy formats (JPEG, WebP). A quality of 85 is visually lossless for most images. PNG and AVIF use a different internal quality model — PNG is fully lossless while AVIF achieves the best compression at any quality level. Converting a JPEG to PNG does not recover lost detail; the PNG will be lossless but the original JPEG artefacts are preserved.",
    formatTable: [
      { format: "WebP", useCase: "Web images", size: "25–35% smaller than JPEG", quality: "Excellent" },
      { format: "AVIF", useCase: "Next-gen web", size: "50% smaller than JPEG", quality: "Excellent" },
      { format: "JPEG", useCase: "Universal compat.", size: "Small", quality: "Good (lossy)" },
      { format: "PNG", useCase: "Screenshots, logos", size: "Large", quality: "Lossless" },
    ],
    faqs: [
      { question: "What is the difference between WebP and AVIF?", answer: "AVIF typically achieves 40–50% smaller files than JPEG at equivalent visual quality, while WebP achieves 25–35% smaller. However, AVIF encoding is slower and browser support, while now widespread, is slightly less universal than WebP. For most web use cases, WebP is the pragmatic choice today." },
      { question: "Will converting JPEG to PNG improve quality?", answer: "No. PNG is lossless, meaning no additional compression artefacts are introduced during conversion — but any artefacts already in the JPEG are preserved in the PNG. The file will be larger, not better looking." },
      { question: "Does converting to WebP work on all browsers?", answer: "WebP is supported by all modern browsers (Chrome, Firefox, Safari 14+, Edge). Safari added WebP support in 2020. If you need to support very old Safari (pre-2020), stick with JPEG or PNG." },
      { question: "Why is my PNG output so much larger than the JPEG?", answer: "JPEG uses lossy compression that is very efficient for photographs. PNG is lossless and stores pixel data precisely — for a complex photograph, a PNG can be 5–10× larger than the equivalent JPEG." },
      { question: "Can I batch convert multiple images?", answer: "Yes. The image converter now supports small batch runs in the browser, so you can convert several images with the same format and quality settings in one pass." },
    ],
  },

  "image-compress": {
    toolId: "image-compress",
    h1: "Compress image without quality loss — free online",
    metaDescription: "Compress JPEG, PNG and WebP images with a live before/after comparison slider. Canvas-based processing — instant, no upload required.",
    howToTitle: "How to compress an image",
    howToSteps: [
      { name: "Drop your image", text: "Upload a JPEG, PNG or WebP image by dragging onto the dropzone or clicking to browse." },
      { name: "Choose quality and format", text: "Pick a compression preset or set a custom quality. Convert to WebP for the smallest file size." },
      { name: "Compare and download", text: "After processing, drag the comparison slider to see original vs compressed side-by-side, then download." },
    ],
    settingsGuide: "The quality slider (0–100) controls how much data is discarded. Quality 85 is visually lossless for most photographs — below 70 you may notice artefacts in high-contrast edges. Converting to WebP alongside compression adds a further 25–35% size reduction. The before/after drag slider lets you inspect quality at any zoom level before committing to download.",
    formatTable: [
      { format: "JPEG → JPEG", useCase: "Reduce photo size", size: "50–75% reduction", quality: "Good" },
      { format: "JPEG → WebP", useCase: "Web optimisation", size: "60–85% reduction", quality: "Excellent" },
      { format: "PNG → WebP", useCase: "Web images", size: "50–70% reduction", quality: "Excellent" },
      { format: "PNG → PNG", useCase: "Lossless only", size: "5–20% reduction", quality: "Lossless" },
    ],
    faqs: [
      { question: "What quality setting gives no visible quality loss?", answer: "Quality 85 is the threshold most professionals use for photographs — differences from the original are invisible to the eye at normal viewing distances. Quality 75 is acceptable for web thumbnails. Below 60, artefacts become visible on close inspection." },
      { question: "Why is WebP so much smaller than JPEG?", answer: "WebP uses a more modern prediction algorithm (derived from VP8 video compression) that models image structure more efficiently than JPEG's DCT. The result is 25–35% smaller files at equivalent visual quality." },
      { question: "Does compressing an image change its dimensions?", answer: "No — quality compression only reduces the amount of data stored per pixel, not the pixel dimensions. Use the Image Resizer if you need to change the width or height." },
      { question: "Can I compress a PNG without converting it?", answer: "Yes. PNG compression is lossless — the tool re-packs the pixel data more efficiently. Typical reduction is 5–20%. For larger reductions, convert to WebP or JPEG." },
      { question: "What is the difference between lossy and lossless compression?", answer: "Lossy compression (JPEG, WebP) discards some image data to achieve smaller files. Lossless compression (PNG, WebP lossless) reorganises the data without discarding anything. For photographs, lossy at quality 85 is indistinguishable from lossless; for logos and text, lossless PNG or WebP lossless is preferred." },
    ],
  },

  "image-resize": {
    toolId: "image-resize",
    h1: "Resize image online free — exact pixels, aspect lock",
    metaDescription: "Resize images to exact dimensions or scale by percentage. Lock aspect ratio, use social media presets. Instant browser-based image resizer.",
    howToTitle: "How to resize an image",
    howToSteps: [
      { name: "Drop your image", text: "Upload a JPEG, PNG, WebP or other image file by dragging it onto the dropzone." },
      { name: "Set dimensions or pick a preset", text: "Enter exact width and height in pixels, scale by percentage, or choose a social media preset (Instagram, Twitter header, etc.)." },
      { name: "Resize and download", text: "Click Resize Image. The Canvas API resizes it locally in under a second — no upload occurs." },
    ],
    settingsGuide: "Lock Aspect Ratio ensures the image is not distorted — enter one dimension and the other adjusts automatically. Unlocking lets you set exact dimensions independently, which may stretch or squish the image. Downscaling (making an image smaller) preserves quality well. Upscaling (making it larger) uses bilinear interpolation, which can produce blurry results — for best upscaling quality, use a dedicated AI upscaler.",
    faqs: [
      { question: "Will resizing reduce image quality?", answer: "Downscaling (making smaller) produces sharp results — pixels are averaged. Upscaling (making larger) interpolates new pixels, which can appear blurry at large magnifications. The format quality setting is separate — PNG and WebP lossless produce the best output quality." },
      { question: "What dimensions should I use for Instagram?", answer: "Square posts: 1080×1080. Portrait posts: 1080×1350. Landscape posts: 1080×608. Stories: 1080×1920. These are the optimal dimensions Instagram accepts without cropping or resampling." },
      { question: "Can I resize to a specific file size rather than dimensions?", answer: "File size depends on both dimensions and compression quality. Use the Image Compressor alongside the resizer — first resize to your target dimensions, then compress to hit your target file size." },
      { question: "What is the maximum input image size?", answer: "There is no enforced limit. The Canvas API can handle images up to roughly 16384×16384 pixels on most devices. Very large images (over 8000px wide) may be slow to process." },
      { question: "Does the resizer preserve EXIF data?", answer: "Canvas-based processing strips EXIF metadata (camera info, GPS coordinates, orientation) from the output. This is intentional for privacy. If you need EXIF preservation, this is noted." },
    ],
  },

  "image-batch-compress": {
    toolId: "image-batch-compress",
    h1: "Batch compress images online — process multiple files free",
    metaDescription: "Compress multiple images at once with consistent quality settings. Download all as a ZIP. Free, browser-based batch image compressor.",
    howToTitle: "How to batch compress images",
    howToSteps: [
      { name: "Drop multiple images", text: "Drag two or more JPEG, PNG or WebP images onto the dropzone, or click to select multiple files." },
      { name: "Set quality and format", text: "Choose a quality preset and output format. The same settings apply to all images in the batch." },
      { name: "Compress and download ZIP", text: "Click Compress All. Each image is processed in turn. Download them individually or as a single ZIP archive." },
    ],
    settingsGuide: "All images in a batch share the same quality and format settings. If you need different settings per image, process them individually with the Image Compressor. Converting to WebP in the batch settings applies to all files. The ZIP download bundles all compressed images with their original filenames, making it easy to replace the originals after verifying the output quality.",
    faqs: [
      { question: "How many images can I compress at once?", answer: "Up to 50 images per batch. There is no file size limit per image — the practical constraint is available browser memory." },
      { question: "Can I compress images of different formats in one batch?", answer: "Yes. The batch compressor accepts JPEG, PNG and WebP mixed in the same batch. Each image is compressed to its natural format by default, or you can specify a single target format to convert everything." },
      { question: "Are the quality settings applied uniformly?", answer: "Yes — the quality level applies to all images in the batch. Use the single-image Image Compressor for fine-grained per-image control." },
      { question: "Can I download all compressed images as a ZIP?", answer: "Yes. After processing, click Download All as ZIP. The archive contains all compressed images with their original filenames." },
      { question: "How fast is batch processing?", answer: "Images are processed one at a time to avoid exhausting browser memory. Canvas-based processing is very fast — typical throughput is 5–15 images per second for average-sized photos." },
    ],
  },
  "video-gif": {
    toolId: "video-gif",
    h1: "Convert video to GIF online — free animated GIF maker",
    metaDescription: "Convert any video clip to an animated GIF in your browser. Control FPS, width, and duration. No upload, no account needed.",
    howToTitle: "How to convert video to GIF",
    howToSteps: [
      { name: "Upload your video", text: "Drop or select an MP4, WebM, MOV, or AVI file onto the converter." },
      { name: "Set FPS, size, and duration", text: "Choose frame rate (5–20 FPS), output width, start time, and clip duration." },
      { name: "Download your GIF", text: "Click Convert to GIF and download the animated GIF file." },
    ],
    settingsGuide: "FPS controls how smooth the animation looks — 10 FPS is the sweet spot between smoothness and file size. Higher FPS produces larger files. Width controls the output resolution; 480px is recommended for sharing online. Keep clips under 10 seconds to avoid very large GIF files — GIF format is inherently less efficient than video. The converter uses palette optimisation (two-pass palettegen) to produce sharp colors.",
    faqs: [
      { question: "Why are GIF files so large?", answer: "GIF uses a lossless LZW compression algorithm with a 256-color palette per frame, which is far less efficient than modern video codecs. A 10-second MP4 at 480px might be 2 MB; the equivalent GIF could be 10–20 MB. Keeping FPS low (5–10) and width small (240–360px) helps significantly." },
      { question: "What is the maximum clip duration?", answer: "You can set any duration up to the full video length, but GIF files over 20–30 MB are impractical for web sharing. We recommend keeping clips under 10 seconds at 10 FPS for reasonable file sizes." },
      { question: "Can I set a custom start time?", answer: "Yes. Use the Start time field to begin the GIF at any point in the video, specified in seconds. For example, entering 30 starts the GIF at the 30-second mark." },
      { question: "Why does my GIF look washed out?", answer: "The converter uses two-pass palette optimisation for best color accuracy. If colors still look off, try reducing the clip duration (fewer frames = more palette headroom) or converting a smaller section of the video." },
      { question: "Is the conversion done on a server?", answer: "No. The entire conversion happens locally in your browser using FFmpeg compiled to WebAssembly. Your video file never leaves your device." },
    ],
  },

  "video-extract-audio": {
    toolId: "video-extract-audio",
    h1: "Extract audio from video online — free MP3/WAV/AAC extractor",
    metaDescription: "Extract the audio track from any video file. Save as MP3, AAC, WAV, OGG, or FLAC. Free, browser-based, no upload required.",
    howToTitle: "How to extract audio from a video",
    howToSteps: [
      { name: "Upload your video", text: "Drop or select an MP4, WebM, MOV, AVI, or MKV file." },
      { name: "Choose audio format", text: "Select MP3, AAC, WAV, OGG, or FLAC as the output format." },
      { name: "Extract and download", text: "Click Extract audio and download the audio file. Preview it in the browser before saving." },
    ],
    settingsGuide: "MP3 is the safest choice for compatibility — it plays on every device and platform. AAC (M4A) offers slightly better quality at the same bitrate and is ideal for Apple devices and YouTube. WAV and FLAC are lossless — they preserve every detail of the original audio track but produce large files. OGG Vorbis is an open format popular in gaming and web apps. The extractor does not re-encode the video track — only the audio is processed.",
    faqs: [
      { question: "Will audio quality be lost during extraction?", answer: "For lossy formats like MP3 and AAC, a small amount of quality is lost during encoding. For WAV and FLAC, the audio is extracted without quality loss. If the original video has compressed audio (e.g., AAC in an MP4), converting to WAV creates a lossless copy of the already-compressed signal — not the original uncompressed source." },
      { question: "Can I extract audio from a WebM or MKV file?", answer: "Yes. The extractor supports MP4, WebM, MOV, AVI, and MKV. WebM files typically contain Vorbis or Opus audio, which can be extracted and converted to your chosen format." },
      { question: "What output format should I use for voice recordings?", answer: "MP3 at quality 2 (roughly 190 kbps VBR) is excellent for voice. If you need perfect fidelity for editing, choose WAV. For podcasting, MP3 is the industry standard." },
      { question: "Can I preview the audio before downloading?", answer: "Yes. After extraction, an audio player appears so you can verify the result before saving the file." },
      { question: "Is there a file size limit?", answer: "No enforced limit. Practical constraints are browser memory (large files use more RAM) and processing time. Files up to 2 GB work on most modern browsers." },
    ],
  },

  "video-mute": {
    toolId: "video-mute",
    h1: "Remove audio from video online — free silent video maker",
    metaDescription: "Strip the audio track from any video file in seconds. Stream-copy means no quality loss. Free, browser-based, no upload.",
    howToTitle: "How to mute a video",
    howToSteps: [
      { name: "Upload your video", text: "Drop or select an MP4, WebM, MOV, MKV, or AVI file." },
      { name: "Choose output format", text: "Keep the same format for instant stream-copy, or convert to MP4 or WebM." },
      { name: "Download silent video", text: "Click Remove audio and download your muted video." },
    ],
    settingsGuide: "The 'Same as input (stream copy)' option is the fastest — it removes the audio track without touching the video stream, so there is zero quality loss and processing takes seconds regardless of file size. Choosing MP4 or WebM re-encodes the video with H.264 (CRF 23), which may slightly reduce quality but ensures broad compatibility. Use stream copy whenever the input is already MP4 or WebM.",
    faqs: [
      { question: "Will muting the video reduce its quality?", answer: "No, if you use the 'Same as input' option. Stream copy passes the video data through unchanged — only the audio track is dropped. Re-encoding options (MP4, WebM) apply light compression (CRF 23) which may introduce minor quality reduction." },
      { question: "How long does it take to mute a large video?", answer: "With stream copy, muting a 1 GB video takes a few seconds — just the time to read and write the file. Re-encoding takes longer, roughly 1–3 minutes per GB depending on your device." },
      { question: "Can I mute only part of a video?", answer: "This tool removes the entire audio track. For selective muting (silencing a specific time range), use the Video Trim tool to cut out the segment, mute it, then merge it back." },
      { question: "What happens to subtitles and chapters?", answer: "Subtitle and chapter tracks embedded in the container (e.g., MKV) are preserved during stream copy. Re-encoding to MP4 or WebM may drop these tracks depending on container support." },
      { question: "Is the processing done on my device?", answer: "Yes, entirely in your browser using FFmpeg WebAssembly. Your video is never uploaded to any server." },
    ],
  },

  "image-crop": {
    toolId: "image-crop",
    h1: "Crop images online free — drag-to-crop with aspect ratio lock",
    metaDescription: "Crop images online with a draggable crop box. Supports free crop, 1:1, 4:3, 16:9, and portrait ratios. Free, browser-based, no upload.",
    howToTitle: "How to crop an image online",
    howToSteps: [
      { name: "Upload your image", text: "Drop or select a JPG, PNG, WebP, or GIF image." },
      { name: "Adjust the crop box", text: "Drag the crop area to position it, and drag the corner handles to resize. Choose an aspect ratio preset if needed." },
      { name: "Crop and download", text: "Click Crop image to apply the selection and download the cropped result." },
    ],
    settingsGuide: "The Free ratio mode lets you set any crop dimensions. Aspect ratio presets (1:1, 4:3, 16:9, 3:4, 9:16) constrain the crop box so it stays proportional — useful for social media formats. The rule-of-thirds grid helps compose your crop following photographic guidelines. The output dimensions (shown in pixels) update live as you resize the crop box.",
    faqs: [
      { question: "What aspect ratio should I use for social media?", answer: "Instagram square: 1:1. Instagram portrait: 4:5 (use 3:4 as the closest preset). Twitter/X header: 3:1 (use free mode). YouTube thumbnail: 16:9. TikTok/Reels: 9:16. Facebook cover: 16:9 approximately." },
      { question: "Can I crop to an exact pixel size?", answer: "Not directly — the crop box works as a percentage of the original image. To get an exact output size (e.g., 800×600), crop to the correct aspect ratio first, then use the Image Resizer to set exact dimensions." },
      { question: "Is the original image modified?", answer: "No. The crop is applied to a copy rendered on an HTML Canvas. The original file on your device is untouched." },
      { question: "What output format is used?", answer: "The output format matches your input file — JPG input produces JPG output, PNG input produces PNG. This preserves transparency in PNG files." },
      { question: "Does cropping work on mobile?", answer: "Yes. The crop handles support touch events, so you can pinch and drag the selection on iOS and Android devices." },
    ],
  },

  "image-rotate": {
    toolId: "image-rotate",
    h1: "Rotate and flip images online — free image rotator",
    metaDescription: "Rotate images 90°, 180°, or 270° and flip horizontally or vertically. Save as PNG, JPG, or WebP. Free, browser-based.",
    howToTitle: "How to rotate an image online",
    howToSteps: [
      { name: "Upload your image", text: "Drop or select a JPG, PNG, WebP, GIF, or BMP image." },
      { name: "Choose rotation and flip", text: "Click 90° left, 90° right, or 180° to rotate. Toggle Flip horizontal or Flip vertical if needed." },
      { name: "Apply and download", text: "Select your output format and click Apply & download." },
    ],
    settingsGuide: "Rotation and flip transforms can be combined freely — for example, rotate 90° right and then flip horizontal. The live preview updates instantly so you can see the result before saving. Rotating 90° or 270° swaps the image width and height. PNG preserves transparency; use it if your image has a transparent background. JPG is smaller but lossy — use it for photographs.",
    faqs: [
      { question: "Why is my photo displaying sideways in some apps?", answer: "Many cameras embed an orientation flag in EXIF metadata rather than rotating the actual pixels. Some apps honour this flag; others ignore it. Rotating the image here bakes the orientation into the pixel data, fixing the display in all apps." },
      { question: "Can I rotate without quality loss?", answer: "Using PNG output is lossless. JPG output applies JPEG compression on save, which introduces minor quality loss. For photos, this is imperceptible at quality 92 (the default). For text or graphics with sharp edges, use PNG." },
      { question: "What is the difference between flip and mirror?", answer: "They are the same thing — 'flip horizontal' mirrors the image left-to-right, producing a reflection. 'Flip vertical' mirrors it top-to-bottom." },
      { question: "Can I rotate animated GIFs?", answer: "Not currently — GIF rotation is not supported. Only the first frame of an animated GIF will be processed. Convert to a static image first if needed." },
      { question: "Is there a maximum image size?", answer: "No enforced limit. The Canvas API can handle images up to roughly 16384×16384 pixels on most devices. Very large images may be slow to process on low-memory devices." },
    ],
  },

  "pdf-to-images": {
    toolId: "pdf-to-images",
    h1: "Convert PDF to images online — free PDF to JPG/PNG converter",
    metaDescription: "Convert each PDF page to a high-resolution PNG or JPG image. Choose 1×–4× resolution. Download all pages as ZIP. Free, browser-based.",
    howToTitle: "How to convert PDF pages to images",
    howToSteps: [
      { name: "Upload your PDF", text: "Drop or select a PDF file. It is rendered locally using PDF.js — nothing is uploaded." },
      { name: "Choose format and resolution", text: "Select PNG or JPG output and a resolution scale (1×–4×). Higher scales produce sharper images at larger file sizes." },
      { name: "Download images or ZIP", text: "Each page is shown as a preview card. Download pages individually or click Download ZIP to get all pages at once." },
    ],
    settingsGuide: "Resolution scale multiplies the base 72 dpi PDF resolution. At 2× you get 144 dpi (good for screen and web). At 4× you get 288 dpi (suitable for print). Higher resolution means larger image files — a 10-page PDF at 4× PNG can be 50–100 MB. PNG is lossless and best for documents with text and graphics. JPG is smaller but introduces compression artefacts on sharp edges — use it for photograph-heavy PDFs.",
    faqs: [
      { question: "How many pages can I convert?", answer: "There is no page limit. All pages in the PDF are converted. Processing time scales linearly — a 100-page PDF at 2× takes roughly 30–60 seconds on a modern device." },
      { question: "Can I convert a password-protected PDF?", answer: "Not currently. Password-protected PDFs are not supported — PDF.js will fail to open them without the password." },
      { question: "What resolution should I use for printing?", answer: "Use 3× or 4× for print-quality output (216 or 288 dpi). Most home printers print at 300 dpi, so 4× is the closest match." },
      { question: "Is my PDF uploaded to a server?", answer: "No. The conversion uses PDF.js, a JavaScript library that renders PDFs entirely in your browser. Your file never leaves your device." },
      { question: "Why are some fonts rendering incorrectly?", answer: "PDF.js handles most standard fonts but may struggle with unusual embedded fonts or forms. If text renders incorrectly, try a higher resolution scale — sometimes font hinting improves at larger sizes." },
    ],
  },

  "audio-effects": {
    toolId: "audio-effects",
    h1: "Audio effects editor online — speed, volume, fade, normalize free",
    metaDescription: "Change audio speed, boost volume, add fade in/out, and normalize loudness. Free browser-based audio effects — no upload required.",
    howToTitle: "How to apply audio effects online",
    howToSteps: [
      { name: "Upload your audio", text: "Drop or select an MP3, WAV, OGG, AAC, or FLAC file." },
      { name: "Adjust the effects", text: "Set playback speed, volume level, fade in/out duration, and toggle loudness normalisation." },
      { name: "Apply and download", text: "Click Apply effects and download your processed audio file." },
    ],
    settingsGuide: "Speed below 1× slows the audio down; above 1× speeds it up. Pitch correction is applied automatically via the atempo filter so voices stay natural. Volume above 100% amplifies the signal — be careful of clipping on already-loud recordings. Fade In adds a smooth ramp from silence at the start; Fade Out adds one at the end. Normalize applies EBU R128 loudness normalization, which is the broadcast standard used by Spotify and YouTube — great for making quiet recordings match standard levels.",
    faqs: [
      { question: "Will changing speed affect pitch?", answer: "No. The atempo filter adjusts speed while preserving pitch. For example, at 2× speed a voice still sounds natural — just spoken twice as fast." },
      { question: "Can I boost volume without distortion?", answer: "Boosting to 150–200% is usually safe. Beyond that, peaks in the audio may clip (distort). Use Normalize instead for loud-but-clean results — it targets a standard loudness level rather than blindly boosting everything." },
      { question: "What does Normalize do exactly?", answer: "Normalize applies FFmpeg's loudnorm filter, which implements EBU R128 integrated loudness normalization. It analyses the whole file and adjusts gain so the perceived loudness matches -23 LUFS — the standard used by broadcast, Spotify, and YouTube." },
      { question: "Can I apply multiple effects at once?", answer: "Yes. All selected effects (speed, volume, fade, normalize) are applied in a single FFmpeg pass, so you can combine them freely." },
      { question: "What output formats are supported?", answer: "MP3 (recommended for compatibility), WAV (lossless, large), and OGG Vorbis (open format). All effects work regardless of which output format you choose." },
    ],
  },

  "video-speed": {
    toolId: "video-speed",
    h1: "Change video speed online — slow motion and fast forward free",
    metaDescription: "Speed up or slow down any video from 0.25× to 4×. Pitch-corrected audio included. Free, browser-based, no upload required.",
    howToTitle: "How to change video speed online",
    howToSteps: [
      { name: "Upload your video", text: "Drop or select an MP4, WebM, MOV, or AVI file." },
      { name: "Choose a speed", text: "Pick a preset: 0.25× slow motion up to 4× fast forward. Toggle audio on or off." },
      { name: "Apply and download", text: "Click Apply speed and download your MP4." },
    ],
    settingsGuide: "The setpts video filter adjusts the presentation timestamp of each frame — at 2× speed frames arrive twice as fast. Audio uses the atempo filter for pitch-corrected speed adjustment. For speeds outside 0.5×–2.0×, the filter is chained (e.g., atempo=2.0,atempo=2.0 for 4×). Disabling audio produces a smaller file and is useful for slow-motion footage where audio would be too distorted anyway.",
    faqs: [
      { question: "Does slowing down video reduce quality?", answer: "No quality is lost in the video frames — each frame is rendered as-is, just displayed more slowly. At very low speeds (0.25×) the video may look choppy unless the original was shot at a high frame rate (60fps+)." },
      { question: "What is the maximum speed multiplier?", answer: "The presets go up to 4×. For higher multipliers (8×, 16×), the atempo filter would need more chaining — contact us if you need this." },
      { question: "Is audio pitch corrected at all speeds?", answer: "Yes, using the atempo filter which preserves pitch. At extreme speeds (0.25× or 4×) some audio artefacts may appear, but voices remain recognisable." },
      { question: "What output format is produced?", answer: "Always MP4 (H.264 video, AAC audio). This offers the broadest compatibility across devices and platforms." },
      { question: "Can I slow down a video to create smooth slow motion?", answer: "Yes, but the smoothness depends on the original frame rate. A 30fps video slowed to 0.25× plays at 7.5fps — visible choppiness. For smooth slow motion, you need footage shot at 60fps or higher." },
    ],
  },

  "pdf-from-images": {
    toolId: "pdf-from-images",
    h1: "Images to PDF online — combine photos into PDF free",
    metaDescription: "Convert JPG, PNG, and WebP images into a single PDF. Drag to reorder, choose page size and margin. Free, browser-based.",
    howToTitle: "How to convert images to PDF",
    howToSteps: [
      { name: "Upload your images", text: "Drop or select JPG, PNG, or WebP images. Add as many as you need." },
      { name: "Reorder and configure", text: "Drag images to set page order. Choose page size, orientation, and margin." },
      { name: "Download your PDF", text: "Click Generate PDF and download the combined file." },
    ],
    settingsGuide: "A4 is the default page size — correct for most documents and printing. Letter is the US standard (8.5×11 inches). 'Fit to image' creates a page exactly the size of each image, which is useful for scanned photos or screenshots at their native resolution. Margin adds whitespace around each image — 10mm is a comfortable default. All images are scaled to fill the page while preserving their aspect ratio.",
    faqs: [
      { question: "How many images can I combine into one PDF?", answer: "Up to 50 images per PDF. There is no file size limit — the practical constraint is browser memory. Very large images (over 4000px wide) may slow generation." },
      { question: "Will the image quality be preserved?", answer: "Images are embedded as JPEG at 92% quality, which is visually lossless for photographs. For documents with sharp text or line art, PNG input will produce crisper results." },
      { question: "Can I reorder pages after adding images?", answer: "Yes. Drag the grip handle on the left of each image card to reorder before generating. You can also remove individual images using the × button." },
      { question: "Is my data uploaded to a server?", answer: "No. The PDF is generated entirely in your browser using jsPDF. Your images never leave your device." },
      { question: "What page size should I use for printing?", answer: "A4 for most countries; Letter for the US. If you are printing photos, 'Fit to image' will match the native resolution of each photo without adding extra whitespace." },
    ],
  },

  "image-filters": {
    toolId: "image-filters",
    h1: "Image filters online — adjust brightness, contrast, saturation and more",
    metaDescription: "Apply image filters in your browser — brightness, contrast, saturation, grayscale, sepia, invert, blur and preset looks. Free, no upload.",
    howToTitle: "How to apply filters to an image",
    howToSteps: [
      { name: "Upload your image", text: "Drop or select a JPG, PNG, WebP or GIF. A live preview appears instantly." },
      { name: "Choose a preset or adjust sliders", text: "Pick from one-click presets like Vivid, Sepia or Dramatic, or fine-tune brightness, contrast, saturation, blur and more individually." },
      { name: "Download the filtered image", text: "Click Apply filters to save. Choose PNG, JPEG or WebP output format." },
    ],
    settingsGuide: "Brightness (100% = original) lightens or darkens the whole image. Contrast increases or decreases the difference between lights and darks. Saturation boosts or removes color vividness. Sepia applies a warm brown tone. Invert flips all colors to their complements. Blur adds a Gaussian-style softness in pixels. Combine multiple adjustments for custom looks.",
    faqs: [
      { question: "Are the filters applied non-destructively?", answer: "Yes during editing. You can reset sliders at any time. Once you click download, a new image file is generated from the current settings. Your original file is never modified." },
      { question: "Which output format should I choose?", answer: "PNG is lossless and best for graphics with text or sharp edges. JPEG is smaller and ideal for photographs. WebP combines the best of both." },
      { question: "Can I apply multiple filters at once?", answer: "Absolutely. All sliders stack on top of each other. You can desaturate partially, boost contrast, and add a small sepia tint simultaneously." },
      { question: "Is my image uploaded anywhere?", answer: "No. Everything runs in your browser using the Canvas API. Your image data never leaves your device." },
      { question: "Why does the preview look slightly different from the full-size result?", answer: "The live preview is scaled down for performance. When you click download, filters are applied at the full original resolution." },
    ],
  },

  "image-watermark": {
    toolId: "image-watermark",
    h1: "Add text watermark to image online — free, no upload",
    metaDescription: "Watermark images online in seconds. Custom text, 9 position options, opacity, color, font size. JPG, PNG, WebP supported.",
    howToTitle: "How to add a watermark to an image",
    howToSteps: [
      { name: "Upload your image", text: "Drop or click to select a JPG, PNG or WebP. The image loads with a live preview." },
      { name: "Configure your watermark", text: "Type your text, adjust font size, pick a color, set opacity, and choose one of 9 placement positions." },
      { name: "Download the watermarked image", text: "Click Apply watermark and download to save the result as PNG, JPEG or WebP." },
    ],
    settingsGuide: "Position the watermark using the 3x3 grid. Bottom-right is conventional for copyright notices. Opacity between 40 and 70 percent keeps the watermark visible without obscuring the image. Font size should scale with image resolution. The shadow automatically adapts for readability on any background.",
    faqs: [
      { question: "Can I use a logo instead of text?", answer: "Currently only text watermarks are supported. Logo watermarking is on the roadmap." },
      { question: "Will the watermark be visible at full resolution?", answer: "Yes. The watermark is rendered at the original image resolution, not just the preview. The font size you set is in pixels relative to the full image." },
      { question: "Is my image uploaded to a server?", answer: "No. The Canvas API processes everything locally in your browser. Your image never leaves your device." },
      { question: "Can I batch watermark multiple images?", answer: "Batch mode is not currently available, but you can quickly process images one at a time since there is no upload wait." },
      { question: "What is the best color for a watermark?", answer: "White with 50 to 60 percent opacity works on most photos. On light backgrounds, switch to a dark gray. The color picker gives you full control." },
    ],
  },

  "video-reverse": {
    toolId: "video-reverse",
    h1: "Reverse video online — play any video backwards free",
    metaDescription: "Reverse any video online and play it backwards in seconds. FFmpeg-powered, no upload, no watermark. MP4 and WebM output.",
    howToTitle: "How to reverse a video",
    howToSteps: [
      { name: "Upload your video", text: "Drop or select an MP4, WebM, MOV or AVI file." },
      { name: "Choose audio option", text: "Toggle whether to reverse the audio track too, which creates a backwards speech or music effect." },
      { name: "Download the reversed video", text: "Click Reverse video and download the result as MP4 or WebM." },
    ],
    settingsGuide: "Reversing a video requires FFmpeg to decode every frame and write them in reverse order. This is memory-intensive. The entire video is loaded into RAM. For large files over 500 MB, ensure your computer has sufficient free memory. The reverse audio option applies the areverse FFmpeg filter, making speech or music play backwards.",
    faqs: [
      { question: "Why does video reversal take longer than other edits?", answer: "Unlike trimming or format conversion where frames are streamed, reversal requires every frame to be decoded and buffered in memory before writing begins." },
      { question: "Is there a file size limit for reversal?", answer: "No artificial limit, but practical limits depend on device RAM. Videos longer than 5 minutes or larger than 500 MB may be slow." },
      { question: "Can I reverse just a segment of the video?", answer: "Use the Video Trim tool first to cut the segment, then pass the trimmed clip to the Reverse tool." },
      { question: "Does reversing degrade video quality?", answer: "No. FFmpeg re-encodes using H.264. Re-encoding introduces very minor generation loss, but visually the output is indistinguishable from the source at the same resolution." },
      { question: "My video has no audio after reversing. What happened?", answer: "If Reverse audio was unchecked, the audio is stripped intentionally. Re-run with the toggle enabled to include reversed audio." },
    ],
  },

  "pdf-merge": {
    toolId: "pdf-merge",
    h1: "Merge PDF files online — free, no upload needed",
    metaDescription: "Combine multiple PDFs into one file. Drag to reorder, merge instantly in your browser. Free, private, no server upload.",
    howToTitle: "How to merge PDF files",
    howToSteps: [
      { name: "Upload your PDFs", text: "Drop or select 2 or more PDF files. They appear in a reorderable list." },
      { name: "Drag to reorder", text: "Drag the grip handle on each file card to set the final page order." },
      { name: "Merge and download", text: "Click Merge PDFs. Download the combined document instantly." },
    ],
    settingsGuide: "Files are merged in the order shown in the list. Drag to rearrange before merging. Each PDF page appears consecutively in the output. The tool uses pdf-lib, a pure-JavaScript PDF library, so no server is involved. All page sizes and orientations are maintained from each source document.",
    faqs: [
      { question: "How many PDFs can I merge at once?", answer: "There is no hard limit. Practical limits depend on total file size and browser memory." },
      { question: "Will the merged PDF preserve bookmarks and links?", answer: "Page content and layout are fully preserved. Links within pages remain functional. Bookmarks from source documents are not currently merged." },
      { question: "Are my PDFs uploaded to a server?", answer: "No. The merge runs entirely in your browser using pdf-lib. Your documents never leave your device." },
      { question: "Can I split a PDF back into individual files?", answer: "PDF splitting is not currently available. It is on the roadmap for a future tool." },
      { question: "What happens if one of my PDFs is password-protected?", answer: "Password-protected PDFs cannot be merged. Open the PDF in your viewer, remove the password protection, save a clean copy, then merge." },
    ],
  },

  "video-crop": {
    toolId: "video-crop",
    h1: "Crop video online — remove black bars and change aspect ratio free",
    metaDescription: "Crop any video online. Drag the crop region visually, pick aspect ratio presets, then export. No upload, no watermark.",
    howToTitle: "How to crop a video",
    howToSteps: [
      { name: "Upload your video", text: "Drop or select an MP4, WebM or MOV file. The first frame appears as a crop canvas." },
      { name: "Set the crop region", text: "Drag the crop handles on the preview to select the area you want to keep, or enter exact pixel values." },
      { name: "Export the cropped video", text: "Click Crop video. Download as MP4 or WebM." },
    ],
    settingsGuide: "Dragging a corner handle resizes the crop rectangle. Dragging inside moves it. The numeric inputs give pixel-precise control. Aspect ratio presets lock the width and height ratio so resizing stays proportional, useful for cutting to 16:9 for YouTube or 9:16 for Reels.",
    faqs: [
      { question: "Does cropping re-encode the entire video?", answer: "Yes. The crop filter requires re-encoding because the video dimensions change. Quality is maintained at CRF 23 which is visually transparent for most content." },
      { question: "Can I use exact pixel values instead of dragging?", answer: "Yes. The Left, Top, Width, and Height inputs accept pixel values relative to the original video resolution." },
      { question: "What is the Free aspect ratio option?", answer: "Free crop lets you drag the rectangle to any shape without constraint. The other presets lock the proportions so the rectangle always maintains that ratio as you resize." },
      { question: "Can I remove black bars from a video?", answer: "Yes. Drag the crop rectangle to exclude the black bars on all sides. The crop filter cuts cleanly to just the active content area." },
      { question: "Is there a maximum video size?", answer: "No artificial limit. Processing time scales with video length and resolution. For very long videos, consider trimming first." },
    ],
  },

};
