import { validateVideoFile, generateOutputFilename } from './utils';
import type { VideoFile } from './types';

/**
 * Handle file upload from input change event
 */
export const handleVideoFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  onSuccess: (file: VideoFile, previewUrl: string) => void,
  onError: (message: string) => void
): void => {
  const selectedFile = event.target.files?.[0];
  if (!selectedFile) return;

  if (!validateVideoFile(selectedFile)) {
    onError('Please select a video file.');
    return;
  }

  const previewUrl = URL.createObjectURL(selectedFile);
  onSuccess(selectedFile as VideoFile, previewUrl);
};

/**
 * Handle file drop from drag and drop
 */
export const handleVideoFileDrop = (
  files: FileList,
  onSuccess: (file: VideoFile, previewUrl: string) => void,
  onError: (message: string) => void
): void => {
  const selectedFile = files[0];
  if (!selectedFile) return;

  if (!validateVideoFile(selectedFile)) {
    onError('Please select a video file.');
    return;
  }

  const previewUrl = URL.createObjectURL(selectedFile);
  onSuccess(selectedFile as VideoFile, previewUrl);
};

/**
 * Clear file input value to allow re-uploading same file
 */
export const clearFileInput = (inputRef: React.RefObject<HTMLInputElement>): void => {
  if (inputRef.current) {
    inputRef.current.value = '';
  }
};

/**
 * Create download blob and URL from processed video data
 */
export const createDownloadBlob = (data: ArrayBuffer, mimeType: string): { blob: Blob; url: string } => {
  const blob = new Blob([new Uint8Array(data)], { type: mimeType });
  const url = URL.createObjectURL(blob);
  return { blob, url };
};

/**
 * Trigger download of processed video
 */
export const downloadProcessedVideo = (
  downloadUrl: string,
  originalFile: VideoFile,
  speed: number,
  isReversed: boolean
): void => {
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = generateOutputFilename(originalFile.name, speed, isReversed);
  a.click();
  
  // Clean up URL after download
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
};

/**
 * Clean up preview URL
 */
export const cleanupPreviewUrl = (url: string | null): void => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

/**
 * Reset all file-related state
 */
export const resetFileState = () => ({
  videoFile: null,
  previewUrl: null,
  isDragActive: false
});
