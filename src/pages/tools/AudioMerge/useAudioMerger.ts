import { useCallback, useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

import { MIN_AUDIO_COUNT } from './constants';

export function useAudioMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const ffmpegLoadedRef = useRef(false);
  const logHandlerRef = useRef<((e: any) => void) | null>(null);

  const handleFilesAdd = useCallback((newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setErrorMsg(null);
  }, []);

  const handleFileRemove = useCallback((idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleMoveUp = useCallback((idx: number) => {
    setFiles(prev => {
      if (idx <= 0 || idx >= prev.length) return prev;
      const arr = [...prev];
      const tmp = arr[idx - 1];
      arr[idx - 1] = arr[idx];
      arr[idx] = tmp;
      return arr;
    });
  }, []);

  const handleMoveDown = useCallback((idx: number) => {
    setFiles(prev => {
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const arr = [...prev];
      const tmp = arr[idx + 1];
      arr[idx + 1] = arr[idx];
      arr[idx] = tmp;
      return arr;
    });
  }, []);

  const createReplaceHandler = useCallback((idx: number) => {
    return () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'audio/*';
      input.onchange = (e: any) => {
        const f = e.target.files?.[0];
        if (f) {
          setFiles(prev => prev.map((file, i) => (i === idx ? f : file)));
        }
      };
      input.click();
    };
  }, []);

  const handleAddClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const valid = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('audio/'));
      if (valid.length === 0) {
        setErrorMsg('Please select audio files.');
        return;
      }
      setFiles(prev => [...prev, ...valid]);
      setErrorMsg(null);
    }
  }, []);

  const loadFFmpeg = useCallback(async () => {
    if (ffmpegRef.current && ffmpegLoadedRef.current) return ffmpegRef.current;
    const ff = new FFmpeg();
    ffmpegRef.current = ff;
    await ff.load();
    ffmpegLoadedRef.current = true;
    return ff;
  }, []);

  const handleMerge = useCallback(async () => {
    if (files.length < MIN_AUDIO_COUNT) return;
    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing');
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setConsoleLogs([]);

    try {
      const ff = await loadFFmpeg();

      // write files
      for (const file of files) {
        await ff.writeFile(file.name, await fetchFile(file));
      }

      // create concat list
      const concatList = files.map(f => `file '${f.name.replace(/'/g, "'\\'\'")}'`).join('\n');
      await ff.writeFile('concat.txt', new TextEncoder().encode(concatList));

      // logs
      const logHandler = ({ message }: any) => {
        setConsoleLogs(logs => [...logs, message]);
        if (message.includes('size=')) {
          setProgress(prev => Math.min(prev + 5, 99));
        }
      };
      logHandlerRef.current = logHandler;
      ff.on('log', logHandler);

      setStatus('Merging');
      const ext = files[0].name.split('.').pop() || 'mp3';
      const outputFile = `merged_output.${ext}`;
      await ff.exec(['-f', 'concat', '-safe', '0', '-i', 'concat.txt', '-c', 'copy', outputFile]);

      setStatus('Finalizing');
      setProgress(99.9);
      const data = await ff.readFile(outputFile);
      const mimeType = files[0].type || 'audio/mpeg';
      const blob = new Blob([new Uint8Array(data as any)], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadSize((data as any).length || null);

      // cleanup
      for (const file of files) {
        try { await ff.deleteFile(file.name); } catch { /* ignore */ }
      }
      try { await ff.deleteFile('concat.txt'); } catch {}
      try { await ff.deleteFile(outputFile); } catch {}

      setProgress(100);
      setStatus('Completed');
      ff.off('log', logHandler);
    } catch (err: any) {
      setStatus('Failed');
      setConsoleLogs(logs => [...logs, String(err)]);
      if (err.message !== 'called FFmpeg.terminate()') {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      }
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setProgress(0); setStatus(null); }, 2000);
    }
  }, [files, loadFFmpeg]);

  const handleStop = useCallback(() => {
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate();
      if (logHandlerRef.current) ffmpegRef.current.off('log', logHandlerRef.current);
    }
    setStatus('Stopped');
    setIsProcessing(false);
    setErrorMsg(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!downloadUrl) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'merged_output.' + (files[0]?.name.split('.').pop() || 'mp3');
    a.click();
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
  }, [downloadUrl, files]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setErrorMsg(null);
    setConsoleLogs([]);
    setDownloadUrl(prev => { if (prev) { URL.revokeObjectURL(prev); } return null; });
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (ffmpegRef.current) {
        try { ffmpegRef.current.terminate(); } catch {}
      }
      if (logHandlerRef.current && ffmpegRef.current) {
        try { ffmpegRef.current.off('log', logHandlerRef.current); } catch {}
      }
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  return {
    files,
    isDragActive,
    isProcessing,
    progress,
    status,
    consoleLogs,
    downloadUrl,
    downloadSize,
    errorMsg,
    fileInputRef,
    handleFilesAdd,
    handleFileRemove,
    handleMoveUp,
    handleMoveDown,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleMerge,
    handleStop,
    handleDownload,
    handleAddClick,
    createReplaceHandler,
    handleReset
  } as const;
}
