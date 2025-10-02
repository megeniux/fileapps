import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { APP_INFO } from '../../../constants';
import { formatBytes } from '../../../helpers';

// MUI imports
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// Icons
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SecurityIcon from '@mui/icons-material/Security';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedIcon from '@mui/icons-material/Speed';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TuneIcon from '@mui/icons-material/Tune';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Component imports
import { useAudioEffects } from './useAudioEffects';
import EffectControls from './EffectControls';
import ProgressDisplay from './ProgressDisplay';
import FileUploadArea from './FileUploadArea';
import FileInfoDisplay from '../../../components/shared/FileInfoDisplay';

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
        setDuration,
        eqGains,
        setEqGains
    } = useAudioEffects();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Smooth scroll to tool section
    const scrollToTool = () => {
        const toolSection = document.querySelector('.tool');
        if (toolSection) {
            toolSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const benefits = [
        {
            title: '100% Private & Secure',
            description: 'All audio processing happens locally in your browser. Your files never leave your device.',
            icon: <SecurityIcon fontSize="large" color="success" />
        },
        {
            title: 'Professional Effects',
            description: 'Apply studio-quality effects including EQ, normalization, fade in/out, and pitch adjustment.',
            icon: <GraphicEqIcon fontSize="large" color="primary" />
        },
        {
            title: 'Real-time Preview',
            description: 'Preview your audio with effects applied before processing the final output.',
            icon: <PlayArrowIcon fontSize="large" color="info" />
        },
        {
            title: 'Multiple Effects',
            description: 'Combine multiple effects in one processing session for complex audio enhancement.',
            icon: <TuneIcon fontSize="large" color="secondary" />
        },
        {
            title: 'Speed & Pitch Control',
            description: 'Independently adjust playback speed and pitch with precision controls.',
            icon: <SpeedIcon fontSize="large" color="warning" />
        },
        {
            title: 'Volume Normalization',
            description: 'Automatically normalize audio levels for consistent volume across tracks.',
            icon: <VolumeUpIcon fontSize="large" color="error" />
        }
    ];

    const relatedTools = [
        {
            title: 'Audio Converter',
            description: 'Convert between different audio formats',
            icon: <SwapHorizIcon color="secondary" />,
            link: '/tools/audio/convert'
        },
        {
            title: 'Audio Trimmer',
            description: 'Cut and trim audio files with precision',
            icon: <ContentCutIcon color="secondary" />,
            link: '/tools/audio/trim'
        },
        {
            title: 'Audio Merger',
            description: 'Combine multiple audio files seamlessly',
            icon: <MergeTypeIcon color="secondary" />,
            link: '/tools/audio/merge'
        },
        {
            title: 'Audio Speed',
            description: 'Adjust audio playback speed and pitch',
            icon: <SpeedIcon color="secondary" />,
            link: '/tools/audio/playback'
        }
    ];

    return (
        <Root>
            <Helmet>
                <title>Audio Effects Online For Free | {APP_INFO.name}</title>
                <meta
                    name="description"
                    property="og:description"
                    content="Apply effect to audio adjust speed, pitch, volume, apply fade‑in/out, normalize and equalizer."
                />
                <meta property="og:title" content={`Audio Effects Online For Free | ${APP_INFO.name}`} />
                <meta property="og:image" content="/images/landing/audio-effect-hero.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://fileapps.click/tools/audio/effects" />
                <meta property="og:site_name" content={APP_INFO.name} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Audio Effects Online For Free | ${APP_INFO.name}`} />
                <meta name="twitter:description" content="Apply effect to audio adjust speed, pitch, volume, apply fade‑in/out, normalize and equalizer." />
                <meta name="twitter:image" content="/images/landing/audio-effect-hero.png" />
                <link rel="canonical" href="https://fileapps.click/tools/audio/effects" />
                
                {/* FAQ Schema Markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What audio effects can I apply?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "You can apply various professional effects including speed adjustment, pitch shifting, volume control, fade in/out, audio normalization, and 10-band equalizer. All effects can be combined for complex audio enhancement."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I preview effects before applying them?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! You can preview your audio with effects applied in real-time before processing the final output. This allows you to fine-tune your settings for perfect results."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Are the audio effects professional quality?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Absolutely! Our audio effects engine uses studio-quality algorithms for professional results. You can achieve the same quality as expensive desktop audio software."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I adjust speed without changing pitch?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes! Our tool allows independent control of speed and pitch. You can change playback speed while maintaining original pitch, or adjust pitch while keeping the same tempo."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is there a limit to how many effects I can apply?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No limits! You can apply multiple effects simultaneously - adjust EQ, add fade effects, normalize volume, and change speed/pitch all in one processing session."
                                }
                            }
                        ]
                    })}
                </script>
            </Helmet>

            {/* Hero Section */}
            <section className='hero'>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', pt: { xs: 10, md: 20 } }}>
                    <Grid container spacing={6} alignItems="center" flexDirection={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
                            <Stack direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} spacing={2} sx={{ mb: 4 }}>
                                <Chip
                                    label="100% Private"
                                    color="success"
                                    size="medium"
                                    icon={<SecurityIcon />}
                                    sx={{ alignSelf: 'flex-start' }}
                                />
                                <Chip
                                    label="No Upload"
                                    color="info"
                                    size="medium"
                                    icon={<CloudOffIcon />}
                                    sx={{ alignSelf: 'flex-start' }}
                                />
                                <Chip
                                    label="Always Free"
                                    color="warning"
                                    size="medium"
                                    icon={<MoneyOffIcon />}
                                    sx={{ alignSelf: 'flex-start' }}
                                />
                            </Stack>

                            <Typography
                                variant="h1"
                                component="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    mb: 3,
                                    textAlign: { xs: 'center', md: 'left' }
                                }}
                            >
                                <Typography
                                    component="span"
                                    className='gradient-text-primary'
                                    sx={{
                                        fontSize: 'inherit',
                                        fontWeight: 'inherit'
                                    }}
                                >
                                    Audio Effects
                                </Typography>
                                {' '}Online Free
                            </Typography>

                            <Typography
                                variant="h5"
                                color="text.secondary"
                                sx={{
                                    mb: 4,
                                    lineHeight: 1.4,
                                    fontWeight: 400,
                                    textAlign: { xs: 'center', md: 'left' }
                                }}
                            >
                                Apply professional audio effects: adjust speed, pitch, volume, add fade-in/out, normalize, and use 10-band equalizer.
                            </Typography>

                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 6, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<PlayArrowIcon />}
                                    onClick={scrollToTool}
                                    sx={{
                                        py: 1.5,
                                        px: 4,
                                        fontSize: '1.1rem',
                                        fontWeight: 600
                                    }}
                                >
                                    Start Applying Effects
                                </Button>
                                <Button
                                    component={RouterLink}
                                    to="/about"
                                    variant="outlined"
                                    size="large"
                                    startIcon={<InfoIcon />}
                                    sx={{
                                        py: 1.5,
                                        px: 4,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Stack>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    bgcolor: alpha(theme.palette.success.main, 0.08),
                                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                    maxWidth: { xs: '100%', md: 'fit-content' },
                                    mx: { xs: 'auto', md: 0 }
                                }}
                            >
                                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                                    Speed, Pitch, EQ, Fade, Normalize & Volume Controls
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <img
                                    src="/images/landing/audio-effect-hero.png"
                                    alt="Audio Effects Tool Interface"
                                    style={{
                                        width: '100%',
                                        maxWidth: 400,
                                        height: 'auto',
                                        borderRadius: 16
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            {/* Tool Section */}
            <section className="tool">
                <Container maxWidth="lg" sx={{ pt: 20, pb: 10 }}>
                    <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <CardContent sx={{ p: 4 }}>
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

                        <CardActions sx={{ display: file ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center', pb: 4, mt: 2, gap: 1 }}>
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
            </section>

            {/* Benefits Section */}
            <section className="benefits" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
                <Container maxWidth="lg" sx={{ py: 10 }}>
                    <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
                        Why Choose Our Audio Effects Tool?
                    </Typography>

                    <Grid container spacing={4}>
                        {benefits.map((benefit, index) => (
                            <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                                <Card elevation={0} sx={{ height: '100%', bgcolor: alpha(theme.palette.background.paper, 0.5), backdropFilter: 'blur(5px)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[4] } }}>
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <Box sx={{ mb: 2 }}>
                                            {benefit.icon}
                                        </Box>
                                        <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                                            {benefit.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                            {benefit.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <Container maxWidth="md" sx={{ py: 10 }}>
                    <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
                        How It Works
                    </Typography>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ 
                                    width: 80, 
                                    height: 80, 
                                    borderRadius: '50%', 
                                    bgcolor: alpha(theme.palette.primary.main, 0.25), 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    mx: 'auto', 
                                    mb: 2 
                                }}>
                                    <Typography variant="h4" fontWeight={700} color="primary">1</Typography>
                                </Box>
                                <Typography variant="h6" gutterBottom fontWeight={600}>Upload Audio</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Select your audio file or drag & drop it into the effects processor
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ 
                                    width: 80, 
                                    height: 80, 
                                    borderRadius: '50%', 
                                    bgcolor: alpha(theme.palette.secondary.main, 0.25), 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    mx: 'auto', 
                                    mb: 2 
                                }}>
                                    <Typography variant="h4" fontWeight={700} color="secondary">2</Typography>
                                </Box>
                                <Typography variant="h6" gutterBottom fontWeight={600}>Apply Effects</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Adjust speed, pitch, volume, EQ, and add fade effects as needed
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ 
                                    width: 80, 
                                    height: 80, 
                                    borderRadius: '50%', 
                                    bgcolor: alpha(theme.palette.success.main, 0.25), 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    mx: 'auto', 
                                    mb: 2 
                                }}>
                                    <Typography variant="h4" fontWeight={700} color="success">3</Typography>
                                </Box>
                                <Typography variant="h6" gutterBottom fontWeight={600}>Download</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Process and download your enhanced audio file instantly
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            {/* FAQ Section */}
            <section className="faq" style={{ background: alpha(theme.palette.background.paper, 0.25) }}>
                <Container maxWidth="md" sx={{ py: 10 }}>
                    <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
                        Frequently Asked Questions
                    </Typography>

                    <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight={600}>What audio effects can I apply?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                You can apply various professional effects including speed adjustment, pitch shifting, volume control, 
                                fade in/out, audio normalization, and 10-band equalizer. All effects can be combined for complex audio enhancement.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight={600}>Can I preview effects before applying them?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Yes! You can preview your audio with effects applied in real-time before processing the final output. 
                                This allows you to fine-tune your settings for perfect results.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight={600}>Are the audio effects professional quality?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Absolutely! Our audio effects engine uses studio-quality algorithms for professional results. 
                                You can achieve the same quality as expensive desktop audio software.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={0} sx={{ mb: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight={600}>Can I adjust speed without changing pitch?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Yes! Our tool allows independent control of speed and pitch. You can change playback speed while 
                                maintaining original pitch, or adjust pitch while keeping the same tempo.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), border: `1px solid ${theme.palette.divider}` }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" fontWeight={600}>Is there a limit to how many effects I can apply?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                No limits! You can apply multiple effects simultaneously - adjust EQ, add fade effects, normalize volume, 
                                and change speed/pitch all in one processing session.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </section>

            {/* Related Tools Section */}
            <section className="related-tools">
                <Container maxWidth="lg" sx={{ py: 10 }}>
                    <Typography variant="h2" component="h2" align="center" gutterBottom fontWeight={700} sx={{ mb: 6 }}>
                        More Audio Tools
                    </Typography>

                    <Grid container spacing={3}>
                        {relatedTools.map((tool, index) => (
                            <Grid container key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card
                                    component={RouterLink}
                                    to={tool.link}
                                    elevation={0}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        textDecoration: 'none',
                                        background: 'transparent',
                                        border: `1px solid ${theme.palette.divider}`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: theme.shadows[4],
                                            borderColor: theme.palette.secondary.main
                                        }
                                    }}
                                >
                                    <CardContent sx={{
                                        height: '100%',
                                        background: alpha(theme.palette.background.paper, 0.5),
                                        p: 3,
                                        textAlign: 'center'
                                    }}>
                                        <Box sx={{ mb: 2 }}>
                                            {tool.icon}
                                        </Box>
                                        <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                                            {tool.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {tool.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            {/* Final CTA Section */}
            <section className="cta">
                <Container maxWidth="md" sx={{ pb: 10 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                            color: 'white',
                            borderRadius: 3
                        }}
                    >
                        <GraphicEqIcon sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
                            Ready to Enhance Your Audio?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Start applying professional audio effects now with our free, secure, and easy-to-use tool.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={scrollToTool}
                            sx={{
                                bgcolor: 'white',
                                color: theme.palette.primary.main,
                                '&:hover': { bgcolor: alpha('#fff', 0.9) },
                                py: 1.5,
                                px: 4,
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}
                            startIcon={<PlayArrowIcon />}
                        >
                            Apply Effects Now
                        </Button>
                    </Paper>
                </Container>
            </section>
        </Root>
    );
}

// Styled components
const Root = styled('div')(() => ({
    '& .hero': {
        overflow: 'hidden',
    },
}));
