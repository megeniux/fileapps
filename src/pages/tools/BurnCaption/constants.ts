// Caption burning constants and configuration
export const SUBTITLE_FORMATS = {
  SRT: { extension: 'srt', mimeType: 'text/srt', name: 'SubRip (.srt)' },
  VTT: { extension: 'vtt', mimeType: 'text/vtt', name: 'WebVTT (.vtt)' }
} as const;

export const SUPPORTED_SUBTITLE_EXTENSIONS = ['.srt', '.vtt'];

export const FONT_SETTINGS = {
  DEFAULT_FONT: 'Arial',
  STATIC_FONT_NAME: 'arial.ttf',
  STATIC_FONT_URL: '/fonts/Arial/arial.ttf',
  FONT_SIZE_MIN: 12,
  FONT_SIZE_MAX: 48,
  FONT_SIZE_DEFAULT: 24,
  OUTLINE_WIDTH_MIN: 0,
  OUTLINE_WIDTH_MAX: 6,
  OUTLINE_WIDTH_DEFAULT: 2
} as const;

export const DEFAULT_STYLE_OPTIONS = {
  fontSize: FONT_SETTINGS.FONT_SIZE_DEFAULT,
  fontColor: '#FFFFFF',
  outlineColor: '#000000',
  outlineWidth: FONT_SETTINGS.OUTLINE_WIDTH_DEFAULT
} as const;

export const COLOR_PRESETS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  YELLOW: '#FFFF00',
  RED: '#FF0000',
  BLUE: '#0000FF',
  GREEN: '#00FF00'
} as const;

export const PROCESSING_STATES = {
  IDLE: 'idle',
  PREPARING: 'Preparing',
  LOADING_FONT: 'Loading font',
  BURNING_CAPTIONS: 'Burning captions',
  FINALIZING: 'Finalizing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  STOPPED: 'Stopped'
} as const;

export const SUPPORTED_VIDEO_TYPES = [
  'video/mp4',
  'video/mov',
  'video/avi',
  'video/mkv',
  'video/webm',
  'video/quicktime'
];

export const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB
export const MAX_SUBTITLE_SIZE = 10 * 1024 * 1024; // 10MB

export const UI_CONFIG = {
  UPLOAD_AREA_HEIGHT: 300,
  VIDEO_MAX_HEIGHT: 220,
  PROGRESS_UPDATE_INTERVAL: 100,
  STATUS_RESET_DELAY: 2000,
  FONT_INFO_TEXT: 'Captions will use Arial font.'
};
