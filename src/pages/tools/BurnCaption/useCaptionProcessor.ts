import { useCallback } from 'react';
import { fetchFile } from '@ffmpeg/util';
import FFmpegManager from './ffmpegManager';
import { buildSubtitleFilter, generateOutputFilename, getFFmpegErrorMessage } from './utils';
import { UI_CONFIG } from './constants';
import type { CaptionBurningOptions } from './types';

export const useCaptionProcessor = () => {
  const ffmpegManager = FFmpegManager.getInstance();

  const processCaptions = useCallback(async (
    options: CaptionBurningOptions,
    onProgress: (progress: number) => void,
    onLog: (message: string) => void,
    onStatusUpdate: (status: string) => void
  ): Promise<{ url: string; size: number }> => {
    await ffmpegManager.ensureLoaded();
    
    const ffmpeg = ffmpegManager.getFFmpeg();
    const inputFileName = options.videoFile.file.name;
    const subtitleFileName = options.subtitleFile.file.name;
    const outputFileName = generateOutputFilename(inputFileName);

    try {
      // Load font first
      onStatusUpdate('Loading font...');
      await ffmpegManager.loadFont();

      // Write input files
      onStatusUpdate('Preparing input files...');
      await ffmpeg.writeFile(inputFileName, await fetchFile(options.videoFile.file));
      await ffmpeg.writeFile(subtitleFileName, await fetchFile(options.subtitleFile.file));

      // Setup progress tracking
      const cleanupTracking = ffmpegManager.setupProgressTracking(
        onProgress,
        onLog
      );

      // Build subtitle filter
      const subtitleFilter = buildSubtitleFilter(subtitleFileName, options.styleOptions);

      // Build FFmpeg command
      const args = [
        '-i', inputFileName,
        '-vf', subtitleFilter,
        '-c:a', 'copy',
        outputFileName
      ];

      onStatusUpdate('Burning captions...');
      const captionOperation = ffmpeg.exec(args);
      ffmpegManager.setCurrentOperation(captionOperation);
      
      await captionOperation;

      onStatusUpdate('Finalizing...');
      onProgress(99.9);

      // Read output file
      const data = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([new Uint8Array(data as any)], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);

      // Cleanup files
      cleanupTracking();
      await ffmpegManager.deleteTemporaryFiles([
        inputFileName,
        subtitleFileName,
        outputFileName
      ]);
      ffmpegManager.clearCurrentOperation();

      return { url, size: data.length };
    } catch (error: any) {
      ffmpegManager.clearCurrentOperation();
      
      // Cleanup on error
      try {
        await ffmpegManager.deleteTemporaryFiles([
          inputFileName,
          subtitleFileName,
          outputFileName
        ]);
      } catch (cleanupError) {
        console.warn('Cleanup error:', cleanupError);
      }

      throw new Error(getFFmpegErrorMessage(error));
    }
  }, [ffmpegManager]);

  const stopProcessing = useCallback(async (): Promise<void> => {
    await ffmpegManager.terminate();
  }, [ffmpegManager]);

  const downloadVideo = useCallback((
    downloadUrl: string,
    filename: string
  ): void => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    a.click();
    
    // Cleanup URL after download
    setTimeout(() => URL.revokeObjectURL(downloadUrl), UI_CONFIG.STATUS_RESET_DELAY);
  }, []);

  return {
    processCaptions,
    stopProcessing,
    downloadVideo
  };
};
