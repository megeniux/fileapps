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
import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import SpeedIcon from '@mui/icons-material/Speed'
import PreviewIcon from '@mui/icons-material/Preview'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is it private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All processing is local — no uploads or data collection." } },
    { "@type": "Question", "name": "Which subtitle formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "Standard SRT and VTT (WebVTT) files." } },
    { "@type": "Question", "name": "Which video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, MKV, WebM and others the browser can decode." } },
    { "@type": "Question", "name": "Can I change caption position?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can choose top or bottom placement before burning." } },
    { "@type": "Question", "name": "Can I preview before burning?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Review timing & styling, then burn the final video." } },
    { "@type": "Question", "name": "Are captions removable after burning?", "acceptedAnswer": { "@type": "Answer", "text": "No. Hardsubbed captions become part of the video frames." } },
    { "@type": "Question", "name": "Is there any watermark or signup?", "acceptedAnswer": { "@type": "Answer", "text": "No. The tool is free, watermark‑free and needs no account." } }
  ]
}

const Root = styled(Paper)(({ theme }) => ({
    '& img': { maxWidth: '100%' },
    '& .hero-section': {
        display: 'flex',
        alignItems: 'center',
        minHeight: 500,
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
        background: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
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
    '& .use-cases': {
        paddingBlock: theme.spacing(8),
        '& .MuiTypography-h2': { textAlign: 'center', marginBottom: theme.spacing(2) }
    },
}));

export default function BurnCaptionLanding() {
    return (
        <Root elevation={0}>
            <Helmet>
                <title>Burn Subtitles into Video – Free Online Caption Burner (No Signup)</title>
                <meta name="description" content="Hardcode SRT, VTT subtitles into MP4, MOV, MKV or WebM in‑browser. Style font, size, color & position. Fast, private & watermark‑free." />
                <meta property="og:title" content="Burn Captions into Video Online – Fast, Private & Free" />
                <meta property="og:description" content="Hardcode SRT/VTT with styling (font, color, outline, position). Local, no upload, no watermark." />
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
                            <Typography variant="h2" component="h1">Burn Subtitles into Video – Free, Fast & Private</Typography>
                            <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Hardcode SRT/VTT into MP4, MOV, MKV or WebM locally. Customize font, size, color, outline & position. No uploads, signup or watermark.</Typography>
                            <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Button color='primary' size='large' href="/tools/video/burn-caption" variant="contained">Upload</Button>
                                <Button size='large' href="/tools/video/how-to-burn-captions-into-video-online" variant="text" sx={{ color: 'text.secondary' }}>Learn More</Button>
                            </Box>
                        </Grid>
                        <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
                            <img src='/images/landing/burn-caption-hero.jpg' alt='Laptop with video player and subtitle styling UI' title='Caption Burner' loading='lazy' width="auto" height="auto" style={{ filter: 'hue-rotate(65deg)' }} />
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='why-us'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent='center' flexGrow={1}>
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
                        <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent='center' flexGrow={1}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <CloudUploadIcon />
                                    </Box>
                                    <Typography variant='h5' component='h3' gutterBottom>1. Upload</Typography>
                                    <Typography variant='body1'>Add your video file.</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <SubtitlesIcon />
                                    </Box>
                                    <Typography variant='h5' component='h3' gutterBottom>2. Add Subtitles</Typography>
                                    <Typography variant='body1'>Load SRT or VTT file.</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <BrushIcon />
                                    </Box>
                                    <Typography variant='h5' component='h3' gutterBottom>3. Style</Typography>
                                    <Typography variant='body1'>Font size, color, outline.</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <PreviewIcon />
                                    </Box>
                                    <Typography variant='h5' component='h3' gutterBottom>4. Preview</Typography>
                                    <Typography variant='body1'>Check timing & styling.</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56,
                                        mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <DownloadIcon />
                                    </Box>
                                    <Typography variant='h5' component='h3' gutterBottom>5. Burn & Download</Typography>
                                    <Typography variant='body1'>Process locally & save.</Typography>
                                </Box>
                            </Grid>
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
                        {[ // updated & expanded
                        { icon: <UploadFileIcon fontSize='large' color='primary' />, title: 'Drag & Drop Upload', desc: 'Add video files easily.' },
                        { icon: <SubtitlesIcon fontSize='large' color='primary' />, title: 'SRT / VTT Support', desc: 'Standard caption formats.' },
                        { icon: <ColorLensIcon fontSize='large' color='primary' />, title: 'Styling Controls', desc: 'Font size, color & outline.' },
                        { icon: <BrushIcon fontSize='large' color='primary' />, title: 'Position Control', desc: 'Toggle top / bottom placement.' },
                        { icon: <HighQualityIcon fontSize='large' color='primary' />, title: 'Resolution Preserved', desc: 'No quality loss on burn.' },
                        { icon: <DownloadIcon fontSize='large' color='primary' />, title: 'Preview & Export', desc: 'Check timing before burn.' },
                        { icon: <SpeedIcon fontSize='large' color='primary' />, title: 'Instant Download', desc: 'Local WASM processing.' },
                        { icon: <PrivacyTipIcon fontSize='large' color='primary' />, title: 'Private & Free', desc: 'No upload. No watermark.' },
                        ].map((feat, i) => (
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

            <section className='use-cases'>
                <Container maxWidth="lg">
                    <Typography variant='h2'>Use Cases & Tips</Typography>
                    <Divider sx={{ width: 100, mx: 'auto', my: 2 }} />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: '100%' }}><CardContent>
                                <Typography variant='h5' component='h3' gutterBottom>Common Scenarios</Typography>
                                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                                    <li>Social media clips</li>
                                    <li>Course/tutorial exports</li>
                                    <li>Accessibility compliance</li>
                                    <li>Marketing promos</li>
                                </Typography>
                            </CardContent></Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: '100%' }}><CardContent>
                                <Typography variant='h5' component='h3' gutterBottom>Tips</Typography>
                                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                                    <li>Use high contrast text</li>
                                    <li>Keep lines concise</li>
                                    <li>Pre‑sync SRT timing</li>
                                    <li>Outline improves legibility</li>
                                </Typography>
                            </CardContent></Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: '100%' }}><CardContent>
                                <Typography variant='h5' component='h3' gutterBottom>Who It’s For</Typography>
                                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                                    <li>Creators & editors</li>
                                    <li>Educators & trainers</li>
                                    <li>Social media teams</li>
                                    <li>Accessibility advocates</li>
                                </Typography>
                            </CardContent></Card>
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
                        <Grid size={{ xs: 12 }}>
                            {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
                                <Accordion key={idx} square disableGutters elevation={3}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>{faq.name}</Typography></AccordionSummary>
                                    <AccordionDetails><Typography variant='body1'>{faq.acceptedAnswer.text}</Typography></AccordionDetails>
                                </Accordion>
                            ))}
                        </Grid>
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
