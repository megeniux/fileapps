/**
 * Main Video Merger hook
 * Following established patterns from VideoResize and VideoTrim
 */

import { useCallback } from 'react';
import { useVideoMergerState } from './useVideoMergerState';
import { useVideoProcessor } from './useVideoProcessor';
import { 
  handleFileSelection,
  handleFileRemoval,
  handleFileReplacement,
  handleMoveUp,
  handleMoveDown,
  createDragHandlers,
  createFileReplacementHandler,
  createDownloadHandler,
  handleFileInputClick
} from './fileHandling';
import { createSafeObjectUrl } from './utils';
import { UI_CONFIG, MIN_VIDEO_COUNT } from './constants';
import type { VideoMergerActions } from './types';

/**
 * Main hook for Video Merger component
 */
export const useVideoMerger = () => {
  const state = useVideoMergerState();
  const processor = useVideoProcessor();
  
  /**
   * Handle adding multiple files
   */
  const handleFilesAdd = useCallback((newFiles: File[]) => {
    const error = handleFileSelection(
      newFiles,
      state.files,
      state.setFiles,
      state.setErrorMsg
    );
    
    if (error) {
      state.setErrorMsg(error);
    }
  }, [state]);
  
  /**
   * Handle file removal
   */
  const handleFileRemove = useCallback((index: number) => {
    handleFileRemoval(index, state.files, state.setFiles);
  }, [state]);
  
  /**
   * Handle file replacement
   */
  const handleFileReplace = useCallback((index: number, newFile: File) => {
    handleFileReplacement(index, newFile, state.files, state.setFiles);
  }, [state]);
  
  /**
   * Handle complete reset
   */
  const handleReset = useCallback(() => {
    state.resetToInitial();
  }, [state]);
  
  /**
   * Handle moving file up
   */
  const handleMoveUpAction = useCallback((index: number) => {
    handleMoveUp(index, state.files, state.setFiles);
  }, [state]);
  
  /**
   * Handle moving file down
   */
  const handleMoveDownAction = useCallback((index: number) => {
    handleMoveDown(index, state.files, state.setFiles);
  }, [state]);
  
  /**
   * Create drag and drop handlers
   */
  const dragHandlers = createDragHandlers(
    state.setIsDragActive,
    handleFilesAdd,
    state.setErrorMsg
  );
  
  /**
   * Handle video merging
   */
  const handleMerge = useCallback(async () => {
    if (state.files.length < MIN_VIDEO_COUNT || state.isProcessing) return;
    
    // Reset previous output
    state.resetOutputState();
    
    // Start processing
    state.setIsProcessing(true);
    state.setProgress(0);
    state.setStatus('Preparing');
    state.setErrorMsg(null);
    state.setConsoleLogs([]);
    
    try {
      const result = await processor.mergeVideos(
        state.files,
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
        console.error('Merging error:', error);
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
    if (!state.downloadUrl) return;
    
    const downloadHandler = createDownloadHandler(state.downloadUrl, 'merged_output.mp4');
    downloadHandler();
  }, [state.downloadUrl]);
  
  /**
   * Handle add click (open file input)
   */
  const handleAddClick = useCallback(() => {
    const clickHandler = handleFileInputClick(state.fileInputRef);
    clickHandler();
  }, [state.fileInputRef]);
  
  /**
   * Create file replacement handler for specific index
   */
  const createReplaceHandler = useCallback((index: number) => {
    return createFileReplacementHandler(index, handleFileReplace);
  }, [handleFileReplace]);
  
  // Combine all actions
  const actions: VideoMergerActions = {
    handleFilesAdd,
    handleFileRemove,
    handleFileReplace,
    handleReset,
    handleMoveUp: handleMoveUpAction,
    handleMoveDown: handleMoveDownAction,
    handleDragEnter: dragHandlers.handleDragEnter,
    handleDragLeave: dragHandlers.handleDragLeave,
    handleDragOver: dragHandlers.handleDragOver,
    handleDrop: dragHandlers.handleDrop,
    handleMerge,
    handleStop,
    handleDownload,
    handleAddClick
  };
  
  return {
    // State
    files: state.files,
    isDragActive: state.isDragActive,
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
    
    // Actions
    ...actions,
    
    // Helper for creating replace handlers
    createReplaceHandler
  };
};
