import { useState, useCallback } from 'react';
import type { 
  AudioExtractorState, 
  AudioFile, 
  DurationRange, 
  ProcessingState, 
  DownloadState,
  AudioFormat,
  AudioQuality 
} from './types';
import { PROCESSING_STATES, DEFAULT_AUDIO_FORMAT, DEFAULT_QUALITY } from './constants';
import { createDurationRange } from './utils';

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

export const useAudioExtractorState = () => {
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [range, setRange] = useState<DurationRange>(createDurationRange(0, 0));
  const [isDragActive, setIsDragActive] = useState(false);
  const [processing, setProcessing] = useState<ProcessingState>(initialProcessingState);
  const [download, setDownload] = useState<DownloadState>(initialDownloadState);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [format, setFormat] = useState<AudioFormat>(DEFAULT_AUDIO_FORMAT);
  const [quality, setQuality] = useState<AudioQuality>(DEFAULT_QUALITY);

  // Audio file management
  const updateAudioFile = useCallback((newAudioFile: AudioFile | null) => {
    setAudioFile(newAudioFile);
    if (newAudioFile) {
      setRange(createDurationRange(0, Math.floor(newAudioFile.duration)));
    } else {
      setRange(createDurationRange(0, 0));
    }
  }, []);

  const updateAudioFileDuration = useCallback((duration: number) => {
    if (audioFile) {
      const updatedFile = { ...audioFile, duration };
      setAudioFile(updatedFile);
      setRange(createDurationRange(0, Math.floor(duration)));
    }
  }, [audioFile]);

  // Range management
  const updateRange = useCallback((newRange: DurationRange) => {
    setRange(newRange);
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

  // Format and quality management
  const updateFormat = useCallback((newFormat: AudioFormat) => {
    setFormat(newFormat);
  }, []);

  const updateQuality = useCallback((newQuality: AudioQuality) => {
    setQuality(newQuality);
  }, []);

  // Reset all state
  const resetAll = useCallback(() => {
    setAudioFile(null);
    setRange(createDurationRange(0, 0));
    setIsDragActive(false);
    setProcessing(initialProcessingState);
    setDownload(initialDownloadState);
    setConsoleLogs([]);
    setFormat(DEFAULT_AUDIO_FORMAT);
    setQuality(DEFAULT_QUALITY);
  }, []);

  // Progress update
  const updateProgress = useCallback((progress: number) => {
    setProcessing(prev => ({ ...prev, progress }));
  }, []);

  // Status update
  const updateStatus = useCallback((status: string) => {
    setProcessing(prev => ({ ...prev, status }));
  }, []);

  const state: AudioExtractorState = {
    audioFile,
    range,
    isDragActive,
    processing,
    download,
    consoleLogs,
    format,
    quality
  };

  return {
    // State
    state,
    
    // Audio file actions
    updateAudioFile,
    updateAudioFileDuration,
    
    // Range actions
    updateRange,
    
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
    
    // Format/quality actions
    updateFormat,
    updateQuality,
    
    // Reset
    resetAll
  };
};
