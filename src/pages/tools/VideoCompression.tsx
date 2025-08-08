import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes, estimateSizeMB } from '../../helpers';

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

// Icons
import CompressIcon from '@mui/icons-material/Compress';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

export const description = "Compress video files online without losing quality. Reduce video file size quickly and securely in your browser with VideoTools' free video compressor.";

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
    setStatus('Preparing...');
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
      const url = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));

      setDownloadUrl(url);
      setDownloadSize(data.length);

      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);

      setProgress(100);
      setStatus('Completed');
      ffmpeg.off('log', logHandler);
    } catch (err) {
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

  // Preset slider marks
  const presetValues = [
    'ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'
  ];

  return (
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Card sx={{ px: 2, py: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Box display="flex" flexDirection="column" alignItems="center">
            <CompressIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h5" color='primary' gutterBottom>Video Compression</Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Reduce video file size while maintaining quality.
              <br />Simple, fast and easy compression for all your videos.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" alignItems="center" flexDirection="column" position="relative" p={2}>
            <Box display="flex" justifyContent="center" alignItems="center" width={120} height={72} borderRadius={1} bgcolor="divider" mb={1}>
              {previewUrl ? (
                <video
                  ref={videoRef}
                  src={previewUrl}
                  controls={false}
                  style={{ width: 120, height: 72, background: '#000' }}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center">No Preview</Typography>
              )}
            </Box>
            <Box flex={1} height={72} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              {!file && <>
                <Typography variant='body2' color='text.secondary'>Click or Drop a file to start the process</Typography>
                <input type="file" accept="video/*" onChange={handleFileChange} style={{ width: '100%', height: '100%', top: 0, opacity: 0, position: 'absolute' }} />
              </>}
              {!!file &&
                <Typography variant="body2" color="primary" noWrap>
                  {file.name} ({formatBytes(file.size)})
                  <IconButton size="small" color='error' onClick={handleRemoveFile} sx={{ ml: 1 }}>
                    <CloseIcon fontSize='small'/>
                  </IconButton>
                </Typography>
              }
            </Box>
          </Box>
          {file && !isProcessing && (
            <Grid container spacing={2} mt={2}>
              <Grid size={{ xs: 12, md: 6 }}>
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
                  <small> {crf} CRF / Est. size: {estimateSizeMB(totalDurationRef.current, crf)} MB </small>
                </Typography>
                <Slider size='small' min={18} max={36} step={1} value={crf} onChange={(_, val) => setCrf(val as number)} valueLabelDisplay="auto" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
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
                  <small>{preset}</small>
                </Typography>
                <Slider size='small' min={0} max={8} step={1} value={presetValues.indexOf(preset)} onChange={(_, val) => setPreset(presetValues[val as number])} valueLabelDisplay="off" />
              </Grid>
            </Grid>
          )}
        </CardContent>

        <CardActions sx={{ display: !!file ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
          <Button variant="contained" onClick={handleProceed} disabled={!file || isProcessing}>
            {isProcessing ? 'Compressing' : 'Compress'}
          </Button>
          {isProcessing && (
            <Button variant="contained" color="error" onClick={handleStop}>
              Stop
            </Button>
          )}
          {downloadUrl && downloadSize !== null && (
            <Button variant="outlined" color="success" onClick={handleDownload}>
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
  );
}

export default VideoCompression;
