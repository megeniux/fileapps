import { useCallback } from 'react';
import { usePlaybackState } from './usePlaybackState';
import { useSpeedProcessor } from './useSpeedProcessor';
import { 
  handleVideoFileUpload, 
  handleVideoFileDrop, 
  clearFileInput, 
  downloadProcessedVideo,
  cleanupPreviewUrl,
  resetFileState
} from './fileHandling';
import { clampSpeed } from './utils';
import { SPEED_CONFIG } from './constants';

/**
 * Main hook for video playback functionality
 */
export const useVideoPlayback = () => {
  const {
    state,
    setVideoFile,
    setPreviewUrl,
    setIsDragActive,
    setSpeedOptions,
    setProcessing,
    setDownload,
    setConsoleLogs,
  } = usePlaybackState();

  const { processVideo, stopProcessing } = useSpeedProcessor();

  // File handling
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, [setIsDragActive]);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, [setIsDragActive]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleVideoFileDrop(
        e.dataTransfer.files,
        (file, previewUrl) => {
          setVideoFile(file);
          setPreviewUrl(previewUrl);
          // Reset other state
          setSpeedOptions({ speed: SPEED_CONFIG.DEFAULT, isReversed: false });
          setProcessing({ isProcessing: false, progress: 0, status: null, errorMsg: null });
          setDownload({ url: null, size: null });
          setConsoleLogs([]);
        },
        (errorMsg) => {
          setProcessing(prev => ({ ...prev, errorMsg }));
        }
      );
    }
  }, [setIsDragActive, setVideoFile, setPreviewUrl, setSpeedOptions, setProcessing, setDownload, setConsoleLogs]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleVideoFileUpload(
      e,
      (file, previewUrl) => {
        setVideoFile(file);
        setPreviewUrl(previewUrl);
        // Reset other state
        setSpeedOptions({ speed: SPEED_CONFIG.DEFAULT, isReversed: false });
        setProcessing({ isProcessing: false, progress: 0, status: null, errorMsg: null });
        setDownload({ url: null, size: null });
        setConsoleLogs([]);
      },
      (errorMsg) => {
        setProcessing(prev => ({ ...prev, errorMsg }));
      }
    );
  }, [setVideoFile, setPreviewUrl, setSpeedOptions, setProcessing, setDownload, setConsoleLogs]);

  // File removal
  const removeVideoFile = useCallback((inputRef: React.RefObject<HTMLInputElement>) => {
    clearFileInput(inputRef);
    cleanupPreviewUrl(state.previewUrl);
    
    // Reset all file-related state
    const fileState = resetFileState();
    setVideoFile(fileState.videoFile);
    setPreviewUrl(fileState.previewUrl);
    setIsDragActive(fileState.isDragActive);
    
    // Reset other state
    setSpeedOptions({ speed: SPEED_CONFIG.DEFAULT, isReversed: false });
    setProcessing({ isProcessing: false, progress: 0, status: null, errorMsg: null });
    setDownload({ url: null, size: null });
    setConsoleLogs([]);
  }, [state.previewUrl, setVideoFile, setPreviewUrl, setIsDragActive, setSpeedOptions, setProcessing, setDownload, setConsoleLogs]);

  // Speed controls
  const updateSpeed = useCallback((speed: number) => {
    const clampedSpeed = clampSpeed(speed);
    setSpeedOptions(prev => ({ ...prev, speed: clampedSpeed }));
  }, [setSpeedOptions]);

  const updateReverse = useCallback((isReversed: boolean) => {
    setSpeedOptions(prev => ({ ...prev, isReversed }));
  }, [setSpeedOptions]);

  const adjustSpeed = useCallback((delta: number) => {
    setSpeedOptions(prev => ({
      ...prev,
      speed: clampSpeed(Number((prev.speed + delta).toFixed(1)))
    }));
  }, [setSpeedOptions]);

  // Processing controls
  const processSpeedAdjustment = useCallback(async () => {
    if (!state.videoFile) {
      setProcessing(prev => ({ ...prev, errorMsg: 'Please select a video file.' }));
      return;
    }

    setConsoleLogs([]);
    setDownload({ url: null, size: null });

    try {
      await processVideo(
        state.videoFile,
        state.speedOptions,
        setProcessing,
        setConsoleLogs,
        setDownload
      );
    } catch (error) {
      console.error('Processing failed:', error);
    }

    // Clear status after delay
    setTimeout(() => {
      setProcessing(prev => ({ ...prev, progress: 0, status: null }));
    }, 2000);
  }, [state.videoFile, state.speedOptions, processVideo, setProcessing, setConsoleLogs, setDownload]);

  const stopSpeedAdjustment = useCallback(() => {
    stopProcessing();
    setProcessing(prev => ({ 
      ...prev, 
      isProcessing: false, 
      progress: 0, 
      status: 'Stopped',
      errorMsg: null 
    }));
  }, [stopProcessing, setProcessing]);

  // Download
  const downloadVideo = useCallback(() => {
    if (state.download.url && state.videoFile) {
      downloadProcessedVideo(
        state.download.url,
        state.videoFile,
        state.speedOptions.speed,
        state.speedOptions.isReversed
      );
    }
  }, [state.download.url, state.videoFile, state.speedOptions]);

  // Performance dialog (handled in component via ProgressDisplay)

  // Utility functions
  const canProcess = useCallback(() => {
    return !!(state.videoFile && !state.processing.isProcessing);
  }, [state.videoFile, state.processing.isProcessing]);

  const resetAll = useCallback((
    _fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    window.location.reload();
  }, []);

  const clearError = useCallback(() => {
    setProcessing(prev => ({ ...prev, errorMsg: null }));
  }, [setProcessing]);

  return {
    // State
    state,
    
    // File handling
    onDragOver,
    onDragLeave,
    onDrop,
    onInputChange,
    removeVideoFile,
    
    // Speed controls
    updateSpeed,
    updateReverse,
    adjustSpeed,
    
    // Processing
    processSpeedAdjustment,
    stopSpeedAdjustment,
    
    // Download
    downloadVideo,
    
    // Performance dialog
    
    // Utilities
    canProcess,
    resetAll,
    clearError
  };
};
