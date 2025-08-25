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
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MovieIcon from '@mui/icons-material/Movie'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import DownloadIcon from '@mui/icons-material/Download'
import ContentCutIcon from '@mui/icons-material/ContentCut'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I extract audio from only part of the video?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—you can select a time range using the slider before extraction." } },
    { "@type": "Question", "name": "Which audio formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "You can extract audio as MP3, WAV, or AAC." } },
    { "@type": "Question", "name": "Do I need to sign up or install anything?", "acceptedAnswer": { "@type": "Answer", "text": "No, the tool is completely free and browser-based." } },
    { "@type": "Question", "name": "Is the process safe?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, extraction happens in-browser or on secure servers, and videos are deleted after processing." } },
    { "@type": "Question", "name": "Can I preview the audio before extracting it?", "acceptedAnswer": { "@type": "Answer", "text": "The built-in preview player plays the original video only. To listen to the extracted audio, download the file and play it on your device." } }
  ]
}

const Root = styled(Paper)(({ theme }) => ({
  '& img': { maxWidth: '100%' },
  '& .hero-section': {
display: 'flex',
alignItems: 'center',
minHeight: 500,
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
    background: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    '& .MuiTypography-h2': { color: theme.palette.text.primary },
    '& .MuiAccordionSummary-root': { padding: theme.spacing(0, 2, 0, 2) },
    '& .MuiAccordionDetails-root': { padding: theme.spacing(0, 2, 2, 2) }
  },
  '& .why-us, & .key-features, & .cta-section': {
    paddingBlock: theme.spacing(8),
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
}))

export default function ExtractAudioLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Extract Audio from Video – Free Online Audio Extractor (No Signup)</title>
        <meta name="description" content="Extract audio (MP3, WAV, AAC) from MP4, MOV, MKV, WebM in your browser. Select a time range & download — fast, private & watermark‑free." />
        <meta property="og:title" content="Extract Audio from Video – Free Online Tool" />
        <meta property="og:description" content="Pull MP3, WAV or AAC from MP4, MOV, MKV, WebM locally. Select range & export – no uploads or watermark." />
        <meta property="og:image" content="/images/landing/audio-extract-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/extract-audio-from-video" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/extract-audio-from-video" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Extract Audio from Video – Free & Private</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Pull MP3, WAV or AAC from MP4, MOV, MKV, WebM. Select a time range & export locally — no signup or watermark.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='error' size='large' href="/tools/video/extract-audio" variant="contained">Upload Video</Button>
                <Button size='large' href="/tools/video/how-to-extract-audio-from-video" variant="text" sx={{ color: 'text.secondary' }}>How to Extract Audio</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/audio-extract-hero.jpg' alt='Interface for extracting audio from video online' title='Audio Extractor' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Free Online Audio Extractor?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <HighQualityIcon fontSize='large' color='error' />, title: 'Free & Clean', desc: 'No fees, signup or watermark.' },
            { icon: <CloudUploadIcon fontSize='large' color='error' />, title: 'Fast & Easy', desc: 'Upload your video, select time range, and download audio in seconds.' },
            { icon: <MovieIcon fontSize='large' color='error' />, title: 'Format Support', desc: 'MP4, MOV, MKV, WebM → MP3, WAV, AAC.' },
            { icon: <PrivacyTipIcon fontSize='large' color='error' />, title: 'Browser-Based & Secure', desc: 'No downloads—everything runs right in your browser.' },
            { icon: <ContentCutIcon fontSize='large' color='error' />, title: 'Precise Range Extraction', desc: 'Trim audio by specifying start and end times before extraction.' },
            { icon: <MusicNoteIcon fontSize='large' color='error' />, title: 'No Software Needed', desc: 'Works on desktop and mobile – accessible from any modern browser.' }].map((item, i) => (
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
              {[{ icon: <CloudUploadIcon />, title: 'Upload Video', desc: 'Drag & drop MP4, MOV, MKV, WebM.' },
              { icon: <ContentCutIcon />, title: 'Set Range (Optional)', desc: 'Adjust start & end markers.' },
              { icon: <HighQualityIcon />, title: 'Extract Locally', desc: 'Convert to MP3 / WAV / AAC.' },
              { icon: <DownloadIcon />, title: 'Download Audio', desc: 'Instant, watermark‑free export.' }].map((step, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'error.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
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
            {[{ icon: <ContentCutIcon fontSize='large' color='error' />, title: 'Precise Audio Extraction', desc: 'Specify start and end times to extract only the part you need.' },
            { icon: <MovieIcon fontSize='large' color='error' />, title: 'Supports Multiple Formats', desc: 'Works with commonly-used video and audio formats.' },
            { icon: <PrivacyTipIcon fontSize='large' color='error' />, title: 'No Installation Required', desc: 'Fully online, no desktop software necessary.' },
            { icon: <HighQualityIcon fontSize='large' color='error' />, title: '100% Free & No Watermark', desc: 'A clean, hassle-free experience.' },
            { icon: <DownloadIcon fontSize='large' color='error' />, title: 'Quick Processing', desc: 'Extract and download your audio in seconds.' },
            { icon: <MusicNoteIcon fontSize='large' color='error' />, title: 'Secure and Private', desc: 'Files are processed in-browser or removed from servers shortly after processing.' }].map((feat, i) => (
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
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-ea-${idx}-content`} id={`faq-ea-${idx}-header`}>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to extract audio from your video?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free audio extraction — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/video/extract-audio'>Upload Video</Button>
              <Button size='large' href='/tools/video/how-to-extract-audio-from-video' sx={{ color: 'common.white' }}>How to Extract Audio</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
