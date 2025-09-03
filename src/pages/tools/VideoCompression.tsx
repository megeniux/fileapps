import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes, estimateSizeMB } from '../../helpers';
import { Helmet } from 'react-helmet-async';

// MUI
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Icons
import CompressIcon from '@mui/icons-material/Compress';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;


function VideoCompression() {
  const [file, setFile] = useState<File | null>(null);
  const [crf, setCrf] = useState(18);
  const [preset, setPreset] = useState('slower'); // add preset state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const [crfAnchor, setCrfAnchor] = useState<null | HTMLElement>(null);
  const [presetAnchor, setPresetAnchor] = useState<null | HTMLElement>(null);

  const totalDurationRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
      setErrorMsg(null);

      // Create preview URL
      const url = URL.createObjectURL(event.target.files[0]);
      setPreviewUrl(url);

      // Reset duration ref
      totalDurationRef.current = 0;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      totalDurationRef.current = videoRef.current.duration;
      setCrf(28);
    }
  };

  const parseDuration = (msg: string) => {
    const match = msg.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const [, h, m, s] = match;
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
    }
    return 0;
  };

  const parseCurrentTime = (msg: string) => {
    const match = msg.match(/time=(\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const [, h, m, s] = match;
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
    }
    return null;
  };

  const handleProceed = async () => {
    if (!file) return alert('Please select a video file.');

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
        '-preset', preset, // use selected preset
        '-crf', `${crf}`,
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        //'-threads', '2',
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
      setConsoleLogs((logs) => [...logs, String(err)]);
      // Only set errorMsg if not stopped
      if (err.message !== 'called FFmpeg.terminate()') {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      }
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
    setErrorMsg(null); // Clear error on stop
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setDownloadSize(null);
    setProgress(0);
    setStatus(null);
    setConsoleLogs([]);
    totalDurationRef.current = 0;
  };

  const handleDownload = () => {
    if (downloadUrl && file) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `compressed_${file.name}`;
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

  // Remove handleReset logic and replace with reload
  const handleReset = () => {
    window.location.reload();
  };

  // Preset slider marks
  const presetValues = [
    'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'
  ];

  return (
    <>
      <Helmet>
        <title>Video Compressor Online Free – Reduce File Size Without Quality Loss</title>
        <meta name="description" content="Reduce video file size without quality loss using local browser processing. Adjust CRF, bitrate & resolution — private, fast & watermark‑free." />
        <meta name="keywords" content="compress video online free, reduce video file size, video compressor online, compress mp4 online, shrink video file size, video compression tool, compress video without losing quality" />
        <meta property="og:title" content="Free Online Video Compressor – Fast, Private & No Watermark" />
        <meta property="og:description" content="Compress videos locally in your browser. Reduce file size while maintaining quality." />
        <meta property="og:image" content="/images/landing/video-compression-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/tools/video/compress" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="https://fileapps.click/tools/video/compress" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
      {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
      <Card sx={{ p: 1.5 }}>
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center">
            <CompressIcon color="secondary" fontSize='small' sx={{ mr: 0.5 }} />
            <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>Video Compressor</Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
            Reduce video file size without quality loss using local browser processing. Adjust CRF, bitrate & resolution — no uploads, no signup required.
          </Typography>
          {/* Upload area - refactored to match AudioConvert/VideoTrim */}
          <Box
            onDragOver={e => { e.preventDefault(); setIsDragActive(true); }}
            onDragLeave={e => { e.preventDefault(); setIsDragActive(false); }}
            onDrop={e => {
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
                <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Drag & drop a video file here<br />or<br />Click to select
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Supported: MP4, MOV, AVI, MKV, and more
                </Typography>
              </Box>
            ) : (
              <Box textAlign="center" width="100%">
                <video
                  ref={videoRef}
                  src={previewUrl || undefined}
                  controls
                  style={{ maxWidth: '100%', maxHeight: 220, background: '#000', position: 'relative', zIndex: 10 }}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              </Box>
            )}
            <input
              accept="video/*"
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
                <IconButton color='error' onClick={handleRemoveFile} sx={{ ml: 1 }}>
                <CloseIcon fontSize='small' />
              </IconButton>
            </Box>
          )}
          {/* Controls */}
          {file && !isProcessing && (
            <Grid container spacing={2} mt={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box display="flex" alignItems="center">
                    Quality:
                    <IconButton
                      sx={{ ml: 0.5 }}
                      onClick={handleCrfInfoClick}
                      aria-label="CRF info"
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <small> {crf} CRF / Est. size: {estimateSizeMB(totalDurationRef.current, crf)} MB </small>
                </Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => setCrf(prev => Math.max(18, prev - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                    <Slider min={18} max={36} step={1} value={crf} onChange={(_, val) => setCrf(val as number)} valueLabelDisplay="auto" sx={{ mx: 1, flex: 1 }} />
                    <IconButton onClick={() => setCrf(prev => Math.min(36, prev + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box display="flex" alignItems="center">
                    Preset:
                    <IconButton
                      sx={{ ml: 0.5 }}
                      onClick={handlePresetInfoClick}
                      aria-label="Preset info"
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <small>{preset}</small>
                </Typography>
                  <Slider min={0} max={8} step={1} value={presetValues.indexOf(preset)} onChange={(_, val) => setPreset(presetValues[val as number])} valueLabelDisplay="off" />
              </Grid>
            </Grid>
          )}
        </CardContent>

        <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
            <Button variant="contained" onClick={handleProceed} disabled={!file || isProcessing}>
            {isProcessing ? 'Compressing' : 'Compress'}
          </Button>
          {/* Reset button only visible when not processing */}
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
          <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
            <LinearProgress color="success" variant="determinate" value={progress} />
            <Typography variant="body2" my={1}>{`${status} (${progress.toFixed(1)}%)`}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
            </Typography>
          </Box>
        )}
      </Card>

      {/* Compression Info Popover */}
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
          Controls compression speed vs. efficiency.<br />
          Slower presets take more time but produce smaller files.<br />
          Faster presets are quicker but result in larger files.<br />
          Choose "slower" for best compression, "ultrafast" for fastest processing.
        </Typography>
      </Popover>
    </Container>
    </>
  );
}

export default VideoCompression;
