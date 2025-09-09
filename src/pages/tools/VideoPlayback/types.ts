/**
 * Video file interface
 */
export interface VideoFile extends File {
  type: string;
  size: number;
  name: string;
}

/**
 * Speed options for video playback adjustment
 */
export interface SpeedOptions {
  speed: number;
  isReversed: boolean;
}

/**
 * Processing state interface
 */
export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  status: string | null;
  errorMsg: string | null;
}

/**
 * Download state interface
 */
export interface DownloadState {
  url: string | null;
  size: number | null;
}

/**
 * Main video playback state interface
 */
export interface VideoPlaybackState {
  videoFile: VideoFile | null;
  previewUrl: string | null;
  speedOptions: SpeedOptions;
  processing: ProcessingState;
  download: DownloadState;
  isDragActive: boolean;
  consoleLogs: string[];
}

/**
 * Speed filter result interface
 */
export interface SpeedFilters {
  videoFilter: string;
  audioFilter: string;
}

/**
 * File upload area component props
 */
export interface FileUploadAreaProps {
  videoFile: VideoFile | null;
  previewUrl: string | null;
  isDragActive: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

/**
 * Speed controls component props
 */
export interface SpeedControlsProps {
  speedOptions: SpeedOptions;
  isProcessing: boolean;
  onSpeedChange: (speed: number) => void;
  onReverseToggle: (reversed: boolean) => void;
  onAdjustSpeed: (delta: number) => void;
}

/**
 * Progress display component props
 */
export interface ProgressDisplayProps {
  processing: ProcessingState;
  consoleLogs: string[];
}
