// Type definitions for audio extraction
export interface AudioFile {
  file: File;
  previewUrl: string;
  duration: number;
}

export interface DurationRange {
  start: number;
  end: number;
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

export interface AudioExtractorState {
  audioFile: AudioFile | null;
  range: DurationRange;
  isDragActive: boolean;
  processing: ProcessingState;
  download: DownloadState;
  consoleLogs: string[];
  format: AudioFormat;
  quality: AudioQuality;
}

export type AudioFormat = keyof typeof import('./constants').AUDIO_FORMATS;
export type AudioQuality = keyof typeof import('./constants').QUALITY_PRESETS;
export type ProcessingStatus = typeof import('./constants').PROCESSING_STATES[keyof typeof import('./constants').PROCESSING_STATES];

export interface FFmpegCommand {
  input: string;
  output: string;
  args: string[];
}

export interface AudioExtractionOptions {
  startTime: number;
  endTime: number;
  format: AudioFormat;
  quality: AudioQuality;
}

export interface VideoMetadata {
  duration: number;
  width?: number;
  height?: number;
  fps?: number;
}

export interface ExtractionProgress {
  percentage: number;
  timeProcessed: number;
  estimatedTimeRemaining: number;
}
