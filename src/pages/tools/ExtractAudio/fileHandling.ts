import { validateVideoFile, cleanupObjectUrl } from './utils';
import type { AudioFile } from './types';

// File handling utilities for audio extraction
export const handleFileSelection = (
  file: File,
  onSuccess: (audioFile: AudioFile) => void,
  onError: (error: string) => void
): void => {
  const validationError = validateVideoFile(file);
  if (validationError) {
    onError(validationError);
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  
  // Create audio file object with initial duration
  const audioFile: AudioFile = {
    file,
    previewUrl,
    duration: 0 // Will be set when video metadata loads
  };

  onSuccess(audioFile);
};

export const handleDragOver = (
  event: React.DragEvent,
  setIsDragActive: (active: boolean) => void
): void => {
  event.preventDefault();
  setIsDragActive(true);
};

export const handleDragLeave = (
  event: React.DragEvent,
  setIsDragActive: (active: boolean) => void
): void => {
  event.preventDefault();
  setIsDragActive(false);
};

export const handleDrop = (
  event: React.DragEvent,
  setIsDragActive: (active: boolean) => void,
  onFileSelect: (file: File) => void,
  onError: (error: string) => void
): void => {
  event.preventDefault();
  setIsDragActive(false);

  const files = event.dataTransfer.files;
  if (files && files.length > 0) {
    const file = files[0];
    const validationError = validateVideoFile(file);
    
    if (validationError) {
      onError(validationError);
      return;
    }

    onFileSelect(file);
  }
};

export const handleInputFileChange = (
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

export const resetFileInput = (inputRef: React.RefObject<HTMLInputElement>): void => {
  if (inputRef.current) {
    inputRef.current.value = '';
  }
};

export const cleanupAudioFile = (audioFile: AudioFile | null): void => {
  if (audioFile?.previewUrl) {
    cleanupObjectUrl(audioFile.previewUrl);
  }
};

export const updateAudioFileDuration = (
  audioFile: AudioFile,
  duration: number
): AudioFile => {
  return {
    ...audioFile,
    duration
  };
};
