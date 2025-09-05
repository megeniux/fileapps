import { useCallback } from 'react';
import { useAudioExtractorState } from './useAudioExtractorState';
import { useAudioProcessor } from './useAudioProcessor';
import { 
  handleFileSelection, 
  handleDragOver, 
  handleDragLeave, 
  handleDrop, 
  handleInputFileChange,
  resetFileInput,
  cleanupAudioFile
} from './fileHandling';
import { validateDurationRange, adjustRangeStart, adjustRangeEnd, generateOutputFilename } from './utils';
import type { AudioFile, DurationRange, AudioExtractionOptions } from './types';
import { UI_CONFIG } from './constants';

export const useAudioExtractor = () => {
  const stateManager = useAudioExtractorState();
  const processor = useAudioProcessor();

  // File handling
  const handleFileSelect = useCallback((file: File) => {
    const onSuccess = (audioFile: AudioFile) => {
      stateManager.updateAudioFile(audioFile);
      stateManager.resetProcessing();
      stateManager.clearDownload();
      stateManager.clearConsoleLogs();
    };

    const onError = (error: string) => {
      stateManager.updateProcessing({ errorMsg: error });
    };

    handleFileSelection(file, onSuccess, onError);
  }, [stateManager]);

  const handleVideoMetadataLoad = useCallback((duration: number) => {
    stateManager.updateAudioFileDuration(duration);
  }, [stateManager]);

  const removeFile = useCallback((inputRef: React.RefObject<HTMLInputElement>) => {
    cleanupAudioFile(stateManager.state.audioFile);
    resetFileInput(inputRef);
    stateManager.resetAll();
  }, [stateManager]);

  // Drag & Drop handlers
  const onDragOver = useCallback((event: React.DragEvent) => {
    handleDragOver(event, stateManager.setIsDragActive);
  }, [stateManager]);

  const onDragLeave = useCallback((event: React.DragEvent) => {
    handleDragLeave(event, stateManager.setIsDragActive);
  }, [stateManager]);

  const onDrop = useCallback((event: React.DragEvent) => {
    const onError = (error: string) => {
      stateManager.updateProcessing({ errorMsg: error });
    };

    handleDrop(event, stateManager.setIsDragActive, handleFileSelect, onError);
  }, [stateManager, handleFileSelect]);

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const onError = (error: string) => {
      stateManager.updateProcessing({ errorMsg: error });
    };

    handleInputFileChange(event, handleFileSelect, onError);
  }, [stateManager, handleFileSelect]);

  // Duration range management
  const updateRange = useCallback((newRange: DurationRange) => {
    if (!stateManager.state.audioFile) return;

    const validationError = validateDurationRange(newRange, stateManager.state.audioFile.duration);
    if (validationError) {
      stateManager.updateProcessing({ errorMsg: validationError });
      return;
    }

    stateManager.updateRange(newRange);
    stateManager.updateProcessing({ errorMsg: null }); // Clear any previous errors
  }, [stateManager]);

  const adjustStartTime = useCallback((delta: number) => {
    const newRange = adjustRangeStart(stateManager.state.range, delta);
    updateRange(newRange);
  }, [stateManager, updateRange]);

  const adjustEndTime = useCallback((delta: number) => {
    if (!stateManager.state.audioFile) return;
    const newRange = adjustRangeEnd(stateManager.state.range, delta, stateManager.state.audioFile.duration);
    updateRange(newRange);
  }, [stateManager, updateRange]);

  // Audio extraction
  const extractAudio = useCallback(async () => {
    const { audioFile, range, format, quality } = stateManager.state;
    
    if (!audioFile) return;

    const validationError = validateDurationRange(range, audioFile.duration);
    if (validationError) {
      stateManager.updateProcessing({ errorMsg: validationError });
      return;
    }

    stateManager.startProcessing();

    const options: AudioExtractionOptions = {
      startTime: range.start,
      endTime: range.end,
      format,
      quality
    };

    try {
      const result = await processor.processAudio(
        audioFile,
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
      stateManager.failProcessing(error.message || 'Audio extraction failed');
    }
  }, [stateManager, processor]);

  const stopExtraction = useCallback(async () => {
    await processor.stopProcessing();
    stateManager.stopProcessing();
  }, [processor, stateManager]);

  const downloadExtractedAudio = useCallback(() => {
    const { audioFile, download, format } = stateManager.state;
    
    if (!audioFile || !download.url) return;

    const filename = generateOutputFilename(audioFile.file.name, format);
    processor.downloadAudio(download.url, filename);
  }, [stateManager, processor]);

  // Validation helpers
  const isValidRange = useCallback((): boolean => {
    const { audioFile, range } = stateManager.state;
    if (!audioFile) return false;
    return validateDurationRange(range, audioFile.duration) === null;
  }, [stateManager]);

  const canExtract = useCallback((): boolean => {
    const { audioFile, processing } = stateManager.state;
    return !!(audioFile && !processing.isProcessing && isValidRange());
  }, [stateManager, isValidRange]);

  return {
    // State
    state: stateManager.state,
    
    // File operations
    handleFileSelect,
    removeFile,
    handleVideoMetadataLoad,
    
    // Drag & Drop
    onDragOver,
    onDragLeave,
    onDrop,
    onInputChange,
    
    // Range management
    updateRange,
    adjustStartTime,
    adjustEndTime,
    
    // Format/Quality
    updateFormat: stateManager.updateFormat,
    updateQuality: stateManager.updateQuality,
    
    // Processing
    extractAudio,
    stopExtraction,
    downloadExtractedAudio,
    
    // Validation
    isValidRange,
    canExtract,
    
    // Error handling
    clearError: () => stateManager.updateProcessing({ errorMsg: null })
  };
};
