// React import intentionally omitted (new JSX transform)
import { Helmet } from 'react-helmet-async'

// MUI Components (mirrors AudioConvertLanding layout & styling)
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Icons (from markdown suggestions)
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TuneIcon from '@mui/icons-material/Tune';
import DownloadIcon from '@mui/icons-material/Download';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SpeedIcon from '@mui/icons-material/Speed';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import HighQualityIcon from '@mui/icons-material/HighQuality';

const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": "How does the audio effects editor work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg compiled to WebAssembly inside your browser. No uploads — everything stays on your device." } },
        { "@type": "Question", "name": "Which audio formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP3, WAV, AAC, FLAC, OGG, M4A, and more." } },
        { "@type": "Question", "name": "Can I change pitch and speed together?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — you can adjust both pitch (semitones) and speed (tempo multiplier) at the same time." } },
        { "@type": "Question", "name": "Is it really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — no signup, no credit card required, and no watermarks." } },
        { "@type": "Question", "name": "Can I use it for music and podcasts?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely — ideal for quick edits, volume balancing, and enhancing audio for content creation." } }
    ]
};

const Root = styled(Paper)(({ theme }) => ({
    '& img': { maxWidth: '100%' },
    '& .hero-section': {
        minHeight: 500,
        paddingTop: theme.spacing(6),
        '& .hero-image': { '& > img': { marginBottom: theme.spacing(2) } },
        [theme.breakpoints.down('md')]: {
            '& .hero-text': { textAlign: 'center', paddingBottom: theme.spacing(6) },
            '& .hero-image > img': { display: 'table', marginInline: 'auto' }
        }
    },
    '& .how-it-works': {
        paddingBlock: theme.spacing(8),
        textAlign: 'center',
        '& .MuiTypography-h2': { color: theme.palette.text.primary }
    },
    '& .faq-section': {
        paddingBlock: theme.spacing(8),
        '& .MuiTypography-h2': { color: theme.palette.text.primary },
        '& .MuiAccordionSummary-root': { padding: theme.spacing(0, 2, 0, 2) },
        '& .MuiAccordionDetails-root': { padding: theme.spacing(0, 2, 2, 2) }
    },
    '& .why-us, & .key-features, & .cta-section': {
        paddingBlock: theme.spacing(8),
        background: `radial-gradient(circle at 50% 0%, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
        textAlign: 'center',
        '& .MuiTypography-h2': { color: theme.palette.common.white }
    },
}));

export default function AudioEffectsLanding() {
    return (
        <Root elevation={0}>
            <Helmet>
                <title>Free Online Audio Effects Editor - Edit Audio with Pitch, Speed, Fade, Normalize (No Signup)</title>
                <meta name="description" content="Edit audio online free with effects like pitch shift, speed change, fade in/out, normalize, and volume adjustment. No signup, no credit card, no uploads required." />
                <meta name="keywords" content="edit audio online free, add effects to audio online free, pitch shifter online free, speed up audio online, slow down music online, normalize audio free, fade in fade out audio online, online audio editor no signup, free browser audio effects tool" />
                <meta property="og:title" content="Edit Audio Online Free - Add Effects Instantly (No Signup, Privacy-First)" />
                <meta property="og:description" content="Apply audio effects like pitch shift, speed change, fade in/out, normalize, and volume boost online. Free, browser-based, and private — no uploads, no signup, no credit card." />
                <meta property="og:image" content="/images/landing/audio-effect-hero.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/tools/audio/audio-effects-online" />
                <meta property="og:site_name" content="FileApps" />
                <link rel="canonical" href="/tools/audio/audio-effects-online" />
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <section className='hero-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
                            <Typography variant="h2" component="h1">Edit Audio Online Free — Apply Effects Instantly</Typography>
                            <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Change pitch, adjust speed, normalize volume, and apply fade in/out — all without uploading files, signing up, or paying. 100% private and secure.</Typography>
                            <Box display="flex" gap={1}>
                                <Button color='info' size='large' href="/tools/audio/effects" variant="contained">Upload</Button>
                                <Button size='large' href="/tools/audio/how-to-audio-effects-online" variant="text" sx={{ color: 'text.secondary' }}>Learn More</Button>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
                            <img src='/images/landing/audio-effect-hero.jpg' alt='Audio Effects Editor' title='Audio Effects Editor' loading='lazy' width="auto" height="auto" style={{ filter: 'hue-rotate(-70deg)' }} />
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='why-us'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent='center'>
                        <Grid size={12}>
                            <Typography variant='h2'>Why Use Our Online Audio Effects Tool?</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                        </Grid>
                        {[{ icon: <PrivacyTipIcon fontSize='large' color="info" />, title: 'Privacy First', desc: 'All processing is done locally in your browser. No uploads or servers.' },
                        { icon: <GraphicEqIcon fontSize='large' color="info" />, title: 'Free & Easy', desc: 'No signup, no credit card, no watermarks.' },
                        { icon: <FlashOnIcon fontSize='large' color="info" />, title: 'Multiple Effects', desc: 'Adjust pitch, speed, fade in/out, normalize, and volume.' },
                        { icon: <MusicNoteIcon fontSize='large' color="info" />, title: 'Universal Formats', desc: 'Works with MP3, WAV, AAC, FLAC, OGG, and more.' }].map((item, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        {item.icon}
                                        <Typography variant='h5' component='h3'>{item.title}</Typography>
                                        <Typography variant='body1'>{item.desc}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            <section className='how-it-works'>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Typography variant='h2'>How It Works</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
                        </Grid>
                        <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center">
                            {[{ icon: <CloudUploadIcon />, title: 'Upload Audio File', desc: 'Drag and drop or click to select.' },
                            { icon: <GraphicEqIcon />, title: 'Choose Effects', desc: 'Adjust pitch, speed, fade, normalize, or volume.' },
                            { icon: <TuneIcon />, title: 'Preview Changes', desc: 'Hear your audio with effects applied.' },
                            { icon: <FlashOnIcon />, title: 'Process in Browser', desc: 'Everything runs instantly using FFmpeg WASM.' },
                            { icon: <DownloadIcon />, title: 'Download Audio', desc: 'Save your edited audio in one click.' }].map((step, i) => (
                                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ bgcolor: 'info.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
                                        <Box>
                                            <Typography variant='h5' component='h3'>{step.title}</Typography>
                                            <Typography variant='body1'>{step.desc}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='key-features'>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Typography variant='h2' mb={4}>Key Features</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                        </Grid>
                        {[{ icon: <LibraryMusicIcon fontSize='large' color='info' />, title: 'Pitch Control', desc: 'Shift audio up or down semitones.' },
                        { icon: <SpeedIcon fontSize='large' color='info' />, title: 'Speed Control', desc: 'Speed up or slow down music and voice.' },
                        { icon: <VolumeUpIcon fontSize='large' color='info' />, title: 'Fade In/Out', desc: 'Smooth transitions for tracks.' },
                        { icon: <HighQualityIcon fontSize='large' color='info' />, title: 'Normalize', desc: 'Auto-adjust volume for consistency.' },
                        { icon: <VolumeUpIcon fontSize='large' color='info' />, title: 'Volume Boost', desc: 'Increase or decrease audio levels.' },
                        { icon: <DownloadIcon fontSize='large' color='info' />, title: 'Instant Download', desc: 'Export effects-applied audio quickly.' }].map((feat, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        {feat.icon}
                                        <Typography variant='h5' component='h3'>{feat.title}</Typography>
                                        <Typography variant='body1'>{feat.desc}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            <section className='faq-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent="center">
                        <Grid size={12}>
                            <Typography variant='h2' mb={4} align='center'>FAQs</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
                        </Grid>
                        {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
                            <Grid key={idx} size={{ xs: 12 }}>
                                <Accordion square disableGutters elevation={3} sx={{ '& .MuiAccordionSummary-root': { px: 1, py: 0.5 }, '& .MuiAccordionDetails-root': { px: 1, py: 1 } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-ae-${idx}-content`} id={`faq-ae-${idx}-header`}>
                                        <Typography variant='h6' component='h3'>{faq.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 2 }}>
                                        <Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            <section className='cta-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent="center">
                        <Grid size={12}><Typography variant='h2' align='center'>Ready to enhance your audio?</Typography></Grid>
                        <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Apply pitch, speed, fades, normalization and more — all locally.</Typography></Grid>
                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button color='inherit' variant='contained' size='large' href='/tools/audio/effects'>Upload</Button>
                            <Button size='large' href='/tools/audio/how-to-audio-effects-online' sx={{ color: 'common.white' }}>Learn More</Button>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </Root>
    );
}
