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
import SecurityTipIcon from '@mui/icons-material/Security'
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

const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": "Is my image uploaded to a server?", "acceptedAnswer": { "@type": "Answer", "text": "No. All image processing is done in your browser using WebAssembly. Nothing gets uploaded." } },
        { "@type": "Question", "name": "Which image formats can I upload and export?", "acceptedAnswer": { "@type": "Answer", "text": "JPG, PNG, WebP, GIF. You can upload one and export in another." } },
        { "@type": "Question", "name": "Can I maintain aspect ratio while resizing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. There’s a toggle to lock or unlock the aspect ratio." } },
        { "@type": "Question", "name": "Does it support cropping?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can click and drag to create a custom crop selection, or reset it anytime." } },
        { "@type": "Question", "name": "Can I change the image quality and size?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. You can reduce quality for web optimization and set pixel dimensions." } },
        { "@type": "Question", "name": "What filters are available?", "acceptedAnswer": { "@type": "Answer", "text": "Grayscale, blur, brightness, contrast, saturation, and rotate/flip." } },
        { "@type": "Question", "name": "Can I use it on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. It works on Android, iOS, and all modern browsers." } },
        { "@type": "Question", "name": "Is it really free?", "acceptedAnswer": { "@type": "Answer", "text": "100% free. No hidden charges, no login, no credit card required." } }
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
}))

export default function ImageConverterLanding() {
    return (
        <Root elevation={0}>
            <Helmet>
                <title>Free Online Image Converter & Editor – Resize, Crop, Rotate, Adjust Filters (No Signup)</title>
                <meta name="description" content="Convert, resize, crop, rotate, and edit images online for free. Change image format (JPG, PNG, WebP, GIF), adjust brightness, blur, contrast, saturation, and more. No signup, no watermark – fully browser-based." />
                <meta name="keywords" content="free image converter, resize image online, crop image free, rotate image online, image editor in browser, jpg to png converter, adjust brightness online, add blur to image, grayscale filter image, convert image to webp, flip image horizontally, change image quality online, online image resizer free, compress image online, photo editor in browser, privacy-safe image tool, no signup image converter, image editing no watermark, image optimization free tool" />
                <meta property="og:title" content="Free Online Image Converter & Editor – Convert, Crop, Resize (Private & Fast)" />
                <meta property="og:description" content="Convert and edit images in your browser with zero uploads. Resize, crop, rotate, and apply filters – all free, with no signup or watermark." />
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
                        <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
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
                        {[{ icon: <SecurityTipIcon fontSize='large' color='primary' />, title: 'No Uploads, 100% Private', desc: 'All editing happens in your browser. Your files never leave your device.' },
                            { icon: <CompareIcon fontSize='large' color='primary' />, title: 'Free & No Signup', desc: 'No registration required. No watermarks, no limits.' },
                            { icon: <ImageIcon fontSize='large' color='primary' />, title: 'Supports All Major Formats', desc: 'JPG, PNG, WebP, and GIF.' },
                            { icon: <PhotoSizeSelectLargeIcon fontSize='large' color='primary' />, title: 'Resize & Crop with Precision', desc: 'Adjust dimensions and select exact regions interactively.' }].map((item, i) => (
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
                        <Grid size={{ xs: 12 }}>
                            <Typography variant='h2'>How It Works</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
                        </Grid>
                        <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent='center'>
                            {[{ icon: <CloudUploadIcon />, title: 'Upload Your Image', desc: 'Drag & drop or browse from your device.' },
                                { icon: <CropIcon />, title: 'Resize or Crop', desc: 'Enter dimensions manually or drag to crop.' },
                                { icon: <TuneIcon />, title: 'Adjust Filters', desc: 'Fine-tune brightness, contrast, saturation, and more.' },
                                { icon: <PhotoSizeSelectLargeIcon />, title: 'Choose Output Format', desc: 'Convert to JPG, PNG, WebP, or GIF.' },
                                { icon: <DownloadIcon />, title: 'Download Instantly', desc: 'Save your new image with no watermark.' }].map((step, i) => (
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

            <section className='faq-section'>
                <Container maxWidth='lg'>
                    <Grid container spacing={3} justifyContent='center'>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant='h2' mb={4} align='center'>FAQs</Typography>
                            <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
                        </Grid>
                        {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
                            <Grid key={idx} size={{ xs: 12 }}>
                                <Accordion square disableGutters elevation={3} sx={{ '& .MuiAccordionSummary-root': { px: 1, py: 0.5 }, '& .MuiAccordionDetails-root': { px: 1, py: 1 } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-ic-${idx}-content`} id={`faq-ic-${idx}-header`}>
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
                <Container maxWidth='lg'>
                    <Grid container spacing={3} justifyContent='center'>
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
