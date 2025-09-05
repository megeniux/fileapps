/**
 * Video Trimmer module exports
 * Following established patterns from VideoResize and VideoConvert
 */

// Main hook
export { useVideoTrimmer } from './useVideoTrimmer';

// Components
export { FileUploadArea } from './FileUploadArea';
export { TrimSettings } from './TrimSettings';
export { ProgressDisplay } from './ProgressDisplay';

// Types
export type {
  VideoTrimmerState,
  VideoTrimmerActions,
  TimeRange,
  ProcessingStatus,
  FileUploadAreaProps,
  TrimSettingsProps,
  ProgressDisplayProps
} from './types';

// Constants
export {
  SUPPORTED_VIDEO_FORMATS,
  MAX_FILE_SIZE,
  FFMPEG_CONFIG,
  UI_CONFIG,
  DEFAULT_RANGE,
  ERROR_MESSAGES
} from './constants';

// Utils
export {
  isValidVideoFile,
  isValidFileSize,
  validateFile,
  isValidTimeRange,
  formatTime,
  formatDurationDisplay,
  getTrimmedDuration,
  generateTrimmedFilename,
  formatFileSize
} from './utils';
