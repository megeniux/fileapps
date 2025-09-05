// Type definitions for caption burning
export interface VideoFile {
  file: File;
  previewUrl: string;
}

export interface SubtitleFile {
  file: File;
  name: string;
  format: SubtitleFormat;
}

export interface StyleOptions {
  fontSize: number;
  fontColor: string;
  outlineColor: string;
  outlineWidth: number;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  status: string | null;
  errorMsg: string | null;
}

export interface DownloadState {
  url: string | null;
  size: number | null;
}

export interface CaptionBurnerState {
  videoFile: VideoFile | null;
  subtitleFile: SubtitleFile | null;
  styleOptions: StyleOptions;
  isDragActive: boolean;
  processing: ProcessingState;
  download: DownloadState;
  consoleLogs: string[];
}

export type SubtitleFormat = keyof typeof import('./constants').SUBTITLE_FORMATS;
export type ProcessingStatus = typeof import('./constants').PROCESSING_STATES[keyof typeof import('./constants').PROCESSING_STATES];

export interface FFmpegCommand {
  input: string;
  subtitle: string;
  output: string;
  args: string[];
}

export interface CaptionBurningOptions {
  videoFile: VideoFile;
  subtitleFile: SubtitleFile;
  styleOptions: StyleOptions;
}

export interface FontResource {
  name: string;
  url: string;
  data?: Uint8Array;
}

export interface SubtitleFilter {
  filterString: string;
  fontDir: string;
}

export interface BurningProgress {
  percentage: number;
  timeProcessed: number;
  estimatedTimeRemaining: number;
  currentFrame?: number;
}

export interface VideoMetadata {
  duration: number;
  width?: number;
  height?: number;
  fps?: number;
}

export interface StylePreset {
  name: string;
  fontSize: number;
  fontColor: string;
  outlineColor: string;
  outlineWidth: number;
}
