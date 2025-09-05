/**
 * Video Trimmer state management hook
 * Following established patterns from VideoResize and VideoConvert
 */

import { useState, useRef } from 'react';
import type { VideoTrimmerState, TimeRange, ProcessingStatus } from './types';
import { DEFAULT_RANGE } from './constants';
import { cleanupObjectUrl } from './utils';

/**
 * Initial state for video trimmer
 */
const initialState: VideoTrimmerState = {
  // File handling
  file: null,
  previewUrl: null,
  isDragActive: false,
  
  // Video properties
  duration: 0,
  range: DEFAULT_RANGE,
  
  // Processing state
  isProcessing: false,
  progress: 0,
  status: null,
  consoleLogs: [],
  
  // Output state
  downloadUrl: null,
  downloadSize: null,
  
  // Error handling
  errorMsg: null,
  warningMsg: null
};

/**
 * Custom hook for managing video trimmer state
 */
export const useVideoTrimmerState = () => {
  // Core state
  const [state, setState] = useState<VideoTrimmerState>(initialState);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Individual state setters for convenience
  const setFile = (file: File | null) => {
    setState(prev => ({ ...prev, file }));
  };
  
  const setPreviewUrl = (previewUrl: string | null) => {
    setState(prev => ({ ...prev, previewUrl }));
  };
  
  const setIsDragActive = (isDragActive: boolean) => {
    setState(prev => ({ ...prev, isDragActive }));
  };
  
  const setDuration = (duration: number) => {
    setState(prev => ({ ...prev, duration }));
  };
  
  const setRange = (range: TimeRange) => {
    setState(prev => ({ ...prev, range }));
  };
  
  const setIsProcessing = (isProcessing: boolean) => {
    setState(prev => ({ ...prev, isProcessing }));
  };
  
  const setProgress = (progress: number) => {
    setState(prev => ({ ...prev, progress }));
  };
  
  const setStatus = (status: ProcessingStatus) => {
    setState(prev => ({ ...prev, status }));
  };
  
  const setConsoleLogs = (consoleLogs: string[]) => {
    setState(prev => ({ ...prev, consoleLogs }));
  };
  
  const addConsoleLog = (log: string) => {
    setState(prev => ({ ...prev, consoleLogs: [...prev.consoleLogs, log] }));
  };
  
  const setDownloadUrl = (downloadUrl: string | null) => {
    setState(prev => ({ ...prev, downloadUrl }));
  };
  
  const setDownloadSize = (downloadSize: number | null) => {
    setState(prev => ({ ...prev, downloadSize }));
  };
  
  const setErrorMsg = (errorMsg: string | null) => {
    setState(prev => ({ ...prev, errorMsg }));
  };
  
  const setWarningMsg = (warningMsg: string | null) => {
    setState(prev => ({ ...prev, warningMsg }));
  };
  
  /**
   * Reset processing state only
   */
  const resetProcessingState = () => {
    setState(prev => ({
      ...prev,
      isProcessing: false,
      progress: 0,
      status: null,
      consoleLogs: [],
      errorMsg: null,
      warningMsg: null
    }));
  };
  
  /**
   * Reset output state only
   */
  const resetOutputState = () => {
    setState(prev => {
      // Clean up previous download URL
      if (prev.downloadUrl) {
        cleanupObjectUrl(prev.downloadUrl);
      }
      
      return {
        ...prev,
        downloadUrl: null,
        downloadSize: null
      };
    });
  };
  
  /**
   * Reset all state except file
   */
  const resetState = () => {
    setState(prev => {
      // Clean up URLs
      if (prev.downloadUrl) {
        cleanupObjectUrl(prev.downloadUrl);
      }
      
      return {
        ...prev,
        isDragActive: false,
        isProcessing: false,
        progress: 0,
        status: null,
        consoleLogs: [],
        downloadUrl: null,
        downloadSize: null,
        errorMsg: null,
        warningMsg: null
      };
    });
  };
  
  /**
   * Complete reset to initial state
   */
  const resetToInitial = () => {
    // Clean up URLs before reset
    if (state.previewUrl) {
      cleanupObjectUrl(state.previewUrl);
    }
    if (state.downloadUrl) {
      cleanupObjectUrl(state.downloadUrl);
    }
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setState(initialState);
  };
  
  return {
    // State
    ...state,
    
    // Refs
    fileInputRef,
    videoRef,
    
    // State setters
    setFile,
    setPreviewUrl,
    setIsDragActive,
    setDuration,
    setRange,
    setIsProcessing,
    setProgress,
    setStatus,
    setConsoleLogs,
    addConsoleLog,
    setDownloadUrl,
    setDownloadSize,
    setErrorMsg,
    setWarningMsg,
    
    // Reset functions
    resetProcessingState,
    resetOutputState,
    resetState,
    resetToInitial
  };
};
