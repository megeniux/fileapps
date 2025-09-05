export interface RatioOption {
  label: string;
  value: string;
  ratio: number | null;
}

export interface ResizeMode {
  label: string;
  value: string;
}

export interface ResolutionPreset {
  label: string;
  width: number;
  height: number;
}

export interface QualityPreset {
  label: string;
  value: number;
}

export interface VideoResizerState {
  file: File | null;
  previewUrl: string | null;
  width: string;
  height: string;
  resolutionRatio: string;
  resizeMode: string;
  fps: number | '';
  isProcessing: boolean;
  progress: number;
  status: string | null;
  consoleLogs: string[];
  errorMsg: string | null;
  warningMsg: string | null;
  downloadUrl: string | null;
  downloadSize: number | null;
  isDragActive: boolean;
}

export interface FileUploadAreaProps {
  file: File | null;
  previewUrl: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isDragActive: boolean;
  width: string;
  height: string;
  resizeMode: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onLoadedMetadata: () => void;
  onDragOver: (event: React.DragEvent) => void;
  onDragLeave: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
}

export interface ResizeSettingsProps {
  width: string;
  height: string;
  resolutionRatio: string;
  resizeMode: string;
  fps: number | '';
  onWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRatioChange: (event: any) => void;
  onResizeModeChange: (event: any) => void;
  onFpsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export interface ProgressDisplayProps {
  isProcessing: boolean;
  progress: number;
  status: string | null;
  consoleLogs: string[];
}

export interface FFmpegProcessingOptions {
  width: string;
  height: string;
  fps: number | '';
  resizeMode: string;
}
