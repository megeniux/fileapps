import type { ToolSeoData } from "@/lib/seo-types";

type ToolSeoExtension = Partial<
  Pick<
    ToolSeoData,
    "bestSettings" | "compatibilityNotes" | "limitations" | "privacyNote" | "editorialSections"
  >
>;

export const toolSeoExtensions: Record<string, ToolSeoExtension> = {
  "video-convert": {
    bestSettings: [
      {
        label: "General sharing",
        recommendation: "MP4 (H.264), CRF 23, keep the original resolution unless the source is larger than necessary.",
        why: "This is the safest combination for playback compatibility, predictable quality, and sensible file size across phones, laptops, and social platforms.",
      },
      {
        label: "Smaller web delivery",
        recommendation: "WebM (VP9), downscale to 720p if the source is larger, and keep a moderate quality target.",
        why: "VP9 is more efficient than H.264, so it is a strong choice when bandwidth matters more than universal device compatibility.",
      },
    ],
    compatibilityNotes: [
      {
        title: "Container vs codec",
        body: "Changing a container is not always the same as changing the underlying codec. MP4 is broadly accepted, but the real playback result still depends on the video and audio codecs inside the file.",
      },
      {
        title: "Best fallback format",
        body: "If you need the safest everyday handoff, export to MP4 with H.264 video and AAC audio. It remains the most broadly compatible option across browsers, operating systems, and social platforms.",
      },
    ],
    limitations: [
      "Very large 4K or long-duration conversions will still take time in a browser compared with native desktop software.",
      "Switching to a less efficient codec or keeping a high resolution can make the output larger than the original file.",
    ],
    editorialSections: [
      {
        title: "When to convert video instead of compressing it",
        body: "Format conversion solves a different problem than size reduction. If a file refuses to play on a device, editor, or social platform, container and codec compatibility are usually the first things to fix.",
        points: [
          "Choose conversion first when the destination rejects the source format or codec.",
          "Choose compression first when the file already works but is too large for upload or sharing.",
          "Use both when you need a more compatible format and a smaller final file.",
        ],
      },
    ],
    privacyNote:
      "Video conversions often involve personal recordings, course captures, or internal business footage. Running the conversion in your browser avoids sending the full source file to an external conversion service.",
  },
  "video-compress": {
    bestSettings: [
      {
        label: "WhatsApp and messaging apps",
        recommendation: "Start with the WhatsApp preset, then move to the Email preset if the clip is still too large.",
        why: "Those presets combine practical resolution and quality defaults that usually shrink files quickly without making the output look heavily degraded.",
      },
      {
        label: "Website upload",
        recommendation: "Keep MP4 for compatibility and downscale to 1080p or 720p if the source is larger than needed.",
        why: "Most of the size reduction usually comes from resolution and CRF tuning rather than extreme audio cuts.",
      },
    ],
    compatibilityNotes: [
      {
        title: "MP4 vs WebM",
        body: "MP4 is the safest choice for playback across phones, browsers, and messaging apps. WebM can be smaller, but it is better suited to web delivery where you control the player and target browsers.",
      },
    ],
    limitations: [
      "Compression is always a tradeoff, so aggressive settings can make motion, text, and fine detail look softer or blockier.",
      "Long clips may still exceed strict messaging limits even after compression, in which case trimming first is often the better move.",
    ],
    editorialSections: [
      {
        title: "The fastest way to shrink a video",
        body: "People often push compression too hard when the real win comes from changing the workflow order. Shorter duration and sensible resolution almost always matter more than tiny codec tweaks.",
        points: [
          "Trim the clip first if you only need a highlight instead of the full recording.",
          "Drop from 1080p to 720p before sacrificing too much quality on text-heavy or motion-heavy clips.",
          "Use bitrate mode only when a strict upload ceiling matters more than visual consistency.",
        ],
      },
    ],
    privacyNote:
      "Compression is often used on personal phone videos, family clips, or internal recordings. Keeping that process local avoids uploading raw footage just to make it small enough for sharing.",
  },
  "video-trim": {
    bestSettings: [
      {
        label: "Fastest trim with no quality loss",
        recommendation: "Keep the output format the same as the input whenever possible.",
        why: "That allows stream copy, which is dramatically faster and avoids re-encoding the media.",
      },
      {
        label: "Cleaner social clip",
        recommendation: "Trim the clip first, then run compression only if the exported segment is still too large.",
        why: "Removing unused footage before compression usually saves more time and produces a better final result than compressing the entire original first.",
      },
    ],
    compatibilityNotes: [
      {
        title: "Keyframe accuracy",
        body: "Lossless stream-copy trims are fast, but they align to nearby keyframes rather than every exact frame. If you need more precise cuts, forcing re-encoding is often the better choice.",
      },
    ],
    limitations: [
      "A single trim operation extracts one continuous range rather than building a multi-cut timeline.",
      "Exact frame-level cuts are harder to guarantee in copy mode because they depend on how the source file was encoded.",
    ],
    editorialSections: [
      {
        title: "Trim before you optimize",
        body: "Trimming is often the smartest first step because it removes content you never wanted to keep. That usually reduces file size, processing time, and later editing complexity all at once.",
        points: [
          "Use trim first for highlights, teasers, reels, and support clips.",
          "Use copy mode when speed matters more than frame-perfect precision.",
          "Re-encode when the start and end points need to feel cleaner to the viewer.",
        ],
      },
    ],
    privacyNote:
      "Trim jobs often involve recordings that contain extra personal or confidential footage around the part you actually need. Local trimming helps remove that excess without uploading the raw original anywhere.",
  },
  "audio-convert": {
    bestSettings: [
      {
        label: "Everyday compatibility",
        recommendation: "MP3 at 192 kbps.",
        why: "It is a strong default for music, podcasts, and general sharing because it plays almost everywhere without surprises.",
      },
      {
        label: "Apple ecosystem",
        recommendation: "M4A (AAC) at 256 kbps.",
        why: "AAC is efficient and deeply supported on iPhone, iPad, AirPods, and Apple software.",
      },
    ],
    compatibilityNotes: [
      {
        title: "Lossy vs lossless",
        body: "WAV and FLAC preserve the source without lossy re-encoding, but they create much larger files. MP3, AAC, and OGG are better choices when portability and smaller file size matter more than archival fidelity.",
      },
    ],
    limitations: [
      "Converting from one lossy format to another does not restore detail that was already discarded in the original source.",
      "Very large or long recordings still depend on browser memory, especially when converting from video sources.",
    ],
    editorialSections: [
      {
        title: "How to choose the right audio output",
        body: "The best destination format depends on what happens after the conversion. Playback compatibility, editing needs, archive goals, and file size all point toward different answers.",
        points: [
          "Use MP3 when you want the safest all-purpose output.",
          "Use AAC or M4A for strong mobile efficiency, especially in Apple-focused workflows.",
          "Use WAV or FLAC when future editing or archive quality matters more than file size.",
        ],
      },
    ],
    privacyNote:
      "Audio conversions often involve interviews, meetings, lectures, or personal voice recordings. Local processing lets you change format without pushing those files through a remote converter.",
  },
  "audio-compress": {
    bestSettings: [
      {
        label: "Podcasts and speech",
        recommendation: "96 kbps, mono, and a reduced sample rate when clarity is still acceptable.",
        why: "Speech usually compresses well, so these settings cut file size sharply without hurting intelligibility much.",
      },
      {
        label: "Music with reasonable quality",
        recommendation: "128 kbps or 192 kbps in stereo.",
        why: "That range is usually the safest compromise between size reduction and audible quality for casual listening.",
      },
    ],
    compatibilityNotes: [
      {
        title: "Best sharing format",
        body: "MP3 remains the easiest output for broad compatibility. If you are unsure, keep the destination format simple and then tune bitrate, channels, and sample rate for the size target.",
      },
    ],
    limitations: [
      "Very aggressive compression can introduce obvious artefacts, especially on music, ambience, and dense high-frequency content.",
      "Shrinking speech files is usually easier than shrinking music files to the same quality standard.",
    ],
    editorialSections: [
      {
        title: "Speech files and music files should not use the same settings",
        body: "A voice note, interview, or meeting recording can often sound fine at settings that would noticeably damage a song. Matching the compression profile to the content is more important than chasing one universal bitrate.",
        points: [
          "Mono and lower sample rates are often acceptable for speech-first material.",
          "Music usually deserves higher bitrate and stereo output to avoid obvious damage.",
          "If you are unsure, start with a moderate preset and listen before reducing more aggressively.",
        ],
      },
    ],
    privacyNote:
      "Audio compression is often used on recordings that include conversations, meetings, or interviews. Keeping the job local makes it easier to handle those files without relying on a hosted upload service.",
  },
  "audio-trim": {
    bestSettings: [
      {
        label: "Fastest clean trim",
        recommendation: "Keep the output format the same as the source if you only need to cut a section out.",
        why: "This usually allows stream copy, which is faster and avoids unnecessary quality loss.",
      },
      {
        label: "Ringtone creation",
        recommendation: "Trim first, keep the clip short, and export to M4A or MP3 depending on the target phone.",
        why: "A short duration matters more than bitrate for ringtone use, and format compatibility differs between iPhone and Android workflows.",
      },
    ],
    compatibilityNotes: [
      {
        title: "Copy mode vs re-encode mode",
        body: "If the output format stays the same, trimming can often use copy mode. If you switch formats, the tool must re-encode the file, which adds processing time but allows broader compatibility choices.",
      },
    ],
    limitations: [
      "This tool extracts one continuous region at a time rather than assembling several separate clips into one export.",
      "Automatic silence detection is not the primary workflow here, so manual selection remains the most reliable approach.",
    ],
    editorialSections: [
      {
        title: "When trimming solves the size problem better than compression",
        body: "A surprising number of audio files are only large because they contain dead air, repeated takes, or irrelevant material. Cutting those sections first often preserves quality better than lowering bitrate aggressively.",
        points: [
          "Use trim first for lectures, meetings, podcasts, and long voice notes.",
          "Keep the same format if you want the fastest export path.",
          "Re-encode only when you also need a different destination format or cleaner boundaries.",
        ],
      },
    ],
    privacyNote:
      "Local audio trimming is especially useful when the beginning or end of a recording contains private context that should never leave your device before it is removed.",
  },
  "image-convert": {
    bestSettings: [
      {
        label: "Website images",
        recommendation: "Use WebP for general web delivery, or AVIF where maximum compression matters and compatibility has already been checked.",
        why: "These formats usually outperform JPEG for file size while keeping similar visual quality.",
      },
      {
        label: "Transparent graphics",
        recommendation: "Use PNG when you need alpha transparency preserved and predictable editing compatibility.",
        why: "PNG remains the safest choice for logos, interface assets, and screenshots with transparent backgrounds.",
      },
    ],
    compatibilityNotes: [
      {
        title: "Transparency support",
        body: "PNG, WebP, and AVIF can preserve transparency, while JPEG cannot. If the original image has a transparent background, make sure the chosen output format supports that requirement.",
      },
      {
        title: "Safest fallback",
        body: "If you need the least risky format for browsers, editors, and uploads, JPEG for photos and PNG for graphics remain the broadest compatibility choices.",
      },
    ],
    limitations: [
      "Converting a lossy source into a lossless format does not restore detail that was already lost in the original image.",
      "Newer formats like AVIF can be more efficient, but some older software and workflows still behave more predictably with JPEG or PNG.",
    ],
    editorialSections: [
      {
        title: "Convert format for the destination, not just for the smallest file",
        body: "The most efficient format is not automatically the best choice if the next app, marketplace, or editor has stricter support expectations. Compatibility still matters.",
        points: [
          "Use WebP or AVIF when the target is modern web delivery and smaller files matter.",
          "Use PNG when transparency or editing predictability matters more than size.",
          "Use JPEG when broad compatibility is more important than advanced format efficiency.",
        ],
      },
    ],
    privacyNote:
      "Image conversion is often used on screenshots, receipts, mockups, forms, and product photos. Running it locally helps keep those assets on-device during routine prep work.",
  },
  "image-compress": {
    bestSettings: [
      {
        label: "General web use",
        recommendation: "Try quality around 75 to 85 and switch to WebP if the destination supports it.",
        why: "That range often gives strong visual results while cutting file size enough to improve page speed meaningfully.",
      },
      {
        label: "Maximum reduction",
        recommendation: "Resize to the actual display dimensions before compressing, then lower quality carefully.",
        why: "Wrong dimensions waste more bytes than many people realize, so size reduction usually starts with resolution, not just format quality.",
      },
    ],
    compatibilityNotes: [
      {
        title: "Best format for broad support",
        body: "JPEG is still the simplest fallback when you need a compressed image that will open almost anywhere. WebP is often smaller and better for websites, but JPEG remains the safest universal handoff.",
      },
    ],
    limitations: [
      "Compression can soften edges, fine text, and very detailed textures if the quality level is pushed too low.",
      "Image compression does not fix oversized pixel dimensions on its own, so very large source images may still need resizing for the best web result.",
    ],
    editorialSections: [
      {
        title: "The best image optimization order for most websites",
        body: "Many large images stay large because the dimensions are bigger than the layout needs. Compression helps, but right-sized dimensions and the right format usually matter just as much.",
        points: [
          "Resize to the real display size before chasing lower quality settings.",
          "Use WebP when browser support in the destination workflow is already acceptable.",
          "Preserve metadata only when you truly need it, because stripping it is better for privacy and sometimes for size.",
        ],
      },
    ],
    privacyNote:
      "Image compression is commonly used on screenshots, scanned forms, and personal photos. Local processing helps keep those originals private while you optimize them for upload or storage.",
  },
};
