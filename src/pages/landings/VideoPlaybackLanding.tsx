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
import SpeedIcon from '@mui/icons-material/Speed'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MovieIcon from '@mui/icons-material/Movie'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import DownloadIcon from '@mui/icons-material/Download'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I change the playback speed of my video?", "acceptedAnswer": { "@type": "Answer", "text": "Upload your video, adjust the speed using the slider, and click 'Process' to apply the changes." } },
    { "@type": "Question", "name": "Which video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "We support MP4, MOV, AVI, MKV, and many other popular video formats." } },
    { "@type": "Question", "name": "Do I need to sign up?", "acceptedAnswer": { "@type": "Answer", "text": "No, our tool is free to use and doesn’t require any sign-up." } },
    { "@type": "Question", "name": "Is the process private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! The tool is completely browser-based, and your video is not uploaded to any server." } },
    { "@type": "Question", "name": "Does the video have a watermark after editing?", "acceptedAnswer": { "@type": "Answer", "text": "No, your video will have no watermark or branding." } }
  ]
}

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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
}))

export default function VideoPlaybackLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Video Playback Speed Changer – Speed Up or Slow Down Videos</title>
        <meta name="description" content="Change video playback speed from -20x (reverse) to +20x for free. Adjust the speed of MP4, MOV, AVI, MKV, and other video formats online with no downloads or sign-ups." />
        <meta name="keywords" content="free online video playback speed, change video speed online, adjust video playback speed, free video speed changer, video speed up or slow down, reverse video online, video speed editor free, free video playback speed changer, adjust video speed, video playback speed online, online video speed changer, MP4 speed change online, MOV video speed adjust, free video reverse speed, video speed tool free, slow motion video tool, online video speed adjustment, change video speed MP4, free video speed up, video playback adjustment, video speed settings online, free online speed editor, reverse video free, online change video speed" />
        <meta property="og:title" content="Free Online Video Playback Speed Changer – Adjust Video Speed Instantly" />
        <meta property="og:description" content="Change video playback speed from -20x to +20x online for free. No sign-up, no download, and supports multiple formats like MP4, MOV, AVI, MKV, and more." />
        <meta property="og:image" content="/images/landing/video-playback-speed-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/video-playback-speed-editor" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/video-playback-speed-editor" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Free Online Video Playback Speed Changer – Speed Up or Slow Down Videos</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Adjust your video playback speed with ease. Change speeds from -20x (reverse) to +20x for free. Works with MP4, MOV, AVI, MKV, and more—no sign-up required.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='secondary' size='large' href="/tools/video/playback" variant="contained">Upload Video</Button>
                <Button size='large' href="/tools/video/how-to-video-playback-speed-editor" variant="text" sx={{ color: 'text.secondary' }}>How to Change Video Speed</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/video-playback-speed-hero.jpg' alt='Video speed changer interface' title='Video Playback Speed Editor' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Free Online Video Playback Speed Changer?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Completely Free', desc: 'No sign-ups or charges.' },
            { icon: <MovieIcon fontSize='large' color='secondary' />, title: 'Wide Format Support', desc: 'Works with MP4, MOV, AVI, MKV, and more.' },
            { icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Simple to Use', desc: 'Adjust video speed from -20x to +20x in seconds.' },
            { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'No Watermark', desc: 'Edit and download your video with no branding.' },
            { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: '100% Browser-Based', desc: 'No need to download any software.' },
            { icon: <DownloadIcon fontSize='large' color='secondary' />, title: 'Instant Processing', desc: 'Apply playback speed changes and download the file quickly.' }].map((item, i) => (
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
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center">
              {/* Remove preview step, replace with browser-based benefit */}
              {[{ icon: <CloudUploadIcon />, title: 'Upload Your Video', desc: 'Drag and drop or select a video file.' },
              { icon: <SpeedIcon />, title: 'Adjust Playback Speed', desc: 'Use the slider to change the playback speed from -20x (reverse) to +20x.' },
              { icon: <PrivacyTipIcon />, title: 'No Installation Needed', desc: 'Change video speed directly in your browser—no software required.' },
              { icon: <DownloadIcon />, title: 'Download the Edited Video', desc: 'Once you\'re happy, click "Download" to save your adjusted video.' }].map((step, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
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
            {[{ icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Adjust Playback Speed', desc: 'Change your video speed from -20x (reverse) to +20x.' },
            { icon: <MovieIcon fontSize='large' color='secondary' />, title: 'Supports Popular Video Formats', desc: 'MP4, MOV, AVI, MKV, and more.' },
            { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: 'No Software Needed', desc: 'Fully online and browser-based.' },
            { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'Free & No Watermark', desc: 'No sign-ups, charges, or watermarks.' },
            { icon: <DownloadIcon fontSize='large' color='secondary' />, title: 'Instant Processing', desc: 'Edit and download videos instantly.' },
            { icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Easy to Use', desc: 'Simple interface for quick video speed adjustments.' }].map((feat, i) => (
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
            {FAQ_SCHEMA.mainEntity.map((faq, idx) => (
              <Grid key={idx} size={{ xs: 12 }}>
                <Accordion square disableGutters elevation={3} sx={{ '& .MuiAccordionSummary-root': { px: 1, py: 0.5 }, '& .MuiAccordionDetails-root': { px: 1, py: 1 } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-vps-${idx}-content`} id={`faq-vps-${idx}-header`}>
                    <Typography variant="subtitle1">{faq.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 2 }}>
                    <Typography variant="body2">{faq.acceptedAnswer.text}</Typography>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to change your video speed?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free video speed editing — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/video/playback'>Upload Video</Button>
              <Button size='large' href='/tools/video/how-to-video-playback-speed-editor' sx={{ color: 'common.white' }}>How to Change Video Speed</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
