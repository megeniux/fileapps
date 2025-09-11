// React import omitted (new JSX transform)

import { Helmet } from 'react-helmet-async'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// MUI Icons
import DownloadIcon from '@mui/icons-material/Download'
import SpeedIcon from '@mui/icons-material/Speed'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import DeviceHubIcon from '@mui/icons-material/DeviceHub'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import TuneIcon from '@mui/icons-material/Tune'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import FlashOnIcon from '@mui/icons-material/FlashOn'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does the video frame extraction tool work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses browser-based video processing to extract frames, create thumbnails, and generate video scrub strips locally—no uploads or data sharing." } },
    { "@type": "Question", "name": "What extraction modes are available?", "acceptedAnswer": { "@type": "Answer", "text": "You can extract single frames at specific times, create video scrub strips, or batch extract multiple frames at intervals." } },
    { "@type": "Question", "name": "Which video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, AVI, MKV, and most popular video formats are supported." } },
    { "@type": "Question", "name": "Can I choose specific frames to extract?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can select any frame or timestamp, create scrub strips from time ranges, or extract frames at custom intervals." } },
    { "@type": "Question", "name": "Is this service really free?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely, no signups, no watermarks, completely free with all features available." } }
  ]
}

// Styled Root
const Root = styled(Paper)(({ theme }) => ({
  '& img': { maxWidth: '100%' },
  '& .hero-section': {
    display: 'flex',
    alignItems: 'center',
    minHeight: 500,
    '& .hero-image': { '& > img': { marginBottom: theme.spacing(2) } },
    [theme.breakpoints.down('md')]: {
      '& .hero-text': { textAlign: 'center', paddingBottom: theme.spacing(6) },
      '& .hero-image': { '& > img': { display: 'table', marginInline: 'auto' } }
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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
  '& .use-cases': {
    paddingBlock: theme.spacing(8),
    '& .MuiTypography-h2': { textAlign: 'center', marginBottom: theme.spacing(2) }
  },
}))

export default function ThumbnailGeneratorLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Extract Frames from Video Online - Free Video Frame Extraction Tool</title>
        <meta name="description" content="Extract frames, generate thumbnails, and create video scrub strips online. Free video frame extraction tool with no uploads required - works in your browser." />
        <meta property="og:title" content="Extract Frames from Video Online - Free Video Frame Extraction Tool" />
        <meta property="og:description" content="Extract frames, generate thumbnails, and create video scrub strips online. Free video frame extraction tool with no uploads required - works in your browser." />
        <meta property="og:image" content="/images/landing/thumbnail-generator-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/image/extract-thumbnail-from-video" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/image/extract-thumbnail-from-video" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Extract Frames from Video Online - Free Video Frame Extraction Tool</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Extract single frames, generate thumbnails, or create video scrub strips from any video file. No uploads required - everything happens securely in your browser.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='secondary' size='large' href="/tools/image/thumbnail" variant="contained">Upload</Button>
                <Button size='large' href="/tools/image/how-to-generate-thumbnail" variant="text" sx={{ color: 'text.secondary' }}>How-to Guide</Button>
              </Box>
            </Grid>
            <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/thumbnail-generator-hero.jpg' alt='Video frame extraction tool showing single frame, scrub strip, and multiple frame options' title='Video Frame Extraction Tool' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center' flexGrow={1}>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Free Video Frame Extraction Tool?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <SpeedIcon fontSize='large' color='secondary' />, title: '100% Browser-Based & Private', desc: 'All processing happens locally. No uploads or data leaks.' },
            { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: 'Multiple Extraction Modes', desc: 'Single frames, video scrubs, or batch frame extraction.' },
            { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'Supports All Major Formats', desc: 'MP4, MOV, AVI, MKV, and more.' },
            { icon: <DeviceHubIcon fontSize='large' color='secondary' />, title: 'Customizable Frame Sizes', desc: 'Perfect for YouTube, social media, presentations, and more.' },
            { icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Fast & Easy to Use', desc: 'Extract frames with precise timing control.' },
            { icon: <DeviceHubIcon fontSize='large' color='secondary' />, title: 'No Signup or Watermark', desc: 'Use instantly without restrictions or branding.' }].map((item, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center" flexGrow={1}>
              {[{ icon: <CloudUploadIcon />, title: 'Upload Your Video File', desc: 'Drag & drop or browse to select your video.' },
              { icon: <CameraAltIcon />, title: 'Choose Extraction Mode', desc: 'Single frame, video scrub strips, or batch extraction.' },
              { icon: <TuneIcon />, title: 'Set Parameters', desc: 'Choose timing, frame size, and extraction intervals.' },
              { icon: <FlashOnIcon />, title: 'Extract Frames', desc: 'Process frames instantly in your browser.' },
              { icon: <DownloadIcon />, title: 'Download Results', desc: 'Save high-quality frames with no watermark.' }].map((step, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: (theme) => theme.palette.secondary.main, color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
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
              <Typography variant='h2' mb={4}>Powerful Frame Extraction Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <UploadFileIcon fontSize='large' color='secondary' />, title: 'Single Frame Extraction', desc: 'Extract precise frames at any timestamp.' },
            { icon: <AspectRatioIcon fontSize='large' color='secondary' />, title: 'Video Scrub Strips', desc: 'Create contact sheets with multiple frames in sequence.' },
            { icon: <PhotoLibraryIcon fontSize='large' color='secondary' />, title: 'Batch Frame Extraction', desc: 'Extract multiple frames at custom intervals.' },
            { icon: <DeviceHubIcon fontSize='large' color='secondary' />, title: 'Custom Size Output', desc: 'Resize for YouTube, Instagram, Facebook, and more.' },
            { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'High-Resolution Export', desc: 'No compression or watermark.' },
            { icon: <FlashOnIcon fontSize='large' color='secondary' />, title: 'Free Forever', desc: 'No signup, no credit card, no limits.' }].map((feat, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
            <Grid size={{ xs: 12 }}>
              {FAQ_SCHEMA.mainEntity.map((faq, idx) => (
                <Accordion key={idx} square disableGutters elevation={3}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-thumb-${idx}-content`} id={`faq-thumb-${idx}-header`}>
                    <Typography variant="subtitle1">{faq.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 2 }}>
                    <Typography variant="body2">{faq.acceptedAnswer.text}</Typography>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to generate your thumbnail?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free thumbnail generation — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/image/thumbnail'>Upload</Button>
              <Button size='large' href='/tools/image/how-to-generate-thumbnail' sx={{ color: 'common.white' }}>How-to Guide</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
