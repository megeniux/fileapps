/**
 * Type definitions for Video Trimmer component
 * Following established patterns from VideoResize and VideoConvert
 */

/**
 * Processing status states
 */
export type ProcessingStatus = 
  | 'Preparing'
  | 'Trimming'
  | 'Finalizing'
  | 'Completed'
  | 'Failed'
  | 'Stopped'
  | null;

/**
 * Time range for video trimming
 */
export type TimeRange = [number, number];

/**
 * Video trimmer state interface
 */
export interface VideoTrimmerState {
  // File handling
  file: File | null;
  previewUrl: string | null;
  isDragActive: boolean;
  
  // Video properties
  duration: number;
  range: TimeRange;
  
  // Processing state
  isProcessing: boolean;
  progress: number;
  status: ProcessingStatus;
  consoleLogs: string[];
  
  // Output state
  downloadUrl: string | null;
  downloadSize: number | null;
  
  // Error handling
  errorMsg: string | null;
  warningMsg: string | null;
}

/**
 * Video trimmer actions interface
 */
export interface VideoTrimmerActions {
  // File operations
  handleFileSelect: (file: File) => void;
  handleFileRemove: () => void;
  handleReset: () => void;
  
  // Drag and drop
  handleDragEnter: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  
  // Video operations
  handleLoadedMetadata: () => void;
  handleRangeChange: (event: Event, newValue: number | number[]) => void;
  
  // Processing operations
  handleTrim: () => Promise<void>;
  handleStop: () => void;
  handleDownload: () => void;
  
  // Range controls
  decreaseStartTime: () => void;
  increaseEndTime: () => void;
}

/**
 * Video processor hook interface
 */
export interface VideoProcessorHook {
  trimVideo: (
    file: File,
    range: TimeRange,
    onProgress: (progress: number) => void,
    onStatus: (status: ProcessingStatus) => void,
    onLog: (log: string) => void
  ) => Promise<{ data: Uint8Array; size: number }>;
  stopProcessing: () => void;
  resetFFmpeg: () => Promise<void>;
}

/**
 * File upload area props
 */
export interface FileUploadAreaProps {
  file: File | null;
  previewUrl: string | null;
  isDragActive: boolean;
  isProcessing: boolean;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onLoadedMetadata: () => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

/**
 * Trim settings props
 */
export interface TrimSettingsProps {
  duration: number;
  range: TimeRange;
  isProcessing: boolean;
  onRangeChange: (event: Event, newValue: number | number[]) => void;
  onDecreaseStartTime: () => void;
  onIncreaseEndTime: () => void;
}

/**
 * Progress display props
 */
export interface ProgressDisplayProps {
  isProcessing: boolean;
  progress: number;
  status: ProcessingStatus;
  consoleLogs: string[];
}
