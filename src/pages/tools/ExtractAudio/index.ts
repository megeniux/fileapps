// Export all components and hooks
export { default as FileUploadArea } from './FileUploadArea';
export { default as DurationSelector } from './DurationSelector';
export { default as ProgressDisplay } from './ProgressDisplay';

// Export hooks
export { useAudioExtractor } from './useAudioExtractor';
export { useAudioExtractorState } from './useAudioExtractorState';
export { useAudioProcessor } from './useAudioProcessor';

// Export utilities
export * from './constants';
export * from './types';
export * from './utils';
export * from './fileHandling';

// Export FFmpeg manager
export { default as FFmpegManager } from './ffmpegManager';
