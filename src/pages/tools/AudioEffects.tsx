import React from 'react';
import { Helmet } from 'react-helmet-async';
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
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// Grid intentionally not used in this file

// MUI Icons
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useAudioEffects } from './AudioEffects/useAudioEffects';
import EffectControls from './AudioEffects/EffectControls';
import ProgressDisplay from './AudioEffects/ProgressDisplay';

export default function AudioEffects() {
    const theme = useTheme();
    const {
        file,
        previewUrl,
        duration,
        isProcessing,
        progress,
        status,
        errorMsg,
        downloadUrl,
        downloadSize,
        consoleLogs,
        isDragActive,
        fileInputRef,
        speed,
        setSpeed,
        pitch,
        setPitch,
        volume,
        setVolume,
        fadeIn,
        setFadeIn,
        fadeOut,
        setFadeOut,
        normalize,
        setNormalize,
        handleFileChange,
        handleRemoveFile,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleProcess,
        handleStop,
        handleDownload,
        handleReset,
        setDuration
    ,
    eqGains,
    setEqGains
    } = useAudioEffects();

    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    return (
        <>
            <Helmet>
                <title>Audio Effects - Apply Fades, Normalization, Pitch & Speed Effects Free</title>
                <meta name="description" content="Free online audio effects tool to apply fades, normalization, pitch adjustment, speed changes, and volume control to audio files. Professional audio effects in your browser." />
                <link rel="canonical" href="https://fileapps.click/tools/audio-effects" />
            </Helmet>

            <Container maxWidth="lg" sx={{ py: 2, my: 'auto' }}>
                <Card sx={{ p: 1.5 }}>
                    <CardContent sx={{ p: 0 }}>
                        <Box display="flex" alignItems="center">
                            <GraphicEqIcon color="info" fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body1" component="h1" fontWeight={600} mb={0.5}>Audio Effects</Typography>
                        </Box>
                        <Divider sx={{ my: 0.5 }} />
                        <Typography variant="body2" component="h2" color="text.secondary" mb={2}>
                            Apply fades, normalization, pitch adjustment, speed changes & volume control to audio files. Professional effects in your browser.
                        </Typography>

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
                                    <Typography variant="subtitle2" gutterBottom>
                                        Drag & drop an audio file here<br />or<br />Click to select
                                    </Typography>
                                    <Typography color="text.secondary" variant="caption">
                                        Supported: MP3, WAV, AAC, FLAC, OGG, and more
                                    </Typography>
                                </Box>
                            ) : (
                                <Box textAlign="center" width="100%">
                                    <audio ref={audioRef} src={previewUrl || undefined} controls style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1000 }} onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)} />
                                </Box>
                            )}

                            <input
                                ref={fileInputRef as any}
                                accept="audio/*"
                                style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }}
                                id="audio-effects-file-input"
                                type="file"
                                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                                tabIndex={-1}
                            />
                        </Box>

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

                        {file && (
                            <EffectControls
                                speed={speed}
                                onSpeedChange={setSpeed}
                                pitch={pitch}
                                onPitchChange={setPitch}
                                volume={volume}
                                onVolumeChange={setVolume}
                                fadeIn={fadeIn}
                                onFadeInChange={setFadeIn}
                                fadeOut={fadeOut}
                                onFadeOutChange={setFadeOut}
                                normalize={normalize}
                                onNormalizeChange={setNormalize}
                                isProcessing={isProcessing}
                                duration={duration}
                                eqGains={eqGains}
                                setEqGains={setEqGains}
                            />
                        )}
                    </CardContent>

                    <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 0, mt: 2, gap: 1 }}>
                        <Button variant="contained" onClick={handleProcess} disabled={isProcessing || !file}>
                            {isProcessing ? 'Processing' : 'Apply Effects'}
                        </Button>
                        {!isProcessing && (
                            <Button variant="outlined" onClick={handleReset}>Reset</Button>
                        )}
                        {isProcessing && (
                            <Button color="error" variant='contained' onClick={handleStop} disabled={!isProcessing}>Stop</Button>
                        )}
                        {downloadUrl && downloadSize !== null && (
                            <Button color="success" variant='contained' onClick={handleDownload}>Download ({formatBytes(downloadSize)})</Button>
                        )}
                    </CardActions>

                    <ProgressDisplay isProcessing={isProcessing} progress={progress} status={status} consoleLogs={consoleLogs} />

                </Card>

                {errorMsg && <Box sx={{ my: 2 }}><Typography color="error">{errorMsg}</Typography></Box>}
            </Container>
                </>
            );
        }
