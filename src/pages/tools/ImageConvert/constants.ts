export const defaultState = {
  width: '',
  height: '',
  maintainAspectRatio: true,
  quality: 90,
  format: 'original',
  crop: { x: 0, y: 0, w: 0, h: 0 },
  rotate: 0,
  grayscale: false,
  blur: 0,
  outputName: '',
  flipH: false,
  flipV: false,
  brightness: 100,
  contrast: 100,
  saturation: 100,
};

export const supportedFormats = [
  { value: 'original', label: 'Original Format' },
  { value: 'jpg', label: 'JPG' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WebP' },
  { value: 'gif', label: 'GIF' },
];

export const sliderRanges = {
  rotate: { min: -180, max: 180 },
  blur: { min: 0, max: 10 },
  brightness: { min: 0, max: 200 },
  contrast: { min: 0, max: 200 },
  saturation: { min: 0, max: 200 },
  quality: { min: 10, max: 100 },
};
