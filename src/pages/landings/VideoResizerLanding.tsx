// React import intentionally omitted (new JSX transform)
import { Helmet } from 'react-helmet-async'

// MUI Components (layout/style mirrors AudioConvertLanding)
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
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TuneIcon from '@mui/icons-material/Tune';
import ShareIcon from '@mui/icons-material/Share';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import MovieIcon from '@mui/icons-material/Movie';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PreviewIcon from '@mui/icons-material/Preview';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import LanguageIcon from '@mui/icons-material/Language';

// FAQ Schema derived from markdown FAQ section
const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does the browser-based video resizer work?",
            "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg compiled to WebAssembly inside your browser. No uploads — everything stays on your device." }
        },
        {
            "@type": "Question",
            "name": "Which video formats are supported?",
            "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, AVI, MKV, and more common video formats." }
        },
        {
            "@type": "Question",
            "name": "Can I resize videos for social platforms?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, presets are available for YouTube, TikTok, Instagram, and Reels." }
        },
        {
            "@type": "Question",
            "name": "Is it really free?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes — no signup, no credit card required, and no watermarks." }
        },
        {
            "@type": "Question",
            "name": "What if my video is too large?",
            "acceptedAnswer": { "@type": "Answer", "text": "Processing depends on your browser's memory. For very large files, consider compressing first." }
        }
    ]
};

const Root = styled(Paper)(({ theme }) => ({
    '& img': { maxWidth: '100%' },
    '& .hero-section': {
        display: 'flex',
alignItems: 'center',
minHeight: 500,
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
        background: `radial-gradient(circle at 50% 0%, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
        textAlign: 'center',
        '& .MuiTypography-h2': { color: theme.palette.common.white }
    },
}));

export default function VideoResizerLanding() {
    return (
        <Root elevation={0}>
            <Helmet>
                <title>Free Online Video Resizer - Resize Videos in Browser (No Signup, No Uploads)</title>
                <meta name="description" content="Resize videos online free with our browser-based video resizer. No signup, no uploads, no credit card required. Adjust resolution, aspect ratio, FPS, and export instantly with full data privacy." />
                <meta name="keywords" content="resize video online free, online video resizer no signup, resize mp4 video online, change video resolution online, video aspect ratio changer, resize MOV AVI MKV online, private video resizer browser, no credit card video tool" />
                <meta property="og:title" content="Resize Videos Online Free (Privacy-First, No Uploads)" />
                <meta property="og:description" content="Fast, free, and private online video resizer. Change resolution, aspect ratio, and FPS directly in your browser. No uploads, no signups, no watermarks." />
                <meta property="og:image" content="/images/landing/video-resizer-hero.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/tools/video/resize-video-online" />
                <meta property="og:site_name" content="FileApps" />
                <link rel="canonical" href="/tools/video/resize-video-online" />
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <section className='hero-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
                            <Typography variant="h2" component="h1">Resize Videos Online Free — 100% Private & Secure</Typography>
                            <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Adjust resolution, aspect ratio, width, height and FPS in your browser. No uploads, no watermarks, no signups — everything stays on your device.</Typography>
                            <Box display="flex" gap={1}>
                                <Button color='warning' size='large' href="/tools/video/resize" variant="contained">Upload</Button>
                                <Button size='large' href="/tools/video/how-to-resize-video-online" variant="text" sx={{ color: 'text.secondary' }}>Learn More</Button>
                            </Box>
                        </Grid>
                        <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
                            <img src='/images/landing/video-resizer-hero.jpg' alt='Video Resizer' title='Video Resizer' loading='lazy' width="auto" height="auto" />
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='why-us'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent='center' flexGrow={1}>
                        <Grid size={12}>
                            <Typography variant='h2'>Why Use Our Online Video Resizer?</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <PrivacyTipIcon fontSize='large' color="warning" />
                                    <Typography variant='h5' component="h3">Privacy First</Typography>
                                    <Typography variant='body1'>All processing is in your browser. No uploads, no data leaks.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <FlashOnIcon fontSize='large' color="warning" />
                                    <Typography variant='h5' component="h3">Free & Fast</Typography>
                                    <Typography variant='body1'>No signup, no credit card. Resize videos quickly without watermarks.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <TuneIcon fontSize='large' color="warning" />
                                    <Typography variant='h5' component="h3">Custom Resizing</Typography>
                                    <Typography variant='body1'>Adjust resolution, aspect ratio, width, height and FPS.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <ShareIcon fontSize='large' color="warning" />
                                    <Typography variant='h5' component="h3">Social Ready</Typography>
                                    <Typography variant='body1'>Perfect dimensions for YouTube, TikTok, Instagram and more.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
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
                        <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center" flexGrow={1}>
                            {[{ icon: <CloudUploadIcon />, title: 'Upload Video', desc: 'Drag and drop or select your video file.' },
                            { icon: <AspectRatioIcon />, title: 'Choose Settings', desc: 'Enter width, height, or pick aspect ratios.' },
                            { icon: <TuneIcon />, title: 'Select Mode', desc: 'Fit, Fill, Stretch, or Crop.' },
                            { icon: <MovieIcon />, title: 'Resize Video', desc: 'Processing happens locally with FFmpeg WASM.' },
                            { icon: <DownloadIcon />, title: 'Download', desc: 'Export resized MP4 instantly.' }].map((step, i) => (
                                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ bgcolor: 'warning.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
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
                    <Grid container spacing={3} justifyContent="center">
                        <Grid size={12}>
                            <Typography variant='h2' mb={4}>Key Features</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                        </Grid>
                        {[{ icon: <UploadFileIcon fontSize='large' color='warning' />, title: 'Drag & Drop Upload', desc: 'Quick video importing.' },
                        { icon: <PreviewIcon fontSize='large' color='warning' />, title: 'Live Preview', desc: 'See resolution and ratio before exporting.' },
                        { icon: <SettingsIcon fontSize='large' color='warning' />, title: 'Aspect Ratio Presets', desc: '16:9, 9:16, 4:3, 1:1, 21:9.' },
                        { icon: <SpeedIcon fontSize='large' color='warning' />, title: 'FPS Control', desc: 'Adjust frame rate for smoother playback.' },
                        { icon: <VideoFileIcon fontSize='large' color='warning' />, title: 'Cross-Browser', desc: 'Works on Chrome, Safari, Firefox, Edge.' },
                        { icon: <LanguageIcon fontSize='large' color='warning' />, title: 'Instant Download', desc: 'Export resized MP4 in one click.' }].map((feat, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        {feat.icon}
                                        <Typography variant='h5' component="h3">{feat.title}</Typography>
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
                        <Grid size={{ xs: 12 }}>
                            {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
                                <Accordion key={idx} square disableGutters elevation={3}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-vr-${idx}-content`} id={`faq-vr-${idx}-header`}>
                                        <Typography variant='h6' component="h3">{faq.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 2 }}>
                                        <Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='cta-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent="center">
                        <Grid size={12}><Typography variant='h2' align='center'>Ready to resize your video?</Typography></Grid>
                        <Grid size={12}><Typography variant='h6' component="p" color='common.white'>Fast, private and free video resizing — right in your browser.</Typography></Grid>
                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button color='inherit' variant="contained" size='large' href="/tools/video/resize">Upload</Button>
                            <Button size='large' href="/tools/video/how-to-resize-video-online" sx={{ color: 'common.white' }}>Learn More</Button>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </Root>
    );
}
