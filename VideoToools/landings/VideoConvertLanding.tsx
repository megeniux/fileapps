// React import intentionally omitted
import { Helmet } from 'react-helmet-async'
import { styled } from '@mui/material/styles';
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
// MUI Icons for new content
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TuneIcon from '@mui/icons-material/Tune'
import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import VideoFileIcon from '@mui/icons-material/VideoFile'
import SpeedIcon from '@mui/icons-material/Speed'
import PublicIcon from '@mui/icons-material/Public'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does this online video converter work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg WASM inside your browser – no uploads, no server processing." } },
    { "@type": "Question", "name": "Which video formats can I convert?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, MKV, AVI, WebM, FLV, and more." } },
    { "@type": "Question", "name": "Can I change video resolution and FPS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – set custom resolution and FPS during conversion." } },
    { "@type": "Question", "name": "Is this tool free and private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – completely free, no signup, no watermark, and 100% browser-based for privacy." } },
    { "@type": "Question", "name": "Does it work on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – works on Android and iOS with modern browsers." } }
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
}));

export default function VideoConvertLanding() { // corrected component name to match file
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Convert Video Online Free – Private Video Converter</title>
        <meta name="description" content="Free online video converter: convert MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free." />
        <meta name="keywords" content="convert video online free, convert video to mp4, free online video converter, no signup video converter, change video resolution online, convert mov to mp4 free, convert mkv to mp4 online, video codec converter online, convert video without losing quality" />
        <meta property="og:title" content="Free Online Video Converter – Fast, Private & No Watermark" />
        <meta property="og:description" content="Convert video formats (MP4, MOV, MKV, AVI, WebM) in your browser. Customize resolution, codec, bitrate & FPS. No signup or uploads." />
        <meta property="og:image" content="/images/landing/video-convert-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/convert-video-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/convert-video-online" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Convert Video Online – Free, Private & No Watermark</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Convert MP4, MOV, MKV, AVI, WebM & more. Adjust resolution, codec, bitrate & FPS locally — no signup, uploads or watermark.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='primary' size='large' href="/tools/video/convert" variant="contained">Upload</Button>
                <Button size='large' href="/tools/video/how-to-convert-video-online" variant="text" sx={{ color: 'text.secondary' }}>How-to Guide</Button>
              </Box>
            </Grid>
            <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/video-convert-hero.jpg' alt='Laptop with video conversion interface' title='Video Converter' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Online Video Converter?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <PrivacyTipIcon fontSize='large' color='primary' />, title: '100% Private', desc: 'Runs in your browser with FFmpeg WASM. No uploads, no data leaks.' },
            { icon: <FlashOnIcon fontSize='large' color='primary' />, title: 'Free & No Signup', desc: 'Instant conversion – no account or watermark.' },
            { icon: <SwapHorizIcon fontSize='large' color='primary' />, title: 'Multiple Formats', desc: 'MP4, MOV, MKV, AVI, and more.' },
            { icon: <HighQualityIcon fontSize='large' color='primary' />, title: 'Custom Conversion', desc: 'Resolution, codec, bitrate & FPS control.' },
            { icon: <PublicIcon fontSize='large' color='primary' />, title: 'Cross-Browser', desc: 'Works on Chrome, Firefox, Safari, Edge – even on mobile.' }].map((item, i) => (
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
              {[{ icon: <CloudUploadIcon />, title: 'Upload', desc: 'Drag & drop or select.' },
              { icon: <SwapHorizIcon />, title: 'Choose Format', desc: 'MP4, MOV, MKV, AVI, WebM.' },
              { icon: <TuneIcon />, title: 'Set Options', desc: 'Resolution, codec, bitrate, FPS.' },
              { icon: <FlashOnIcon />, title: 'Convert Locally', desc: 'In‑browser FFmpeg WASM.' },
              { icon: <DownloadIcon />, title: 'Download', desc: 'Clean output, no watermark.' }].map((step, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
            <Grid size={12}>
              <Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <UploadFileIcon fontSize='large' color='primary' />, title: 'Drag & Drop', desc: 'Quick video import.' },
            { icon: <VideoFileIcon fontSize='large' color='primary' />, title: 'Format Support', desc: 'MP4, MOV, MKV, AVI, WebM.' },
            { icon: <TuneIcon fontSize='large' color='primary' />, title: 'Resolution Control', desc: '1080p, 720p, 480p or custom.' },
            { icon: <HighQualityIcon fontSize='large' color='primary' />, title: 'Codec Options', desc: 'H.264 / H.265 & audio codecs.' },
            { icon: <SpeedIcon fontSize='large' color='primary' />, title: 'Bitrate & FPS', desc: 'Quality & smoothness tuning.' },
            { icon: <DownloadIcon fontSize='large' color='primary' />, title: 'Instant Export', desc: 'No queue or watermark.' },
            { icon: <FlashOnIcon fontSize='large' color='primary' />, title: 'Free & Private', desc: 'No signup or uploads.' }].map((feat, i) => (
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
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center' flexGrow={1}>
            <Grid size={12}>
              <Typography variant='h2' mb={4} align='center'>FAQs</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
                <Accordion key={idx} square disableGutters elevation={3}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-vc-${idx}-content`} id={`faq-vc-${idx}-header`}>
                    <Typography variant='h6' component='h3'>{faq.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 2 }}>
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
          <Grid container spacing={3} justifyContent='center' flexGrow={1}>
            <Grid size={12}><Typography variant='h2' align='center'>Ready to convert a video?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Upload your file and convert it instantly — private & free.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/video/convert'>Upload</Button>
              <Button size='large' href='/tools/video/how-to-convert-video-online' sx={{ color: 'common.white' }}>How-to Guide</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
