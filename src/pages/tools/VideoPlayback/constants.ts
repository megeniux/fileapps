/**
 * Speed configuration constants for video playback speed adjustment
 */
export const SPEED_CONFIG = {
  MIN: 0.1,
  MAX: 20,
  STEP: 0.1,
  SLIDER_MIN: -5,
  SLIDER_MAX: 5,
  DEFAULT: 1
} as const;

/**
 * FFmpeg filter presets for audio tempo adjustment
 */
export const FILTER_PRESETS = {
  ATEMPO_MAX: 2.0,
  ATEMPO_MIN: 0.5
} as const;

/**
 * Processing status messages
 */
export const STATUS_MESSAGES = {
  PREPARING: 'Preparing',
  PROCESSING: 'Processing',
  FINALIZING: 'Finalizing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  STOPPED: 'Stopped'
} as const;

/**
 * File validation settings
 */
export const FILE_CONFIG = {
  ACCEPTED_TYPES: ['video/'],
  MAX_HEIGHT: 220
} as const;

/**
 * Progress tracking constants
 */
export const PROGRESS_CONFIG = {
  MAX_SAFE: 99.5,
  FINAL: 99.9,
  COMPLETE: 100,
  INCREMENT: 5
} as const;
