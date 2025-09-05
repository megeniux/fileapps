import { SUPPORTED_VIDEO_TYPES, MIN_DURATION, MAX_DURATION, MAX_FILE_SIZE } from './constants';
import type { DurationRange, VideoMetadata, AudioFormat } from './types';

// File validation utilities
export const validateVideoFile = (file: File): string | null => {
  if (!file) return 'No file selected';
  
  if (file.size > MAX_FILE_SIZE) {
    return `File size too large. Maximum size is ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB`;
  }
  
  if (!SUPPORTED_VIDEO_TYPES.includes(file.type)) {
    return 'Please select a supported video file (MP4, MOV, AVI, MKV, WebM)';
  }
  
  return null;
};

// Duration formatting utilities
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const parseTimeToSeconds = (timeString: string): number => {
  const parts = timeString.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
};

// Duration range validation
export const validateDurationRange = (range: DurationRange, maxDuration: number): string | null => {
  if (range.start < 0) return 'Start time cannot be negative';
  if (range.end > maxDuration) return 'End time cannot exceed video duration';
  if (range.start >= range.end) return 'End time must be greater than start time';
  if (range.end - range.start < MIN_DURATION) return `Minimum duration is ${MIN_DURATION} seconds`;
  if (range.end - range.start > MAX_DURATION) return `Maximum duration is ${MAX_DURATION} seconds`;
  
  return null;
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Generate output filename
export const generateOutputFilename = (inputFilename: string, format: AudioFormat): string => {
  const nameWithoutExt = inputFilename.replace(/\.[^/.]+$/, '');
  const extension = format.toLowerCase();
  return `audio_${nameWithoutExt}.${extension}`;
};

// Extract video metadata
export const extractVideoMetadata = (videoElement: HTMLVideoElement): VideoMetadata => {
  return {
    duration: videoElement.duration,
    width: videoElement.videoWidth,
    height: videoElement.videoHeight,
    fps: undefined // Would need additional processing to determine FPS
  };
};

// Clean up object URLs
export const cleanupObjectUrl = (url: string | null, delay: number = 5000): void => {
  if (url) {
    setTimeout(() => URL.revokeObjectURL(url), delay);
  }
};

// Progress calculation helper
export const calculateProgress = (timeProcessed: number, totalDuration: number): number => {
  if (totalDuration === 0) return 0;
  return Math.min((timeProcessed / totalDuration) * 100, 99);
};

// Console log filtering
export const filterConsoleLogs = (logs: string[]): string[] => {
  return logs.filter(log => 
    log.includes('size=') || 
    log.includes('time=') || 
    log.includes('bitrate=') ||
    log.includes('error') ||
    log.includes('warning')
  );
};

// Duration range helpers
export const createDurationRange = (start: number, end: number): DurationRange => ({
  start: Math.max(0, start),
  end: Math.max(start, end)
});

export const adjustRangeStart = (range: DurationRange, delta: number): DurationRange => ({
  start: Math.max(0, range.start + delta),
  end: range.end
});

export const adjustRangeEnd = (range: DurationRange, delta: number, maxDuration: number): DurationRange => ({
  start: range.start,
  end: Math.min(maxDuration, Math.max(range.start + MIN_DURATION, range.end + delta))
});

// Error message helpers
export const getFFmpegErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) {
    if (error.message === 'called FFmpeg.terminate()') return 'Operation was stopped';
    return error.message;
  }
  return 'An unknown error occurred during audio extraction';
};
