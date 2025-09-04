export interface VideoCompressionState {
  file: File | null;
  crf: number;
  preset: string;
  isProcessing: boolean;
  progress: number;
  status: string | null;
  downloadUrl: string | null;
  downloadSize: number | null;
  consoleLogs: string[];
  errorMsg: string | null;
  previewUrl: string | null;
  isDragActive: boolean;
  totalDuration: number;
}

export interface CompressionSettings {
  crf: number;
  preset: string;
}

export interface ProgressInfo {
  isProcessing: boolean;
  progress: number;
  status: string | null;
  consoleLogs: string[];
}
