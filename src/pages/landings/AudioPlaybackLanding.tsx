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
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import DownloadIcon from '@mui/icons-material/Download'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I reverse audio with this tool?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Simply set the playback speed to a negative value to reverse the audio." } },
    { "@type": "Question", "name": "Does it work with all audio formats?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it supports MP3, WAV, AAC, FLAC, OGG, and several other formats." } },
    { "@type": "Question", "name": "Do I need to sign up or install software?", "acceptedAnswer": { "@type": "Answer", "text": "No, everything happens in your browser—no signup, no software required." } },
    { "@type": "Question", "name": "Is this tool completely free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it’s completely free to use, with no hidden charges or watermarks." } },
    { "@type": "Question", "name": "Is my audio private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, all processing is done locally on your device. We don’t store or upload your audio files." } }
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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
}))

export default function AudioPlaybackLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Audio Playback Speed Editor – Slow Down, Speed Up, or Reverse</title>
        <meta name="description" content="Change audio playback speed online for free. Speed up, slow down, or reverse MP3, WAV, FLAC, AAC, and more. No signup, no watermark, 100% browser-based." />
        <meta name="keywords" content="free audio speed changer, change audio speed online free, slow down audio online, reverse audio online, audio playback speed tool, free audio tempo editor, change audio tempo online, speed up audio online, no signup audio editor, free audio speed control, online audio speed changer, audio speed adjuster" />
        <meta property="og:title" content="Free Online Audio Playback Speed Editor – Change Tempo or Reverse Audio" />
        <meta property="og:description" content="Speed up, slow down, or reverse audio files online for free. Works with MP3, WAV, FLAC, AAC, and more. No signup, no watermark, 100% browser-based." />
        <meta property="og:image" content="/images/landing/audio-speed-editor-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/audio/audio-playback-speed-editor" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/audio/audio-playback-speed-editor" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Change Audio Playback Speed Online – Free & No Signup</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Adjust playback speed of MP3, WAV, FLAC, AAC, and other audio files. Slow down, speed up, or reverse audio directly in your browser—100% free, no signup, no watermark.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='success' size='large' href="/tools/audio/playback" variant="contained">Upload Audio</Button>
                <Button size='large' href="/tools/audio/how-to-audio-playback-speed-editor" variant="text" sx={{ color: 'text.secondary' }}>Learn How to Use</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/audio-speed-editor-hero.jpg' alt='Interface for changing audio playback speed online' title='Audio Playback Speed Editor' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Free Online Audio Playback Speed Editor?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <SpeedIcon fontSize='large' color='success' />, title: '100% Free', desc: 'No signup, no hidden charges, no watermark.' },
            { icon: <CloudUploadIcon fontSize='large' color='success' />, title: 'Easy to Use', desc: 'Drag, drop, adjust speed, and download—instantly.' },
            { icon: <AudiotrackIcon fontSize='large' color='success' />, title: 'Wide Format Support', desc: 'MP3, WAV, FLAC, AAC, OGG, and more.' },
            { icon: <PlayArrowIcon fontSize='large' color='success' />, title: 'Real-Time Playback', desc: 'Hear the changes as you adjust the speed.' },
            { icon: <PrivacyTipIcon fontSize='large' color='success' />, title: 'No Software Required', desc: 'Works completely in your browser—nothing to download.' },
            { icon: <HighQualityIcon fontSize='large' color='success' />, title: '100% Private', desc: 'All processing happens locally on your device.' }].map((item, i) => (
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
              {[{ icon: <CloudUploadIcon />, title: 'Upload Your Audio File', desc: 'Drag and drop or click to select your file.' },
              { icon: <SpeedIcon />, title: 'Adjust Playback Speed', desc: 'Use the slider to slow down, speed up, or reverse your audio.' },
              { icon: <PrivacyTipIcon />, title: 'No Installation Needed', desc: 'Change audio speed directly in your browser—no software required.' },
              { icon: <DownloadIcon />, title: 'Download the Edited File', desc: 'Click the download button to save your audio.' }].map((step, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'success.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
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
            {[{ icon: <SpeedIcon fontSize='large' color='success' />, title: 'Speed Control', desc: 'Change audio speed from -20x (reverse) to +20x.' },
            { icon: <AudiotrackIcon fontSize='large' color='success' />, title: 'Multiple Format Support', desc: 'Works with MP3, WAV, AAC, FLAC, OGG, and more.' },
            { icon: <PrivacyTipIcon fontSize='large' color='success' />, title: 'No Installation Needed', desc: 'Change audio speed directly in your browser—no software required.' },
            { icon: <HighQualityIcon fontSize='large' color='success' />, title: 'Free & No Watermarks', desc: 'Output audio is free of any branding or watermarks.' },
            { icon: <CloudUploadIcon fontSize='large' color='success' />, title: 'Cross-Device Support', desc: 'Works seamlessly on desktop and mobile browsers.' },
            { icon: <PrivacyTipIcon fontSize='large' color='success' />, title: 'No Signup', desc: 'Use the tool immediately, no account needed.' }].map((feat, i) => (
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
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-ap-${idx}-content`} id={`faq-ap-${idx}-header`}>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to change your audio speed?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free audio speed editing — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/audio/playback'>Upload Audio</Button>
              <Button size='large' href='/tools/audio/how-to-audio-playback-speed-editor' sx={{ color: 'common.white' }}>Learn How to Use</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
