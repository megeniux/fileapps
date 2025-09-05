/**
 * Video processor hook for Video Merger component
 * Following established patterns from VideoResize and VideoTrim
 */

import { useCallback } from 'react';
import { mergeVideosWithFFmpeg, stopFFmpeg, resetFFmpeg } from './ffmpegManager';
import type { VideoProcessorHook, ProcessingStatus } from './types';

/**
 * Custom hook for video processing operations
 */
export const useVideoProcessor = (): VideoProcessorHook => {
  /**
   * Merge videos using FFmpeg
   */
  const mergeVideos = useCallback(async (
    files: File[],
    onProgress: (progress: number) => void,
    onStatus: (status: ProcessingStatus) => void,
    onLog: (log: string) => void
  ): Promise<{ data: Uint8Array; size: number }> => {
    try {
      return await mergeVideosWithFFmpeg(
        files,
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
    mergeVideos,
    stopProcessing,
    resetFFmpeg: resetFFmpegInstance
  };
};
