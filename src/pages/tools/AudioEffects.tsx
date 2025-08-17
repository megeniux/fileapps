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
import Grid from '@mui/material/Grid';

// Icons
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;
const ffmpegRef = { current: ffmpeg };

export const description = "Apply effects to your audio: fade in/out, normalize, change speed, pitch, and volume. All processing is done in your browser.";

function AudioEffects() {
    const theme = useTheme();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [downloadSize, setDownloadSize] = useState<number | null>(null);
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
    const [isDragActive, setIsDragActive] = useState(false);

    // Effect controls
    const [speed, setSpeed] = useState<number>(1);
    const [pitch, setPitch] = useState<number>(0); // semitones
    const [fadeIn, setFadeIn] = useState<number>(0);
    const [fadeOut, setFadeOut] = useState<number>(0);
    const [normalize, setNormalize] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);

    const audioRef = useRef<HTMLAudioElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            const selectedFile = event.target.files[0];
            if (!selectedFile.type.startsWith('audio/')) {
                setErrorMsg('Please select an audio file.');
                return;
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setDuration(0);
            setProgress(0);
            setStatus(null);
            setErrorMsg(null);
            setDownloadUrl(null);
            setDownloadSize(null);
            setConsoleLogs([]);
            setSpeed(1);
            setPitch(0);
            setFadeIn(0);
            setFadeOut(0);
            setNormalize(false);
            setVolume(1);
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
            if (!selectedFile.type.startsWith('audio/')) {
                setErrorMsg('Please select an audio file.');
                return;
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setDuration(0);
            setProgress(0);
            setStatus(null);
            setErrorMsg(null);
            setDownloadUrl(null);
            setDownloadSize(null);
            setConsoleLogs([]);
            setSpeed(1);
            setPitch(0);
            setFadeIn(0);
            setFadeOut(0);
            setNormalize(false);
            setVolume(1);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreviewUrl(null);
        setDuration(0);
        setProgress(0);
        setStatus(null);
        setErrorMsg(null);
        setDownloadUrl(null);
        setDownloadSize(null);
        setConsoleLogs([]);
        setSpeed(1);
        setPitch(0);
        setFadeIn(0);
        setFadeOut(0);
        setNormalize(false);
        setVolume(1);
    };

    const handleReset = () => {
        window.location.reload();
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Effect controls handlers
    const handleSpeedChange = (_: Event, value: number | number[]) => {
        if (typeof value === 'number') setSpeed(value);
    };
    const handlePitchChange = (_: Event, value: number | number[]) => {
        if (typeof value === 'number') setPitch(value);
    };
    const handleFadeInChange = (_: Event, value: number | number[]) => {
        if (typeof value === 'number') setFadeIn(value);
    };
    const handleFadeOutChange = (_: Event, value: number | number[]) => {
        if (typeof value === 'number') setFadeOut(value);
    };
    const handleNormalizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNormalize(e.target.checked);
    };
    const handleVolumeChange = (_: Event, value: number | number[]) => {
        if (typeof value === 'number') setVolume(value);
    };

    // Build FFmpeg filter string
    const buildFilter = () => {
        let filters: string[] = [];
        // Speed
        if (speed !== 1) {
            let s = speed;
            // FFmpeg atempo supports 0.5-2.0, chain if needed
            while (s > 2.0) {
                filters.push('atempo=2.0');
                s /= 2.0;
            }
            while (s < 0.5) {
                filters.push('atempo=0.5');
                s /= 0.5;
            }
            filters.push(`atempo=${s.toFixed(3)}`);
        }
        // Pitch (rubberband, asetrate, or asetrate+aresample)
        if (pitch !== 0) {
            // Use asetrate for pitch shift (approximate, changes speed too)
            // To keep duration, combine with atempo
            // semitones to ratio: 2^(n/12)
            const ratio = Math.pow(2, pitch / 12);
            filters.push(`asetrate=44100*${ratio.toFixed(5)}`);
            filters.push('aresample=44100');
            filters.push(`atempo=${(1 / ratio).toFixed(5)}`);
        }
        // Fade in
        if (fadeIn > 0) {
            filters.push(`afade=t=in:st=0:d=${fadeIn}`);
        }
        // Fade out
        if (fadeOut > 0 && duration > 0) {
            filters.push(`afade=t=out:st=${Math.max(0, duration - fadeOut)}:d=${fadeOut}`);
        }
        // Normalize
        if (normalize) {
            filters.push('dynaudnorm');
        }
        // Volume
        if (volume !== 1) {
            filters.push(`volume=${volume}`);
        }
        return filters.length ? filters.join(',') : '';
    };

    const handleProcess = async () => {
        if (!file) {
            setErrorMsg('Please select an audio file.');
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
            const outputFileName = `effect_${inputFileName}`;
            await ffmpeg.writeFile(inputFileName, await fetchFile(file));
            const logHandler = ({ message }: { message: string }) => {
                setConsoleLogs(logs => [...logs, message]);
                if (message.includes('size=')) {
                    setProgress(prev => Math.min(prev + 5, 99));
                }
            };
            ffmpeg.on('log', logHandler);
            setStatus('Processing');
            let args = ['-i', inputFileName];
            const filterStr = buildFilter();
            if (filterStr) {
                args.push('-af', filterStr);
            }
            args.push(outputFileName);
            await ffmpeg.exec(args);
            setStatus('Finalizing');
            setProgress(99.9);
            const data = await ffmpeg.readFile(outputFileName);
            const mimeType = file.type || 'audio/mpeg';
            const url = URL.createObjectURL(new Blob([data], { type: mimeType }));
            setDownloadUrl(url);
            setDownloadSize(data.length);
            await ffmpeg.deleteFile(inputFileName);
            await ffmpeg.deleteFile(outputFileName);
            setProgress(100);
            setStatus('Completed');
            ffmpeg.off('log', logHandler);
        } catch (err:any) {
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
            a.download = `effect_${file.name}`;
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
                        <GraphicEqIcon color="info" sx={{ fontSize: '3rem', mb: 2 }} />
                        <Typography variant="h5" component="h1" gutterBottom>Audio Effects</Typography>
                        <Typography color="text.secondary" variant="body1" component="h2" align="center">
                            Apply effects: fade in/out, normalize, speed, pitch, and volume.
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
                        border={isDragActive ? `2px dashed ${theme.palette.info.main}` : `2px dashed ${theme.palette.divider}`}
                        sx={{ cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}
                    >
                        {!file ? (
                            <Box textAlign="center">
                                <CloudUploadIcon sx={{ fontSize: '1.5rem', mb: 1 }} />
                                <Typography variant="subtitle1" gutterBottom>
                                    Drag & drop an audio file here<br/>or<br/>Click to select
                                </Typography>
                                <Typography color="text.secondary" variant="caption">
                                    Supported: MP3, WAV, AAC, FLAC, OGG, and more
                                </Typography>
                            </Box>
                        ) : (
                            <Box textAlign="center" width="100%">
                                <audio ref={audioRef} src={previewUrl || undefined} controls style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1000 }} onLoadedMetadata={handleLoadedMetadata} />
                            </Box>
                        )}
                        <input
                            accept="audio/*"
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
                            id="audio-effects-file-input"
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
                    {/* Effect controls */}
                    {file && (
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Speed
                                    <small> ({speed}x)</small>
                                </Typography>
                                <Slider
                                    value={speed}
                                    min={-3}
                                    max={3}
                                    step={0.01}
                                    onChange={handleSpeedChange}
                                    valueLabelDisplay="auto"
                                    disabled={isProcessing}
                                    size="small"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Pitch
                                    <small> ({pitch} semitones)</small>
                                </Typography>
                                <Slider
                                    value={pitch}
                                    min={-12}
                                    max={12}
                                    step={1}
                                    onChange={handlePitchChange}
                                    valueLabelDisplay="auto"
                                    disabled={isProcessing}
                                    size="small"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Typography variant="subtitle2" gutterBottom>Volume</Typography>
                                <Slider
                                    value={volume}
                                    min={0}
                                    max={3}
                                    step={0.01}
                                    onChange={handleVolumeChange}
                                    valueLabelDisplay="auto"
                                    disabled={isProcessing}
                                    size="small"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Fade In
                                    <small> ({fadeIn} seconds)</small>
                                </Typography>
                                <Slider
                                    value={fadeIn}
                                    min={0}
                                    max={Math.floor(duration)}
                                    step={0.1}
                                    onChange={handleFadeInChange}
                                    valueLabelDisplay="auto"
                                    disabled={isProcessing}
                                    size="small"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Typography variant="subtitle2" gutterBottom >
                                    Fade Out
                                    <small> ({fadeOut} seconds)</small>
                                </Typography>
                                <Slider
                                    value={fadeOut}
                                    min={0}
                                    max={Math.floor(duration)}
                                    step={0.1}
                                    onChange={handleFadeOutChange}
                                    valueLabelDisplay="auto"
                                    disabled={isProcessing}
                                    size="small"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Typography variant="subtitle2" gutterBottom>Normalize</Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <input type="checkbox" checked={normalize} onChange={handleNormalizeChange} disabled={isProcessing} />
                                    <Typography variant="caption" color="text.secondary">Auto volume normalization</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
                <CardActions sx={{ display: !!file ? 'flex' : 'none', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
                    <Button variant="contained" onClick={handleProcess} disabled={isProcessing || !file} size="small">
                        {isProcessing ? 'Processing' : 'Apply Effects'}
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

export default AudioEffects;
