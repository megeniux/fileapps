import { useState, useRef, useCallback } from 'react';
import { videoCodecs } from './types';
import { ratioOptions, CRF_KEEP, PRESET_KEEP } from './constants';

export function useVideoConverterState() {
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

  // Helper handlers for ratio calculations
  const handleWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWidth(val);
    const selected = ratioOptions.find(r => r.value === resolutionRatio);
    if (selected && selected.ratio && val) {
      const w = parseInt(val, 10);
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)));
      }
    }
  }, [resolutionRatio]);

  const handleHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHeight(val);
    const selected = ratioOptions.find(r => r.value === resolutionRatio);
    if (selected && selected.ratio && val) {
      const h = parseInt(val, 10);
      if (!isNaN(h)) {
        setWidth(String(Math.round(h * selected.ratio)));
      }
    }
  }, [resolutionRatio]);

  // Reset function
  const handleReset = useCallback(() => {
    // Clean up any existing URLs to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
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
    durationRef.current = 0;
  }, [previewUrl, downloadUrl]);

  return {
    // File state
    file,
    setFile,
    previewUrl,
    setPreviewUrl,
    
    // Output settings
    outputFormat,
    setOutputFormat,
    videoCodec,
    setVideoCodec,
    audioCodec,
    setAudioCodec,
    width,
    setWidth,
    height,
    setHeight,
    fps,
    setFps,
    crf,
    setCrf,
    preset,
    setPreset,
    audioBitrate,
    setAudioBitrate,
    resolutionRatio,
    setResolutionRatio,
    
    // UI states
    isProcessing,
    setIsProcessing,
    progress,
    setProgress,
    status,
    setStatus,
    consoleLogs,
    setConsoleLogs,
    errorMsg,
    setErrorMsg,
    downloadUrl,
    setDownloadUrl,
    downloadSize,
    setDownloadSize,
    crfAnchor,
    setCrfAnchor,
    presetAnchor,
    setPresetAnchor,
    isDragActive,
    setIsDragActive,
    
    // Refs
    videoRef,
    durationRef,
    
    // Handlers
    handleWidthChange,
    handleHeightChange,
    handleReset,
  };
}
