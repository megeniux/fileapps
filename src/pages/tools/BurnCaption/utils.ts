import { 
  SUPPORTED_VIDEO_TYPES, 
  SUPPORTED_SUBTITLE_EXTENSIONS, 
  MAX_FILE_SIZE, 
  MAX_SUBTITLE_SIZE,
  FONT_SETTINGS
} from './constants';
import type { StyleOptions, SubtitleFormat, VideoMetadata } from './types';

// File validation utilities
export const validateVideoFile = (file: File): string | null => {
  if (!file) return 'No video file selected';
  
  if (file.size > MAX_FILE_SIZE) {
    return `Video file too large. Maximum size is ${Math.round(MAX_FILE_SIZE / (1024 * 1024 * 1024))}GB`;
  }
  
  if (!SUPPORTED_VIDEO_TYPES.includes(file.type)) {
    return 'Please select a supported video file (MP4, MOV, AVI, MKV, WebM)';
  }
  
  return null;
};

export const validateSubtitleFile = (file: File): string | null => {
  if (!file) return 'No subtitle file selected';
  
  if (file.size > MAX_SUBTITLE_SIZE) {
    return `Subtitle file too large. Maximum size is ${Math.round(MAX_SUBTITLE_SIZE / (1024 * 1024))}MB`;
  }
  
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!SUPPORTED_SUBTITLE_EXTENSIONS.includes(extension)) {
    return 'Please select a supported subtitle file (.srt or .vtt)';
  }
  
  return null;
};

// Style validation utilities
export const validateStyleOptions = (style: StyleOptions): string | null => {
  if (style.fontSize < FONT_SETTINGS.FONT_SIZE_MIN || style.fontSize > FONT_SETTINGS.FONT_SIZE_MAX) {
    return `Font size must be between ${FONT_SETTINGS.FONT_SIZE_MIN} and ${FONT_SETTINGS.FONT_SIZE_MAX}px`;
  }
  
  if (style.outlineWidth < FONT_SETTINGS.OUTLINE_WIDTH_MIN || style.outlineWidth > FONT_SETTINGS.OUTLINE_WIDTH_MAX) {
    return `Outline width must be between ${FONT_SETTINGS.OUTLINE_WIDTH_MIN} and ${FONT_SETTINGS.OUTLINE_WIDTH_MAX}px`;
  }
  
  if (!isValidHexColor(style.fontColor) || !isValidHexColor(style.outlineColor)) {
    return 'Invalid color format. Please use valid hex colors';
  }
  
  return null;
};

// Color utilities
export const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const hexToBGR = (hex: string): string => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Convert to BGR format for FFmpeg
  if (cleanHex.length === 3) {
    // Short hex format
    const r = cleanHex[0] + cleanHex[0];
    const g = cleanHex[1] + cleanHex[1];
    const b = cleanHex[2] + cleanHex[2];
    return b + g + r;
  } else {
    // Full hex format
    const r = cleanHex.substring(0, 2);
    const g = cleanHex.substring(2, 4);
    const b = cleanHex.substring(4, 6);
    return b + g + r;
  }
};

// FFmpeg filter utilities
export const buildSubtitleFilter = (
  subtitleFileName: string,
  styleOptions: StyleOptions
): string => {
  const style = `FontName=${FONT_SETTINGS.DEFAULT_FONT},FontSize=${styleOptions.fontSize},PrimaryColour=&H${hexToBGR(styleOptions.outlineColor)}&,OutlineColour=&H${hexToBGR(styleOptions.fontColor)}&,Outline=${styleOptions.outlineWidth}`;
  
  return `subtitles='${subtitleFileName}':force_style='${style}':fontsdir='.'`;
};

// Duration parsing utilities
export const parseDuration = (message: string): number => {
  const match = message.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return 0;
};

export const parseCurrentTime = (message: string): number | null => {
  const match = message.match(/time=(\d+):(\d+):(\d+\.\d+)/);
  if (match) {
    const [, h, m, s] = match;
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  }
  return null;
};

// Progress calculation
export const calculateProgress = (currentTime: number, totalDuration: number): number => {
  if (totalDuration === 0) return 0;
  return Math.min((currentTime / totalDuration) * 100, 99.5);
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Output filename generation
export const generateOutputFilename = (inputFilename: string): string => {
  const nameWithoutExt = inputFilename.replace(/\.[^/.]+$/, '');
  return `captioned_${nameWithoutExt}.mp4`;
};

// Subtitle format detection
export const detectSubtitleFormat = (filename: string): SubtitleFormat => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension === 'vtt' ? 'VTT' : 'SRT';
};

// Clean up object URLs
export const cleanupObjectUrl = (url: string | null, delay: number = 5000): void => {
  if (url) {
    setTimeout(() => URL.revokeObjectURL(url), delay);
  }
};

// Console log filtering for caption burning
export const filterConsoleLogs = (logs: string[]): string[] => {
  return logs.filter(log => 
    log.includes('Duration:') ||
    log.includes('time=') || 
    log.includes('frame=') ||
    log.includes('fps=') ||
    log.includes('bitrate=') ||
    log.includes('error') ||
    log.includes('warning') ||
    log.includes('subtitle')
  );
};

// Style option helpers
export const clampFontSize = (size: number): number => {
  return Math.max(FONT_SETTINGS.FONT_SIZE_MIN, Math.min(FONT_SETTINGS.FONT_SIZE_MAX, size));
};

export const clampOutlineWidth = (width: number): number => {
  return Math.max(FONT_SETTINGS.OUTLINE_WIDTH_MIN, Math.min(FONT_SETTINGS.OUTLINE_WIDTH_MAX, width));
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

// Error message helpers
export const getFFmpegErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) {
    if (error.message === 'called FFmpeg.terminate()') return 'Operation was stopped';
    return error.message;
  }
  return 'An unknown error occurred during caption burning';
};
