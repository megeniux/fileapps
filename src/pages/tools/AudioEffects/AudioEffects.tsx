import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';
import { styled } from '@mui/material/styles';

// MUI imports
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// Component imports
import { useAudioEffects } from './useAudioEffects';
import EffectControls from './EffectControls';
import ProgressDisplay from './ProgressDisplay';
import FileUploadArea from './FileUploadArea';
import FileInfoDisplay from '../../../components/shared/FileInfoDisplay';

export default function AudioEffects() {

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

    const audioRef = useRef<HTMLAudioElement | null>(null);

    return (
        <>
            <Helmet>
                <title>Audio Effects Online For Free | {APP_INFO.name}</title>
                <meta
                    name="description"
                    property="og:description"
                    content="Apply effect to audio adjust speed, pitch, volume, apply fade‑in/out, normalize and equalizer."
                />
                <meta property="og:title" content={`Audio Effects Online For Free | ${APP_INFO.name}`} />
                <meta property="og:image" content="/images/branding/logo-small.svg" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://fileapps.click/tools/audio-effects" />
                <meta property="og:site_name" content={APP_INFO.name} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Audio Effects Online For Free | ${APP_INFO.name}`} />
                <meta name="twitter:description" content="Apply effect to audio adjust speed, pitch, volume, apply fade‑in/out, normalize and equalizer." />
                <meta name="twitter:image" content="/images/branding/logo-small.svg" />
                <link rel="canonical" href="https://fileapps.click/tools/audio-effects" />
            </Helmet>

            <Root maxWidth="lg">
                <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
                    <CardContent sx={{ p: 0 }}>
                        <Grid container spacing={5} mb={5} justifyContent="center" alignItems="center">
                            <Grid size={{ xs: 12, md: 7 }} textAlign={{ xs: 'center', md: 'left' }}>
                                <Typography variant="h2" component="h1" fontWeight="600">Apply Audio Effects Online </Typography>
                                <Typography variant="h5" component="h2" color="text.secondary" my={2}> Apply effect to audio adjust speed, pitch, volume, apply fade‑in/out, normalize and equalizer. </Typography>
                            </Grid>
                            <Grid container size={{ xs: 12, md: 5 }} order={{ xs: -1, md: 0 }} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                                <img src="/images/landing/audio-effect-hero.jpg" alt="Audio Effects" loading="lazy" width="auto" height="auto" style={{ maxWidth: '100%', maxHeight: 300 }} />
                            </Grid>
                        </Grid>

                        <FileUploadArea
                            file={file}
                            previewUrl={previewUrl}
                            isDragActive={isDragActive}
                            fileInputRef={fileInputRef}
                            audioRef={audioRef}
                            onInputChange={handleFileChange}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
                        />

                        {/* File information and remove button */}
                        {file && <FileInfoDisplay file={file} onRemove={handleRemoveFile} isProcessing={isProcessing} />}

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
            </Root>
        </>
    );
}

// Styled components
const Root = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
}));
