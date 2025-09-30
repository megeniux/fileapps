/**
 * FFmpeg manager for Video Merger component
 * Following established patterns from VideoResize and VideoTrim
 */

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import type { ProcessingStatus } from './types';
import { FFMPEG_CONFIG } from './constants';
import { generateConcatList } from './utils';

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
  
  // Create new instance and reset state
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
 * Merge videos using FFmpeg
 */
export const mergeVideosWithFFmpeg = async (
  files: File[],
  onProgress: (progress: number) => void,
  onStatus: (status: ProcessingStatus) => void,
  onLog: (log: string) => void
): Promise<{ data: Uint8Array; size: number }> => {
  const ffmpeg = await loadFFmpeg();
  
  try {
    // Write all files to FFmpeg filesystem
    onStatus('Preparing');
    for (const file of files) {
      await ffmpeg.writeFile(file.name, await fetchFile(file));
    }
    
    // Create concat list file
    const concatList = generateConcatList(files);
    await ffmpeg.writeFile(FFMPEG_CONFIG.CONCAT_FILENAME, new TextEncoder().encode(concatList));
    
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
    
    // Execute merging command
    onStatus('Merging');
    await ffmpeg.exec([
      '-f', 'concat',
      '-safe', '0',
      '-i', FFMPEG_CONFIG.CONCAT_FILENAME,
      '-c', 'copy',  // Use copy to avoid re-encoding for faster processing
      FFMPEG_CONFIG.OUTPUT_FILENAME
    ]);
    
    // Finalize
    onStatus('Finalizing');
    onProgress(FFMPEG_CONFIG.MAX_PROGRESS);
    
    // Read output file
    const data = await ffmpeg.readFile(FFMPEG_CONFIG.OUTPUT_FILENAME);
    const uint8Array = new Uint8Array(data as any);
    
    // Cleanup files
    for (const file of files) {
      await ffmpeg.deleteFile(file.name);
    }
    await ffmpeg.deleteFile(FFMPEG_CONFIG.CONCAT_FILENAME);
    await ffmpeg.deleteFile(FFMPEG_CONFIG.OUTPUT_FILENAME);
    
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
      for (const file of files) {
        await ffmpeg.deleteFile(file.name);
      }
      await ffmpeg.deleteFile(FFMPEG_CONFIG.CONCAT_FILENAME);
      await ffmpeg.deleteFile(FFMPEG_CONFIG.OUTPUT_FILENAME);
    } catch (cleanupError) {
      console.warn('Error cleaning up files:', cleanupError);
    }
    
    throw error;
  }
};
