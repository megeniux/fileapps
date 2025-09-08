import { useCallback, useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export function useAudioEffects() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const ffmpegLoadedRef = useRef(false);
  const logHandlerRef = useRef<((e: any) => void) | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  // Effect controls
  const [speed, setSpeed] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState<number>(0);
  const [normalize, setNormalize] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const loadFFmpeg = useCallback(async () => {
    if (ffmpegRef.current && ffmpegLoadedRef.current) return ffmpegRef.current;
    const ff = new FFmpeg();
    ffmpegRef.current = ff;
    await ff.load();
    ffmpegLoadedRef.current = true;
    return ff;
  }, []);

  const handleFileChange = useCallback((f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith('audio/')) {
      setErrorMsg('Please select an audio file.');
      return;
    }
    // revoke previous preview
    setPreviewUrl(prev => { if (prev) { URL.revokeObjectURL(prev); } return URL.createObjectURL(f); });
    setFile(f);
    setDuration(0);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);
    setSpeed(1);
    setPitch(0);
    setFadeIn(0);
    setFadeOut(0);
    setNormalize(false);
    setVolume(1);
  }, []);

  const handleRemoveFile = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFile(null);
    setPreviewUrl(prev => { if (prev) URL.revokeObjectURL(prev); return null; });
    setDuration(0);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadUrl(prev => { if (prev) URL.revokeObjectURL(prev); return null; });
    setDownloadSize(null);
    setConsoleLogs([]);
    setSpeed(1);
    setPitch(0);
    setFadeIn(0);
    setFadeOut(0);
    setNormalize(false);
    setVolume(1);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragActive(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragActive(false); }, []);
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      handleFileChange(selectedFile);
    }
  }, [handleFileChange]);

  const buildFilter = useCallback(() => {
    const filters: string[] = [];
    // speed
    if (speed !== 1) {
      let s = speed;
      while (s > 2.0) { filters.push('atempo=2.0'); s /= 2.0; }
      while (s < 0.5 && s > 0) { filters.push('atempo=0.5'); s /= 0.5; }
      filters.push(`atempo=${s.toFixed(3)}`);
    }
    if (pitch !== 0) {
      const ratio = Math.pow(2, pitch / 12);
      filters.push(`asetrate=44100*${ratio.toFixed(5)}`);
      filters.push('aresample=44100');
      filters.push(`atempo=${(1 / ratio).toFixed(5)}`);
    }
    if (fadeIn > 0) filters.push(`afade=t=in:st=0:d=${fadeIn}`);
    if (fadeOut > 0 && duration > 0) filters.push(`afade=t=out:st=${Math.max(0, duration - fadeOut)}:d=${fadeOut}`);
    if (normalize) filters.push('dynaudnorm');
    if (volume !== 1) filters.push(`volume=${volume}`);
    return filters.length ? filters.join(',') : '';
  }, [speed, pitch, fadeIn, fadeOut, normalize, volume, duration]);

  const handleProcess = useCallback(async () => {
    if (!file) { setErrorMsg('Please select an audio file.'); return; }
    setIsProcessing(true); setProgress(0); setStatus('Preparing'); setErrorMsg(null); setDownloadUrl(null); setDownloadSize(null); setConsoleLogs([]);
    try {
      const ff = await loadFFmpeg();
      const inputFileName = file.name;
      const outputFileName = `effect_${inputFileName}`;
      await ff.writeFile(inputFileName, await fetchFile(file));

      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message]);
        if (message.includes('size=')) setProgress(prev => Math.min(prev + 5, 99));
      };
      logHandlerRef.current = logHandler;
      ff.on('log', logHandler);

      setStatus('Processing');
      const args: string[] = ['-i', inputFileName];
      const filterStr = buildFilter();
      if (filterStr) { args.push('-af', filterStr); }
      args.push(outputFileName);
      await ff.exec(args);

      setStatus('Finalizing'); setProgress(99.9);
      const data = await ff.readFile(outputFileName);
      const mimeType = file.type || 'audio/mpeg';
      const blob = new Blob([new Uint8Array(data as any)], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadSize((data as any).length || null);

      try { await ff.deleteFile(inputFileName); } catch {}
      try { await ff.deleteFile(outputFileName); } catch {}
      setProgress(100); setStatus('Completed');
      ff.off('log', logHandler);
    } catch (err: any) {
      setStatus('Failed'); setConsoleLogs(logs => [...logs, String(err)]);
      if (err.message !== 'called FFmpeg.terminate()') setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setProgress(0); setStatus(null); }, 2000);
    }
  }, [file, loadFFmpeg, buildFilter]);

  const handleStop = useCallback(() => {
    if (ffmpegRef.current) {
      try {
        ffmpegRef.current.terminate();
        if (logHandlerRef.current) ffmpegRef.current.off('log', logHandlerRef.current);
      } catch {}
    }
    setStatus('Stopped'); setIsProcessing(false); setErrorMsg(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!downloadUrl || !file) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `effect_${file.name}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
  }, [downloadUrl, file]);

  const handleReset = useCallback(() => {
    // cleanup
    if (ffmpegRef.current) {
      try { ffmpegRef.current.terminate(); } catch {}
    }
    setFile(null);
    setPreviewUrl(prev => { if (prev) URL.revokeObjectURL(prev); return null; });
    setDuration(0);
    setProgress(0);
    setStatus(null);
    setErrorMsg(null);
    setDownloadUrl(prev => { if (prev) URL.revokeObjectURL(prev); return null; });
    setDownloadSize(null);
    setConsoleLogs([]);
    setSpeed(1); setPitch(0); setFadeIn(0); setFadeOut(0); setNormalize(false); setVolume(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  useEffect(() => {
    return () => {
      if (ffmpegRef.current) {
        try { ffmpegRef.current.terminate(); } catch {}
      }
      if (logHandlerRef.current && ffmpegRef.current) {
        try { ffmpegRef.current.off('log', logHandlerRef.current); } catch {}
      }
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [downloadUrl, previewUrl]);

  return {
    file,
    previewUrl,
    duration,
    setDuration,
    isProcessing,
    progress,
    status,
    errorMsg,
    downloadUrl,
    downloadSize,
    consoleLogs,
    isDragActive,
    fileInputRef,
    speed,
    setSpeed,
    pitch,
    setPitch,
    fadeIn,
    setFadeIn,
    fadeOut,
    setFadeOut,
    normalize,
    setNormalize,
    volume,
    setVolume,
    handleFileChange,
    handleRemoveFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleProcess,
    handleStop,
    handleDownload,
    handleReset
  } as const;
}
