// React import intentionally omitted to use the new JSX transform
import { Helmet } from 'react-helmet-async'

// MUI Components
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import MovieIcon from '@mui/icons-material/Movie';
import GifBoxIcon from '@mui/icons-material/GifBox';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does the browser-based video converter work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We run FFmpeg compiled to WebAssembly (ffmpeg.wasm) inside your browser. Files are processed locally — nothing is uploaded to our servers."
            }
        },
        {
            "@type": "Question",
            "name": "Which formats can I convert to?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Popular output formats are supported: MP4, WebM, MKV, MOV, AVI, GIF, MP3 and WAV. You can also extract audio from video files."
            }
        },
        {
            "@type": "Question",
            "name": "Do I need to sign up or upload files?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No registration and no server uploads required. Conversion runs in your browser for privacy and speed."
            }
        }
    ]
}

const Root = styled(Paper)(({ theme }) => ({
    '& img': {
        maxWidth: '100%'
    },
    '& .hero-section': {
        paddingBlock: theme.spacing(6),
        [theme.breakpoints.only('xs')]: {
            '& .hero-text': {
                textAlign: 'center',
            }
        }
    },
    '& .how-it-works': {
        paddingBlock: theme.spacing(8),
        textAlign: 'center',
        '& .MuiTypography-h2': {
            color: theme.palette.text.primary,
        }
    },
    '& .faq-section': {
        paddingBlock: theme.spacing(8),
        '& .MuiTypography-h2': {
            color: theme.palette.text.primary,
        },
        '& .MuiAccordionSummary-root': {
            padding: theme.spacing(0, 2, 0, 2)
        },
        '& .MuiAccordionDetails-root': {
            padding: theme.spacing(0, 2, 2, 2)
        }
    },
    '& .why-us, & .key-features, & .cta-section': {
        paddingBlock: theme.spacing(8),
        background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        textAlign: 'center',
        '& .MuiTypography-h2': {
            color: theme.palette.common.white
        }
    },
}));

export default function VideoConvertLanding() {
    return (
        <Root elevation={0}>
            <Helmet>
                <title>Browser-based Video Converter — Convert Video Without Uploading</title>
                <meta name="description" content="Convert video in your browser with FFmpeg WASM — MP4, WebM, GIF, MP3 and more. Private, client-side conversion with codec, resolution and quality control." />
                <meta property="og:title" content="Browser-based Video Converter — Convert Video Without Uploading" />
                <meta property="og:description" content="Fast, secure video conversion in the browser. No uploads, no server — privacy-first FFmpeg WASM converter for creators." />
                <meta property="og:image" content="/images/branding/logo-xl.svg" />
                <meta property="og:url" content="https://fileapps.click/tools/video/convert-landing" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://fileapps.click/tools/video/convert-landing" />
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <section className='hero-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, sm: 8, md: 6 }} className='hero-text'>
                            <Typography variant="h2" component="h1">Convert Video in Your Browser — Fast & Private</Typography>
                            <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>
                                Convert to MP4, WebM, GIF or extract MP3 — all in your browser using FFmpeg WebAssembly. No uploads, no accounts, and full control over codecs, resolution and quality.
                            </Typography>
                            <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-start' }} gap={1}>
                                <Button color='primary' size='large' href="/tools/video/convert" variant="contained">Convert Now</Button>
                                <Button size='large' href="/tools/video/convert-blog" variant="text">Read Guide</Button>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 8, md: 6 }} order={{ xs: -1, sm: 1 }}>
                            <img src='/images/landing/video-convert-hero.jpg' alt='Browser-based video converter' title='Convert Video in Browser' loading='lazy' width="auto" height="auto" />
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='why-us'>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid container size={12}>
                            <Grid size={12}><Typography variant='h2'>Why choose our video converter?</Typography>
                                <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} /></Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <SecurityOutlinedIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Privacy-first</Typography>
                                        <Typography variant='body1'>All conversion runs client-side in your browser — your files never leave your device.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <SpeedIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Fast & Free</Typography>
                                        <Typography variant='body1'>No installs, no sign-ups — convert videos quickly from your browser.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <SettingsSuggestIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Advanced Controls</Typography>
                                        <Typography variant='body1'>Choose codecs, CRF quality, presets, resolution and FPS for precise output control.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <DriveFolderUploadIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Drag & Drop</Typography>
                                        <Typography variant='body1'>Simple drag-and-drop upload and in-page preview before export.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='how-it-works'>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={12}><Typography variant='h2'>How it works</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} /></Grid>

                        <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center">
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <DriveFolderUploadIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' component='h3'>Upload or Drag a File</Typography>
                                        <Typography variant='body1'>Select video or audio from your device — no upload required.</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <SettingsSuggestIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' component='h3'>Choose Output</Typography>
                                        <Typography variant='body1'>Pick MP4, WebM, GIF, MP3 or WAV. Select codec, resolution and quality.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <SpeedIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' component='h3'>Convert in Browser</Typography>
                                        <Typography variant='body1'>FFmpeg WASM runs locally and shows live progress. Download when finished.</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='key-features'>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={12}><Typography variant='h2' mb={4}>Key Features</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} /></Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <MovieIcon fontSize='large' color="primary" />
                                    <Typography variant='h5' component="h3" gutterBottom>Multiple formats</Typography>
                                    <Typography variant='body1'>Export MP4, WebM, MKV, MOV, AVI, GIF, MP3 and WAV.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <GifBoxIcon fontSize='large' color="primary" />
                                    <Typography variant='h5' component="h3" gutterBottom>GIF maker & presets</Typography>
                                    <Typography variant='body1'>Create optimized GIFs with FPS and scale controls or choose presets for size vs quality.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 2 }}>
                                    <HeadsetIcon fontSize='large' color="primary" />
                                    <Typography variant='h5' component="h3" gutterBottom>Audio extraction</Typography>
                                    <Typography variant='body1'>Extract MP3 or WAV from any video — perfect for podcasts and clips.</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='faq-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent="center">
                        <Grid size={12}><Typography variant='h2' mb={4} align='center'>FAQs</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} /></Grid>
                        {FAQ_SCHEMA.mainEntity.map((faq, idx) => (
                            <Grid key={idx} size={{ xs: 12 }}>
                                <Accordion
                                    square
                                    disableGutters
                                    elevation={3}
                                    sx={{
                                        '& .MuiAccordionSummary-root': { px: 1, py: 0.5 },
                                        '& .MuiAccordionDetails-root': { px: 1, py: 1 },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`faq-${idx}-content`}
                                        id={`faq-${idx}-header`}
                                    >
                                        <Typography variant='h6' component="h3">{faq.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 2 }}>
                                        <Typography variant='body1'>
                                            {faq.acceptedAnswer?.text}
                                        </Typography>
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
                        <Grid size={12}><Typography variant='h2' align='center'>Ready to convert your videos?</Typography></Grid>
                        <Grid size={12}><Typography variant='h6' component="p" color='common.white'>Convert video without uploading — fast, private and free.</Typography></Grid>
                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button color='inherit' variant="contained" size='large' href="/tools/video/convert">Convert Now</Button>
                            <Button size='large' href="/tools/video/convert-blog" sx={{ color: 'common.white' }}>Read Guide</Button>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </Root>
    )
}
