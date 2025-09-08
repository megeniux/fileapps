export const outputFormats = [
  { label: 'MP3 (High Quality)', value: 'mp3', bitrate: '320k' },
  { label: 'MP3 (Medium Quality)', value: 'mp3', bitrate: '192k' },
  { label: 'MP3 (Low Quality)', value: 'mp3', bitrate: '128k' },
  { label: 'WAV (Lossless)', value: 'wav', codec: 'pcm_s16le' },
  { label: 'AAC (High Quality)', value: 'aac', bitrate: '256k' },
  { label: 'AAC (Medium Quality)', value: 'aac', bitrate: '192k' },
  { label: 'OGG (Vorbis)', value: 'ogg', codec: 'libvorbis', bitrate: '192k' },
  { label: 'FLAC (Lossless)', value: 'flac', codec: 'flac' },
  { label: 'M4A (AAC)', value: 'm4a', codec: 'aac', bitrate: '256k' },
];

export function getMimeTypeForExt(ext: string) {
  switch (ext) {
    case 'mp3': return 'audio/mpeg';
    case 'wav': return 'audio/wav';
    case 'aac': return 'audio/aac';
    case 'ogg': return 'audio/ogg';
    case 'flac': return 'audio/flac';
    case 'm4a': return 'audio/mp4';
    default: return `audio/${ext}`;
  }
}
