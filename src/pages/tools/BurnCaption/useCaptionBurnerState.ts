import { useState, useCallback } from 'react';
import type { 
  CaptionBurnerState, 
  VideoFile, 
  SubtitleFile, 
  StyleOptions, 
  ProcessingState, 
  DownloadState 
} from './types';
import { DEFAULT_STYLE_OPTIONS, PROCESSING_STATES } from './constants';

const initialProcessingState: ProcessingState = {
  isProcessing: false,
  progress: 0,
  status: null,
  errorMsg: null
};

const initialDownloadState: DownloadState = {
  url: null,
  size: null
};

export const useCaptionBurnerState = () => {
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<SubtitleFile | null>(null);
  const [styleOptions, setStyleOptions] = useState<StyleOptions>(DEFAULT_STYLE_OPTIONS);
  const [isDragActive, setIsDragActive] = useState(false);
  const [processing, setProcessing] = useState<ProcessingState>(initialProcessingState);
  const [download, setDownload] = useState<DownloadState>(initialDownloadState);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Video file management
  const updateVideoFile = useCallback((newVideoFile: VideoFile | null) => {
    setVideoFile(newVideoFile);
  }, []);

  // Subtitle file management
  const updateSubtitleFile = useCallback((newSubtitleFile: SubtitleFile | null) => {
    setSubtitleFile(newSubtitleFile);
  }, []);

  // Style options management
  const updateStyleOptions = useCallback((updates: Partial<StyleOptions>) => {
    setStyleOptions(prev => ({ ...prev, ...updates }));
  }, []);

  const updateFontSize = useCallback((fontSize: number) => {
    setStyleOptions(prev => ({ ...prev, fontSize }));
  }, []);

  const updateFontColor = useCallback((fontColor: string) => {
    setStyleOptions(prev => ({ ...prev, fontColor }));
  }, []);

  const updateOutlineColor = useCallback((outlineColor: string) => {
    setStyleOptions(prev => ({ ...prev, outlineColor }));
  }, []);

  const updateOutlineWidth = useCallback((outlineWidth: number) => {
    setStyleOptions(prev => ({ ...prev, outlineWidth }));
  }, []);

  // Processing state management
  const updateProcessing = useCallback((updates: Partial<ProcessingState>) => {
    setProcessing(prev => ({ ...prev, ...updates }));
  }, []);

  const resetProcessing = useCallback(() => {
    setProcessing(initialProcessingState);
  }, []);

  const startProcessing = useCallback(() => {
    setProcessing({
      isProcessing: true,
      progress: 0,
      status: PROCESSING_STATES.PREPARING,
      errorMsg: null
    });
    setDownload(initialDownloadState);
    setConsoleLogs([]);
  }, []);

  const stopProcessing = useCallback(() => {
    setProcessing(prev => ({
      ...prev,
      isProcessing: false,
      status: PROCESSING_STATES.STOPPED,
      errorMsg: null
    }));
  }, []);

  const completeProcessing = useCallback((downloadUrl: string, fileSize: number) => {
    setProcessing(prev => ({
      ...prev,
      isProcessing: false,
      progress: 100,
      status: PROCESSING_STATES.COMPLETED
    }));
    setDownload({ url: downloadUrl, size: fileSize });
  }, []);

  const failProcessing = useCallback((error: string) => {
    setProcessing(prev => ({
      ...prev,
      isProcessing: false,
      status: PROCESSING_STATES.FAILED,
      errorMsg: error
    }));
  }, []);

  // Download state management
  const updateDownload = useCallback((updates: Partial<DownloadState>) => {
    setDownload(prev => ({ ...prev, ...updates }));
  }, []);

  const clearDownload = useCallback(() => {
    setDownload(initialDownloadState);
  }, []);

  // Console logs management
  const addConsoleLog = useCallback((message: string) => {
    setConsoleLogs(prev => [...prev, message]);
  }, []);

  const clearConsoleLogs = useCallback(() => {
    setConsoleLogs([]);
  }, []);

  // Progress and status updates
  const updateProgress = useCallback((progress: number) => {
    setProcessing(prev => ({ ...prev, progress }));
  }, []);

  const updateStatus = useCallback((status: string) => {
    setProcessing(prev => ({ ...prev, status }));
  }, []);

  // Reset all state
  const resetAll = useCallback(() => {
    setVideoFile(null);
    setSubtitleFile(null);
    setStyleOptions(DEFAULT_STYLE_OPTIONS);
    setIsDragActive(false);
    setProcessing(initialProcessingState);
    setDownload(initialDownloadState);
    setConsoleLogs([]);
  }, []);

  // Hard reset (page reload alternative)
  const hardReset = useCallback(() => {
    resetAll();
    // Clear any object URLs
    if (videoFile?.previewUrl) {
      URL.revokeObjectURL(videoFile.previewUrl);
    }
  }, [videoFile, resetAll]);

  const state: CaptionBurnerState = {
    videoFile,
    subtitleFile,
    styleOptions,
    isDragActive,
    processing,
    download,
    consoleLogs
  };

  return {
    // State
    state,
    
    // Video file actions
    updateVideoFile,
    
    // Subtitle file actions
    updateSubtitleFile,
    
    // Style actions
    updateStyleOptions,
    updateFontSize,
    updateFontColor,
    updateOutlineColor,
    updateOutlineWidth,
    
    // Drag state
    setIsDragActive,
    
    // Processing actions
    updateProcessing,
    resetProcessing,
    startProcessing,
    stopProcessing,
    completeProcessing,
    failProcessing,
    updateProgress,
    updateStatus,
    
    // Download actions
    updateDownload,
    clearDownload,
    
    // Console logs actions
    addConsoleLog,
    clearConsoleLogs,
    
    // Reset actions
    resetAll,
    hardReset
  };
};
