import { useCallback, useRef } from 'react';
import { fetchFile } from '@ffmpeg/util';
import { parseDuration, parseCurrentTime, validateResolution, ensureEvenDimensions, getFFmpeg, resetFFmpeg } from './utils';
import { videoCodecs, audioCodecs } from './types';
import { CRF_KEEP, PRESET_KEEP } from './constants';

interface UseVideoProcessorProps {
  file: File | null;
  width: string;
  height: string;
  outputFormat: keyof typeof videoCodecs;
  videoCodec: string;
  crf: number | typeof CRF_KEEP;
  preset: string | typeof PRESET_KEEP;
  fps: number | '';
  audioCodec: string;
  audioBitrate: string;
  durationRef: React.MutableRefObject<number>;
  setIsProcessing: (value: boolean) => void;
  setProgress: (value: number) => void;
  setStatus: (value: string | null) => void;
  setConsoleLogs: (logs: string[] | ((prev: string[]) => string[])) => void;
  setErrorMsg: (error: string | null) => void;
  setDownloadUrl: (url: string | null) => void;
  setDownloadSize: (size: number | null) => void;
}

export function useVideoProcessor({
  file,
  width,
  height,
  outputFormat,
  videoCodec,
  crf,
  preset,
  fps,
  audioCodec,
  audioBitrate,
  durationRef,
  setIsProcessing,
  setProgress,
  setStatus,
  setConsoleLogs,
  setErrorMsg,
  setDownloadUrl,
  setDownloadSize,
}: UseVideoProcessorProps) {
  const statusRef = useRef<string | null>(null);

  // Update ref whenever status changes
  const updateStatus = useCallback((newStatus: string | null) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  }, [setStatus]);
  
  const processVideo = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    updateStatus('Preparing');
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);

    try {
      const ffmpeg = getFFmpeg();
      await ffmpeg.load();

      const inputFileName = 'input.' + file.name.split('.').pop();
      const outputFileName = `output.${outputFormat}`;

      updateStatus('Uploading');
      setProgress(5);
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      // Validate and adjust resolution
      const isValid = validateResolution(width, height);
      const { evenWidth, evenHeight } = ensureEvenDimensions(width, height);
      if (!isValid && width && height) {
        console.warn(`Resolution adjusted to ${evenWidth}x${evenHeight} for encoding compatibility`);
      }

      let durationParsed = false;
      const logHandler = (event: any) => {
        const message = event.message || String(event);
        if (!durationParsed && message.includes('Duration:')) {
          durationRef.current = parseDuration(message);
          durationParsed = true;
        }
        const current = parseCurrentTime(message);
        if (current && durationRef.current > 0) {
          setProgress(Math.min((current / durationRef.current) * 100, 99.5));
        }
        setConsoleLogs((logs) => [...logs, message]);
      };

      ffmpeg.on('log', logHandler);

      // Build ffmpeg args
      let args = ['-i', inputFileName];

      // Video options
      if (outputFormat !== 'gif' && videoCodec) {
        args.push('-c:v', videoCodec);
      }

      if (outputFormat !== 'gif' && crf !== CRF_KEEP) {
        args.push('-crf', `${crf}`);
      }

      if (outputFormat !== 'gif' && preset !== PRESET_KEEP) {
        args.push('-preset', preset);
      }

      // Resolution
      if (evenWidth && evenHeight && /^\d+$/.test(evenWidth) && /^\d+$/.test(evenHeight) &&
        parseInt(evenWidth) > 0 && parseInt(evenHeight) > 0) {
        args.push('-s', `${evenWidth}x${evenHeight}`);
      }

      // FPS
      if (fps) {
        args.push('-r', `${fps}`);
      }

      // Audio options
      if (audioCodec && audioCodecs[outputFormat].length > 0) {
        args.push('-c:a', audioCodec);
      }

      if (audioBitrate && audioCodecs[outputFormat].length > 0) {
        args.push('-b:a', audioBitrate);
      }

      // GIF special handling
      if (outputFormat === 'gif') {
        const scaleValue = (evenWidth && evenHeight && /^\d+$/.test(evenWidth) && /^\d+$/.test(evenHeight) &&
          parseInt(evenWidth) > 0 && parseInt(evenHeight) > 0) ? `${evenWidth}:${evenHeight}` : '320:-1';
        args.push('-vf', `fps=${fps || 15},scale=${scaleValue}`);
      }

      args.push(outputFileName);

      updateStatus('Converting');
      await ffmpeg.exec(args);

      updateStatus('Finalizing');
      setProgress(99.9);

      const data = await ffmpeg.readFile(outputFileName);
      const mime = outputFormat === 'gif' ? 'image/gif' :
        outputFormat.startsWith('mp3') ? 'audio/mp3' :
          outputFormat.startsWith('wav') ? 'audio/wav' :
            'video/' + outputFormat;

      const blob = new Blob([new Uint8Array(data as unknown as ArrayBuffer)], { type: mime });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadSize(data.length);

      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);

      setProgress(100);
              updateStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err: unknown) {
      updateStatus('Failed');
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      // Only log errors that aren't from termination
      if (!errorMessage.includes('terminate') && !errorMessage.includes('aborted')) {
        setConsoleLogs((logs) => [...logs, errorMessage]);
        setErrorMsg(errorMessage);
      }

      if (errorMessage.includes('terminated') || errorMessage.includes('aborted')) {
        resetFFmpeg();
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
  }, [
    file, width, height, outputFormat, videoCodec, crf, preset, fps, audioCodec, audioBitrate,
    durationRef, setIsProcessing, setProgress, setStatus, setConsoleLogs, setErrorMsg, setDownloadUrl, setDownloadSize
  ]);

  const stopProcessing = useCallback(() => {
    const ffmpeg = getFFmpeg();
    ffmpeg.terminate();
    resetFFmpeg();
    updateStatus('Stopped');
    setIsProcessing(false);
    setErrorMsg(null);
  }, [setStatus, setIsProcessing, setErrorMsg]);

  return {
    processVideo,
    stopProcessing,
  };
}
