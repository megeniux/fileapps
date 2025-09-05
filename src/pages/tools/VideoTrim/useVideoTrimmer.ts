/**
 * Main Video Trimmer hook
 * Following established patterns from VideoResize and VideoConvert
 */

import { useCallback } from 'react';
import { useVideoTrimmerState } from './useVideoTrimmerState';
import { useVideoProcessor } from './useVideoProcessor';
import { 
  handleFileSelection,
  handleFileRemoval,
  createDragHandlers,
  handleVideoMetadata,
  createDownloadHandler
} from './fileHandling';
import { 
  isValidTimeRange,
  generateTrimmedFilename,
  createSafeObjectUrl,
  adjustStartTime,
  adjustEndTime,
  constrainTimeRange
} from './utils';
import { UI_CONFIG } from './constants';
import type { VideoTrimmerActions } from './types';

/**
 * Main hook for Video Trimmer component
 */
export const useVideoTrimmer = () => {
  const state = useVideoTrimmerState();
  const processor = useVideoProcessor();
  
  /**
   * Handle file selection from input or drag & drop
   */
  const handleFileSelect = useCallback((file: File) => {
    const error = handleFileSelection(
      file,
      state.setFile,
      state.setPreviewUrl,
      state.setDuration,
      state.setRange,
      state.resetState
    );
    
    if (error) {
      state.setErrorMsg(error);
    }
  }, [state]);
  
  /**
   * Handle file removal
   */
  const handleFileRemove = useCallback(() => {
    handleFileRemoval(
      state.previewUrl,
      state.setFile,
      state.setPreviewUrl,
      state.setDuration,
      state.setRange,
      state.resetState,
      state.fileInputRef
    );
  }, [state]);
  
  /**
   * Handle complete reset
   */
  const handleReset = useCallback(() => {
    state.resetToInitial();
  }, [state]);
  
  /**
   * Create drag and drop handlers
   */
  const dragHandlers = createDragHandlers(
    state.setIsDragActive,
    handleFileSelect,
    state.setErrorMsg
  );
  
  /**
   * Handle video metadata loading
   */
  const handleLoadedMetadata = useCallback(() => {
    handleVideoMetadata(
      state.videoRef,
      state.setDuration,
      state.setRange
    );
  }, [state]);
  
  /**
   * Handle time range changes
   */
  const handleRangeChange = useCallback((_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const constrainedRange = constrainTimeRange(
        [Math.floor(newValue[0]), Math.ceil(newValue[1])],
        state.duration
      );
      state.setRange(constrainedRange);
    }
  }, [state]);
  
  /**
   * Decrease start time
   */
  const decreaseStartTime = useCallback(() => {
    if (state.isProcessing) return;
    
    const newRange = adjustStartTime(state.range, -1);
    state.setRange(newRange);
  }, [state]);
  
  /**
   * Increase end time
   */
  const increaseEndTime = useCallback(() => {
    if (state.isProcessing) return;
    
    const newRange = adjustEndTime(state.range, 1, state.duration);
    state.setRange(newRange);
  }, [state]);
  
  /**
   * Handle video trimming
   */
  const handleTrim = useCallback(async () => {
    if (!state.file || state.isProcessing) return;
    
    // Validate range
    if (!isValidTimeRange(state.range, state.duration)) {
      state.setErrorMsg('Invalid time range selected.');
      return;
    }
    
    // Reset previous output
    state.resetOutputState();
    
    // Start processing
    state.setIsProcessing(true);
    state.setProgress(0);
    state.setStatus('Preparing');
    state.setErrorMsg(null);
    state.setConsoleLogs([]);
    
    try {
      const result = await processor.trimVideo(
        state.file,
        state.range,
        state.setProgress,
        state.setStatus,
        state.addConsoleLog
      );
      
      // Create download URL
      const blob = new Blob([result.data as any], { type: 'video/mp4' });
      const url = createSafeObjectUrl(blob);
      
      state.setDownloadUrl(url);
      state.setDownloadSize(result.size);
      
    } catch (error: any) {
      state.setStatus('Failed');
      
      // Handle stop vs actual error
      if (error.message === 'Processing was stopped') {
        state.setStatus('Stopped');
      } else {
        console.error('Trimming error:', error);
        state.setErrorMsg(error instanceof Error ? error.message : 'An error occurred during processing.');
      }
    } finally {
      state.setIsProcessing(false);
      
      // Auto-hide progress after delay
      setTimeout(() => {
        state.setProgress(0);
        state.setStatus(null);
      }, UI_CONFIG.PROGRESS_HIDE_DELAY);
    }
  }, [state, processor]);
  
  /**
   * Handle stop processing
   */
  const handleStop = useCallback(() => {
    processor.stopProcessing();
    state.setStatus('Stopped');
    state.setIsProcessing(false);
    state.setErrorMsg(null);
  }, [processor, state]);
  
  /**
   * Handle download
   */
  const handleDownload = useCallback(() => {
    if (!state.downloadUrl || !state.file) return;
    
    const filename = generateTrimmedFilename(state.file.name);
    const downloadHandler = createDownloadHandler(state.downloadUrl, filename);
    downloadHandler();
  }, [state]);
  
  // Combine all actions
  const actions: VideoTrimmerActions = {
    handleFileSelect,
    handleFileRemove,
    handleReset,
    handleDragEnter: dragHandlers.handleDragEnter,
    handleDragLeave: dragHandlers.handleDragLeave,
    handleDragOver: dragHandlers.handleDragOver,
    handleDrop: dragHandlers.handleDrop,
    handleLoadedMetadata,
    handleRangeChange,
    handleTrim,
    handleStop,
    handleDownload,
    decreaseStartTime,
    increaseEndTime
  };
  
  return {
    // State
    file: state.file,
    previewUrl: state.previewUrl,
    isDragActive: state.isDragActive,
    duration: state.duration,
    range: state.range,
    isProcessing: state.isProcessing,
    progress: state.progress,
    status: state.status,
    consoleLogs: state.consoleLogs,
    downloadUrl: state.downloadUrl,
    downloadSize: state.downloadSize,
    errorMsg: state.errorMsg,
    warningMsg: state.warningMsg,
    
    // Refs
    fileInputRef: state.fileInputRef,
    videoRef: state.videoRef,
    
    // Actions
    ...actions
  };
};
