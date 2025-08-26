// React import intentionally omitted (new JSX transform)
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
// Icons
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import CompareIcon from '@mui/icons-material/Compare'
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge'
import ImageIcon from '@mui/icons-material/Image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CropIcon from '@mui/icons-material/Crop'
import TuneIcon from '@mui/icons-material/Tune'
import DownloadIcon from '@mui/icons-material/Download'
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'

// FAQ schema moved to bottom (updated list)
const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": "Is processing private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All image conversion & editing execute locally in your browser — nothing is uploaded." } },
        { "@type": "Question", "name": "Which formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "You can load and export JPG, PNG, WebP and GIF." } },
        { "@type": "Question", "name": "Can I maintain aspect ratio while resizing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Use the aspect ratio lock toggle to keep proportions consistent." } },
        { "@type": "Question", "name": "Are crop & rotate tools included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can crop interactively and rotate or flip the image before exporting." } },
        { "@type": "Question", "name": "Is it free and watermark‑free?", "acceptedAnswer": { "@type": "Answer", "text": "Completely free — no watermark, signup or usage limits." } }
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
}))

export default function ImageConverterLanding() {
    return (
        <Root elevation={0}>
            <Helmet>
                <title>Free Online Image Converter – Resize, Crop, Rotate & Convert (Private)</title>
                <meta name="description" content="Convert & edit images (JPG, PNG, WebP, GIF) locally in your browser: resize, crop, rotate, adjust filters & quality. Free, private & watermark‑free." />
                <meta property="og:title" content="Free Online Image Converter – Convert, Resize & Edit Privately" />
                <meta property="og:description" content="Resize, crop, rotate & convert images (JPG, PNG, WebP, GIF) with local processing. No uploads, no signup, no watermark." />
                <meta property="og:image" content="/images/landing/image-converter-hero.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/tools/image/convert-image-online" />
                <meta property="og:site_name" content="FileApps" />
                <link rel="canonical" href="/tools/image/convert-image-online" />
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <section className='hero-section'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
                            <Typography variant="h2" component="h1">Convert & Edit Images Online – Resize, Crop, Rotate, and More</Typography>
                            <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Drag & drop an image, then resize, crop, rotate, and apply filters like grayscale, blur, and brightness. Export in JPG, PNG, WebP, or GIF formats – no signup or watermark.</Typography>
                            <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Button color='primary' size='large' href="/tools/image/convert" variant="contained">Upload Image</Button>
                                <Button size='large' href="/tools/image/how-to-convert-image-online" variant="text" sx={{ color: 'text.secondary' }}>View Full Guide</Button>
                            </Box>
                        </Grid>
                        <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
                            <img src='/images/landing/image-converter-hero.jpg' alt='Screenshot of online image converter tool with preview and editing sliders' title='Image Converter' loading='lazy' width="auto" height="auto" />
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='why-us'>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justifyContent="center">
                        <Grid size={{ xs: 12 }}>
                            <Typography variant='h2'>Why Use Our Image Converter?</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                                <PrivacyTipIcon fontSize='large' color='primary' />
                                <Typography variant='h5' component='h3'>Private</Typography>
                                <Typography variant='body1'>Local processing — no uploads.</Typography>
                            </CardContent></Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                                <CompareIcon fontSize='large' color='primary' />
                                <Typography variant='h5' component='h3'>Free & Fast</Typography>
                                <Typography variant='body1'>No signup. No watermark.</Typography>
                            </CardContent></Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                                <ImageIcon fontSize='large' color='primary' />
                                <Typography variant='h5' component='h3'>Format Support</Typography>
                                <Typography variant='body1'>JPG, PNG, WebP, GIF.</Typography>
                            </CardContent></Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                                <PhotoSizeSelectLargeIcon fontSize='large' color='primary' />
                                <Typography variant='h5' component='h3'>Resize & Crop</Typography>
                                <Typography variant='body1'>Precise dimension control.</Typography>
                            </CardContent></Card>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='how-it-works'>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
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
                                    <Typography variant='body1'>Drag & drop image.</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <CropIcon />
                                    </Box>
                                    <Typography variant='h5' component='h3' gutterBottom>2. Resize / Crop</Typography>
                                    <Typography variant='body1'>Adjust size & area.</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <TuneIcon />
                                    </Box>
                                    <Typography variant='h5' component='h3' gutterBottom>3. Adjust</Typography>
                                    <Typography variant='body1'>Filters & quality.</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <DownloadIcon />
                                    </Box>
                                    <Typography variant='h5' component='h3' gutterBottom>4. Export</Typography>
                                    <Typography variant='body1'>JPG / PNG / WebP / GIF.</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='key-features'>
                <Container maxWidth='lg'>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid size={{ xs: 12 }}>
                            <Typography variant='h2' mb={4}>Key Features</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
                        </Grid>
                        {[{ icon: <PhotoSizeSelectLargeIcon fontSize='large' color='primary' />, title: 'Image Resizing', desc: 'Enter custom width and height or lock aspect ratio.' },
                        { icon: <CropIcon fontSize='large' color='primary' />, title: 'Interactive Crop Tool', desc: 'Click and drag to crop with real-time preview.' },
                        { icon: <Rotate90DegreesCcwIcon fontSize='large' color='primary' />, title: 'Rotate & Flip', desc: 'Rotate 90°, 180°, or flip horizontally/vertically.' },
                        { icon: <ImageSearchIcon fontSize='large' color='primary' />, title: 'File Format Converter', desc: 'Convert images to JPG, PNG, WebP, or GIF.' },
                        { icon: <ColorLensIcon fontSize='large' color='primary' />, title: 'Filter Controls', desc: 'Adjust brightness, contrast, saturation, and blur.' },
                        { icon: <DownloadDoneIcon fontSize='large' color='primary' />, title: 'Instant Download', desc: 'Export without delay and no watermark.' }].map((feat, i) => (
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
                                    <li>Social media optimization</li>
                                    <li>Blog / article assets</li>
                                    <li>Thumbnail prep</li>
                                    <li>Light compression</li>
                                </Typography>
                            </CardContent></Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: '100%' }}><CardContent>
                                <Typography variant='h5' component='h3' gutterBottom>Tips</Typography>
                                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                                    <li>Use WebP for small size</li>
                                    <li>Lock aspect for ratios</li>
                                    <li>High contrast after darken</li>
                                    <li>Reduce quality for web</li>
                                </Typography>
                            </CardContent></Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: '100%' }}><CardContent>
                                <Typography variant='h5' component='h3' gutterBottom>Who It’s For</Typography>
                                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                                    <li>Creators & bloggers</li>
                                    <li>Marketing teams</li>
                                    <li>Developers</li>
                                    <li>Students & educators</li>
                                </Typography>
                            </CardContent></Card>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            <section className='faq-section'>
                <Container maxWidth='lg'>
                    <Grid container spacing={3} justifyContent='center' flexGrow={1}>
                        <Grid size={{ xs: 12 }}>
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
                <Container maxWidth='lg'>
                    <Grid container spacing={3} justifyContent='center' flexGrow={1}>
                        <Grid size={{ xs: 12 }}><Typography variant='h2' align='center'>Ready to convert an image?</Typography></Grid>
                        <Grid size={{ xs: 12 }}><Typography variant='h6' component='p' color='common.white'>Drag & drop an image, edit it instantly — private & free.</Typography></Grid>
                        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button color='inherit' variant='contained' size='large' href='/tools/image/convert'>Upload Image</Button>
                            <Button size='large' href='/tools/image/how-to-convert-image-online' sx={{ color: 'common.white' }}>Learn More</Button>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </Root>
    )
}
