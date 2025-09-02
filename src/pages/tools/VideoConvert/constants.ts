import type { OutputFormat, RatioOption } from './types';

export const outputFormats: OutputFormat[] = [
  { label: 'MP4 (H.264/AAC)', value: 'mp4' },
  { label: 'WebM (VP8/Vorbis)', value: 'webm' },
  { label: 'MKV (H.264/AAC/Opus)', value: 'mkv' },
  { label: 'MOV (H.264/AAC)', value: 'mov' },
  { label: 'AVI (MPEG4/MP3)', value: 'avi' },
  { label: 'FLV (Flash Video)', value: 'flv' },
  { label: 'GIF (no audio)', value: 'gif' },
  { label: 'MP3 (audio only)', value: 'mp3' },
  { label: 'WAV (audio only)', value: 'wav' },
];

export const presetValues = [
  'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'
];

export const ratioOptions: RatioOption[] = [
  { label: 'Custom', value: 'custom', ratio: null },
  { label: '1:1', value: '1:1', ratio: 1 },
  { label: '4:3', value: '4:3', ratio: 4 / 3 },
  { label: '16:9', value: '16:9', ratio: 16 / 9 },
  { label: '9:16', value: '9:16', ratio: 9 / 16 },
  { label: '21:9', value: '21:9', ratio: 21 / 9 },
];

// Add "keep" option for CRF and Preset
export const CRF_KEEP = 'keep';
export const PRESET_KEEP = 'keep';
