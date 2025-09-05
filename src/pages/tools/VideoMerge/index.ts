/**
 * Video Merger module exports
 * Following established patterns from VideoResize and VideoTrim
 */

// Main hook
export { useVideoMerger } from './useVideoMerger';

// Components
export { FileUploadArea } from './FileUploadArea';
export { VideoList } from './VideoList';
export { ProgressDisplay } from './ProgressDisplay';

// Types
export type {
  VideoMergerState,
  VideoMergerActions,
  ProcessingStatus,
  FileUploadAreaProps,
  VideoListProps,
  ProgressDisplayProps
} from './types';

// Constants
export {
  SUPPORTED_VIDEO_FORMATS,
  MAX_FILE_SIZE,
  MAX_VIDEO_COUNT,
  MIN_VIDEO_COUNT,
  FFMPEG_CONFIG,
  UI_CONFIG,
  ERROR_MESSAGES,
  TABLE_CONFIG
} from './constants';

// Utils
export {
  isValidVideoFile,
  isValidFileSize,
  validateFile,
  validateFiles,
  isDuplicateFile,
  filterDuplicateFiles,
  formatFileSize,
  generateConcatList,
  moveArrayItem,
  swapArrayItems,
  calculateTotalSize
} from './utils';
