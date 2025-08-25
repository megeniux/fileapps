// General Imports
import { Helmet } from 'react-helmet-async'
// MUI Components
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
// MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SpeedIcon from '@mui/icons-material/Speed'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import DownloadIcon from '@mui/icons-material/Download'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ReplayIcon from '@mui/icons-material/Replay'

export default function AudioPlaybackLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Audio Playback Speed Editor – Slow Down, Speed Up, Reverse</title>
        <meta name="description" content="Change audio playback speed or reverse audio online free. Works locally with MP3, WAV, FLAC, AAC & more. No signup, no watermark, private processing." />
        <meta property="og:title" content="Free Online Audio Playback Speed Editor – Change Tempo or Reverse Audio" />
        <meta property="og:description" content="Slow down, speed up, or reverse audio in your browser. Fast, private & watermark‑free." />
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
              <Typography variant="h2" component="h1">
                Change Audio Playback Speed Online – Free & Private
              </Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>
                Slow down, speed up or reverse audio (MP3, WAV, FLAC, AAC, OGG, M4A) directly in your browser — no uploads,
                no signup, no watermark.
              </Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='success' size='large' href="/tools/audio/playback" variant="contained">Upload Audio</Button>
                <Button size='large' href="/tools/audio/how-to-audio-playback-speed-editor" variant="text" sx={{ color: 'text.secondary' }}>Learn More</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img
                src='/images/landing/audio-speed-editor-hero.jpg'
                alt='Audio speed adjustment interface'
                title='Audio Playback Speed Editor'
                loading='lazy'
                width="auto"
                height="auto"
              />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use This Speed Editor?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <SpeedIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Flexible Tempo</Typography>
                <Typography variant='body1'>Slow down or speed up precisely.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <ReplayIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Reverse Audio</Typography>
                <Typography variant='body1'>Create FX & transitions instantly.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PrivacyTipIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Private & Local</Typography>
                <Typography variant='body1'>Processing stays in your browser.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <AudiotrackIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Format Support</Typography>
                <Typography variant='body1'>MP3, WAV, FLAC, AAC, OGG, M4A.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PlayArrowIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Instant Preview</Typography>
                <Typography variant='body1'>Hear changes right away.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <HighQualityIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Clean Output</Typography>
                <Typography variant='body1'>No signup. No watermark.</Typography>
              </CardContent></Card>
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
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent='center'>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'success.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CloudUploadIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>1. Upload</Typography>
                  <Typography variant='body1'>Drag & drop a file.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'success.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SpeedIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>2. Adjust Speed</Typography>
                  <Typography variant='body1'>Pick slower, faster or reverse.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'success.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayArrowIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>3. Preview</Typography>
                  <Typography variant='body1'>Hear instant result.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'success.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DownloadIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>4. Download</Typography>
                  <Typography variant='body1'>Export watermark‑free.</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='key-features'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <SpeedIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Tempo Control</Typography>
                <Typography variant='body1'>Fine speed adjustments.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <ReplayIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Reverse Mode</Typography>
                <Typography variant='body1'>Creative playback FX.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <AudiotrackIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Format Versatility</Typography>
                <Typography variant='body1'>MP3, WAV, FLAC & more.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PlayArrowIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Instant Preview</Typography>
                <Typography variant='body1'>Real-time feedback.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PrivacyTipIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Local Processing</Typography>
                <Typography variant='body1'>No uploads required.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <HighQualityIcon fontSize='large' color='success' />
                <Typography variant='h5' component='h3' gutterBottom>Quality Output</Typography>
                <Typography variant='body1'>Clean, watermark‑free.</Typography>
              </CardContent></Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='use-cases'>
        <Container maxWidth="lg">
          <Typography variant='h2'>Speed Ranges & Use Cases</Typography>
          <Divider sx={{ width: 100, mx: 'auto', my: 2 }} />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Guidance</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Practice: 0.5×–0.75×</li>
                  <li>Efficient listening: 1.25×–2×</li>
                  <li>Reverse: FX / transitions</li>
                  <li>Preview before export</li>
                </Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Use Cases</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Music practice</li>
                  <li>Podcast review</li>
                  <li>Lecture speed-up</li>
                  <li>Transcription aid</li>
                  <li>Creative sound design</li>
                </Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Who It’s For</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Musicians / learners</li>
                  <li>Podcasters & editors</li>
                  <li>Students & linguists</li>
                  <li>Voice & memo users</li>
                  <li>Content creators</li>
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
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Can I reverse audio?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>Yes — reverse mode flips playback locally without uploads.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Are my files uploaded?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>No. Processing is browser‑based for privacy.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Which formats are supported?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>Any browser‑decodable audio: MP3, WAV, FLAC, AAC, OGG, M4A.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Does changing speed affect pitch?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>Pitch preservation aims to maintain tone for common adjustments.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Is it free & watermark‑free?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>Yes — no signup, no watermark, no hidden limits.</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='cta-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid size={12}><Typography variant='h2' align='center'>Ready to adjust your audio speed?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & watermark‑free playback control.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/audio/playback'>Upload Audio</Button>
              <Button size='large' href='/tools/audio/how-to-audio-playback-speed-editor' sx={{ color: 'common.white' }}>Learn More</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}

// FAQ Schema at bottom
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I reverse audio?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — enable reverse mode; processing stays local." } },
    { "@type": "Question", "name": "Are my files uploaded?", "acceptedAnswer": { "@type": "Answer", "text": "No. All operations run in your browser for privacy." } },
    { "@type": "Question", "name": "Which formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "Browser‑decodable formats like MP3, WAV, FLAC, AAC, OGG, M4A." } },
    { "@type": "Question", "name": "Does changing speed affect pitch?", "acceptedAnswer": { "@type": "Answer", "text": "Pitch preservation keeps tone natural for typical speed changes." } },
    { "@type": "Question", "name": "Is it free & watermark‑free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — fully free, no signup or watermark." } }
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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
  '& .use-cases': {
    paddingBlock: theme.spacing(8),
    '& .MuiTypography-h2': { textAlign: 'center', marginBottom: theme.spacing(2) }
  },
}))
