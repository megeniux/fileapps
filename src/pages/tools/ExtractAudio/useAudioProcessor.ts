import { useCallback } from 'react';
import { fetchFile } from '@ffmpeg/util';
import FFmpegManager from './ffmpegManager';
import { AUDIO_FORMATS, QUALITY_PRESETS, UI_CONFIG } from './constants';
import { generateOutputFilename, getFFmpegErrorMessage } from './utils';
import type { AudioExtractionOptions, AudioFile } from './types';

export const useAudioProcessor = () => {
  const ffmpegManager = FFmpegManager.getInstance();

  const processAudio = useCallback(async (
    audioFile: AudioFile,
    options: AudioExtractionOptions,
    onProgress: (progress: number) => void,
    onLog: (message: string) => void,
    onStatusUpdate: (status: string) => void
  ): Promise<{ url: string; size: number }> => {
    await ffmpegManager.ensureLoaded();
    
    const ffmpeg = ffmpegManager.getFFmpeg();
    const inputFileName = audioFile.file.name;
    const format = AUDIO_FORMATS[options.format];
    const quality = QUALITY_PRESETS[options.quality];
    const outputFileName = generateOutputFilename(inputFileName, options.format);

    try {
      // Write input file
      onStatusUpdate('Preparing input file...');
      await ffmpeg.writeFile(inputFileName, await fetchFile(audioFile.file));

      // Setup progress tracking
      const cleanupTracking = ffmpegManager.setupProgressTracking(
        onProgress,
        onLog,
        options.endTime - options.startTime
      );

      // Build FFmpeg command
      const args = [
        '-i', inputFileName,
        '-ss', options.startTime.toString(),
        '-to', options.endTime.toString(),
        '-vn', // No video
        '-acodec', format.codec,
        '-b:a', quality.bitrate,
        outputFileName
      ];

      onStatusUpdate('Extracting audio...');
      const extractOperation = ffmpeg.exec(args);
      ffmpegManager.setCurrentOperation(extractOperation);
      
      await extractOperation;

      onStatusUpdate('Finalizing...');
      onProgress(99.9);

      // Read output file
      const data = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([new Uint8Array(data as any)], { type: format.mimeType });
      const url = URL.createObjectURL(blob);

      // Cleanup
      cleanupTracking();
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
      ffmpegManager.clearCurrentOperation();

      return { url, size: data.length };
    } catch (error: any) {
      ffmpegManager.clearCurrentOperation();
      
      // Cleanup on error
      try {
        await ffmpeg.deleteFile(inputFileName);
        await ffmpeg.deleteFile(outputFileName);
      } catch (cleanupError) {
        console.warn('Cleanup error:', cleanupError);
      }

      throw new Error(getFFmpegErrorMessage(error));
    }
  }, [ffmpegManager]);

  const stopProcessing = useCallback(async (): Promise<void> => {
    await ffmpegManager.terminate();
  }, [ffmpegManager]);

  const downloadAudio = useCallback((
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
    processAudio,
    stopProcessing,
    downloadAudio
  };
};
