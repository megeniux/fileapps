import { useCallback } from 'react';
import { useCaptionBurnerState } from './useCaptionBurnerState';
import { useCaptionProcessor } from './useCaptionProcessor';
import { 
  handleVideoFileSelection, 
  handleSubtitleFileSelection,
  handleVideoDragOver, 
  handleVideoDragLeave, 
  handleVideoDrop, 
  handleVideoInputChange,
  handleSubtitleInputChange,
  resetVideoInput,
  resetSubtitleInput,
  cleanupAllFiles
} from './fileHandling';
import { validateStyleOptions, generateOutputFilename, clampFontSize, clampOutlineWidth } from './utils';
import type { CaptionBurningOptions } from './types';
import { UI_CONFIG } from './constants';

export const useCaptionBurner = () => {
  const stateManager = useCaptionBurnerState();
  const processor = useCaptionProcessor();

  // Video file handling
  const handleVideoFileSelect = useCallback((file: File) => {
    const onSuccess = (videoFile: any) => {
      stateManager.updateVideoFile(videoFile);
      stateManager.resetProcessing();
      stateManager.clearDownload();
      stateManager.clearConsoleLogs();
    };

    const onError = (error: string) => {
      stateManager.updateProcessing({ errorMsg: error });
    };

    handleVideoFileSelection(file, onSuccess, onError);
  }, [stateManager]);

  // Subtitle file handling
  const handleSubtitleFileSelect = useCallback((file: File) => {
    const onSuccess = (subtitleFile: any) => {
      stateManager.updateSubtitleFile(subtitleFile);
      stateManager.resetProcessing();
    };

    const onError = (error: string) => {
      stateManager.updateProcessing({ errorMsg: error });
    };

    handleSubtitleFileSelection(file, onSuccess, onError);
  }, [stateManager]);

  // File removal
  const removeVideoFile = useCallback((inputRef: React.RefObject<HTMLInputElement>) => {
    cleanupAllFiles(stateManager.state.videoFile);
    resetVideoInput(inputRef);
    stateManager.updateVideoFile(null);
    stateManager.resetProcessing();
    stateManager.clearDownload();
    stateManager.clearConsoleLogs();
  }, [stateManager]);

  const removeSubtitleFile = useCallback((inputRef: React.RefObject<HTMLInputElement>) => {
    resetSubtitleInput(inputRef);
    stateManager.updateSubtitleFile(null);
    stateManager.resetProcessing();
  }, [stateManager]);

  // Drag & Drop handlers
  const onDragOver = useCallback((event: React.DragEvent) => {
    handleVideoDragOver(event, stateManager.setIsDragActive);
  }, [stateManager]);

  const onDragLeave = useCallback((event: React.DragEvent) => {
    handleVideoDragLeave(event, stateManager.setIsDragActive);
  }, [stateManager]);

  const onDrop = useCallback((event: React.DragEvent) => {
    const onError = (error: string) => {
      stateManager.updateProcessing({ errorMsg: error });
    };

    handleVideoDrop(event, stateManager.setIsDragActive, handleVideoFileSelect, onError);
  }, [stateManager, handleVideoFileSelect]);

  // Input change handlers
  const onVideoInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const onError = (error: string) => {
      stateManager.updateProcessing({ errorMsg: error });
    };

    handleVideoInputChange(event, handleVideoFileSelect, onError);
  }, [stateManager, handleVideoFileSelect]);

  const onSubtitleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const onError = (error: string) => {
      stateManager.updateProcessing({ errorMsg: error });
    };

    handleSubtitleInputChange(event, handleSubtitleFileSelect, onError);
  }, [stateManager, handleSubtitleFileSelect]);

  // Style management
  const adjustFontSize = useCallback((delta: number) => {
    const newSize = clampFontSize(stateManager.state.styleOptions.fontSize + delta);
    stateManager.updateFontSize(newSize);
  }, [stateManager]);

  const adjustOutlineWidth = useCallback((delta: number) => {
    const newWidth = clampOutlineWidth(stateManager.state.styleOptions.outlineWidth + delta);
    stateManager.updateOutlineWidth(newWidth);
  }, [stateManager]);

  // Caption burning
  const burnCaptions = useCallback(async () => {
    const { videoFile, subtitleFile, styleOptions } = stateManager.state;
    
    if (!videoFile) {
      stateManager.updateProcessing({ errorMsg: 'Please select a video file.' });
      return;
    }

    if (!subtitleFile) {
      stateManager.updateProcessing({ errorMsg: 'Please select a subtitle file (SRT or VTT).' });
      return;
    }

    const styleValidationError = validateStyleOptions(styleOptions);
    if (styleValidationError) {
      stateManager.updateProcessing({ errorMsg: styleValidationError });
      return;
    }

    stateManager.startProcessing();

    const options: CaptionBurningOptions = {
      videoFile,
      subtitleFile,
      styleOptions
    };

    try {
      const result = await processor.processCaptions(
        options,
        stateManager.updateProgress,
        stateManager.addConsoleLog,
        stateManager.updateStatus
      );

      stateManager.completeProcessing(result.url, result.size);

      // Auto-reset status after delay
      setTimeout(() => {
        stateManager.resetProcessing();
      }, UI_CONFIG.STATUS_RESET_DELAY);

    } catch (error: any) {
      // If FFmpeg was terminated (user stopped the operation), treat it as a normal stop
      const msg = error?.message || '';
      if (msg === 'Operation was stopped' || msg === 'called FFmpeg.terminate()') {
        stateManager.stopProcessing();
        return;
      }

      stateManager.failProcessing(msg || 'Caption burning failed');
    }
  }, [stateManager, processor]);

  const stopBurning = useCallback(async () => {
    await processor.stopProcessing();
    stateManager.stopProcessing();
  }, [processor, stateManager]);

  const downloadBurnedVideo = useCallback(() => {
    const { videoFile, download } = stateManager.state;
    
    if (!videoFile || !download.url) return;

    const filename = generateOutputFilename(videoFile.file.name);
    processor.downloadVideo(download.url, filename);
  }, [stateManager, processor]);

  // Validation helpers
  const canBurnCaptions = useCallback((): boolean => {
    const { videoFile, subtitleFile, processing, styleOptions } = stateManager.state;
    return !!(
      videoFile && 
      subtitleFile && 
      !processing.isProcessing && 
      validateStyleOptions(styleOptions) === null
    );
  }, [stateManager]);

  // Reset functionality
  const resetAll = useCallback((
    videoInputRef: React.RefObject<HTMLInputElement>,
    subtitleInputRef: React.RefObject<HTMLInputElement>
  ) => {
    cleanupAllFiles(stateManager.state.videoFile);
    resetVideoInput(videoInputRef);
    resetSubtitleInput(subtitleInputRef);
    stateManager.hardReset();
  }, [stateManager]);

  return {
    // State
    state: stateManager.state,
    
    // Video file operations
    handleVideoFileSelect,
    removeVideoFile,
    
    // Subtitle file operations
    handleSubtitleFileSelect,
    removeSubtitleFile,
    
    // Drag & Drop
    onDragOver,
    onDragLeave,
    onDrop,
    onVideoInputChange,
    onSubtitleInputChange,
    
    // Style management
    updateFontSize: stateManager.updateFontSize,
    updateFontColor: stateManager.updateFontColor,
    updateOutlineColor: stateManager.updateOutlineColor,
    updateOutlineWidth: stateManager.updateOutlineWidth,
    adjustFontSize,
    adjustOutlineWidth,
    
    // Processing
    burnCaptions,
    stopBurning,
    downloadBurnedVideo,
    
    // Validation
    canBurnCaptions,
    
    // Reset
    resetAll,
    
    // Error handling
    clearError: () => stateManager.updateProcessing({ errorMsg: null })
  };
};
