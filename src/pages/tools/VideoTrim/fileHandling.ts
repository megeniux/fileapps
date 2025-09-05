/**
 * File handling utilities for Video Trimmer component
 * Following established patterns from VideoResize and VideoConvert
 */

import { validateFile, cleanupObjectUrl, createSafeObjectUrl } from './utils';
import { UI_CONFIG } from './constants';

/**
 * Handle file selection from input or drag & drop
 */
export const handleFileSelection = (
  file: File,
  setFile: (file: File | null) => void,
  setPreviewUrl: (url: string | null) => void,
  setDuration: (duration: number) => void,
  setRange: (range: [number, number]) => void,
  resetState: () => void
): string | null => {
  // Validate the file
  const error = validateFile(file);
  if (error) {
    return error;
  }
  
  // Reset previous state
  resetState();
  
  // Set new file and preview
  setFile(file);
  
  try {
    const url = createSafeObjectUrl(file);
    setPreviewUrl(url);
  } catch (error) {
    return 'Failed to create file preview';
  }
  
  // Reset video properties
  setDuration(0);
  setRange([0, 0]);
  
  return null;
};

/**
 * Handle file removal
 */
export const handleFileRemoval = (
  previewUrl: string | null,
  setFile: (file: File | null) => void,
  setPreviewUrl: (url: string | null) => void,
  setDuration: (duration: number) => void,
  setRange: (range: [number, number]) => void,
  resetState: () => void,
  fileInputRef: React.RefObject<HTMLInputElement>
): void => {
  // Clean up object URL
  if (previewUrl) {
    cleanupObjectUrl(previewUrl);
  }
  
  // Clear file input
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
  
  // Reset all state
  setFile(null);
  setPreviewUrl(null);
  setDuration(0);
  setRange([0, 0]);
  resetState();
};

/**
 * Handle drag and drop events
 */
export const createDragHandlers = (
  setIsDragActive: (active: boolean) => void,
  onFileSelect: (file: File) => void,
  setErrorMsg: (error: string | null) => void
) => {
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setErrorMsg('Please select a video file.');
        return;
      }
      
      onFileSelect(file);
    }
  };
  
  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop
  };
};

/**
 * Handle video metadata loading
 */
export const handleVideoMetadata = (
  videoRef: React.RefObject<HTMLVideoElement>,
  setDuration: (duration: number) => void,
  setRange: (range: [number, number]) => void
): void => {
  if (videoRef.current) {
    const duration = videoRef.current.duration;
    setDuration(duration);
    setRange([0, Math.floor(duration)]);
  }
};

/**
 * Create download handler
 */
export const createDownloadHandler = (
  downloadUrl: string | null,
  fileName: string | null
) => {
  return () => {
    if (downloadUrl && fileName) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
      
      // Clean up URL after download
      cleanupObjectUrl(downloadUrl, UI_CONFIG.URL_CLEANUP_DELAY);
    }
  };
};
