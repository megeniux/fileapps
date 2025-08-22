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
// Icons for new content
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
    minHeight: 500,
    paddingTop: theme.spacing(6),
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
        <title>Free Online Video Converter – Convert Videos to MP4, AVI, MKV (No Signup, No Watermark)</title>
        <meta name="description" content="Convert videos to MP4, AVI, MKV, MOV, and more online for free. No signup, no credit card, no watermark. Customize resolution, codec, bitrate, and FPS – browser-based." />
        <meta name="keywords" content="convert video online free, convert video to mp4, free online video converter, no signup video converter, change video resolution online, convert mov to mp4 free, convert mkv to mp4 online, video codec converter online, convert video without losing quality" />
        <meta property="og:title" content="Convert Videos Online Free – MP4, AVI, MKV, MOV (No Signup)" />
        <meta property="og:description" content="Free video converter in your browser. Convert to MP4, AVI, MOV, MKV and more. No signups, no uploads, no watermarks. Full customization – resolution, codec, bitrate." />
        <meta property="og:image" content="/images/landing/video-converter-landing.png" />
        <meta property="og:type" content="website" />
  <meta property="og:url" content="https://fileapps.click/tools/video/convert-landing" />
        <meta property="og:site_name" content="FileApps" />
  <link rel="canonical" href="https://fileapps.click/tools/video/convert-landing" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Convert Videos Online – Free, Fast & No Signup</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Convert your videos to MP4, MOV, MKV, AVI, and more directly in your browser. Customize resolution, FPS, bitrate, and codec. No signups, no credit card, no watermarks – 100% private.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='primary' size='large' href="/tools/video/convert" variant="contained">Upload Video</Button>
                <Button size='large' href="/tools/video/convert-blog" variant="text" sx={{ color: 'text.secondary' }}>Read Guide</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/video-convert-hero.jpg' alt='Laptop with video conversion interface' title='Video Converter' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Online Video Converter?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <PrivacyTipIcon fontSize='large' color='primary' />, title: '100% Private', desc: 'Runs in your browser with FFmpeg WASM. No uploads, no data leaks.' },
              { icon: <FlashOnIcon fontSize='large' color='primary' />, title: 'Free & No Signup', desc: 'Convert videos instantly – no credit card, no registration, no watermarks.' },
              { icon: <SwapHorizIcon fontSize='large' color='primary' />, title: 'Multiple Formats', desc: 'MP4, MOV, MKV, AVI, and more.' },
              { icon: <HighQualityIcon fontSize='large' color='primary' />, title: 'Custom Conversion', desc: 'Change resolution, codec, bitrate, and FPS.' },
              { icon: <PublicIcon fontSize='large' color='primary' />, title: 'Cross-Browser', desc: 'Works on Chrome, Firefox, Safari, Edge – even on mobile.' }].map((item, i) => (
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
            <Grid size={12}>
              <Typography variant='h2'>How It Works</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent='center'>
              {[{ icon: <CloudUploadIcon />, title: 'Upload Video File', desc: 'Drag & drop or click to select.' },
                { icon: <SwapHorizIcon />, title: 'Choose Output Format', desc: 'MP4, MOV, MKV, AVI, etc.' },
                { icon: <TuneIcon />, title: 'Customize Settings', desc: 'Resolution, codec, bitrate, FPS.' },
                { icon: <FlashOnIcon />, title: 'Convert Video', desc: 'Processing happens in your browser.' },
                { icon: <DownloadIcon />, title: 'Download File', desc: 'Export converted video instantly.' }].map((step, i) => (
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
            <Grid size={12}>
              <Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <UploadFileIcon fontSize='large' color='primary' />, title: 'Drag & Drop Upload', desc: 'Easily add your videos.' },
              { icon: <VideoFileIcon fontSize='large' color='primary' />, title: 'Supports Major Formats', desc: 'MP4, MOV, MKV, AVI, and more.' },
              { icon: <TuneIcon fontSize='large' color='primary' />, title: 'Custom Resolution', desc: 'Convert to 1080p, 720p, 480p, or custom size.' },
              { icon: <HighQualityIcon fontSize='large' color='primary' />, title: 'Codec Control', desc: 'Change video (H.264, H.265) and audio codecs.' },
              { icon: <SpeedIcon fontSize='large' color='primary' />, title: 'Bitrate & FPS Options', desc: 'Fine-tune video quality and smoothness.' },
              { icon: <DownloadIcon fontSize='large' color='primary' />, title: 'Instant Download', desc: 'Export converted videos without delay.' },
              { icon: <FlashOnIcon fontSize='large' color='primary' />, title: 'Completely Free', desc: 'No signups, no watermarks, no credit card required.' }].map((feat, i) => (
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
            <Grid size={12}>
              <Typography variant='h2' mb={4} align='center'>FAQs</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
            </Grid>
            {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
              <Grid key={idx} size={{ xs: 12 }}>
                <Accordion square disableGutters elevation={3} sx={{ '& .MuiAccordionSummary-root': { px: 1, py: 0.5 }, '& .MuiAccordionDetails-root': { px: 1, py: 1 } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-vc-${idx}-content`} id={`faq-vc-${idx}-header`}>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to convert a video?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Upload your file and convert it instantly — private & free.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/video/convert'>Upload Video</Button>
              <Button size='large' href='/tools/video/convert-blog' sx={{ color: 'common.white' }}>Read Guide</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
