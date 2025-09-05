/**
 * Type definitions for Video Merger component
 * Following established patterns from VideoResize and VideoTrim
 */

/**
 * Processing status states
 */
export type ProcessingStatus = 
  | 'Preparing'
  | 'Merging'
  | 'Finalizing'
  | 'Completed'
  | 'Failed'
  | 'Stopped'
  | null;

/**
 * Video merger state interface
 */
export interface VideoMergerState {
  // File handling
  files: File[];
  isDragActive: boolean;
  
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
 * Video merger actions interface
 */
export interface VideoMergerActions {
  // File operations
  handleFilesAdd: (files: File[]) => void;
  handleFileRemove: (index: number) => void;
  handleFileReplace: (index: number, newFile: File) => void;
  handleReset: () => void;
  
  // File ordering
  handleMoveUp: (index: number) => void;
  handleMoveDown: (index: number) => void;
  
  // Drag and drop
  handleDragEnter: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  
  // Processing operations
  handleMerge: () => Promise<void>;
  handleStop: () => void;
  handleDownload: () => void;
  
  // UI operations
  handleAddClick: () => void;
}

/**
 * Video processor hook interface
 */
export interface VideoProcessorHook {
  mergeVideos: (
    files: File[],
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
  files: File[];
  isDragActive: boolean;
  isProcessing: boolean;
  onFilesAdd: (files: File[]) => void;
  onAddClick: () => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

/**
 * Video list props
 */
export interface VideoListProps {
  files: File[];
  isProcessing: boolean;
  onRemove: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onReplace: (index: number) => void;
}

/**
 * Progress display props (reusing from VideoTrim)
 */
export interface ProgressDisplayProps {
  isProcessing: boolean;
  progress: number;
  status: ProcessingStatus;
  consoleLogs: string[];
}

/**
 * Video list item for internal use
 */
export interface VideoListItem {
  file: File;
  index: number;
  previewUrl: string;
}
