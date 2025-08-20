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

// Icons
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SpeedIcon from '@mui/icons-material/Speed';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import PublicIcon from '@mui/icons-material/Public';

const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does the browser-based caption burner work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The tool runs FFmpeg compiled to WebAssembly inside your browser. Your video and subtitle files are processed locally — nothing is uploaded to our servers."
            }
        },
        {
            "@type": "Question",
            "name": "Which subtitle formats are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The tool supports SRT and VTT subtitle files. UTF-8 encoding is recommended for best results."
            }
        },
        {
            "@type": "Question",
            "name": "Can I customize caption style before burning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes — choose font size, font color, outline color and outline width to match your brand or platform requirements before exporting."
            }
        },
        {
            "@type": "Question",
            "name": "Will my files leave my device?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No — processing is client-side. Your video and subtitles stay on your machine unless you choose to share the resulting file."
            }
        },
        {
            "@type": "Question",
            "name": "What if my video is very large?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Large files depend on your device’s CPU and memory. We recommend trimming or compressing very large videos first for reliable browser performance."
            }
        }
    ]
}

const Root = styled(Paper)(({ theme }) => ({
    '& img': {
        maxWidth: '100%'
    },
    '& .hero-section': {
        paddingTop: theme.spacing(6),
        '& img': {
            filter: 'hue-rotate(60deg)',
        },
        [theme.breakpoints.only('xs')]: {
            '& .hero-text': {
                textAlign: 'center',
                paddingBottom: theme.spacing(6)
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

export default function BurnCaptionLanding() {
    return (
        <Root elevation={0}>
            <Helmet>
                <title>Free Online Caption Burner | Burn Subtitles into Videos</title>
                <meta name="description" content="Add and style subtitles, then burn them into your video — 100% client-side, no upload, privacy-first. Free caption burner tool for creators." />
                <meta property="og:title" content="Burn Subtitles into Videos Online Fast, Free & Private" />
                <meta property="og:description" content="Hardcode captions into videos in your browser with full style control. No upload. No watermark." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/branding/logo-xl.svg" />
                <meta property="og:url" content="https://fileapps.click/tools/video/burn-caption-landing" />
                <meta property="og:site_name" content="FileApps" />
                <link rel="canonical" href="https://fileapps.click/tools/video/burn-caption-landing" />
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>
            <section className='hero-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, sm: 8, md: 6 }} className='hero-text'>
                            <Typography variant="h2" component="h1">
                                Burn Captions into Videos Online 100% Private & Free
                            </Typography>
                            <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>
                                Add subtitles to your videos easily with our browser-based caption burner. Upload your video, choose an SRT or VTT subtitle file, customize your caption style, and burn captions directly into your video — no uploads, no watermarks, no sign-ups. Everything runs client-side for maximum privacy.
                            </Typography>
                            <Box display="flex" gap={1}>
                                <Button color='primary' size='large' href="/tools/video/burn-caption" variant="contained">Upload Now</Button>
                                <Button size='large' href="/tools/video/burn-captions-blog" variant="text">Learn More</Button>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 8, md: 6 }} order={{ xs: -1, sm: 1 }}>
                            <img src='/images/landing/burn-caption-hero.jpg' alt='Burn Captions' title='Burn Captions' loading='lazy' width="auto" height="auto" />
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <section className='why-us'>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid container size={12}>
                            <Grid size={12}>
                                <Typography variant='h2'>Why Use Our Online Caption Burner?</Typography>
                                <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <SecurityOutlinedIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Privacy First</Typography>
                                        <Typography variant='body1'>Our tool processes videos quickly in your browser, so you can get your work done without delays.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <SpeedIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Free & Fast</Typography>
                                        <Typography variant='body1'>No software to install. No watermarks — get results quickly from your browser.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <FormatSizeIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Custom Styling</Typography>
                                        <Typography variant='body1'>Adjust font size, colors, and outline width to match your brand or platform.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <MobileFriendlyIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Social Ready</Typography>
                                        <Typography variant='body1'>Hard-burn captions optimized for autoplay on Instagram, TikTok, and YouTube.</Typography>
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
                        <Grid size={12}>
                            <Typography variant='h2'>How It Works</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
                        </Grid>

                        <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center">
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', flex: '0 0 56px', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <UploadFileIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' component='h3'>Upload Your Video</Typography>
                                        <Typography variant='body1'>Drag and drop or select a file.</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', flex: '0 0 56px', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <SubtitlesIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' component='h3'>Add Your Subtitle File</Typography>
                                        <Typography variant='body1'>Upload SRT or VTT captions.</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', flex: '0 0 56px', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <SettingsSuggestIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' component='h3'>Customize Style</Typography>
                                        <Typography variant='body1'>Change font size, color, and outline.</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', flex: '0 0 56px', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <SpeedIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' component='h3'>Burn Captions</Typography>
                                        <Typography variant='body1'>Process runs in your browser using FFmpeg WebAssembly.</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', flex: '0 0 56px', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CloudDownloadIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' component='h3'>Download Video</Typography>
                                        <Typography variant='body1'>Get your captioned video in MP4 format instantly.</Typography>
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
                        <Grid container size={12} justifyContent="center">
                            <Grid size={12}>
                                <Typography variant='h2' mb={4}>Key Features</Typography>
                                <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <DriveFolderUploadIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Drag-and-drop upload</Typography>
                                        <Typography variant='body1'>Easily add videos by dragging files into the browser.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <PlayCircleOutlineIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Live video preview</Typography>
                                        <Typography variant='body1'>See your video and captions before exporting.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <FormatSizeIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Subtitle styling controls</Typography>
                                        <Typography variant='body1'>Adjust font size, color and outline for perfect readability.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <HourglassTopIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Real-time progress</Typography>
                                        <Typography variant='body1'>Track processing with a live progress indicator.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <CloudDownloadIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Single-click MP4 download</Typography>
                                        <Typography variant='body1'>Export your captioned MP4 with one click.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: 2 }}>
                                        <PublicIcon fontSize='large' color="primary" />
                                        <Typography variant='h5' component="h3" gutterBottom>Works on all browsers</Typography>
                                        <Typography variant='body1'>Compatible with modern Chrome, Firefox, Safari and Edge.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
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
                        <Grid size={12}>
                            <Typography variant='h2' align='center'>Ready to burn captions?</Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant='h6' component="p" color='common.white'>
                                Upload your video and subtitle file now. It’s 100% free and secure.
                            </Typography>
                        </Grid>
                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button color='inherit' variant="contained" size='large' href="/tools/video/burn-caption">Upload Now</Button>
                            <Button size='large' href="/tools/video/burn-captions-blog" sx={{ color: 'common.white' }}>Learn More</Button>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </Root>
    )
}
