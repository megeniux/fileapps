// Export all components and hooks
export { default as FileUploadArea } from './FileUploadArea';
export { default as SubtitleUpload } from './SubtitleUpload';
export { default as StyleControls } from './StyleControls';
export { default as ProgressDisplay } from './ProgressDisplay';

// Export hooks
export { useCaptionBurner } from './useCaptionBurner';
export { useCaptionBurnerState } from './useCaptionBurnerState';
export { useCaptionProcessor } from './useCaptionProcessor';

// Export utilities
export * from './constants';
export * from './types';
export * from './utils';
export * from './fileHandling';

// Export FFmpeg manager
export { default as FFmpegManager } from './ffmpegManager';
