/**
 * Utility functions for Video Trimmer component
 * Following established patterns from VideoResize and VideoConvert
 */

import { SUPPORTED_VIDEO_FORMATS, MAX_FILE_SIZE, ERROR_MESSAGES } from './constants';
import type { TimeRange } from './types';

/**
 * Validates if a file is a supported video format
 */
export const isValidVideoFile = (file: File): boolean => {
  return SUPPORTED_VIDEO_FORMATS.some(format => file.type.includes(format.split('/')[1]));
};

/**
 * Validates file size
 */
export const isValidFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE;
};

/**
 * Validates a file for video trimming
 */
export const validateFile = (file: File): string | null => {
  if (!isValidVideoFile(file)) {
    return ERROR_MESSAGES.INVALID_FILE_TYPE;
  }
  
  if (!isValidFileSize(file)) {
    return ERROR_MESSAGES.FILE_TOO_LARGE;
  }
  
  return null;
};

/**
 * Validates if a time range is valid
 */
export const isValidTimeRange = (range: TimeRange, duration: number): boolean => {
  const [start, end] = range;
  return start >= 0 && end <= duration && start < end;
};

/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Formats duration display with start and end times
 */
export const formatDurationDisplay = (range: TimeRange): string => {
  const [start, end] = range;
  return `${formatTime(start)} - ${formatTime(end)}`;
};

/**
 * Calculates the duration of the trimmed video
 */
export const getTrimmedDuration = (range: TimeRange): number => {
  const [start, end] = range;
  return Math.max(0, end - start);
};

/**
 * Generates a filename for the trimmed video
 */
export const generateTrimmedFilename = (originalFilename: string): string => {
  const nameWithoutExt = originalFilename.replace(/\.[^/.]+$/, '');
  const extension = originalFilename.split('.').pop() || 'mp4';
  return `trimmed_${nameWithoutExt}.${extension}`;
};

/**
 * Formats file size in bytes to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Cleans up object URLs to prevent memory leaks
 */
export const cleanupObjectUrl = (url: string | null, delay: number = 0): void => {
  if (!url) return;
  
  if (delay > 0) {
    setTimeout(() => URL.revokeObjectURL(url), delay);
  } else {
    URL.revokeObjectURL(url);
  }
};

/**
 * Creates a safe object URL from a blob
 */
export const createSafeObjectUrl = (blob: Blob): string => {
  try {
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to create object URL:', error);
    throw new Error('Failed to create download link');
  }
};

/**
 * Constrains a time range within valid bounds
 */
export const constrainTimeRange = (range: TimeRange, duration: number): TimeRange => {
  const [start, end] = range;
  const constrainedStart = Math.max(0, Math.min(start, duration));
  const constrainedEnd = Math.max(constrainedStart, Math.min(end, duration));
  
  return [constrainedStart, constrainedEnd];
};

/**
 * Adjusts time range start time
 */
export const adjustStartTime = (range: TimeRange, delta: number): TimeRange => {
  const [start, end] = range;
  const newStart = Math.max(0, start + delta);
  return [Math.min(newStart, end), end];
};

/**
 * Adjusts time range end time
 */
export const adjustEndTime = (range: TimeRange, delta: number, maxDuration: number): TimeRange => {
  const [start, end] = range;
  const newEnd = Math.min(maxDuration, Math.max(start, end + delta));
  return [start, newEnd];
};
