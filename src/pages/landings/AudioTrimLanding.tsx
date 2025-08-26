// React import omitted (new JSX transform)
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
import ContentCutIcon from '@mui/icons-material/ContentCut'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import DownloadIcon from '@mui/icons-material/Download'
import WaveformIcon from '@mui/icons-material/Timeline'
import SpeedIcon from '@mui/icons-material/Speed'

export default function AudioTrimLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Trim Audio Online Free – Cut MP3, WAV, M4A Private</title>
        <meta name="description" content="Free online audio trimmer: cut MP3, WAV, M4A, FLAC, OGG locally. Set start/end, preview & export — private, fast & watermark‑free." />
        <meta property="og:title" content="Free Online Audio Trimmer – Fast, Private & No Watermark" />
        <meta property="og:description" content="Trim or cut audio segments (MP3, WAV, M4A, FLAC) in your browser. No uploads, signup or watermark." />
        <meta property="og:image" content="/images/landing/audio-trim-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/audio/trim-audio-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/audio/trim-audio-online" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} alignItems='center'>
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant='h2' component='h1'>Trim Audio Online – Free, Private & No Watermark</Typography>
              <Typography variant='h6' component='p' color='text.secondary' mt={3} mb={4}>Cut unwanted sections from MP3, WAV, M4A, FLAC or OGG locally — no signup, uploads or watermark.</Typography>
              <Box display='flex' gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button variant='contained' color='primary' size='large' href='/tools/audio/trim'>Upload</Button>
                <Button variant='text' size='large' sx={{ color: 'text.secondary' }} href='/tools/audio/how-to-trim-audio-online'>How-to Guide</Button>
              </Box>
            </Grid>
            <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/audio-trim-hero.jpg' alt='Audio trimmer waveform interface' title='Audio Trimmer' loading='lazy' />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Audio Trimmer?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <PrivacyTipIcon fontSize='large' color='primary' />, title: 'Local & Private', desc: 'Processing stays on device.' },
            { icon: <ContentCutIcon fontSize='large' color='primary' />, title: 'Precise Cutting', desc: 'Accurate range markers.' },
            { icon: <MusicNoteIcon fontSize='large' color='primary' />, title: 'Format Support', desc: 'MP3, WAV, M4A, FLAC, OGG.' },
            { icon: <HighQualityIcon fontSize='large' color='primary' />, title: 'Quality Retained', desc: 'Lossless export option.' }].map((c, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    {c.icon}
                    <Typography variant='h5' component='h3'>{c.title}</Typography>
                    <Typography variant='body1'>{c.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <section className='how-it-works'>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography variant='h2'>How It Works</Typography>
              <Divider sx={{ width: 100, borderColor: 'text.primary', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent='center' flexGrow={1}>
              {[{ icon: <CloudUploadIcon />, title: 'Upload', desc: 'Drag & drop audio.' },
              { icon: <ContentCutIcon />, title: 'Select Range', desc: 'Set start & end.' },
              { icon: <WaveformIcon />, title: 'Preview', desc: 'Verify segment.' },
              { icon: <DownloadIcon />, title: 'Export', desc: 'Clean output.' }].map((s, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'primary.main', color: 'white', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</Box>
                    <Box>
                      <Typography variant='h5' component='h3'>{s.title}</Typography>
                      <Typography variant='body1'>{s.desc}</Typography>
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
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <ContentCutIcon fontSize='large' color='primary' />, title: 'Precise Trim', desc: 'Frame‑adjacent accuracy.' },
            { icon: <WaveformIcon fontSize='large' color='primary' />, title: 'Waveform View', desc: 'Visual selection.' },
            { icon: <MusicNoteIcon fontSize='large' color='primary' />, title: 'Format Support', desc: 'MP3/WAV/M4A/FLAC/OGG.' },
            { icon: <PrivacyTipIcon fontSize='large' color='primary' />, title: 'Private', desc: 'Local WASM engine.' },
            { icon: <HighQualityIcon fontSize='large' color='primary' />, title: 'Lossless Option', desc: 'Export WAV/FLAC.' },
            { icon: <DownloadIcon fontSize='large' color='primary' />, title: 'Watermark‑Free', desc: 'Clean download.' },
            { icon: <SpeedIcon fontSize='large' color='primary' />, title: 'Fast Processing', desc: 'Instant preview.' }].map((f, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    {f.icon}
                    <Typography variant='h5' component='h3'>{f.title}</Typography>
                    <Typography variant='body1'>{f.desc}</Typography>
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
            <Grid size={12}>
              <Typography variant='h2' align='center'>FAQs</Typography>
              <Divider sx={{ width: 100, borderColor: 'text.primary', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              {FAQ_SCHEMA.mainEntity.map((faq: any, i: number) => (
                <Accordion key={i} disableGutters square elevation={3}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='h6' component='h3'>{faq.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='cta-section'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}><Typography variant='h2' align='center'>Ready to trim your audio?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free audio trimming — all in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/audio/trim'>Upload</Button>
              <Button size='large' href='/tools/audio/how-to-trim-audio-online' sx={{ color: 'common.white' }}>How-to Guide</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I trim audio?", "acceptedAnswer": { "@type": "Answer", "text": "Upload the file, set start and end markers on the waveform, preview and export." } },
    { "@type": "Question", "name": "Which formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP3, WAV, M4A, FLAC, OGG, AAC (browser‑decodable formats)." } },
    { "@type": "Question", "name": "Is processing private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Everything runs locally with WebAssembly; nothing is uploaded." } },
    { "@type": "Question", "name": "Is it free & watermark‑free?", "acceptedAnswer": { "@type": "Answer", "text": "Completely free: no signup, no watermark, no usage limits." } },
    { "@type": "Question", "name": "Will quality be lost?", "acceptedAnswer": { "@type": "Answer", "text": "Lossless exports (WAV/FLAC) keep original quality. MP3/AAC uses selected bitrate." } }
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
  '& .why-us, & .key-features, & .cta-section': {
    paddingBlock: theme.spacing(8),
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
  '& .how-it-works': {
    paddingBlock: theme.spacing(8),
    textAlign: 'center'
  },
  '& .faq-section': {
    paddingBlock: theme.spacing(8),
    background: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]
  }
}))
