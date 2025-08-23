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
import ContentCutIcon from '@mui/icons-material/ContentCut'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import SpeedIcon from '@mui/icons-material/Speed'
import DownloadIcon from '@mui/icons-material/Download'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I cut or trim MP3 files online?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our tool works perfectly with MP3 files, as well as WAV, FLAC, AAC, and more." } },
    { "@type": "Question", "name": "Do I need to sign up to use this tool?", "acceptedAnswer": { "@type": "Answer", "text": "No, it's completely free to use with no signup or account required." } },
    { "@type": "Question", "name": "Is this tool completely free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can trim your audio for free, without any hidden charges or watermarks." } },
    { "@type": "Question", "name": "How do I download the trimmed audio?", "acceptedAnswer": { "@type": "Answer", "text": "Once you’re satisfied with the trim, just click the “Download” button to save your audio." } },
    { "@type": "Question", "name": "Are my files private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, everything happens locally in your browser—nothing is uploaded to a server." } }
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

export default function AudioTrimLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Audio Trimmer – Cut & Trim MP3, WAV, FLAC, AAC Online</title>
        <meta name="description" content="Trim your audio files online for free. Cut MP3, WAV, FLAC, AAC, and more with precision. No signup, no watermark, 100% browser-based." />
        <meta name="keywords" content="audio trimmer online free, cut audio online, trim audio online free, online audio cutter, trim MP3 file free, audio trimming tool, free audio editor, trim WAV files, cut music online, audio cut tool, free audio cutter" />
        <meta property="og:title" content="Free Online Audio Trimmer – Cut & Trim MP3, WAV, FLAC Online" />
        <meta property="og:description" content="Cut audio files online for free with our easy-to-use tool. Trim MP3, WAV, FLAC, AAC, and more without watermark or signup." />
        <meta property="og:image" content="/images/landing/audio-trimmer-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/audio/trim-audio-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/audio/trim-audio-online" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Trim Audio Files Online – Free & No Signup</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Trim and cut audio files like MP3, WAV, FLAC, and more with precision—directly in your browser. Fast, free, and no watermark!</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='secondary' size='large' href="/tools/audio/trim" variant="contained">Upload Audio</Button>
                <Button size='large' href="/tools/audio/how-to-trim-audio-online" variant="text" sx={{ color: 'text.secondary' }}>Learn How to Use</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/audio-trimmer-hero.jpg' alt='Interface for cutting and trimming audio online' title='Audio Trimmer' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Online Audio Trimmer?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <ContentCutIcon fontSize='large' color='secondary' />, title: '100% Free', desc: 'No signup, no hidden fees, no watermark.' },
            { icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Fast & Easy', desc: 'Drag, drop, and trim—done in seconds.' },
            { icon: <AudiotrackIcon fontSize='large' color='secondary' />, title: 'Supports Multiple Formats', desc: 'MP3, WAV, FLAC, AAC, OGG, and more.' },
            { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: 'Complete Privacy', desc: 'No uploads—everything happens in your browser.' },
            { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'Precise Audio Cutting', desc: 'Trim audio files with accuracy and ease.' },
            { icon: <CloudUploadIcon fontSize='large' color='secondary' />, title: 'Cross-Platform Compatibility', desc: 'Works seamlessly on desktop and mobile.' }].map((item, i) => (
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
              {[{ icon: <CloudUploadIcon />, title: 'Upload Your Audio File', desc: 'Drag and drop or click to select.' },
              { icon: <ContentCutIcon />, title: 'Trim Your Audio', desc: 'Use the slider to adjust the trim range.' },
              { icon: <PrivacyTipIcon />, title: 'No Installation Needed', desc: 'Trim audio directly in your browser—no software required.' },
              { icon: <DownloadIcon />, title: 'Download Your Trimmed Audio', desc: 'One click to save your trimmed file.' }].map((step, i) => (
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
            {[{ icon: <ContentCutIcon fontSize='large' color='secondary' />, title: 'Precise Trimming', desc: 'Trim audio from any point with ease.' },
            { icon: <AudiotrackIcon fontSize='large' color='secondary' />, title: 'Wide Format Support', desc: 'Works with MP3, WAV, AAC, FLAC, OGG, and more.' },
            { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: 'No Installation Needed', desc: 'Trim audio directly in your browser—no software required.' },
            { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'Free & No Watermarks', desc: 'Clean audio without branding.' },
            { icon: <CloudUploadIcon fontSize='large' color='secondary' />, title: 'Cross-Device Compatibility', desc: 'Accessible on both desktop and mobile browsers.' },
            { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: 'Browser-Based', desc: 'All processing happens locally—no uploads necessary.' }].map((feat, i) => (
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
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-at-${idx}-content`} id={`faq-at-${idx}-header`}>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to trim your audio?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free audio trimming — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/audio/trim'>Upload Audio</Button>
              <Button size='large' href='/tools/audio/how-to-trim-audio-online' sx={{ color: 'common.white' }}>Learn How to Use</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
