import { useState, useRef, useCallback } from 'react';
import { defaultState } from './constants';

/**
 * Custom hook for managing video resizer state
 */
export function useVideoResizerState() {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<string>(defaultState.width);
  const [height, setHeight] = useState<string>(defaultState.height);
  const [resolutionRatio, setResolutionRatio] = useState<string>(defaultState.ratio);
  const [resizeMode, setResizeMode] = useState<string>(defaultState.mode);
  const [fps, setFps] = useState<number | ''>(defaultState.fps);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  /**
   * Reset all state to initial values with proper cleanup
   */
  const resetState = useCallback(() => {
    // Clean up any existing URLs to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Reset all state to initial values
    setFile(null);
    setPreviewUrl(null);
    setWidth(defaultState.width);
    setHeight(defaultState.height);
    setResolutionRatio(defaultState.ratio);
    setResizeMode(defaultState.mode);
    setFps(defaultState.fps);
    setErrorMsg(null);
    setWarningMsg(null);
    setIsProcessing(false);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setDownloadUrl(null);
    setDownloadSize(null);
    setIsDragActive(false);
  }, [previewUrl, downloadUrl]);

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
    
    // State setters
    setFile,
    setPreviewUrl,
    setWidth,
    setHeight,
    setResolutionRatio,
    setResizeMode,
    setFps,
    setErrorMsg,
    setWarningMsg,
    setIsProcessing,
    setProgress,
    setStatus,
    setConsoleLogs,
    setDownloadUrl,
    setDownloadSize,
    setIsDragActive,
    
    // Actions
    resetState,
  };
}
