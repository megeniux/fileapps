import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// MUI Icons
import SpeedIcon from '@mui/icons-material/Speed';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Components
import PerformanceInfoDialog from '../../components/PerformanceInfoDialog';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;
const ffmpegRef = { current: ffmpeg };


function VideoPlayback() {
    const theme = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [speed, setSpeed] = useState<number>(1);
    const [isReversed, setIsReversed] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [downloadSize, setDownloadSize] = useState<number | null>(null);
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false);

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
            setIsReversed(false);
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
            setIsReversed(false);
            setProgress(0);
            setStatus(null);
            setErrorMsg(null);
            setDownloadUrl(null);
            setDownloadSize(null);
            setConsoleLogs([]);
        }
    };

    const handleRemoveFile = () => {
        // Clear the file input to allow re-uploading the same file
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        
        setFile(null);
        setPreviewUrl(null);
        setSpeed(1);
        setIsReversed(false);
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
            const outputFileName = `${isReversed ? 'reversed_' : ''}speed_${speed}x_${inputFileName}`;
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
            const effectiveSpeed = speed; // Always positive now
            
            if (isReversed) {
                if (effectiveSpeed !== 1) {
                    // Reverse and change speed
                    videoFilter = `setpts=${(1 / effectiveSpeed).toFixed(5)}*PTS,reverse`;
                    // Audio speed: chain atempo filters for >2 or <0.5, then reverse
                    let s = effectiveSpeed;
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
                    filters.push('areverse');
                    audioFilter = filters.join(',');
                } else {
                    // Just reverse, no speed change
                    videoFilter = 'reverse';
                    audioFilter = 'areverse';
                }
                args.push('-vf', videoFilter);
                args.push('-af', audioFilter);
            } else if (effectiveSpeed !== 1) {
                // Just change speed, no reverse
                videoFilter = `setpts=${(1 / effectiveSpeed).toFixed(5)}*PTS`;
                // Audio speed: chain atempo filters for >2 or <0.5
                let s = effectiveSpeed;
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
            const blob = new Blob([new Uint8Array(data as any)], { type: mimeType });
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
            setConsoleLogs(logs => [...logs, String(err)]);
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

    const handleDownload = () => {
        if (downloadUrl && file) {
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `${isReversed ? 'reversed_' : ''}speed_${speed}x_${file.name}`;
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

    const handlePerformanceDialogOpen = () => {
        setIsPerformanceDialogOpen(true);
    };

    const handlePerformanceDialogClose = () => {
        setIsPerformanceDialogOpen(false);
    };

    return (
        <>
            <Helmet>
                <title>Video Playback Speed Editor - Change Video Speed Online Free</title>
                <meta name="description" content="Free online video playback speed editor. Change video speed from slow motion to time-lapse effects. Supports reverse playback and pitch correction. No watermarks, browser-based." />
                <meta name="keywords" content="video speed editor, playback speed, slow motion, time lapse, video speed changer, reverse video, pitch correction, free video tools" />
                <meta property="og:title" content="Video Playback Speed Editor - Change Video Speed Online Free" />
                <meta property="og:description" content="Free online video playback speed editor. Change video speed from slow motion to time-lapse effects. Supports reverse playback and pitch correction. No watermarks, browser-based." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://fileapps.click/tools/video-playback" />
                <link rel="canonical" href="https://fileapps.click/tools/video-playback" />
            </Helmet>
            <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
            <Card sx={{ p: 1.5 }} elevation={3}>
                <CardContent sx={{ p: 0 }}>
                    <Box display="flex" alignItems="center">
                        <SpeedIcon color="secondary" fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body1" component="h1" fontWeight="600" mb={0.5}>
                            Video Playback Speed Editor
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 0.5 }} />
                    <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
                        Change video speed from -20x (reverse) to +20x with pitch correction. Slow motion & time-lapse effects — no watermark, browser-based.
                    </Typography>
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
                        height={300}
                        borderRadius={1}
                        bgcolor={isDragActive ? 'primary.lighter' : 'action.hover'}
                        border={isDragActive ? `2px dashed ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`}
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
                                />

                            </Box>
                        )}
                        <input
                            ref={fileInputRef}
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
                            <IconButton onClick={handleRemoveFile} color="error" sx={{ ml: 1 }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                    {/* Speed controls */}
                    {file && (
                        <Box sx={{ mb: 3, width: '100%' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Playback Speed: {speed}x {isReversed ? '(Reversed)' : ''}
                            </Typography>
                            <Box display="flex" alignItems="center" mb={2}>
                                <IconButton onClick={() => setSpeed(prev => Math.max(0.1, Number((prev - 0.1).toFixed(1))))} disabled={isProcessing}><RemoveIcon /></IconButton>
                                <Slider
                                    value={speed}
                                    min={-5}
                                    max={5}
                                    step={0.1}
                                    onChange={handleSpeedChange}
                                    valueLabelDisplay="auto"
                                    disabled={isProcessing}
                                    sx={{ mx: 1, flex: 1 }}
                                />
                                <IconButton onClick={() => setSpeed(prev => Math.min(20, Number((prev + 0.1).toFixed(1))))} disabled={isProcessing}><AddIcon /></IconButton>
                            </Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isReversed}
                                        onChange={(e) => setIsReversed(e.target.checked)}
                                        disabled={isProcessing}
                                        size="small"
                                    />
                                }
                                label={<Typography variant="subtitle2">Reverse video</Typography>}
                                title="Use the checkbox to reverse video and audio. Speed adjustment applies to both normal and reversed video. 1x is normal speed."
                                sx={{ mb: 2 }}
                            />
                        </Box>
                    )}
                </CardContent>
                <CardActions sx={{ display: !!file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
                    <Button variant="contained" onClick={handleProcess} disabled={isProcessing || !file}>
                        {isProcessing ? 'Processing' : 'Process'}
                    </Button>
                    {!isProcessing && (
                        <Button variant="outlined" onClick={handleReset}>
                            Reset
                        </Button>
                    )}
                    {isProcessing && (
                        <Button color="error" variant='contained' onClick={handleStop} disabled={!isProcessing}>
                            Stop
                        </Button>
                    )}
                    {downloadUrl && downloadSize !== null && (
                        <Button color="success" variant='contained' onClick={handleDownload}>
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

                {isProcessing && (
                    <Alert severity="info" sx={{ alignItems: 'center', mt: 2, py: 0 }}>
                        <Typography variant='body2' component="p"> <strong>Feels Slow?</strong> - Be on this same tab! processing depends on your system performance. <Link color="info" sx={{ cursor: 'pointer' }} onClick={handlePerformanceDialogOpen}>Learn more</Link></Typography>
                    </Alert>
                )}
            </Card>

            <PerformanceInfoDialog
                open={isPerformanceDialogOpen}
                onClose={handlePerformanceDialogClose}
            />

            {errorMsg && <Alert severity="error" sx={{ my: 2 }}>{errorMsg}</Alert>}
        </Container>
        </>
    );
}

export default VideoPlayback;
