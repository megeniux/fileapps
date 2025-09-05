import { useCallback } from 'react';
import FFmpegManager from './ffmpegManager';
import { parseDuration, parseCurrentTime, calculateProgress } from './utils';
import { createDownloadBlob } from './fileHandling';
import { STATUS_MESSAGES, PROGRESS_CONFIG } from './constants';
import type { VideoFile, SpeedOptions, ProcessingState, DownloadState } from './types';

/**
 * Custom hook for processing video speed adjustments
 */
export const useSpeedProcessor = () => {
  /**
   * Process video with speed and reverse adjustments
   */
  const processVideo = useCallback(async (
    videoFile: VideoFile,
    speedOptions: SpeedOptions,
    onProgressUpdate: (processing: ProcessingState | ((prev: ProcessingState) => ProcessingState)) => void,
    onLogUpdate: (logs: string[] | ((prev: string[]) => string[])) => void,
    onDownloadReady: (download: DownloadState) => void
  ): Promise<void> => {
    if (!videoFile) {
      throw new Error('Please select a video file.');
    }

    // Initialize processing state
    onProgressUpdate({
      isProcessing: true,
      progress: 0,
      status: STATUS_MESSAGES.PREPARING,
      errorMsg: null
    });

    let durationParsed = false;
    let videoDuration = 0;

    try {
      const result = await FFmpegManager.processSpeedAdjustment(
        videoFile,
        speedOptions,
        (message: string) => {
          // Parse duration on first occurrence
          if (!durationParsed && message.includes('Duration:')) {
            videoDuration = parseDuration(message);
            durationParsed = true;
          }

          // Calculate progress based on current time
          const current = parseCurrentTime(message);
          if (current && videoDuration > 0) {
            const progress = calculateProgress(current, videoDuration, PROGRESS_CONFIG.MAX_SAFE);
            onProgressUpdate({
              isProcessing: true,
              progress,
              status: STATUS_MESSAGES.PROCESSING,
              errorMsg: null
            });
          } else if (message.includes('size=')) {
            // Fallback progress increment
            onProgressUpdate((prev: ProcessingState) => ({
              ...prev,
              progress: Math.min(prev.progress + PROGRESS_CONFIG.INCREMENT, PROGRESS_CONFIG.MAX_SAFE)
            }));
          }

          // Update console logs
          onLogUpdate((logs: string[]) => [...logs, message]);
        }
      );

      // Finalizing stage
      onProgressUpdate({
        isProcessing: true,
        progress: PROGRESS_CONFIG.FINAL,
        status: STATUS_MESSAGES.FINALIZING,
        errorMsg: null
      });

      // Create download blob
      const { url } = createDownloadBlob(result.data, videoFile.type);

      // Set download ready
      onDownloadReady({
        url,
        size: result.size
      });

      // Completed
      onProgressUpdate({
        isProcessing: false,
        progress: PROGRESS_CONFIG.COMPLETE,
        status: STATUS_MESSAGES.COMPLETED,
        errorMsg: null
      });

    } catch (error: any) {
      // Handle processing error
      onLogUpdate((logs: string[]) => [...logs, String(error)]);
      
      if (error.message !== 'called FFmpeg.terminate()') {
        onProgressUpdate({
          isProcessing: false,
          progress: 0,
          status: STATUS_MESSAGES.FAILED,
          errorMsg: error instanceof Error ? error.message : String(error)
        });
      } else {
        onProgressUpdate({
          isProcessing: false,
          progress: 0,
          status: STATUS_MESSAGES.STOPPED,
          errorMsg: null
        });
      }
    }
  }, []);

  /**
   * Stop video processing
   */
  const stopProcessing = useCallback(() => {
    FFmpegManager.terminate();
  }, []);

  return {
    processVideo,
    stopProcessing
  };
};
