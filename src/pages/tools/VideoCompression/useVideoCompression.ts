import { useState, useRef, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { defaultState } from './constants';
import { parseDuration, parseCurrentTime } from './utils';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

export function useVideoCompression() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(defaultState.file);
  const [crf, setCrf] = useState<number>(defaultState.crf);
  const [preset, setPreset] = useState<string>(defaultState.preset);
  const [isProcessing, setIsProcessing] = useState<boolean>(defaultState.isProcessing);
  const [progress, setProgress] = useState<number>(defaultState.progress);
  const [status, setStatus] = useState<string | null>(defaultState.status);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(defaultState.downloadUrl);
  const [downloadSize, setDownloadSize] = useState<number | null>(defaultState.downloadSize);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(defaultState.consoleLogs);
  const [errorMsg, setErrorMsg] = useState<string | null>(defaultState.errorMsg);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultState.previewUrl);
  const [isDragActive, setIsDragActive] = useState<boolean>(defaultState.isDragActive);

  const totalDurationRef = useRef<number>(0);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
      setErrorMsg(null);

      // Create preview URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);

      // Reset duration ref
      totalDurationRef.current = 0;
    }
  }, []);

  const handleLoadedMetadata = useCallback((duration?: number) => {
    if (duration && duration > 0) {
      totalDurationRef.current = duration;
    }
    setCrf(28);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (!selectedFile.type.startsWith('video/')) {
        setErrorMsg('Please select a video file.');
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
      setErrorMsg(null);
      totalDurationRef.current = 0;
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    totalDurationRef.current = 0;
  }, []);

  const handleCompress = useCallback(async () => {
    if (!file) {
      alert('Please select a video file.');
      return;
    }

    if (!isFFmpegLoaded) {
      await ffmpeg.load();
      isFFmpegLoaded = true;
    }

    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing');
    setConsoleLogs([]);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);

    const inputFileName = file.name;
    const outputFileName = `compressed_${inputFileName}`;

    try {
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      let durationParsed = false;
      const logHandler = ({ message }: { message: string }) => {
        if (!durationParsed && message.includes('Duration:')) {
          totalDurationRef.current = parseDuration(message);
          durationParsed = true;
        }
        const current = parseCurrentTime(message);
        if (current && totalDurationRef.current > 0) {
          setProgress(Math.min((current / totalDurationRef.current) * 100, 99.5));
        }
        setConsoleLogs((logs) => [...logs, message]);
      };

      ffmpeg.on('log', logHandler);

      const compressionOptions = [
        '-c:v', 'libx264',
        '-profile:v', 'high',
        '-preset', preset,
        '-crf', `${crf}`,
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
      ];

      setStatus('Compressing');
      await ffmpeg.exec(['-i', inputFileName, ...compressionOptions, outputFileName]);

      setStatus('Finalizing');
      setProgress(99.9);

      const data = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([new Uint8Array(data as any)], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadSize(data.length);

      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);

      setProgress(100);
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err: any) {
      setStatus('Failed');
      // Only add to console logs if not a terminate error
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (!errorMessage.includes('terminate')) {
        setConsoleLogs((logs) => [...logs, errorMessage]);
        setErrorMsg(errorMessage);
      }
    } finally {
      setIsProcessing(false);
      // Only reset progress/status after completion, not after stopping
      setTimeout(() => {
        setStatus((currentStatus) => {
          if (currentStatus === 'Completed' || currentStatus === 'Failed') {
            setProgress(0);
            return null;
          }
          return currentStatus;
        });
      }, 2000);
    }
  }, [file, crf, preset]);

  const handleStop = useCallback(() => {
    if (ffmpeg) {
      ffmpeg.terminate();
    }
    isFFmpegLoaded = false; // Reset flag so FFmpeg can be loaded again
    setIsProcessing(false);
    setStatus('Stopped');
    setTimeout(() => {
      setStatus(null);
    }, 2000);
    setErrorMsg(null); // Clear error on stop
  }, []);

  const handleReset = useCallback(() => {
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Reset all state to defaults
    setFile(defaultState.file);
    setCrf(defaultState.crf);
    setPreset(defaultState.preset);
    setIsProcessing(defaultState.isProcessing);
    setProgress(defaultState.progress);
    setStatus(defaultState.status);
    setDownloadUrl(defaultState.downloadUrl);
    setDownloadSize(defaultState.downloadSize);
    setConsoleLogs(defaultState.consoleLogs);
    setErrorMsg(defaultState.errorMsg);
    setPreviewUrl(defaultState.previewUrl);
    setIsDragActive(defaultState.isDragActive);
    totalDurationRef.current = 0;
    
    // Clean up any existing URLs
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Terminate any running ffmpeg and reset state
    if (ffmpeg) {
      ffmpeg.terminate();
    }
    isFFmpegLoaded = false;
  }, [downloadUrl, previewUrl]);

  const handleDownload = useCallback(() => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `compressed_${file.name}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  }, [downloadUrl, file]);

  const handleCrfChange = useCallback((value: number) => {
    setCrf(value);
  }, []);

  const handlePresetChange = useCallback((newPreset: string) => {
    setPreset(newPreset);
  }, []);

  return {
    // State
    file,
    crf,
    preset,
    isProcessing,
    progress,
    status,
    downloadUrl,
    downloadSize,
    consoleLogs,
    errorMsg,
    previewUrl,
    isDragActive,
    totalDuration: totalDurationRef.current,
    fileInputRef,

    // Event handlers
    handleFileChange,
    handleLoadedMetadata,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveFile,
    handleCompress,
    handleStop,
    handleReset,
    handleDownload,
    handleCrfChange,
    handlePresetChange,
  };
}
