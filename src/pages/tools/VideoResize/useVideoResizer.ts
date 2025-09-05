import { useCallback } from 'react';
import { formatBytes } from '../../../helpers';
import { ratioOptions } from './constants';
import { useVideoResizerState } from './useVideoResizerState';
import { useVideoProcessor } from './useVideoProcessor';
import { handleDragEvents, validateVideoFile } from './fileHandling';

/**
 * Main hook for video resizer functionality
 */
export function useVideoResizer() {
  const state = useVideoResizerState();
  
  const {
    // Refs
    videoRef,
    fileInputRef,
    
    // State
    file,
    previewUrl,
    width,
    height,
    resolutionRatio,
    resizeMode,
    fps,
    errorMsg,
    warningMsg,
    isProcessing,
    progress,
    status,
    consoleLogs,
    downloadUrl,
    downloadSize,
    isDragActive,
    
    // State setters
    setFile,
    setPreviewUrl,
    setWidth,
    setHeight,
    setResolutionRatio,
    setResizeMode,
    setFps,
    setErrorMsg,
    setIsProcessing,
    setProgress,
    setStatus,
    setConsoleLogs,
    setDownloadUrl,
    setDownloadSize,
    setIsDragActive,
    
    // Actions
    resetState,
  } = state;

  // Video processor
  const { processVideo, stopProcessing } = useVideoProcessor({
    file,
    width,
    height,
    fps,
    setIsProcessing,
    setProgress,
    setStatus,
    setConsoleLogs,
    setErrorMsg,
    setDownloadUrl,
    setDownloadSize,
  });

  /**
   * Handle file selection with validation
   */
  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!validateVideoFile(selectedFile)) {
      setErrorMsg('Please select a video file.');
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setErrorMsg(null);
    setWidth('');
    setHeight('');
    setResolutionRatio('custom');
  }, [setFile, setPreviewUrl, setErrorMsg, setWidth, setHeight, setResolutionRatio]);

  /**
   * Handle file change from input
   */
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0]);
    }
  }, [handleFileSelect]);

  /**
   * Remove current file
   */
  const handleRemoveFile = useCallback(() => {
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setFile(null);
    setPreviewUrl(null);
    setWidth('');
    setHeight('');
    setResolutionRatio('custom');
    setErrorMsg(null);
  }, [fileInputRef, previewUrl, setFile, setPreviewUrl, setWidth, setHeight, setResolutionRatio, setErrorMsg]);

  /**
   * Handle video metadata loaded
   */
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setWidth(String(Math.round(videoRef.current.videoWidth)));
      setHeight(String(Math.round(videoRef.current.videoHeight)));
    }
  }, [videoRef, setWidth, setHeight]);

  /**
   * Handle width change with ratio calculation
   */
  const handleWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWidth(val);
    const selected = ratioOptions.find(r => r.value === resolutionRatio);
    if (selected && selected.ratio && val) {
      const w = parseInt(val, 10);
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)));
      }
    }
  }, [resolutionRatio, setWidth, setHeight]);

  /**
   * Handle height change with ratio calculation
   */
  const handleHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHeight(val);
    const selected = ratioOptions.find(r => r.value === resolutionRatio);
    if (selected && selected.ratio && val) {
      const h = parseInt(val, 10);
      if (!isNaN(h)) {
        setWidth(String(Math.round(h * selected.ratio)));
      }
    }
  }, [resolutionRatio, setHeight, setWidth]);

  /**
   * Handle ratio change
   */
  const handleRatioChange = useCallback((e: any) => {
    const val = e.target.value;
    setResolutionRatio(val);
    const selected = ratioOptions.find(r => r.value === val);
    if (selected && selected.ratio && width) {
      const w = parseInt(width, 10);
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)));
      }
    }
  }, [width, setResolutionRatio, setHeight]);

  /**
   * Handle resize mode change
   */
  const handleResizeModeChange = useCallback((e: any) => {
    setResizeMode(e.target.value);
  }, [setResizeMode]);

  /**
   * Handle FPS change
   */
  const handleFpsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFps(e.target.value ? parseInt(e.target.value) : '');
  }, [setFps]);

  /**
   * Handle reset with proper cleanup
   */
  const handleReset = useCallback(() => {
    resetState();
  }, [resetState]);

  /**
   * Handle download
   */
  const handleDownload = useCallback(() => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `resized_${file.name.replace(/\.[^/.]+$/, '')}.mp4`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  }, [downloadUrl, file]);

  // Drag and drop handlers
  const dragHandlers = handleDragEvents(setIsDragActive, setErrorMsg, handleFileSelect);

  return {
    // Refs
    videoRef,
    fileInputRef,
    
    // State
    file,
    previewUrl,
    width,
    height,
    resolutionRatio,
    resizeMode,
    fps,
    errorMsg,
    warningMsg,
    isProcessing,
    progress,
    status,
    consoleLogs,
    downloadUrl,
    downloadSize,
    isDragActive,
    
    // Event handlers
    handleFileChange,
    handleRemoveFile,
    handleLoadedMetadata,
    handleWidthChange,
    handleHeightChange,
    handleRatioChange,
    handleResizeModeChange,
    handleFpsChange,
    handleReset,
    handleDownload,
    
    // Drag handlers
    ...dragHandlers,
    
    // Processing
    processVideo,
    stopProcessing,
    
    // Utilities
    formatBytes,
  };
}
