import { useCallback, useRef } from 'react';
import { fetchFile } from '@ffmpeg/util';
import { parseDuration, parseCurrentTime, validateDimensions, generateOutputFilename } from './utils';
import { ensureFFmpegLoaded, terminateFFmpeg, resetFFmpeg } from './ffmpegManager';

interface UseVideoProcessorProps {
  file: File | null;
  width: string;
  height: string;
  fps: number | '';
  setIsProcessing: (value: boolean) => void;
  setProgress: (value: number) => void;
  setStatus: (value: string | null) => void;
  setConsoleLogs: (logs: string[] | ((prev: string[]) => string[])) => void;
  setErrorMsg: (error: string | null) => void;
  setDownloadUrl: (url: string | null) => void;
  setDownloadSize: (size: number | null) => void;
}

/**
 * Custom hook for video processing logic
 */
export function useVideoProcessor({
  file,
  width,
  height,
  fps,
  setIsProcessing,
  setProgress,
  setStatus,
  setConsoleLogs,
  setErrorMsg,
  setDownloadUrl,
  setDownloadSize,
}: UseVideoProcessorProps) {
  const statusRef = useRef<string | null>(null);

  // Update status with ref tracking
  const updateStatus = useCallback((newStatus: string | null) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  }, [setStatus]);

  /**
   * Process video resize
   */
  const processVideo = useCallback(async () => {
    if (!file) {
      setErrorMsg('Please select a video file.');
      return;
    }

    const validation = validateDimensions(width, height);
    if (!validation.isValid) {
      setErrorMsg(validation.error || 'Invalid dimensions');
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);
    setProgress(0);
    updateStatus('Preparing');
    setConsoleLogs([]);
    setDownloadUrl(null);
    setDownloadSize(null);

    try {
      const ffmpeg = await ensureFFmpegLoaded();

      // Add a small delay to ensure FFmpeg is fully ready
      await new Promise(resolve => setTimeout(resolve, 200));

      const inputFileName = file.name;
      const outputFileName = generateOutputFilename(file.name, width, height);

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      let durationParsed = false;
      let videoDuration = 0;

      const logHandler = ({ message }: { message: string }) => {
        if (!durationParsed && message.includes('Duration:')) {
          videoDuration = parseDuration(message);
          durationParsed = true;
        }
        const current = parseCurrentTime(message);
        if (current && videoDuration > 0) {
          setProgress(Math.min((current / videoDuration) * 100, 99.5));
        }
        setConsoleLogs(logs => [...logs, message]);
      };

      ffmpeg.on('log', logHandler);

      // Build ffmpeg args
      const args = ['-i', inputFileName];
      
      // Resize filter
      args.push('-vf', `scale=${width}:${height}`);
      
      // FPS
      if (fps) {
        args.push('-r', `${fps}`);
      }
      
      // Output settings
      args.push('-c:v', 'libx264');
      args.push('-preset', 'fast');
      args.push('-crf', '23');
      args.push('-c:a', 'aac');
      args.push('-b:a', '128k');
      args.push(outputFileName);

      updateStatus('Resizing');
      await ffmpeg.exec(args);

      updateStatus('Finalizing');
      setProgress(99.9);

      const data = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([new Uint8Array(data as any)], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadSize((data as Uint8Array).length);

      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);

      setProgress(100);
      updateStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err: any) {
      updateStatus('Failed');

      // Only log errors that aren't from termination
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (!errorMessage.includes('terminate')) {
        setConsoleLogs(logs => [...logs, errorMessage]);
      }

      if (err.message && (err.message.includes('memory') || err.message.includes('out of bounds'))) {
        setErrorMsg('Memory error: Video is too large or complex. Please try with a shorter video or smaller resolution.');
        await resetFFmpeg();
      } else if (err.message && (err.message.includes('Input file validation failed') || err.message.includes('Failed to write input file'))) {
        setErrorMsg('Failed to process video file. Please try again or try with a different video file.');
        await resetFFmpeg();
      } else if (!errorMessage.includes('terminate')) {
        setErrorMsg(errorMessage);
      }
    } finally {
      setIsProcessing(false);
      // Only reset progress/status after completion, not after stopping
      setTimeout(() => {
        const currentStatus = statusRef.current;
        if (currentStatus === 'Completed' || currentStatus === 'Failed') {
          setProgress(0);
          updateStatus(null);
        }
      }, 2000);
    }
  }, [file, width, height, fps, setIsProcessing, setProgress, updateStatus, setConsoleLogs, setErrorMsg, setDownloadUrl, setDownloadSize]);

  /**
   * Stop video processing with proper cleanup
   */
  const stopProcessing = useCallback(() => {
    terminateFFmpeg();
    resetFFmpeg();
    updateStatus('Stopped');
    setIsProcessing(false);
    setErrorMsg(null);
  }, [updateStatus, setIsProcessing, setErrorMsg]);

  return {
    processVideo,
    stopProcessing,
  };
}
