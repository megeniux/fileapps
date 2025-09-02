import { FFmpeg } from '@ffmpeg/ffmpeg';

let ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

export const getFFmpeg = () => ffmpeg;

export const resetFFmpeg = () => {
  ffmpeg = new FFmpeg();
  isFFmpegLoaded = false;
};

export const getIsFFmpegLoaded = () => isFFmpegLoaded;

export const setFFmpegLoaded = (loaded: boolean) => {
  isFFmpegLoaded = loaded;
};

// Parse duration from ffmpeg logs
export const parseDuration = (msg: string): number => {
  const match = msg.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return 0;
};

// Parse current time from ffmpeg logs
export const parseCurrentTime = (msg: string): number | null => {
  const match = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return null;
};

// Validate resolution input
export const validateResolution = (width: string, height: string): boolean => {
  if ((width && (!/^\d+$/.test(width) || parseInt(width) <= 0)) ||
    (height && (!/^\d+$/.test(height) || parseInt(height) <= 0))) {
    return false;
  }
  return true;
};

// Ensure width and height are even numbers (required by most codecs)
export const ensureEvenDimensions = (width: string, height: string): { evenWidth: string; evenHeight: string } => {
  let evenWidth = width;
  let evenHeight = height;
  
  if (width && /^\d+$/.test(width)) {
    const w = parseInt(width, 10);
    evenWidth = (w % 2 === 0) ? String(w) : String(w - 1);
  }
  
  if (height && /^\d+$/.test(height)) {
    const h = parseInt(height, 10);
    evenHeight = (h % 2 === 0) ? String(h) : String(h - 1);
  }
  
  return { evenWidth, evenHeight };
};
