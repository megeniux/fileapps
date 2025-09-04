export const defaultState = {
  file: null,
  crf: 18,
  preset: 'slower',
  isProcessing: false,
  progress: 0,
  status: null,
  downloadUrl: null,
  downloadSize: null,
  consoleLogs: [],
  errorMsg: null,
  previewUrl: null,
  isDragActive: false,
  totalDuration: 0,
};

export const presetValues = [
  'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'
];

export const CRF_MIN = 18;
export const CRF_MAX = 36;
