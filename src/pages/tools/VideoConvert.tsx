import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';

// MUI
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// Icons
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

const outputFormats = [
  { label: 'MP4 (H.264/AAC)', value: 'mp4' },
  { label: 'WebM (VP8/Vorbis)', value: 'webm' },
  { label: 'MKV (H.264/AAC/Opus)', value: 'mkv' },
  { label: 'MOV (H.264/AAC)', value: 'mov' },
  { label: 'AVI (MPEG4/MP3)', value: 'avi' },
  { label: 'FLV (Flash Video)', value: 'flv' },
  { label: 'GIF (no audio)', value: 'gif' },
  { label: 'MP3 (audio only)', value: 'mp3' },
  { label: 'WAV (audio only)', value: 'wav' },
];

const videoCodecs = {
  mp4: ['libx264', 'libx265', 'mpeg4'],
  webm: ['libvpx', 'libvpx-vp9'],
  mkv: ['libx264', 'libx265', 'libvpx', 'libvpx-vp9'],
  mov: ['libx264', 'mpeg4'],
  avi: ['mpeg4', 'libx264'],
  flv: ['flv'],
  gif: ['gif'],
  mp3: [],
  wav: [],
};

const audioCodecs = {
  mp4: ['aac', 'mp3'],
  webm: ['libvorbis', 'libopus'],
  mkv: ['aac', 'libvorbis', 'libopus', 'mp3'],
  mov: ['aac', 'mp3'],
  avi: ['mp3'],
  flv: ['mp3'],
  gif: [],
  mp3: ['mp3'],
  wav: ['pcm_s16le'],
};

const presetValues = [
  'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'
];

// Add "keep" option for CRF and Preset
const CRF_KEEP = 'keep';
const PRESET_KEEP = 'keep';

export const description = "Convert videos to MP4, AVI, MOV, and more formats online. Fast, secure, and easy video conversion with VideoTools—no software installation needed.";

function VideoConvert() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Output settings
  const [outputFormat, setOutputFormat] = useState<keyof typeof videoCodecs>('mp4');
  const [videoCodec, setVideoCodec] = useState('libx264');
  const [audioCodec, setAudioCodec] = useState('aac');
  const [width, setWidth] = useState<string>(''); // e.g. "1280"
  const [height, setHeight] = useState<string>(''); // e.g. "720"
  const [fps, setFps] = useState<number | ''>('');
  // Use string for crf and preset to allow "keep"
  const [crf, setCrf] = useState<number | typeof CRF_KEEP>(CRF_KEEP);
  const [preset, setPreset] = useState<string | typeof PRESET_KEEP>(PRESET_KEEP);
  const [audioBitrate, setAudioBitrate] = useState<string>('128k');

  // Add ratio state
  const ratioOptions = [
    { label: 'Custom', value: 'custom', ratio: null },
    { label: '1:1', value: '1:1', ratio: 1 },
    { label: '4:3', value: '4:3', ratio: 4 / 3 },
    { label: '16:9', value: '16:9', ratio: 16 / 9 },
    { label: '9:16', value: '9:16', ratio: 9 / 16 },
    { label: '21:9', value: '21:9', ratio: 21 / 9 },
  ];
  const [resolutionRatio, setResolutionRatio] = useState('custom');

  // Helper to update width/height based on ratio
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWidth(val);
    const selected = ratioOptions.find(r => r.value === resolutionRatio);
    if (selected && selected.ratio && val) {
      const w = parseInt(val, 10);
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)));
      }
    }
  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHeight(val);
    const selected = ratioOptions.find(r => r.value === resolutionRatio);
    if (selected && selected.ratio && val) {
      const h = parseInt(val, 10);
      if (!isNaN(h)) {
        setWidth(String(Math.round(h * selected.ratio)));
      }
    }
  };
  const handleRatioChange = (e: any) => {
    const val = e.target.value;
    setResolutionRatio(val);
    const selected = ratioOptions.find(r => r.value === val);
    if (selected && selected.ratio && width) {
      // If ratio selected, update height based on width
      const w = parseInt(width, 10);
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)));
      }
    }
  };

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

  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef<number>(0);

  const [isDragActive, setIsDragActive] = useState(false);

  // Parse duration from ffmpeg logs
  const parseDuration = (msg: string) => {
    const match = msg.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const [, h, m, s] = match;
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
    }
    return 0;
  };

  // Parse current time from ffmpeg logs
  const parseCurrentTime = (msg: string) => {
    const match = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const [, h, m, s] = match;
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
    }
    return null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
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
  };

  // Add remove file handler
  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    setErrorMsg(null);
    durationRef.current = 0;
  };

  // Get duration from video element
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      durationRef.current = videoRef.current.duration;
    }
  };

  const handleProceed = async () => {
    if (!file) return alert('Please select a video file.');
    // Validate resolution
    if ((width && (!/^\d+$/.test(width) || parseInt(width) <= 0)) ||
        (height && (!/^\d+$/.test(height) || parseInt(height) <= 0))) {
      alert('Please enter a valid positive integer for width and height.');
      return;
    }

    // Ensure width and height are even numbers (required by most codecs)
    let evenWidth = width;
    let evenHeight = height;
    if (width && /^\d+$/.test(width)) {
      const w = parseInt(width, 10);
      evenWidth = (w % 2 === 0) ? String(w) : String(w - 1);
    }
    if (height && /^\d+$/.test(height)) {
      const h = parseInt(height, 10);
      evenHeight = (h % 2 === 0) ? String(h) : String(h - 1);
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
    const ext = outputFormat;
    const outputFileName = `converted_${inputFileName.replace(/\.[^/.]+$/, '')}.${ext}`;

    try {
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
      // Only add CRF if user changed from "keep"
      if (outputFormat !== 'gif' && crf !== CRF_KEEP) {
        args.push('-crf', `${crf}`);
      }
      // Only add preset if user changed from "keep"
      if (outputFormat !== 'gif' && preset !== PRESET_KEEP) {
        args.push('-preset', preset);
      }
      // Resolution
      // Only add -s if both width and height are valid positive integers
      if (
        evenWidth && evenHeight &&
        /^\d+$/.test(evenWidth) && /^\d+$/.test(evenHeight) &&
        parseInt(evenWidth) > 0 && parseInt(evenHeight) > 0
      ) {
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
      // GIF special
      if (outputFormat === 'gif') {
        args.push('-vf', `fps=${fps || 15},scale=${(evenWidth && evenHeight && /^\d+$/.test(evenWidth) && /^\d+$/.test(evenHeight) && parseInt(evenWidth) > 0 && parseInt(evenHeight) > 0) ? `${evenWidth}:${evenHeight}` : '320:-1'}`);
      }
      args.push(outputFileName);

      setStatus('Converting');
      await ffmpeg.exec(args);

      setStatus('Finalizing');
      setProgress(99.9);

      const data = await ffmpeg.readFile(outputFileName);
      const url = URL.createObjectURL(new Blob([data], { type: outputFormat === 'gif' ? 'image/gif' : outputFormat.startsWith('mp3') ? 'audio/mp3' : outputFormat.startsWith('wav') ? 'audio/wav' : 'video/' + outputFormat }));
      setDownloadUrl(url);
      setDownloadSize(data.length);

      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);

      setProgress(100);
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err:any) {
      setStatus('Failed');
      setConsoleLogs((logs) => [...logs, String(err)]);
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setStatus(null);
      }, 2000);
    }
  };

  const handleStop = () => {
    ffmpeg.terminate();
    setStatus('Stopped');
    setIsProcessing(false);
    setErrorMsg(null);
  };

  const handleDownload = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `converted_${file.name.replace(/\.[^/.]+$/, '')}.${outputFormat}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
    }
  };

  const handleCrfInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setCrfAnchor(event.currentTarget);
  };
  const handleCrfInfoClose = () => {
    setCrfAnchor(null);
  };

  const handlePresetInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setPresetAnchor(event.currentTarget);
  };
  const handlePresetInfoClose = () => {
    setPresetAnchor(null);
  };

  // When output format changes, update codecs
  const handleFormatChange = (e: any) => {
    const fmt = e.target.value as keyof typeof videoCodecs;
    setOutputFormat(fmt);
    setVideoCodec(videoCodecs[fmt][0] || '');
    setAudioCodec(audioCodecs[fmt][0] || '');
  };

  // Remove handleReset logic and replace with reload
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Card sx={{ px: 3, py: 3 }} elevation={5}>
        <CardContent sx={{ p: 0 }}>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Box display="flex" flexDirection="column" alignItems="center">
            <SwapHorizIcon sx={{ fontSize: 40, mb: 2 }} color="secondary" />
            <Typography variant="h5" component="h1" gutterBottom>Video Converter</Typography>
            <Typography color="text.secondary" variant="body1" component="h2" align="center">
              Convert videos to different formats, codecs, resolutions and more.<br />
              Advanced options for quality, speed, and compatibility.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }}/>
          {/* Upload area - refactored to match AudioConvert/VideoTrim/VideoCompression/VideoResize */}
          <Box
            onDragOver={e => { e.preventDefault(); setIsDragActive(true); }}
            onDragLeave={e => { e.preventDefault(); setIsDragActive(false); }}
            onDrop={e => {
              e.preventDefault();
              setIsDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const selectedFile = e.dataTransfer.files[0];
                if (!selectedFile.type.startsWith('video/') && !selectedFile.type.startsWith('audio/')) {
                  setErrorMsg('Please select a video or audio file.');
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
                durationRef.current = 0;
              }
            }}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height={220}
            borderRadius={1}
            bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
            border={isDragActive ? theme => `2px dashed ${theme.palette.primary.main}` : theme => `2px dashed ${theme.palette.divider}`}
            sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
          >
            {!file ? (
              <Box textAlign="center">
                <CloudUploadIcon sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Drag & drop a video or audio file here, or click to select
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Supported: MP4, MOV, AVI, MKV, MP3, WAV, and more
                </Typography>
              </Box>
            ) : (
              <Box textAlign="center" width="100%">
                {file.type.startsWith('video/') ? (
                  <video
                    ref={videoRef}
                    src={previewUrl || undefined}
                    controls
                    style={{ maxWidth: '100%', maxHeight: 220, background: '#000', position: 'relative', zIndex: 10 }}
                    onLoadedMetadata={handleLoadedMetadata}
                  />
                ) : (
                  <audio
                    src={previewUrl || undefined}
                    controls
                    style={{ width: '100%', maxWidth: 500 }}
                  />
                )}
              </Box>
            )}
            <input
              accept="video/*,audio/*"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                opacity: 0,
                cursor: 'pointer',
                zIndex: 2
              }}
              id="video-file-input"
              type="file"
              onChange={handleFileChange}
              tabIndex={-1}
            />
          </Box>
          {/* Filename and remove button */}
          {file && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Typography variant="body2" noWrap>
                {file.name} ({formatBytes(file.size)})
              </Typography>
              <IconButton size="small" color='error' onClick={handleRemoveFile} sx={{ ml: 1 }}>
                <CloseIcon fontSize='small'/>
              </IconButton>
            </Box>
          )}
          {/* End Upload UI */}
          {file && !isProcessing && (
            <Grid container spacing={2} mt={2}>
              <Grid size={{xs: 12, md: 6 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Output Format:
                </Typography>
                <Select
                  size="small"
                  fullWidth
                  value={outputFormat}
                  onChange={handleFormatChange}
                >
                  {outputFormats.map(f => (
                    <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid size={{xs: 12, md: 6 }}>
                <Typography variant="subtitle1">Resolution: (in Pixels)</Typography>
                <Box display="flex" alignItems="center" flex={1} gap={1}>
                  <TextField
                    size="small"
                    type="number"
                    value={width}
                    onChange={resolutionRatio === 'custom' ? e => setWidth(e.target.value) : handleWidthChange}
                    placeholder="Width"
                    sx={{ flex: 1 }}
                    disabled={false}
                  />
                  <Typography color="text.secondary">x</Typography>
                  <TextField
                    size="small"
                    type="number"
                    value={height}
                    onChange={resolutionRatio === 'custom' ? e => setHeight(e.target.value) : handleHeightChange}
                    placeholder="Height"
                    sx={{ flex: 1 }}
                    disabled={false}
                  />
                  <Select
                    size="small"
                    value={resolutionRatio}
                    onChange={handleRatioChange}
                    sx={{ minWidth: 100 }}
                  >
                    {ratioOptions.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </Select>
                </Box>
                {resolutionRatio !== 'custom' && (
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    Ratio locked: {ratioOptions.find(r => r.value === resolutionRatio)?.label}
                  </Typography>
                )}
              </Grid>
              <Grid size={{xs: 12, md: 6 }}>
                <Typography variant="subtitle1">Video Codec:</Typography>
                <Select
                  size="small"
                  fullWidth
                  value={videoCodec}
                  onChange={e => setVideoCodec(e.target.value)}
                  disabled={videoCodecs[outputFormat].length === 0}
                >
                  {videoCodecs[outputFormat].map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid size={{xs: 12, md: 6 }}>
                <Typography variant="subtitle1">Audio Codec:</Typography>
                <Select
                  size="small"
                  fullWidth
                  value={audioCodec}
                  onChange={e => setAudioCodec(e.target.value)}
                  disabled={audioCodecs[outputFormat].length === 0}
                >
                  {audioCodecs[outputFormat].map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid size={{xs: 12, md: 6 }}>
                <Typography variant="subtitle1">Audio Bitrate:</Typography>
                <TextField
                  size="small"
                  fullWidth
                  value={audioBitrate}
                  onChange={e => setAudioBitrate(e.target.value)}
                  placeholder="e.g. 128k"
                  disabled={audioCodecs[outputFormat].length === 0}
                />
              </Grid>
              <Grid size={{xs: 12, md: 6 }}>
                <Typography variant="subtitle1">FPS:</Typography>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  value={fps}
                  onChange={e => setFps(e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="e.g. 30"
                />
              </Grid>
              <Grid size={{xs: 12, md: 6 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box display="flex" alignItems="center">
                    Quality:
                    <IconButton
                      size="small"
                      sx={{ ml: 0.5 }}
                      onClick={handleCrfInfoClick}
                      aria-label="CRF info"
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <small>
                    {crf === CRF_KEEP ? 'Keep as original' : `${crf} CRF`}
                  </small>
                </Typography>
                <Select
                  size="small"
                  fullWidth
                  value={crf}
                  onChange={e => setCrf(e.target.value as number | typeof CRF_KEEP)}
                  sx={{ mb: 1 }}
                >
                  <MenuItem value={CRF_KEEP}>Keep as original</MenuItem>
                  {[...Array(19)].map((_, i) => {
                    const val = 18 + i;
                    return <MenuItem key={val} value={val}>{val} (CRF)</MenuItem>;
                  })}
                </Select>
              </Grid>
              <Grid size={{xs: 12, md: 6 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box display="flex" alignItems="center">
                    Preset:
                    <IconButton
                      size="small"
                      sx={{ ml: 0.5 }}
                      onClick={handlePresetInfoClick}
                      aria-label="Preset info"
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <small>
                    {preset === PRESET_KEEP ? 'Keep as original' : preset}
                  </small>
                </Typography>
                <Select
                  size="small"
                  fullWidth
                  value={preset}
                  onChange={e => setPreset(e.target.value as string | typeof PRESET_KEEP)}
                  sx={{ mb: 1 }}
                >
                  <MenuItem value={PRESET_KEEP}>Keep as original</MenuItem>
                  {presetValues.map(p => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{display: !!file ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleProceed} disabled={!file || isProcessing} size="small">
            {isProcessing ? 'Converting' : 'Convert'}
          </Button>
          {/* Reset button only visible when not processing */}
          {!isProcessing && (
            <Button variant="outlined" onClick={handleReset} size="small">
              Reset
            </Button>
          )}
          {isProcessing && (
            <Button variant="contained" color="error" onClick={handleStop} size="small">
              Stop
            </Button>
          )}
          {downloadUrl && downloadSize !== null && (
            <Button variant="outlined" color="success" onClick={handleDownload} size="small">
              Download ({formatBytes(downloadSize)})
            </Button>
          )}
        </CardActions>
        {isProcessing && (
          <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
            <LinearProgress color='success' variant="determinate" value={progress} />
            <Typography variant="body2" my={1}>{`${status} (${progress.toFixed(1)}%)`}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
            </Typography>
          </Box>
        )}
      </Card>
      {/* CRF Info Popover */}
      <Popover
        open={Boolean(crfAnchor)}
        anchorEl={crfAnchor}
        onClose={handleCrfInfoClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Typography variant="body2" px={2} py={1}>
          <b>CRF (Constant Rate Factor):</b><br />
          Lower CRF means higher quality and larger file size.<br />
          Higher CRF reduces file size but may make the video look blurry.<br />
          Typical values: 18 (high quality) to 36 (low quality).
        </Typography>
      </Popover>
      {/* Preset Info Popover */}
      <Popover
        open={Boolean(presetAnchor)}
        anchorEl={presetAnchor}
        onClose={handlePresetInfoClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Typography variant="body2" px={2} py={1}>
          <b>Preset:</b><br />
          Controls conversion speed vs. efficiency.<br />
          Slower presets take more time but produce smaller files.<br />
          Faster presets are quicker but result in larger files.<br />
          Choose "slower" for best compression, "ultrafast" for fastest processing.
        </Typography>
      </Popover>
    </Container>
  );
}

export default VideoConvert;