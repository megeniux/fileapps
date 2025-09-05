/**
 * FFmpeg manager for Video Trimmer component
 * Following established patterns from VideoResize and VideoConvert
 */

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import type { TimeRange, ProcessingStatus } from './types';
import { FFMPEG_CONFIG } from './constants';

/**
 * Global FFmpeg instance and state
 */
let ffmpegInstance: FFmpeg | null = null;
let isFFmpegLoaded = false;

/**
 * Initialize FFmpeg instance
 */
const initializeFFmpeg = (): FFmpeg => {
  if (!ffmpegInstance) {
    ffmpegInstance = new FFmpeg();
  }
  return ffmpegInstance;
};

/**
 * Load FFmpeg if not already loaded
 */
export const loadFFmpeg = async (): Promise<FFmpeg> => {
  const ffmpeg = initializeFFmpeg();
  
  if (!isFFmpegLoaded) {
    await ffmpeg.load();
    isFFmpegLoaded = true;
  }
  
  return ffmpeg;
};

/**
 * Reset FFmpeg instance (for proper cleanup)
 */
export const resetFFmpeg = async (): Promise<void> => {
  if (ffmpegInstance) {
    try {
      // Terminate current instance if it exists
      ffmpegInstance.terminate?.();
    } catch (error) {
      console.warn('Error terminating FFmpeg:', error);
    }
  }
  
  // Create new instance
  ffmpegInstance = new FFmpeg();
  isFFmpegLoaded = false;
};

/**
 * Stop current FFmpeg processing
 */
export const stopFFmpeg = (): void => {
  if (ffmpegInstance) {
    try {
      ffmpegInstance.terminate?.();
    } catch (error) {
      console.warn('Error stopping FFmpeg:', error);
    }
  }
};

/**
 * Trim video using FFmpeg
 */
export const trimVideoWithFFmpeg = async (
  file: File,
  range: TimeRange,
  onProgress: (progress: number) => void,
  onStatus: (status: ProcessingStatus) => void,
  onLog: (log: string) => void
): Promise<{ data: Uint8Array; size: number }> => {
  const ffmpeg = await loadFFmpeg();
  const [startTime, endTime] = range;
  
  // Generate file names
  const inputFileName = file.name;
  const outputFileName = `trimmed_${inputFileName}`;
  
  try {
    // Write input file
    onStatus('Preparing');
    await ffmpeg.writeFile(inputFileName, await fetchFile(file));
    
    // Set up progress tracking
    let progressValue = 0;
    const logHandler = ({ message }: { message: string }) => {
      onLog(message);
      
      // Update progress based on FFmpeg output
      if (message.includes('frame=')) {
        progressValue = Math.min(progressValue + FFMPEG_CONFIG.PROGRESS_THRESHOLD, FFMPEG_CONFIG.MAX_PROGRESS);
        onProgress(progressValue);
      }
    };
    
    ffmpeg.on('log', logHandler);
    
    // Execute trimming command
    onStatus('Trimming');
    await ffmpeg.exec([
      '-i', inputFileName,
      '-ss', startTime.toString(),
      '-to', endTime.toString(),
      '-c', 'copy',  // Use copy to avoid re-encoding for faster processing
      outputFileName
    ]);
    
    // Finalize
    onStatus('Finalizing');
    onProgress(FFMPEG_CONFIG.MAX_PROGRESS);
    
    // Read output file
    const data = await ffmpeg.readFile(outputFileName);
    const uint8Array = new Uint8Array(data as any);
    
    // Cleanup
    await ffmpeg.deleteFile(inputFileName);
    await ffmpeg.deleteFile(outputFileName);
    
    // Remove log handler
    ffmpeg.off('log', logHandler);
    
    // Final progress
    onProgress(FFMPEG_CONFIG.FINAL_PROGRESS);
    onStatus('Completed');
    
    return {
      data: uint8Array,
      size: uint8Array.length
    };
    
  } catch (error) {
    // Remove log handler on error
    ffmpeg.off('log', (() => {}));
    
    // Clean up files on error
    try {
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
    } catch (cleanupError) {
      console.warn('Error cleaning up files:', cleanupError);
    }
    
    throw error;
  }
};
