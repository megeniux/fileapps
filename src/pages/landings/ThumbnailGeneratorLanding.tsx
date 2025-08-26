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
    { "@type": "Question", "name": "How does the thumbnail generator work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses browser-based video processing to extract images locally—no uploads or data sharing." } },
    { "@type": "Question", "name": "Which video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, AVI, MKV, and most popular formats are supported." } },
    { "@type": "Question", "name": "Can I choose the thumbnail frame?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can select any frame or timestamp in the video." } },
    { "@type": "Question", "name": "Is this service really free?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely, no signups, no watermarks, completely free." } },
    { "@type": "Question", "name": "Does it work on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it supports modern mobile browsers on Android and iOS." } }
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
        <title>Create Stunning Video Thumbnails Online – Fast, Free & No Signup</title>
        <meta name="description" content="Extract high-quality thumbnails from your videos instantly in your browser. No watermark, no downloads, and no credit card required." />
        <meta property="og:title" content="Create Stunning Video Thumbnails Online – Fast, Free & No Signup" />
        <meta property="og:description" content="Extract high-quality thumbnails from your videos instantly in your browser. No watermark, no downloads, and no credit card required." />
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
              <Typography variant="h2" component="h1">Create Stunning Video Thumbnails Online – Fast, Free & No Signup</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Extract high-quality thumbnails from your videos instantly in your browser. No watermark, no downloads, and no credit card required.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='secondary' size='large' href="/tools/image/thumbnail" variant="contained">Upload Video</Button>
                <Button size='large' href="/tools/image/how-to-generate-thumbnail" variant="text" sx={{ color: 'text.secondary' }}>Learn How</Button>
              </Box>
            </Grid>
            <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/thumbnail-generator-hero.jpg' alt='Laptop showing video thumbnail generator interface' title='Thumbnail Generator' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center' flexGrow={1}>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Free Online Thumbnail Generator?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <SpeedIcon fontSize='large' color='secondary' />, title: '100% Browser-Based & Private', desc: 'All processing happens locally. No uploads or data leaks.' },
            { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: 'No Signup or Watermark', desc: 'Use the tool instantly without restrictions or branding.' },
            { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'Supports All Major Formats', desc: 'MP4, MOV, AVI, MKV, and more.' },
            { icon: <DeviceHubIcon fontSize='large' color='secondary' />, title: 'Customizable Thumbnail Sizes', desc: 'Perfect for YouTube, social media, presentations, and more.' },
            { icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Fast & Easy to Use', desc: 'Extract multiple thumbnails with a single click.' },
            { icon: <DeviceHubIcon fontSize='large' color='secondary' />, title: 'Cross-Platform Compatibility', desc: 'Works on desktop and mobile browsers alike.' }].map((item, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
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
              { icon: <CameraAltIcon />, title: 'Choose Thumbnail Frame', desc: 'Pick the exact frame or time you want as a thumbnail.' },
              { icon: <TuneIcon />, title: 'Customize Size', desc: 'Select from preset dimensions or enter a custom size.' },
              { icon: <FlashOnIcon />, title: 'Generate Thumbnail', desc: 'Extract your image instantly in your browser.' },
              { icon: <DownloadIcon />, title: 'Download Image', desc: 'Save your high-quality thumbnail with no watermark.' }].map((step, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
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
              <Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <UploadFileIcon fontSize='large' color='secondary' />, title: 'Drag & Drop Upload', desc: 'Simple and intuitive video selection.' },
            { icon: <AspectRatioIcon fontSize='large' color='secondary' />, title: 'Multi-Format Support', desc: 'Works with MP4, MOV, AVI, MKV, etc.' },
            { icon: <PhotoLibraryIcon fontSize='large' color='secondary' />, title: 'Frame-by-Frame Selection', desc: 'Choose the perfect moment for your thumbnail.' },
            { icon: <DeviceHubIcon fontSize='large' color='secondary' />, title: 'Custom Size Output', desc: 'Resize thumbnails for YouTube, Instagram, Facebook, and more.' },
            { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'High-Resolution Export', desc: 'No compression or watermark.' },
            { icon: <FlashOnIcon fontSize='large' color='secondary' />, title: 'Free Forever', desc: 'No signup, no credit card, no limits.' }].map((feat, i) => (
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
              <Button color='inherit' variant='contained' size='large' href='/tools/image/thumbnail'>Upload Video</Button>
              <Button size='large' href='/tools/image/how-to-generate-thumbnail' sx={{ color: 'common.white' }}>Learn How</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
