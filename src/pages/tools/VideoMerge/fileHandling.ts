/**
 * File handling utilities for Video Merger component
 * Following established patterns from VideoResize and VideoTrim
 */

import { validateFiles, filterDuplicateFiles, cleanupObjectUrl } from './utils';
import { UI_CONFIG } from './constants';

/**
 * Handle multiple file selection from input or drag & drop
 */
export const handleFileSelection = (
  newFiles: File[],
  existingFiles: File[],
  setFiles: (files: File[]) => void,
  setErrorMsg: (error: string | null) => void
): string | null => {
  // Validate files
  const error = validateFiles(newFiles, existingFiles);
  if (error) {
    return error;
  }
  
  // Filter out duplicates
  const uniqueFiles = filterDuplicateFiles(newFiles, existingFiles);
  
  if (uniqueFiles.length === 0) {
    return 'All selected files have already been added.';
  }
  
  // Add files to existing list
  setFiles([...existingFiles, ...uniqueFiles]);
  setErrorMsg(null);
  
  return null;
};

/**
 * Handle file removal
 */
export const handleFileRemoval = (
  index: number,
  files: File[],
  setFiles: (files: File[]) => void
): void => {
  if (index < 0 || index >= files.length) return;
  
  const newFiles = files.filter((_, i) => i !== index);
  setFiles(newFiles);
};

/**
 * Handle file replacement
 */
export const handleFileReplacement = (
  index: number,
  newFile: File,
  files: File[],
  setFiles: (files: File[]) => void
): void => {
  if (index < 0 || index >= files.length) return;
  
  const newFiles = files.map((file, i) => i === index ? newFile : file);
  setFiles(newFiles);
};

/**
 * Handle file reordering (move up)
 */
export const handleMoveUp = (
  index: number,
  files: File[],
  setFiles: (files: File[]) => void
): void => {
  if (index <= 0 || index >= files.length) return;
  
  const newFiles = [...files];
  const temp = newFiles[index - 1];
  newFiles[index - 1] = newFiles[index];
  newFiles[index] = temp;
  
  setFiles(newFiles);
};

/**
 * Handle file reordering (move down)
 */
export const handleMoveDown = (
  index: number,
  files: File[],
  setFiles: (files: File[]) => void
): void => {
  if (index < 0 || index >= files.length - 1) return;
  
  const newFiles = [...files];
  const temp = newFiles[index + 1];
  newFiles[index + 1] = newFiles[index];
  newFiles[index] = temp;
  
  setFiles(newFiles);
};

/**
 * Handle drag and drop events
 */
export const createDragHandlers = (
  setIsDragActive: (active: boolean) => void,
  onFilesAdd: (files: File[]) => void,
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
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const videoFiles = Array.from(droppedFiles).filter(file => 
        file.type.startsWith('video/')
      );
      
      if (videoFiles.length === 0) {
        setErrorMsg('Please select video files.');
        return;
      }
      
      onFilesAdd(videoFiles);
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
 * Create file replacement handler
 */
export const createFileReplacementHandler = (
  index: number,
  onReplace: (index: number, file: File) => void
) => {
  return () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (e: any) => {
      if (e.target.files?.[0]) {
        onReplace(index, e.target.files[0]);
      }
    };
    input.click();
  };
};

/**
 * Create download handler
 */
export const createDownloadHandler = (
  downloadUrl: string | null,
  fileName: string = 'merged_output.mp4'
) => {
  return () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
      
      // Clean up URL after download
      cleanupObjectUrl(downloadUrl, UI_CONFIG.URL_CLEANUP_DELAY);
    }
  };
};

/**
 * Handle file input click
 */
export const handleFileInputClick = (
  fileInputRef: React.RefObject<HTMLInputElement>
) => {
  return () => {
    fileInputRef.current?.click();
  };
};
