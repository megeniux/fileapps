import { useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

import { outputFormats, getMimeTypeForExt } from './constants';

export type ConsoleLog = string;

export function useAudioConverter() {
  const ffmpegRef = useRef<any>(null);
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [outputQuality, setOutputQuality] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Expose refs for inputs and audio element
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      // cleanup object URLs on unmount
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      // terminate ffmpeg if running
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
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
      setErrorMsg(null);
    }
  };

  const removeFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
  };

  const handleFormatChange = (value: string) => {
    setOutputFormat(value);
    const idx = outputFormats.findIndex((f:any) => f.value === value);
    setOutputQuality(idx >= 0 ? idx : 0);
  };

  const handleQualityChange = (index: number) => {
    setOutputQuality(index);
  };

  const loadFFmpeg = async () => {
    if (!ffmpegRef.current) {
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;
    }

    if (!isFFmpegLoaded) {
      try {
        await ffmpegRef.current.load();
        setIsFFmpegLoaded(true);
      } catch (error) {
        setErrorMsg('Failed to load FFmpeg. Please try again.');
        console.error('FFmpeg load error:', error);
      }
    }
  };

  const process = async () => {
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
      const selectedFormat = outputFormats[outputQuality];
      const outputExtension = selectedFormat.value;
      const baseName = inputFileName.replace(/\.[^/.]+$/, '');
      const outputFileName = `converted_${baseName}.${outputExtension}`;

      await ffmpegRef.current.writeFile(inputFileName, await fetchFile(file));

      const logHandler = ({ message }: { message: string }) => {
        setConsoleLogs(logs => [...logs, message]);
        if (message.includes('size=')) {
          setProgress(prev => Math.min(prev + 5, 99));
        }
      };

      ffmpegRef.current.on('log', logHandler);
      setStatus('Converting');

      const args: string[] = ['-i', inputFileName];

      if (selectedFormat.codec) {
        args.push('-c:a', selectedFormat.codec);
      }

      if (selectedFormat.bitrate) {
        args.push('-b:a', selectedFormat.bitrate);
      }

      args.push(outputFileName);

      await ffmpegRef.current.exec(args);

      setStatus('Finalizing');
      setProgress(99.9);

      const data = await ffmpegRef.current.readFile(outputFileName);
      const mimeType = getMimeTypeForExt(outputExtension) || `audio/${outputExtension}`;
      const blob = new Blob([new Uint8Array(data as any)], { type: mimeType });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadSize((data as any).length || null);

      // cleanup
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
      // Do not reset status/progress here; let reset/stop handle it
    }
  };

  const stop = () => {
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate?.();
      ffmpegRef.current = null; // Clear the FFmpeg instance
      setIsFFmpegLoaded(false); // Mark FFmpeg as not loaded
    }
    setIsProcessing(false);
    setStatus('Stopped');
    setProgress(0);
    setTimeout(() => {
      setStatus(null);
    }, 2000);
    setErrorMsg(null); // Do not set errorMsg on stop
  };

  const download = () => {
    if (downloadUrl && file) {
      const selectedFormat = outputFormats[outputQuality];
      const outputExtension = selectedFormat.value;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `converted_${file.name.replace(/\.[^/.]+$/, '')}.${outputExtension}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  };

  const reset = () => {
    // Clear inputs and urls
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);

    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus('Ready');
    setTimeout(() => {
      setStatus(null);
    }, 2000);
    setConsoleLogs([]);
    setErrorMsg(null);

    // Terminate any running ffmpeg and reset state
    if (ffmpegRef.current) {
      ffmpegRef.current.terminate?.();
      ffmpegRef.current = null;
      setIsFFmpegLoaded(false);
    }
  };

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
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
      setErrorMsg(null);
    }
  };

  return {
    // state
    file,
    previewUrl,
    outputFormat,
    outputQuality,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    isDragActive,
    // refs
    fileInputRef,
    audioRef,
    // handlers
    handleFileChange,
    removeFile,
    handleFormatChange,
    handleQualityChange,
    processVideo: process,
    stopProcessing: stop,
    handleDownload: download,
    handleReset: reset,
    onDragOver: (e: React.DragEvent) => { e.preventDefault(); setIsDragActive(true); },
    onDragLeave: (e: React.DragEvent) => { e.preventDefault(); setIsDragActive(false); },
    onDrop,
    setErrorMsg,
  } as const;
}
