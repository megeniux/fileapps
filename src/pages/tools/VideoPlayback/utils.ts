import { SPEED_CONFIG, FILTER_PRESETS } from './constants';
import type { SpeedFilters } from './types';

/**
 * Clamp speed value within allowed range
 */
export const clampSpeed = (speed: number): number => {
  return Math.max(SPEED_CONFIG.MIN, Math.min(SPEED_CONFIG.MAX, speed));
};

/**
 * Validate if file is a video file
 */
export const validateVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/');
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Parse duration from FFmpeg log messages
 */
export const parseDuration = (message: string): number => {
  const match = message.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return 0;
};

/**
 * Parse current time from FFmpeg log messages
 */
export const parseCurrentTime = (message: string): number | null => {
  const match = message.match(/time=(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return null;
};

/**
 * Build audio filter chain for tempo adjustment
 * Handles cases where speed is >2x or <0.5x by chaining multiple atempo filters
 */
const buildAudioFilter = (speed: number, reversed: boolean): string => {
  let s = speed;
  const filters: string[] = [];
  
  // Chain atempo filters for speeds >2x
  while (s > FILTER_PRESETS.ATEMPO_MAX) {
    filters.push(`atempo=${FILTER_PRESETS.ATEMPO_MAX}`);
    s /= FILTER_PRESETS.ATEMPO_MAX;
  }
  
  // Chain atempo filters for speeds <0.5x
  while (s < FILTER_PRESETS.ATEMPO_MIN) {
    filters.push(`atempo=${FILTER_PRESETS.ATEMPO_MIN}`);
    s /= FILTER_PRESETS.ATEMPO_MIN;
  }
  
  // Add final atempo filter
  filters.push(`atempo=${s}`);
  
  // Add reverse filter if needed
  if (reversed) {
    filters.push('areverse');
  }
  
  return filters.join(',');
};

/**
 * Build FFmpeg filters for speed and reverse adjustments
 */
export const buildSpeedFilters = (speed: number, isReversed: boolean): SpeedFilters => {
  const effectiveSpeed = Math.abs(speed);
  let videoFilter = '';
  let audioFilter = '';
  
  if (isReversed) {
    if (effectiveSpeed !== 1) {
      // Reverse and change speed
      videoFilter = `setpts=${(1 / effectiveSpeed).toFixed(5)}*PTS,reverse`;
      audioFilter = buildAudioFilter(effectiveSpeed, true);
    } else {
      // Just reverse, no speed change
      videoFilter = 'reverse';
      audioFilter = 'areverse';
    }
  } else if (effectiveSpeed !== 1) {
    // Just change speed, no reverse
    videoFilter = `setpts=${(1 / effectiveSpeed).toFixed(5)}*PTS`;
    audioFilter = buildAudioFilter(effectiveSpeed, false);
  }
  
  return { videoFilter, audioFilter };
};

/**
 * Generate output filename with speed and reverse info
 */
export const generateOutputFilename = (originalName: string, speed: number, isReversed: boolean): string => {
  const prefix = isReversed ? 'reversed_' : '';
  return `${prefix}speed_${speed}x_${originalName}`;
};

/**
 * Calculate progress percentage safely
 */
export const calculateProgress = (current: number, total: number, maxSafe: number = 99.5): number => {
  if (total <= 0) return 0;
  return Math.min((current / total) * 100, maxSafe);
};
