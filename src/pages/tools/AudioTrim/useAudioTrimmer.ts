import { useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

type ConsoleLog = string;

export function useAudioTrimmer() {
  const ffmpegRef = useRef<any>(null);
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      ffmpegRef.current?.terminate?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const selectedFile = event.target.files[0];
      if (!selectedFile.type.startsWith('audio/')) {
        setErrorMsg('Please select an audio file.');
        return;
      }
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setProgress(0);
      setStatus(null);
      setErrorMsg(null);
      setDownloadUrl(null);
      setDownloadSize(null);
      setConsoleLogs([]);
    }
  };

  const removeFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragActive(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragActive(false); };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (!selectedFile.type.startsWith('audio/')) {
        setErrorMsg('Please select an audio file.');
        return;
      }
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setProgress(0);
      setStatus(null);
      setErrorMsg(null);
      setDownloadUrl(null);
      setDownloadSize(null);
      setConsoleLogs([]);
    }
  };

  const loadFFmpeg = async () => {
    if (!ffmpegRef.current) ffmpegRef.current = new FFmpeg();
    if (!isFFmpegLoaded) {
      await ffmpegRef.current.load();
      setIsFFmpegLoaded(true);
    }
  };

  const handleTrim = async (rangeStart: number, rangeEnd: number) => {
    if (!file) {
      setErrorMsg('Please select an audio file.');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing');
    setConsoleLogs([]);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);

    try {
      await loadFFmpeg();
      const inputFileName = file.name;
      const outputFileName = `trimmed_${inputFileName}`;

      await ffmpegRef.current.writeFile(inputFileName, await fetchFile(file));

      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message]);
        if (message.includes('size=')) setProgress(prev => Math.min(prev + 5, 99));
      };

      ffmpegRef.current.on('log', logHandler);
      setStatus('Trimming');

      await ffmpegRef.current.exec([
        '-i', inputFileName,
        '-ss', `${rangeStart}`,
        '-to', `${rangeEnd}`,
        '-c', 'copy',
        outputFileName
      ]);

      setStatus('Finalizing');
      setProgress(99.9);

      const data = await ffmpegRef.current.readFile(outputFileName);
      const mimeType = file.type || `audio/${outputFileName.split('.').pop()}`;
      const blob = new Blob([new Uint8Array(data as any)], { type: mimeType });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadSize((data as any).length || null);

      await ffmpegRef.current.deleteFile(inputFileName);
      await ffmpegRef.current.deleteFile(outputFileName);

      setProgress(100);
      setStatus('Completed');
      ffmpegRef.current.off('log', logHandler);
    } catch (err: any) {
      setStatus('Failed');
      setConsoleLogs(logs => [...logs, String(err)]);
      if (err?.message !== 'called FFmpeg.terminate()') {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      }
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setProgress(0); setStatus(null); }, 2000);
    }
  };

  const handleStop = () => {
    ffmpegRef.current?.terminate?.();
    setIsProcessing(false);
    setStatus('Stopped');
    setProgress(0);
    setErrorMsg(null);
  };

  const handleDownload = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `trimmed_${file.name}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  };

  const handleReset = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);

    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);

    ffmpegRef.current?.terminate?.();
  };

  return {
    file,
    previewUrl,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    isDragActive,
    fileInputRef,
    audioRef,
    handleFileChange,
    removeFile,
    onDragOver,
    onDragLeave,
    onDrop,
    handleTrim,
    handleStop,
    handleDownload,
    handleReset,
    setErrorMsg,
  } as const;
}
