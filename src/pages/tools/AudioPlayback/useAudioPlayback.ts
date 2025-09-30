import { useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export function useAudioPlayback() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(1);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  // FFmpeg refs
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const isFFmpegLoaded = useRef(false);

  useEffect(() => {
    return () => {
      // revoke preview / download urls
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      try {
        ffmpegRef.current?.terminate?.();
      } catch (e) {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAll = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
    
    // Terminate any running ffmpeg and reset state
    if (ffmpegRef.current) {
      try { ffmpegRef.current.terminate(); } catch (e) { /* ignore */ }
      ffmpegRef.current = null;
      isFFmpegLoaded.current = false;
    }
    setSpeed(1);
    setIsReversed(false);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadSize(null);
    setConsoleLogs([]);
  };

  const onInputChange = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith('audio/')) {
      setErrorMsg('Please select an audio file.');
      return;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setSpeed(1);
    setIsReversed(false);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const sel = e.dataTransfer.files[0];
      onInputChange(sel);
    }
  };

  const removeFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);
    setSpeed(1);
    setIsReversed(false);
  };

  const loadFFmpeg = async () => {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
    }
    if (!isFFmpegLoaded.current) {
      await ffmpegRef.current.load();
      isFFmpegLoaded.current = true;
    }
  };

  const canProcess = () => !!file && !isProcessing;

  const processSpeedAdjustment = async () => {
    if (!file) {
      setErrorMsg('Please select an audio file.');
      return;
    }
    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing');
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);
    try {
      await loadFFmpeg();
      const ffmpeg = ffmpegRef.current!;
      const inputFileName = file.name;
      const outputFileName = `${isReversed ? 'reversed_' : ''}speed_${speed}x_${inputFileName}`;
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));
      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message]);
        if (message.includes('size=')) setProgress(prev => Math.min(prev + 5, 99));
      };
      ffmpeg.on('log', logHandler);
      setStatus('Processing');

      const args: string[] = ['-i', inputFileName];
      const effectiveSpeed = Math.abs(speed) || 1;

      if (isReversed) {
        if (effectiveSpeed !== 1) {
          const filters: string[] = [];
          let s = effectiveSpeed;
          while (s > 2.0) { filters.push('atempo=2.0'); s /= 2.0; }
          while (s < 0.5) { filters.push('atempo=0.5'); s /= 0.5; }
          filters.push(`atempo=${s}`);
          args.push('-filter_complex', `${filters.join(',')},areverse`);
        } else {
          args.push('-filter_complex', 'areverse');
        }
      } else if (effectiveSpeed !== 1) {
        let s = effectiveSpeed;
        const filters: string[] = [];
        while (s > 2.0) { filters.push('atempo=2.0'); s /= 2.0; }
        while (s < 0.5) { filters.push('atempo=0.5'); s /= 0.5; }
        filters.push(`atempo=${s}`);
        args.push('-filter:a', filters.join(','));
      }

      args.push(outputFileName);
      await ffmpeg.exec(args);
      setStatus('Finalizing');
      setProgress(99.9);
      const data = await ffmpeg.readFile(outputFileName);
      const mimeType = file.type || 'audio/mpeg';
      const blob = new Blob([new Uint8Array(data as any)], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadSize((data as any).length || null);
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
      setProgress(100);
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err: any) {
      setStatus('Failed');
      setConsoleLogs(logs => [...logs, String(err)]);
      if (err?.message !== 'called FFmpeg.terminate()') setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setIsProcessing(false);
      // Do not reset status/progress here; let reset/stop handle it
    }
  };

  const stopSpeedAdjustment = () => {
    if (ffmpegRef.current) {
      try { ffmpegRef.current.terminate(); } catch (e) { /* ignore */ }
      ffmpegRef.current = null; // Clear the FFmpeg instance
      isFFmpegLoaded.current = false; // Mark FFmpeg as not loaded
    }
    setIsProcessing(false);
    setStatus('Stopped');
    setTimeout(() => {
      setStatus(null);
    }, 2000);
    setProgress(0);
    setErrorMsg(null);
  };

  const downloadResult = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${isReversed ? 'reversed_' : ''}speed_${speed}x_${file.name}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  };


  const resetAll = (inputRef?: React.RefObject<HTMLInputElement>) => {
    if (inputRef?.current) inputRef.current.value = '';
    clearAll();
  };

  return {
    file,
    previewUrl,
    speed,
    setSpeed,
    isReversed,
    setIsReversed,
    isProcessing,
    progress,
    status,
    errorMsg,
    downloadUrl,
    downloadSize,
    consoleLogs,
    isDragActive,
    fileInputRef,
    audioRef,
    onInputChange,
    onDragOver,
    onDragLeave,
    onDrop,
    removeFile,
    processSpeedAdjustment,
    stopSpeedAdjustment,
    downloadResult,
  
    canProcess,
    resetAll,
    clearAll,
  } as const;
}

export default useAudioPlayback;
