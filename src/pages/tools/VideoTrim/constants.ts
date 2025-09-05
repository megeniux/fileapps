/**
 * Constants for Video Trimmer component
 * Following established patterns from VideoResize and VideoConvert
 */

/**
 * Supported video file formats
 */
export const SUPPORTED_VIDEO_FORMATS = [
  'video/mp4',
  'video/mov',
  'video/avi',
  'video/mkv',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo'
] as const;

/**
 * Maximum file size in bytes (500MB)
 */
export const MAX_FILE_SIZE = 500 * 1024 * 1024;

/**
 * FFmpeg configuration constants
 */
export const FFMPEG_CONFIG = {
  // Time format precision for trimming
  TIME_PRECISION: 0.1,
  
  // Progress update threshold
  PROGRESS_THRESHOLD: 5,
  
  // Maximum progress before completion
  MAX_PROGRESS: 99.9,
  
  // Final progress value
  FINAL_PROGRESS: 100
} as const;

/**
 * UI constants
 */
export const UI_CONFIG = {
  // Video preview max height
  VIDEO_PREVIEW_HEIGHT: 220,
  
  // Progress dialog auto-hide delay
  PROGRESS_HIDE_DELAY: 2000,
  
  // Download URL cleanup delay
  URL_CLEANUP_DELAY: 5000
} as const;

/**
 * Default time range values
 */
export const DEFAULT_RANGE = [0, 0] as [number, number];

/**
 * File validation error messages
 */
export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: 'Please select a video file.',
  FILE_TOO_LARGE: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit.`,
  INVALID_RANGE: 'Invalid time range selected.',
  PROCESSING_ERROR: 'An error occurred during video processing.',
  LOAD_ERROR: 'Failed to load video file.'
} as const;
