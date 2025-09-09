import { useState, useRef, useCallback } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import { videoCodecs } from './types';
import { CRF_KEEP, PRESET_KEEP } from './constants';
import { useFileManager } from './useFileManager';
import { useSettingsManager } from './useSettingsManager';
import { useVideoProcessor } from './useVideoProcessor';

export function useVideoConverter() {
  // File state
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Output settings
  const [outputFormat, setOutputFormat] = useState<keyof typeof videoCodecs>('mp4');
  const [videoCodec, setVideoCodec] = useState('libx264');
  const [audioCodec, setAudioCodec] = useState('aac');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [fps, setFps] = useState<number | ''>('');
  const [crf, setCrf] = useState<number | typeof CRF_KEEP>(CRF_KEEP);
  const [preset, setPreset] = useState<string | typeof PRESET_KEEP>(PRESET_KEEP);
  const [audioBitrate, setAudioBitrate] = useState<string>('128k');
  const [resolutionRatio, setResolutionRatio] = useState('custom');

  // UI states
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [crfAnchor, setCrfAnchor] = useState<null | HTMLElement>(null);
  const [presetAnchor, setPresetAnchor] = useState<null | HTMLElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File management hooks
  const { handleFileChange, handleRemoveFile, handleDrop, handleDownload: handleFileDownload } = useFileManager({
    previewUrl,
    downloadUrl,
    fileInputRef,
    setFile,
    setPreviewUrl,
    setDownloadUrl,
    setDownloadSize,
    setProgress,
    setStatus,
    setConsoleLogs,
    setErrorMsg,
    durationRef,
  });

  // Settings management hooks
  const { handleWidthChange, handleHeightChange, handleRatioChange, handleFormatChange } = useSettingsManager({
    resolutionRatio,
    width,
    setWidth,
    setHeight,
    setOutputFormat,
    setVideoCodec,
    setAudioCodec,
    setResolutionRatio,
  });

  // Video processing hooks
  const { processVideo, stopProcessing } = useVideoProcessor({
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
  });

  // UI event handlers
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      durationRef.current = videoRef.current.duration;
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDropWithState = useCallback((e: React.DragEvent) => {
    setIsDragActive(false);
    handleDrop(e);
  }, [handleDrop]);

  const handleDownload = useCallback(() => {
    handleFileDownload(file, outputFormat);
  }, [handleFileDownload, file, outputFormat]);

  const handleCrfInfoClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setCrfAnchor(event.currentTarget);
  }, []);

  const handleCrfInfoClose = useCallback(() => {
    setCrfAnchor(null);
  }, []);

  const handlePresetInfoClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setPresetAnchor(event.currentTarget);
  }, []);

  const handlePresetInfoClose = useCallback(() => {
    setPresetAnchor(null);
  }, []);

  // performance dialog handlers removed

  const handleReset = useCallback(() => {
    // Clean up any existing URLs to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    // Reset the file input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Reset all state to initial values
    setFile(null);
    setPreviewUrl(null);
    setOutputFormat('mp4');
    setVideoCodec('libx264');
    setAudioCodec('aac');
    setWidth('');
    setHeight('');
    setFps('');
    setCrf(CRF_KEEP);
    setPreset(PRESET_KEEP);
    setAudioBitrate('128k');
    setResolutionRatio('custom');
    setIsProcessing(false);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setCrfAnchor(null);
    setPresetAnchor(null);
    setIsDragActive(false);
  // performance dialog reset removed
    durationRef.current = 0;
  }, [previewUrl, downloadUrl]);

  // Additional event handlers for form controls
  const handleVideoCodecChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    setVideoCodec(e.target.value);
  }, []);

  const handleAudioCodecChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    setAudioCodec(e.target.value);
  }, []);

  const handleFpsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFps(value === '' ? '' : parseInt(value, 10));
  }, []);

  const handleCrfChange = useCallback((e: SelectChangeEvent<number | typeof CRF_KEEP>) => {
    const value = e.target.value;
    setCrf(value === CRF_KEEP ? CRF_KEEP : (typeof value === 'string' ? parseInt(value, 10) : value));
  }, []);

  const handlePresetChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    setPreset(e.target.value === PRESET_KEEP ? PRESET_KEEP : e.target.value);
  }, []);

  const handleAudioBitrateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioBitrate(e.target.value);
  }, []);

  return {
    // State
    file,
    previewUrl,
    outputFormat,
    videoCodec,
    audioCodec,
    width,
    height,
    fps,
    crf,
    preset,
    audioBitrate,
    resolutionRatio,
    isProcessing,
    progress,
    status,
    consoleLogs,
    errorMsg,
    downloadUrl,
    downloadSize,
    crfAnchor,
    presetAnchor,
  isDragActive,
    // Refs
    videoRef,
    fileInputRef,
    
    // Setters for form controls
    setVideoCodec,
    setAudioCodec,
    setWidth,
    setHeight,
    setFps,
    setCrf,
    setPreset,
    setAudioBitrate,
    
    // Event handlers
    handleFileChange,
    handleRemoveFile,
    handleLoadedMetadata,
    handleDragOver,
    handleDragLeave,
    handleDrop: handleDropWithState,
    handleDownload,
    handleCrfInfoClick,
    handleCrfInfoClose,
    handlePresetInfoClick,
    handlePresetInfoClose,
  // performance dialog handlers removed
    handleWidthChange,
    handleHeightChange,
    handleRatioChange,
    handleFormatChange,
    handleReset,
    handleVideoCodecChange,
    handleAudioCodecChange,
    handleFpsChange,
    handleCrfChange,
    handlePresetChange,
    handleAudioBitrateChange,
    
  // Processing
  processVideo,
  stopProcessing,
  };
}
