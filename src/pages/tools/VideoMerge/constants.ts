/**
 * Constants for Video Merger component
 * Following established patterns from VideoResize and VideoTrim
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
 * Maximum file size in bytes per video (500MB)
 */
export const MAX_FILE_SIZE = 500 * 1024 * 1024;

/**
 * Maximum number of videos that can be merged
 */
export const MAX_VIDEO_COUNT = 20;

/**
 * Minimum number of videos required for merging
 */
export const MIN_VIDEO_COUNT = 2;

/**
 * FFmpeg configuration constants
 */
export const FFMPEG_CONFIG = {
  // Progress update threshold
  PROGRESS_THRESHOLD: 5,
  
  // Maximum progress before completion
  MAX_PROGRESS: 99.9,
  
  // Final progress value
  FINAL_PROGRESS: 100,
  
  // Output filename
  OUTPUT_FILENAME: 'merged_output.mp4',
  
  // Concat list filename
  CONCAT_FILENAME: 'concat.txt'
} as const;

/**
 * UI constants
 */
export const UI_CONFIG = {
  // Upload area height when empty
  UPLOAD_AREA_HEIGHT_EMPTY: 220,
  
  // Upload area height when files present
  UPLOAD_AREA_HEIGHT_WITH_FILES: 80,
  
  // Video preview dimensions
  VIDEO_PREVIEW_WIDTH: 80,
  VIDEO_PREVIEW_HEIGHT: 48,
  
  // Progress dialog auto-hide delay
  PROGRESS_HIDE_DELAY: 2000,
  
  // Download URL cleanup delay
  URL_CLEANUP_DELAY: 5000
} as const;

/**
 * File validation error messages
 */
export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: 'Please select video files.',
  FILE_TOO_LARGE: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit.`,
  TOO_MANY_FILES: `Maximum ${MAX_VIDEO_COUNT} videos allowed.`,
  TOO_FEW_FILES: `At least ${MIN_VIDEO_COUNT} videos required for merging.`,
  PROCESSING_ERROR: 'An error occurred during video merging.',
  LOAD_ERROR: 'Failed to load video file.',
  DUPLICATE_FILE: 'This file has already been added.'
} as const;

/**
 * Video table configuration
 */
export const TABLE_CONFIG = {
  COLUMNS: {
    PREVIEW: 'Preview',
    FILENAME: 'Filename',
    ACTIONS: 'Actions'
  },
  EMPTY_MESSAGE: 'No videos selected. Click "Add Videos" to upload.'
} as const;
