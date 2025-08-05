import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';

// MUI imports
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

// Icons
import CompressIcon from '@mui/icons-material/Compress';


const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;

function VideoCompression() {
  const [bitrate, setBitrate] = useState(512); // default 512 KB
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadSize, setDownloadSize] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const totalDurationRef = useRef<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
      setDownloadUrl(null);
      setDownloadSize(null);
      setProgress(0);
      setStatus(null);
      setConsoleLogs([]);
    }
  };

  const parseDuration = (message: string) => {
    const match = message.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const [, h, m, s] = match;
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
    }
    return 0;
  };

  const parseCurrentTime = (message: string) => {
    const timeMatch = message.match(/time=(\d+):(\d+):(\d+\.\d+)/);
    if (timeMatch) {
      const [, h, m, s] = timeMatch;
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
    }
    return null;
  };

  const handleProceed = async () => {
    if (!file) {
      alert('Please select a video file first.');
      return;
    }

    if (!isFFmpegLoaded) {
      await ffmpeg.load();
      isFFmpegLoaded = true;
    }

    setIsProcessing(true);
    setProgress(0);
    setStatus('Preparing...');
    setConsoleLogs([]); // Clear previous logs

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
        const total = totalDurationRef.current;
        if (current && total > 0) {
          const percent = Math.min((current / total) * 100, 99.5);
          setProgress(percent);
        }
        setConsoleLogs(logs => [...logs, message]);
      };
      ffmpeg.on('log', logHandler);

      await ffmpeg.exec(['-i', inputFileName]);

      // Use custom bitrate from slider
      let bitrateValue = bitrate < 1024 ? `${bitrate}K` : `${(bitrate / 1024).toFixed(1)}M`;
      const compressionOptions = ['-b:v', bitrateValue];
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
    } catch (error) {
      console.error('Error during compression:', error);
      setStatus('Failed');
      setConsoleLogs(logs => [...logs, String(error)]);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setStatus(null);
      }, 2000);
    }
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

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Card sx={{ p: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <Box className="title" display="flex" flexDirection="column" alignItems="center">
            <CompressIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h5" component="h1" align="center" gutterBottom> Video Compression </Typography>
            <Typography variant="body1" component="h2" align="center" color='text.secondary' gutterBottom>Reduce video file size while maintaining quality.<br />Simple, fast and easy compression for all your videos.</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box className="file-input" display="flex" alignItems="center" flexDirection="column" mb={2}>
            <Typography variant="subtitle1" gutterBottom> Choose Video File: </Typography>
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </Box>
          {file && !isProcessing &&
            <Box className="bitrate-slider">
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Select Bitrate: <small>{`${bitrate} KB/s`}</small>
              </Typography>
              <Slider min={64} max={2048} step={16} value={bitrate} onChange={(_, val) => setBitrate(val as number)} valueLabelDisplay="auto" sx={{ mb: 2 }} />
            </Box>
          }
        </CardContent>
        <CardActions sx={{ display: file ? 'flex' : 'none', justifyContent: 'center', p: 0, my: 2, gap: 1 }}>
          <Button variant="contained" color="primary" onClick={handleProceed} disabled={!file || isProcessing} sx={{ minWidth: 120 }} > {isProcessing ? 'Compressing' : 'Proceed'} </Button>
          {downloadUrl && downloadSize !== null && (
            <Button variant="outlined" color="success" onClick={handleDownload} sx={{ minWidth: 120 }} > Download ({formatBytes(downloadSize)}) </Button>
          )}
        </CardActions>
        {/* Display progress and status */}
        {isProcessing && (
          <Box className="file-progress" textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={1}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" align='center' my={1}>{`${status} (${progress.toFixed(1)}%)`}</Typography>
            <Typography variant="caption" color="text.secondary" align='center'>{consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}</Typography>
          </Box>
        )}
      </Card>
    </Container>
  );
}

export default VideoCompression;
