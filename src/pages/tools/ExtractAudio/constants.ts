// Audio extraction constants and configuration
export const AUDIO_FORMATS = {
  MP3: { extension: 'mp3', mimeType: 'audio/mp3', codec: 'mp3' },
  WAV: { extension: 'wav', mimeType: 'audio/wav', codec: 'pcm_s16le' },
  AAC: { extension: 'aac', mimeType: 'audio/aac', codec: 'aac' },
  FLAC: { extension: 'flac', mimeType: 'audio/flac', codec: 'flac' }
} as const;

export const DEFAULT_AUDIO_FORMAT = 'MP3';

export const QUALITY_PRESETS = {
  HIGH: { bitrate: '320k', quality: 'High (320kbps)' },
  MEDIUM: { bitrate: '192k', quality: 'Medium (192kbps)' },
  LOW: { bitrate: '128k', quality: 'Low (128kbps)' }
} as const;

export const DEFAULT_QUALITY = 'MEDIUM';

export const PROCESSING_STATES = {
  IDLE: 'idle',
  PREPARING: 'Preparing',
  EXTRACTING: 'Extracting',
  FINALIZING: 'Finalizing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  STOPPED: 'Stopped'
} as const;

export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
export const MIN_DURATION = 0.1; // 0.1 seconds
export const MAX_DURATION = 3600; // 1 hour

export const SUPPORTED_VIDEO_TYPES = [
  'video/mp4',
  'video/mov',
  'video/avi',
  'video/mkv',
  'video/webm',
  'video/quicktime'
];

export const UI_CONFIG = {
  UPLOAD_AREA_HEIGHT: 300,
  VIDEO_MAX_HEIGHT: 220,
  PROGRESS_UPDATE_INTERVAL: 100,
  STATUS_RESET_DELAY: 2000
};
