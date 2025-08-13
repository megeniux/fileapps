import React, { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { formatBytes } from '../../helpers';

// MUI imports
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

// Icons
import SpeedIcon from '@mui/icons-material/Speed';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;
const ffmpegRef = { current: ffmpeg };

export const description = "Change video playback speed online. Speed up or slow down videos from -20x to +20x instantly with VideoTools.";

function VideoPlayback() {
    const theme = useTheme();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [speed, setSpeed] = useState<number>(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [downloadSize, setDownloadSize] = useState<number | null>(null);
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
    const [isDragActive, setIsDragActive] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            const selectedFile = event.target.files[0];
            if (!selectedFile.type.startsWith('video/')) {
                setErrorMsg('Please select a video file.');
                return;
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setSpeed(1);
            setProgress(0);
            setStatus(null);
            setErrorMsg(null);
            setDownloadUrl(null);
            setDownloadSize(null);
            setConsoleLogs([]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragActive(false);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
            setSpeed(1);
            setProgress(0);
            setStatus(null);
            setErrorMsg(null);
            setDownloadUrl(null);
            setDownloadSize(null);
            setConsoleLogs([]);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreviewUrl(null);
        setSpeed(1);
        setProgress(0);
        setStatus(null);
        setErrorMsg(null);
        setDownloadUrl(null);
        setDownloadSize(null);
        setConsoleLogs([]);
    };

    const handleReset = () => {
        window.location.reload();
    };

    const handleSpeedChange = (_: Event, value: number | number[]) => {
        if (typeof value === 'number') setSpeed(value);
    };

    const handleProcess = async () => {
        if (!file) {
            setErrorMsg('Please select a video file.');
            return;
        }
        if (speed === 0) {
            setErrorMsg('Speed cannot be zero.');
            return;
        }
        setIsProcessing(true);
        setProgress(0);
        setStatus('Preparing');
        setErrorMsg(null);
        setDownloadUrl(null);
        setDownloadSize(null);
        setConsoleLogs([]);
        try {
            if (!isFFmpegLoaded) {
                await ffmpeg.load();
                isFFmpegLoaded = true;
            }
            ffmpegRef.current = ffmpeg;
            const inputFileName = file.name;
            const outputFileName = `speed_${speed}x_${inputFileName}`;
            await ffmpeg.writeFile(inputFileName, await fetchFile(file));

            let durationParsed = false;
            let videoDuration = 0;
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

            const logHandler = ({ message }: { message: string }) => {
                if (!durationParsed && message.includes('Duration:')) {
                    videoDuration = parseDuration(message);
                    durationParsed = true;
                }
                const current = parseCurrentTime(message);
                if (current && videoDuration > 0) {
                    setProgress(Math.min((current / videoDuration) * 100, 99.5));
                } else if (message.includes('size=')) {
                    setProgress(prev => Math.min(prev + 5, 99));
                }
                setConsoleLogs(logs => [...logs, message]);
            };
            ffmpeg.on('log', logHandler);
            setStatus('Processing');
            // FFmpeg setpts filter for video, atempo for audio
            let args = ['-i', inputFileName];
            let videoFilter = '';
            let audioFilter = '';
            if (speed < 0) {
                // Reverse video and audio
                videoFilter = 'reverse';
                audioFilter = 'areverse';
                args.push('-vf', videoFilter);
                args.push('-af', audioFilter);
            } else if (speed !== 1) {
                // Video speed: setpts=PTS/Speed
                videoFilter = `setpts=${(1 / speed).toFixed(5)}*PTS`;
                // Audio speed: chain atempo filters for >2 or <0.5
                let s = speed;
                let filters = [];
                while (s > 2.0) {
                    filters.push('atempo=2.0');
                    s /= 2.0;
                }
                while (s < 0.5) {
                    filters.push('atempo=0.5');
                    s /= 0.5;
                }
                filters.push(`atempo=${s}`);
                audioFilter = filters.join(',');
                args.push('-vf', videoFilter);
                args.push('-af', audioFilter);
            }
            args.push(outputFileName);
            await ffmpeg.exec(args);
            setStatus('Finalizing');
            setProgress(99.9);
            const data = await ffmpeg.readFile(outputFileName);
            const mimeType = file.type;
            const url = URL.createObjectURL(new Blob([data], { type: mimeType }));
            setDownloadUrl(url);
            setDownloadSize(data.length);
            await ffmpeg.deleteFile(inputFileName);
            await ffmpeg.deleteFile(outputFileName);
            setProgress(100);
            setStatus('Completed');
            ffmpeg.off('log', logHandler);
        } catch (err) {
            setStatus('Failed');
            setConsoleLogs(logs => [...logs, String(err)]);
            if (status !== 'Stopped') {
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

    const handleDownload = () => {
        if (downloadUrl && file) {
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `speed_${speed}x_${file.name}`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
        }
    };

    const handleStop = () => {
        ffmpegRef.current?.terminate?.();
        setIsProcessing(false);
        setStatus('Stopped');
        setProgress(0);
        setErrorMsg(null);
    };

    return (
        <Container maxWidth="md" sx={{ my: 'auto' }}>
            <Card sx={{ px: 3, py: 3 }} elevation={3}>
                <CardContent sx={{ p: 0 }}>
                    {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <SpeedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                        <Typography variant="h5" component="h1" gutterBottom>Video Playback Speed</Typography>
                        <Typography color="text.secondary" variant="body1" component="h2" align="center">
                            Change video playback speed from -20x (reverse) to +20x.
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    {/* Upload & Preview area */}
                    <Box
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        position="relative"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        width="100%"
                        height={220}
                        borderRadius={1}
                        bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
                        border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
                        sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
                    >
                        {!file ? (
                            <Box textAlign="center">
                                <CloudUploadIcon sx={{ fontSize: 32, mb: 1 }} />
                                <Typography variant="subtitle1" gutterBottom>
                                    Drag & drop a video file here, or click to select
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
                            id="video-playback-file-input"
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
                            <IconButton onClick={handleRemoveFile} size="small" color="error" sx={{ ml: 1 }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                    {/* Speed slider */}
                    {file && (
                        <Box sx={{ mb: 3, width: '100%' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Playback Speed: {speed}x
                            </Typography>
                            <Slider
                                value={speed}
                                min={-20}
                                max={20}
                                step={0.1}
                                onChange={handleSpeedChange}
                                valueLabelDisplay="auto"
                                disabled={isProcessing}
                                size="small"
                            />
                            <Typography variant="caption" color="text.secondary">
                                Negative values reverse video and audio. 1x is normal speed.
                            </Typography>
                        </Box>
                    )}
                </CardContent>
                <CardActions sx={{ display: !!file ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
                    <Button variant="contained" onClick={handleProcess} disabled={isProcessing || !file || speed === 0} size="small">
                        {isProcessing ? 'Processing' : 'Process'}
                    </Button>
                    {!isProcessing && (
                        <Button variant="outlined" onClick={handleReset} size="small">
                            Reset
                        </Button>
                    )}
                    {isProcessing && (
                        <Button color="error" variant='contained' onClick={handleStop} disabled={!isProcessing} size="small">
                            Stop
                        </Button>
                    )}
                    {downloadUrl && downloadSize !== null && (
                        <Button color="success" variant='contained' onClick={handleDownload} size="small">
                            Download ({formatBytes(downloadSize)})
                        </Button>
                    )}
                </CardActions>
                {isProcessing && (
                    <Box textAlign="center" bgcolor="action.hover" p={2} mt={2} borderRadius={0.25} overflow="hidden">
                        <LinearProgress color='success' variant="determinate" value={progress} />
                        <Typography variant="body2" my={1}>{`${status} ${progress.toFixed(1)}%`}</Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                            {consoleLogs.length > 0 ? consoleLogs[consoleLogs.length - 1] : ""}
                        </Typography>
                    </Box>
                )}
            </Card>
        </Container>
    );
}

export default VideoPlayback;
