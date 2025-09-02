export interface OutputFormat {
  label: string;
  value: string;
}

export interface RatioOption {
  label: string;
  value: string;
  ratio: number | null;
}

export interface VideoConverterState {
  file: File | null;
  previewUrl: string | null;
  outputFormat: keyof typeof videoCodecs;
  videoCodec: string;
  audioCodec: string;
  width: string;
  height: string;
  fps: number | '';
  crf: number | 'keep';
  preset: string | 'keep';
  audioBitrate: string;
  resolutionRatio: string;
  isProcessing: boolean;
  progress: number;
  status: string | null;
  consoleLogs: string[];
  errorMsg: string | null;
  downloadUrl: string | null;
  downloadSize: number | null;
  crfAnchor: HTMLElement | null;
  presetAnchor: HTMLElement | null;
  isDragActive: boolean;
}

export const videoCodecs = {
  mp4: ['libx264', 'libx265', 'mpeg4'],
  webm: ['libvpx', 'libvpx-vp9'],
  mkv: ['libx264', 'libx265', 'libvpx', 'libvpx-vp9'],
  mov: ['libx264', 'mpeg4'],
  avi: ['mpeg4', 'libx264'],
  flv: ['flv'],
  gif: ['gif'],
  mp3: [],
  wav: [],
};

export const audioCodecs = {
  mp4: ['aac', 'mp3'],
  webm: ['libvorbis', 'libopus'],
  mkv: ['aac', 'libvorbis', 'libopus', 'mp3'],
  mov: ['aac', 'mp3'],
  avi: ['mp3'],
  flv: ['mp3'],
  gif: [],
  mp3: ['mp3'],
  wav: ['pcm_s16le'],
};
