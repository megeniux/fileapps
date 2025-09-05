import { useState } from 'react';
import { SPEED_CONFIG } from './constants';
import type { VideoPlaybackState, SpeedOptions, ProcessingState, DownloadState, VideoFile } from './types';

/**
 * Custom hook for managing video playback state
 */
export const usePlaybackState = () => {
  // File state
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Speed options state
  const [speedOptions, setSpeedOptions] = useState<SpeedOptions>({
    speed: SPEED_CONFIG.DEFAULT,
    isReversed: false
  });

  // Processing state
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    status: null,
    errorMsg: null
  });

  // Download state
  const [download, setDownload] = useState<DownloadState>({
    url: null,
    size: null
  });

  // Console logs and dialog state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false);

  // Combined state object
  const state: VideoPlaybackState = {
    videoFile,
    previewUrl,
    speedOptions,
    processing,
    download,
    isDragActive,
    consoleLogs,
    isPerformanceDialogOpen
  };

  // State setters
  const setters = {
    setVideoFile,
    setPreviewUrl,
    setIsDragActive,
    setSpeedOptions,
    setProcessing,
    setDownload,
    setConsoleLogs,
    setIsPerformanceDialogOpen
  };

  return {
    state,
    ...setters
  };
};
