export const SITE = {
  name: "FileApps",
  tagline: "Professional media tools in your browser",
  description:
    "Free online video, audio, and image tools powered by FFmpeg. Convert, compress, trim, merge, and edit media files directly in your browser with no uploads required.",
  url: "https://www.fileapps.click",
  ogImage: "/images/branding/logo-xl-96x96.png",
  links: {
    github: "https://github.com/fileapps",
    twitter: "https://twitter.com/fileapps",
  },
};

export const NAV_ITEMS = [
  { label: "Tools", href: "/tools" },
  { label: "Video Tools", href: "/tools/video" },
  { label: "Audio Tools", href: "/tools/audio" },
  { label: "Image Tools", href: "/tools/image" },
  { label: "Contact", href: "/contact" },
] as const;

export const FFMPEG_CONFIG = {
  coreVersion: "0.12.10",
  coreBase:
    "/ffmpeg-core",
  timeout: 30000,
  maxFileSize: 2 * 1024 * 1024 * 1024,
};

export const FILE_SIZE_LIMITS = {
  warning: 500 * 1024 * 1024,
  max: 2 * 1024 * 1024 * 1024,
};
