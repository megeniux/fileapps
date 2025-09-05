/**
 * Video processor hook for Video Trimmer component
 * Following established patterns from VideoResize and VideoConvert
 */

import { useCallback } from 'react';
import { trimVideoWithFFmpeg, stopFFmpeg, resetFFmpeg } from './ffmpegManager';
import type { VideoProcessorHook, TimeRange, ProcessingStatus } from './types';

/**
 * Custom hook for video processing operations
 */
export const useVideoProcessor = (): VideoProcessorHook => {
  /**
   * Trim video using FFmpeg
   */
  const trimVideo = useCallback(async (
    file: File,
    range: TimeRange,
    onProgress: (progress: number) => void,
    onStatus: (status: ProcessingStatus) => void,
    onLog: (log: string) => void
  ): Promise<{ data: Uint8Array; size: number }> => {
    try {
      return await trimVideoWithFFmpeg(
        file,
        range,
        onProgress,
        onStatus,
        onLog
      );
    } catch (error) {
      // Handle FFmpeg termination gracefully
      if (error instanceof Error && error.message === 'called FFmpeg.terminate()') {
        throw new Error('Processing was stopped');
      }
      
      // Re-throw other errors
      throw error;
    }
  }, []);
  
  /**
   * Stop current processing
   */
  const stopProcessing = useCallback(() => {
    stopFFmpeg();
  }, []);
  
  /**
   * Reset FFmpeg instance
   */
  const resetFFmpegInstance = useCallback(async () => {
    await resetFFmpeg();
  }, []);
  
  return {
    trimVideo,
    stopProcessing,
    resetFFmpeg: resetFFmpegInstance
  };
};
