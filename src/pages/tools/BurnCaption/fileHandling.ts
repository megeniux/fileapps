import { validateVideoFile, validateSubtitleFile, cleanupObjectUrl, detectSubtitleFormat } from './utils';
import type { VideoFile, SubtitleFile } from './types';

// Video file handling utilities
export const handleVideoFileSelection = (
  file: File,
  onSuccess: (videoFile: VideoFile) => void,
  onError: (error: string) => void
): void => {
  const validationError = validateVideoFile(file);
  if (validationError) {
    onError(validationError);
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  
  const videoFile: VideoFile = {
    file,
    previewUrl
  };

  onSuccess(videoFile);
};

// Subtitle file handling utilities
export const handleSubtitleFileSelection = (
  file: File,
  onSuccess: (subtitleFile: SubtitleFile) => void,
  onError: (error: string) => void
): void => {
  const validationError = validateSubtitleFile(file);
  if (validationError) {
    onError(validationError);
    return;
  }

  const format = detectSubtitleFormat(file.name);
  
  const subtitleFile: SubtitleFile = {
    file,
    name: file.name,
    format
  };

  onSuccess(subtitleFile);
};

// Drag & Drop handlers for video files
export const handleVideoDragOver = (
  event: React.DragEvent,
  setIsDragActive: (active: boolean) => void
): void => {
  event.preventDefault();
  setIsDragActive(true);
};

export const handleVideoDragLeave = (
  event: React.DragEvent,
  setIsDragActive: (active: boolean) => void
): void => {
  event.preventDefault();
  setIsDragActive(false);
};

export const handleVideoDrop = (
  event: React.DragEvent,
  setIsDragActive: (active: boolean) => void,
  onFileSelect: (file: File) => void,
  onError: (error: string) => void
): void => {
  event.preventDefault();
  setIsDragActive(false);

  const files = event.dataTransfer.files;
  if (files && files.length > 0) {
    // Look for video files in the dropped files
    const videoFile = Array.from(files).find(f => f.type.startsWith('video/'));
    
    if (!videoFile) {
      onError('Please select a video file.');
      return;
    }

    const validationError = validateVideoFile(videoFile);
    if (validationError) {
      onError(validationError);
      return;
    }

    onFileSelect(videoFile);
  }
};

// Input file change handlers
export const handleVideoInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  onFileSelect: (file: File) => void,
  onError: (error: string) => void
): void => {
  const file = event.target.files?.[0];
  if (!file) return;

  const validationError = validateVideoFile(file);
  if (validationError) {
    onError(validationError);
    return;
  }

  onFileSelect(file);
};

export const handleSubtitleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  onFileSelect: (file: File) => void,
  onError: (error: string) => void
): void => {
  const file = event.target.files?.[0];
  if (!file) return;

  const validationError = validateSubtitleFile(file);
  if (validationError) {
    onError(validationError);
    return;
  }

  onFileSelect(file);
};

// File input reset utilities
export const resetVideoInput = (inputRef: React.RefObject<HTMLInputElement>): void => {
  if (inputRef.current) {
    inputRef.current.value = '';
  }
};

export const resetSubtitleInput = (inputRef: React.RefObject<HTMLInputElement>): void => {
  if (inputRef.current) {
    inputRef.current.value = '';
  }
};

// Cleanup utilities
export const cleanupVideoFile = (videoFile: VideoFile | null): void => {
  if (videoFile?.previewUrl) {
    cleanupObjectUrl(videoFile.previewUrl);
  }
};

export const cleanupAllFiles = (
  videoFile: VideoFile | null
): void => {
  cleanupVideoFile(videoFile);
  // Subtitle files don't typically need URL cleanup as they're not previewed
};
