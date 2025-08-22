// Clean implementation after previous corruption
import { Helmet } from 'react-helmet-async'
import { styled } from '@mui/material/styles'
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
// Icons actually used
import SubtitlesIcon from '@mui/icons-material/Subtitles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import BrushIcon from '@mui/icons-material/Brush'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import TuneIcon from '@mui/icons-material/Tune'
import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import SpeedIcon from '@mui/icons-material/Speed'

const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": "How does the online caption burner work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg WASM inside your browser – no uploads, no data sharing." } },
        { "@type": "Question", "name": "Which video and subtitle formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, MKV, AVI for videos; SRT and VTT for subtitles." } },
        { "@type": "Question", "name": "Can I customize subtitle font and color?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – choose font size, color, and outline before burning." } },
        { "@type": "Question", "name": "Is this really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – no signups, no credit card, no watermark, 100% free." } },
        { "@type": "Question", "name": "Does it work on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – works on Android and iOS in modern browsers." } }
    ]
}

const Root = styled(Paper)(({ theme }) => ({
    '& img': { maxWidth: '100%' },
    '& .hero-section': {
        minHeight: 500,
        paddingTop: theme.spacing(6),
        '& .hero-image img': { marginBottom: theme.spacing(2) },
        [theme.breakpoints.down('md')]: {
            '& .hero-text': { textAlign: 'center', paddingBottom: theme.spacing(6) },
            '& .hero-image img': { display: 'table', marginInline: 'auto' }
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
        background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        textAlign: 'center',
        '& .MuiTypography-h2': { color: theme.palette.common.white }
    },
}));

export default function BurnCaptionLanding() {
    return (
        <Root elevation={0}>
            <Helmet>
                <title>Free Online Caption Burner – Burn Subtitles into Video (No Signup, No Watermark)</title>
                <meta name="description" content="Burn captions (SRT, VTT) into videos online for free. Customize font, color, and outline. No signup, no credit card, no watermark – 100% browser-based and private." />
                <meta name="keywords" content="burn captions online free, add subtitles to video online, hardcode subtitles online, embed captions in video free, no signup subtitle burner, drag & drop caption tool, burn captions to MP4 online, add SRT to video free, customize subtitle font online" />
                <meta property="og:title" content="Burn Captions into Videos Online – Free & Private (No Signup)" />
                <meta property="og:description" content="Add subtitles to any video and burn them permanently online. Free, no watermark, no signup, full customization. Runs in your browser for privacy." />
                <meta property="og:image" content="/images/landing/burn-caption-hero.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/tools/video/burn-captions-into-video-online" />
                <meta property="og:site_name" content="FileApps" />
                <link rel="canonical" href="/tools/video/burn-captions-into-video-online" />
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <section className='hero-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
                            <Typography variant="h2" component="h1">Burn Captions into Your Videos Online – Free, Fast & No Signup</Typography>
                            <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Add subtitles (SRT, VTT) to your video and burn them permanently in the browser. Customize font, color, and outline. No uploads, no watermarks, no credit card required.</Typography>
                            <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Button color='primary' size='large' href="/tools/video/burn-caption" variant="contained">Upload</Button>
                                <Button size='large' href="/tools/video/how-to-burn-captions-into-video-online" variant="text" sx={{ color: 'text.secondary' }}>Learn More</Button>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
                            <img src='/images/landing/burn-caption-hero.jpg' alt='Laptop with video player and subtitle styling UI' title='Caption Burner' loading='lazy' width="auto" height="auto" style={{ filter: 'hue-rotate(65deg)' }} />
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='why-us'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent='center'>
                        <Grid size={12}>
                            <Typography variant='h2'>Why Use Our Online Caption Burner?</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                        </Grid>
                        {[{ icon: <PrivacyTipIcon fontSize='large' color='primary' />, title: '100% Private', desc: 'All processing happens in your browser. No uploads, no data leaks.' },
                        { icon: <FlashOnIcon fontSize='large' color='primary' />, title: 'Free & No Signup', desc: 'No credit card required. Burn captions instantly with no watermark.' },
                        { icon: <SubtitlesIcon fontSize='large' color='primary' />, title: 'Custom Styling', desc: 'Change font size, color, and outline before burning.' },
                        { icon: <ColorLensIcon fontSize='large' color='primary' />, title: 'Supports All Videos', desc: 'MP4, MOV, MKV, AVI, and more.' }].map((item, i) => (
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
                            {[{ icon: <CloudUploadIcon />, title: 'Upload Video File', desc: 'Drag & drop or click to select.' },
                            { icon: <SubtitlesIcon />, title: 'Add Subtitle File', desc: 'Upload SRT or VTT.' },
                            { icon: <BrushIcon />, title: 'Customize Captions', desc: 'Adjust font size, color, outline.' },
                            { icon: <TuneIcon />, title: 'Burn Captions', desc: 'Processing happens in your browser.' },
                            { icon: <DownloadIcon />, title: 'Download Video', desc: 'Get your captioned video instantly.' }].map((step, i) => (
                                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
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
                        {[{ icon: <UploadFileIcon fontSize='large' color='primary' />, title: 'Drag & Drop Upload', desc: 'Add video files easily.' },
                        { icon: <SubtitlesIcon fontSize='large' color='primary' />, title: 'Subtitle Support', desc: 'SRT and VTT formats supported.' },
                        { icon: <ColorLensIcon fontSize='large' color='primary' />, title: 'Custom Fonts & Colors', desc: 'Adjust size, font color, and outline width.' },
                        { icon: <HighQualityIcon fontSize='large' color='primary' />, title: 'Cross-Browser', desc: 'Works without installing any app.' },
                        { icon: <DownloadIcon fontSize='large' color='primary' />, title: 'Instant Download', desc: 'Export captioned video without waiting.' },
                        { icon: <SpeedIcon fontSize='large' color='primary' />, title: 'Free Forever', desc: 'No signup, no credit card, no watermark.' }].map((feat, i) => (
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
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-bc-${idx}-content`} id={`faq-bc-${idx}-header`}>
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
                        <Grid size={12}><Typography variant='h2' align='center'>Ready to burn captions?</Typography></Grid>
                        <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Upload your video now — free, fast & private.</Typography></Grid>
                        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button color='inherit' variant='contained' size='large' href='/tools/video/burn-caption'>Upload</Button>
                            <Button size='large' href='/tools/video/how-to-burn-captions-into-video-online' sx={{ color: 'common.white' }}>Learn More</Button>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </Root>
    )
}
