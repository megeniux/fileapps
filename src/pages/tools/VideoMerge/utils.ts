/**
 * Utility functions for Video Merger component
 * Following established patterns from VideoResize and VideoTrim
 */

import { SUPPORTED_VIDEO_FORMATS, MAX_FILE_SIZE, MAX_VIDEO_COUNT, ERROR_MESSAGES } from './constants';

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
 * Validates a file for video merging
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
 * Validates multiple files for merging
 */
export const validateFiles = (files: File[], existingFiles: File[] = []): string | null => {
  // Check total count
  if (existingFiles.length + files.length > MAX_VIDEO_COUNT) {
    return ERROR_MESSAGES.TOO_MANY_FILES;
  }
  
  // Validate each file
  for (const file of files) {
    const error = validateFile(file);
    if (error) return error;
  }
  
  return null;
};

/**
 * Checks if a file is already in the list (by name and size)
 */
export const isDuplicateFile = (file: File, existingFiles: File[]): boolean => {
  return existingFiles.some(existing => 
    existing.name === file.name && existing.size === file.size
  );
};

/**
 * Filters out duplicate files
 */
export const filterDuplicateFiles = (files: File[], existingFiles: File[]): File[] => {
  return files.filter(file => !isDuplicateFile(file, existingFiles));
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
 * Generates concat list content for FFmpeg
 */
export const generateConcatList = (files: File[]): string => {
  return files.map(file => `file '${file.name.replace(/'/g, "'\\''")}'`).join('\n');
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
 * Moves an item in an array from one index to another
 */
export const moveArrayItem = <T>(array: T[], fromIndex: number, toIndex: number): T[] => {
  if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
    return array;
  }
  
  const newArray = [...array];
  const [movedItem] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, movedItem);
  
  return newArray;
};

/**
 * Swaps two items in an array
 */
export const swapArrayItems = <T>(array: T[], index1: number, index2: number): T[] => {
  if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
    return array;
  }
  
  const newArray = [...array];
  const temp = newArray[index1];
  newArray[index1] = newArray[index2];
  newArray[index2] = temp;
  
  return newArray;
};

/**
 * Calculates total duration of all videos (estimate)
 */
export const calculateTotalSize = (files: File[]): number => {
  return files.reduce((total, file) => total + file.size, 0);
};

/**
 * Generates a safe filename by removing special characters
 */
export const generateSafeFilename = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};

/**
 * Creates preview URLs for multiple files
 */
export const createPreviewUrls = (files: File[]): string[] => {
  return files.map(file => URL.createObjectURL(file));
};

/**
 * Cleans up multiple preview URLs
 */
export const cleanupPreviewUrls = (urls: string[]): void => {
  urls.forEach(url => URL.revokeObjectURL(url));
};
