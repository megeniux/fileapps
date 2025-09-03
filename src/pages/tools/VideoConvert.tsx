import React, { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';

// MUI
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// Icons
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Global Components
import PerformanceInfoDialog from '../../components/PerformanceInfoDialog';

// Components and utilities from VideoConvert folder
import FileUploadArea from './VideoConvert/FileUploadArea';
import ConversionSettings from './VideoConvert/ConversionSettings';
import ProgressDisplay from './VideoConvert/ProgressDisplay';
import InfoPopovers from './VideoConvert/InfoPopovers';
import { videoCodecs, audioCodecs } from './VideoConvert/types';
import { ratioOptions, CRF_KEEP, PRESET_KEEP } from './VideoConvert/constants';
import {
  getFFmpeg,
  resetFFmpeg,
  getIsFFmpegLoaded,
  setFFmpegLoaded,
  parseDuration,
  parseCurrentTime,
  validateResolution,
  ensureEvenDimensions,
} from './VideoConvert/utils';

// Types
import type { SelectChangeEvent } from '@mui/material/Select';

function VideoConvert() {
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
  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Optimized event handlers with useCallback
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      // Clean up previous URL to prevent memory leak
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setFile(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
      setErrorMsg(null);
      durationRef.current = 0;
    }
  }, [previewUrl]);

  const handleRemoveFile = useCallback(() => {
    // Clean up URLs to prevent memory leaks
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

    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
    durationRef.current = 0;
  }, [previewUrl, downloadUrl]);

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

  const handleRatioChange = useCallback((e: SelectChangeEvent) => {
    const val = e.target.value;
    setResolutionRatio(val);
    const selected = ratioOptions.find(r => r.value === val);
    if (selected && selected.ratio && width) {
      const w = parseInt(width, 10);
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)));
      }
    }
  }, [width]);

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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (!selectedFile.type.startsWith('video/') && !selectedFile.type.startsWith('audio/')) {
        setErrorMsg('Please select a video or audio file.');
        return;
      }

      // Clean up previous URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Reset the file input to ensure consistent state
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
      setErrorMsg(null);
      durationRef.current = 0;
    }
  }, [previewUrl]);

  const handleProceed = useCallback(async () => {
    if (!file) {
      setErrorMsg('Please select a video file.');
      return;
    }

    // Validate resolution using utility function
    if (!validateResolution(width, height)) {
      setErrorMsg('Please enter a valid positive integer for width and height.');
      return;
    }

    // Ensure even dimensions
    const { evenWidth, evenHeight } = ensureEvenDimensions(width, height);

    const ffmpeg = getFFmpeg();

    if (!getIsFFmpegLoaded()) {
      await ffmpeg.load();
      setFFmpegLoaded(true);
    }

    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing');
    setConsoleLogs([]);
    setErrorMsg(null);
    setDownloadUrl(null);
    setDownloadSize(null);

    const inputFileName = file.name;
    const ext = outputFormat;
    const outputFileName = `converted_${inputFileName.replace(/\.[^/.]+$/, '')}.${ext}`;

    try {
      const ffmpeg = getFFmpeg(); // Get the current FFmpeg instance

      await ffmpeg.writeFile(inputFileName, await fetchFile(file));
      let durationParsed = false;

      const logHandler = ({ message }: { message: string }) => {
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

      setStatus('Converting');
      await ffmpeg.exec(args);

      setStatus('Finalizing');
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
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err: unknown) {
      setStatus('Failed');
      const errorMessage = err instanceof Error ? err.message : String(err);
      setConsoleLogs((logs) => [...logs, errorMessage]);
      setErrorMsg(errorMessage);

      // If FFmpeg was terminated, reset it completely
      if (errorMessage.includes('terminated') || errorMessage.includes('aborted')) {
        resetFFmpeg();
      }
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setStatus(null);
      }, 2000);
    }
  }, [file, width, height, outputFormat, videoCodec, crf, preset, fps, audioCodec, audioBitrate]);

  const handleStop = useCallback(() => {
    const ffmpeg = getFFmpeg();
    ffmpeg.terminate();
    resetFFmpeg(); // Create a new FFmpeg instance and reset the loaded flag
    setStatus('Stopped');
    setIsProcessing(false);
    setErrorMsg(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `converted_${file.name.replace(/\.[^/.]+$/, '')}.${outputFormat}`;
      a.click();
      // Clean up URL after download
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  }, [downloadUrl, file, outputFormat]);

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

  const handlePerformanceDialogOpen = useCallback(() => {
    setIsPerformanceDialogOpen(true);
  }, []);

  const handlePerformanceDialogClose = useCallback(() => {
    setIsPerformanceDialogOpen(false);
  }, []);

  const handleFormatChange = useCallback((e: SelectChangeEvent) => {
    const fmt = e.target.value as keyof typeof videoCodecs;
    setOutputFormat(fmt);
    setVideoCodec(videoCodecs[fmt][0] || '');
    setAudioCodec(audioCodecs[fmt][0] || '');
  }, []);

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
    setIsPerformanceDialogOpen(false);
    durationRef.current = 0;
  }, [previewUrl, downloadUrl]);

  return (
    <>
      <Helmet>
        <title>Video Converter Online Free – Convert MP4, MOV, MKV, AVI</title>
        <meta name="description" content="Free online video converter: convert MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free." />
        <meta name="keywords" content="convert video online free, convert video to mp4, free online video converter, video format converter, change video resolution online, convert mov to mp4 free, convert mkv to mp4 online, video codec converter online" />
        <meta property="og:title" content="Free Online Video Converter – Fast, Private & No Watermark" />
        <meta property="og:description" content="Convert video formats (MP4, MOV, MKV, AVI, WebM) in your browser. Customize resolution, codec, bitrate & FPS." />
        <meta property="og:image" content="/images/landing/video-convert-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/convert" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/convert" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
        {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}

        <Card sx={{ p: 1.5 }}>
          <CardContent sx={{ p: 0 }}>
            <Box display="flex" alignItems="center">
              <SwapHorizIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                Video Converter
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
              Convert MP4, MOV, MKV, AVI, WebM & more locally in your browser. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free.
            </Typography>

            <FileUploadArea
              file={file}
              previewUrl={previewUrl}
              isDragActive={isDragActive}
              onFileChange={handleFileChange}
              onRemoveFile={handleRemoveFile}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              videoRef={videoRef}
              fileInputRef={fileInputRef}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {file && !isProcessing && (
              <ConversionSettings
                outputFormat={outputFormat}
                videoCodec={videoCodec}
                audioCodec={audioCodec}
                width={width}
                height={height}
                fps={fps}
                crf={crf}
                preset={preset}
                audioBitrate={audioBitrate}
                resolutionRatio={resolutionRatio}
                onFormatChange={handleFormatChange}
                onVideoCodecChange={(e) => setVideoCodec(e.target.value)}
                onAudioCodecChange={(e) => setAudioCodec(e.target.value)}
                onWidthChange={resolutionRatio === 'custom' ? (e) => setWidth(e.target.value) : handleWidthChange}
                onHeightChange={resolutionRatio === 'custom' ? (e) => setHeight(e.target.value) : handleHeightChange}
                onFpsChange={(e) => setFps(e.target.value ? parseInt(e.target.value) : '')}
                onCrfChange={(e) => setCrf(e.target.value as number | typeof CRF_KEEP)}
                onPresetChange={(e) => setPreset(e.target.value as string | typeof PRESET_KEEP)}
                onAudioBitrateChange={(e) => setAudioBitrate(e.target.value)}
                onRatioChange={handleRatioChange}
                onCrfInfoClick={handleCrfInfoClick}
                onPresetInfoClick={handlePresetInfoClick}
              />
            )}
          </CardContent>

          <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={handleProceed} disabled={!file || isProcessing}>
              {isProcessing ? 'Converting' : 'Convert'}
            </Button>

            {!isProcessing && (
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            )}

            {isProcessing && (
              <Button variant="contained" color="error" onClick={handleStop}>
                Stop
              </Button>
            )}

            {downloadUrl && downloadSize !== null && (
              <Button variant="contained" color="success" onClick={handleDownload}>
                Download ({formatBytes(downloadSize)})
              </Button>
            )}
          </CardActions>

          {isProcessing && (
            <>
              <ProgressDisplay
                progress={progress}
                status={status}
                consoleLogs={consoleLogs}
              />
              <Alert severity="info" sx={{ alignItems: 'center', mt: 2, py: 0 }}>
                <Typography variant='body2' component="p"> <strong>Feels Slow?</strong> - Be on this same tab! processing depends on your system performance. <Link color="info" sx={{ cursor: 'pointer' }} onClick={handlePerformanceDialogOpen}>Learn more</Link></Typography>
              </Alert>
            </>
          )}
        </Card>

        <InfoPopovers
          crfAnchor={crfAnchor}
          presetAnchor={presetAnchor}
          onCrfInfoClose={handleCrfInfoClose}
          onPresetInfoClose={handlePresetInfoClose}
        />

        <PerformanceInfoDialog
          open={isPerformanceDialogOpen}
          onClose={handlePerformanceDialogClose}
        />
      </Container>
    </>
  );
}

export default VideoConvert;
