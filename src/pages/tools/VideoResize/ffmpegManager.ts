import { FFmpeg } from '@ffmpeg/ffmpeg';

let ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

// Add a ref to keep track of the current ffmpeg instance for termination
const ffmpegRef = { current: ffmpeg };

/**
 * Get the current FFmpeg instance
 */
export const getFFmpeg = () => ffmpeg;

/**
 * Reset FFmpeg instance with proper cleanup
 */
export const resetFFmpeg = async () => {
  try {
    // Try to terminate existing instance first
    if (ffmpeg && isFFmpegLoaded) {
      await ffmpeg.terminate();
    }
  } catch (error) {
    // Ignore termination errors
  }
  
  // Create new instance
  ffmpeg = new FFmpeg();
  ffmpegRef.current = ffmpeg;
  isFFmpegLoaded = false;
};

/**
 * Check if FFmpeg is loaded
 */
export const getIsFFmpegLoaded = () => isFFmpegLoaded;

/**
 * Set FFmpeg loaded status
 */
export const setFFmpegLoaded = (loaded: boolean) => {
  isFFmpegLoaded = loaded;
};

/**
 * Get FFmpeg reference for termination
 */
export const getFFmpegRef = () => ffmpegRef;

/**
 * Load FFmpeg if not already loaded
 */
export const ensureFFmpegLoaded = async () => {
  if (!isFFmpegLoaded) {
    await ffmpeg.load();
    isFFmpegLoaded = true;
    ffmpegRef.current = ffmpeg;
  }
  return ffmpeg;
};

/**
 * Terminate current FFmpeg process
 */
export const terminateFFmpeg = () => {
  ffmpegRef.current?.terminate?.();
};
