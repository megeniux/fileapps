import type { RatioOption, ResizeMode } from './types';

/**
 * Available aspect ratio options for video resizing
 */
export const ratioOptions: RatioOption[] = [
  { label: 'Custom', value: 'custom', ratio: null },
  { label: '1:1', value: '1:1', ratio: 1 },
  { label: '4:3', value: '4:3', ratio: 4 / 3 },
  { label: '16:9', value: '16:9', ratio: 16 / 9 },
  { label: '9:16', value: '9:16', ratio: 9 / 16 },
  { label: '21:9', value: '21:9', ratio: 21 / 9 },
];

/**
 * Video resize modes that determine how the video fits into the new dimensions
 */
export const resizeModes: ResizeMode[] = [
  { label: 'Fit (letterbox)', value: 'fit' },
  { label: 'Fill (crop)', value: 'fill' },
  { label: 'Stretch', value: 'stretch' },
  { label: 'Crop (manual)', value: 'crop' },
];

/**
 * Default state values for the video resizer
 */
export const defaultState = {
  width: '',
  height: '',
  ratio: 'custom',
  mode: 'fit',
  fps: '' as number | '',
};

/**
 * FFmpeg encoding presets for video quality/speed trade-off
 */
export const encodingPresets = [
  'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'
];

/**
 * Common video quality settings (CRF values)
 */
export const qualityPresets = [
  { label: 'High Quality (CRF 18)', value: 18 },
  { label: 'Good Quality (CRF 23)', value: 23 },
  { label: 'Medium Quality (CRF 28)', value: 28 },
  { label: 'Low Quality (CRF 32)', value: 32 },
];

/**
 * Preset resolution options for common use cases
 */
export const resolutionPresets = [
  { label: '4K (3840x2160)', width: 3840, height: 2160 },
  { label: '1440p (2560x1440)', width: 2560, height: 1440 },
  { label: '1080p (1920x1080)', width: 1920, height: 1080 },
  { label: '720p (1280x720)', width: 1280, height: 720 },
  { label: '480p (854x480)', width: 854, height: 480 },
  { label: '360p (640x360)', width: 640, height: 360 },
];
