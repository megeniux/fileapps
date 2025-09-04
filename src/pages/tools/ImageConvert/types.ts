export interface CropArea {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  width: string;
  height: string;
  maintainAspectRatio: boolean;
  quality: number;
  format: string;
  errorMsg: string | null;
  isProcessing: boolean;
  progress: number;
  status: string | null;
  downloadUrl: string | null;
  downloadSize: number | null;
  originalDimensions: ImageDimensions | null;
  isDragActive: boolean;
  crop: CropArea;
  rotate: number;
  grayscale: boolean;
  blur: number;
  outputName: string;
  flipH: boolean;
  flipV: boolean;
  brightness: number;
  contrast: number;
  saturation: number;
}
