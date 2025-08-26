// React import intentionally omitted to use the new JSX transform
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
// Icons for new rich content
import CompressIcon from '@mui/icons-material/Compress'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TuneIcon from '@mui/icons-material/Tune'
import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import SpeedIcon from '@mui/icons-material/Speed'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does the video compressor work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg WebAssembly in your browser. No file uploads, everything stays private on your device." } },
    { "@type": "Question", "name": "Can I compress large videos like 4K?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but the speed depends on your device's processing power and memory." } },
    { "@type": "Question", "name": "What is CRF and how does it affect quality?", "acceptedAnswer": { "@type": "Answer", "text": "CRF (Constant Rate Factor) controls quality. Lower CRF = higher quality and bigger size. Higher CRF = smaller size but lower quality." } },
    { "@type": "Question", "name": "Can I compress videos without changing resolution?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, keep the original resolution while reducing file size using CRF and bitrate adjustments." } },
    { "@type": "Question", "name": "Is this free and watermark-free?", "acceptedAnswer": { "@type": "Answer", "text": "100% free, no signup, no watermark, no credit card required." } },
    { "@type": "Question", "name": "Does it work on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it works in any modern mobile browser on Android and iOS." } }
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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
  '& .how-it-works': {
    paddingBlock: theme.spacing(8),
    textAlign: 'center'
  },
  '& .faq-section': {
    paddingBlock: theme.spacing(8),
    '& .MuiAccordionSummary-root': { padding: theme.spacing(0, 2) },
    '& .MuiAccordionDetails-root': { padding: theme.spacing(0, 2, 2) }
  }
}))

export default function VideoCompressionLanding() {
  const whyCards = [
    { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: '100% Private', desc: 'All processing happens in your browser. No uploads, no data leaks.' },
    { icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Free Forever', desc: 'No signup, no credit card, no watermark.' },
    { icon: <CompressIcon fontSize='large' color='secondary' />, title: 'Advanced Compression', desc: 'Adjust CRF, preset, and bitrate for best results.' },
    { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'Keep Quality', desc: 'Reduce file size without making your video blurry.' },
    { icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Cross-Platform', desc: 'Works on Chrome, Firefox, Safari, Edge, and mobile browsers.' }
  ]

  const steps = [
    { icon: <CloudUploadIcon />, title: 'Upload Video File', desc: 'Drag & drop or click to select.' },
    { icon: <TuneIcon />, title: 'Choose Compression Level', desc: 'Adjust CRF and preset (speed vs quality).' },
    { icon: <TuneIcon />, title: 'Set Advanced Options', desc: 'Customize resolution, bitrate, and format if needed.' },
    { icon: <CompressIcon />, title: 'Compress Video', desc: 'Processing happens in your browser with FFmpeg WASM.' },
    { icon: <DownloadIcon />, title: 'Download Video', desc: 'Get your compressed file instantly without uploads.' }
  ]

  const features = [
    { icon: <UploadFileIcon fontSize='large' color='secondary' />, title: 'Drag & Drop Upload', desc: 'Easily select your videos.' },
    { icon: <CompressIcon fontSize='large' color='secondary' />, title: 'CRF Control', desc: 'Fine-tune quality vs. file size (lower CRF = higher quality).' },
    { icon: <TuneIcon fontSize='large' color='secondary' />, title: 'Preset Options', desc: 'Choose faster or slower compression to fit your needs.' },
    { icon: <TuneIcon fontSize='large' color='secondary' />, title: 'Resolution Adjustment', desc: 'Downscale to 1080p, 720p, 480p, or custom.' },
    { icon: <TuneIcon fontSize='large' color='secondary' />, title: 'Bitrate Management', desc: 'Control audio and video bitrate precisely.' },
    { icon: <HighQualityIcon fontSize='large' color='secondary' />, title: 'Estimate Size Preview', desc: 'See expected size before starting compression.' },
    { icon: <SpeedIcon fontSize='large' color='secondary' />, title: 'Cross-Browser Support', desc: 'Works on desktop & mobile without software.' },
    { icon: <DownloadIcon fontSize='large' color='secondary' />, title: 'Instant Download', desc: 'Export compressed video immediately.' },
    { icon: <PrivacyTipIcon fontSize='large' color='secondary' />, title: 'Free Forever', desc: 'No signups, watermarks, or hidden charges.' }
  ]

  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Video Compressor Online – Compress Videos Without Losing Quality (No Signup)</title>
        <meta name='description' content='Compress videos online for free without losing quality. No signup, no watermark, no credit card. Reduce video file size with custom CRF, presets, and resolution control – 100% browser-based and private.' />
        <meta name='keywords' content='compress video online free, reduce video size without losing quality, compress mp4 online, free video compressor no watermark, compress video for whatsapp, compress 4k video online, compress video for youtube, online video compression without signup' />
        <meta property='og:title' content='Compress Videos Online Free – High Quality & No Signup' />
        <meta property='og:description' content='Free and private online video compressor. Reduce video size without losing quality. Customize CRF, presets, resolution – no signup, no watermarks.' />
        <meta property='og:image' content='/images/landing/video-compression-hero.jpg' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='/tools/video/compress-video-online' />
        <link rel='canonical' href='/tools/video/compress-video-online' />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} alignItems='center'>
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant='h2' component='h1'>Compress Videos Online – Free, Fast & High Quality</Typography>
              <Typography variant='h6' component='p' color='text.secondary' mt={3} mb={4}>Reduce video file size without losing quality. Adjust CRF, resolution, and compression speed with advanced options. 100% browser-based, no signup, no watermark.</Typography>
              <Box display='flex' gap={1} flexWrap='wrap'>
                <Button color='secondary' size='large' variant='contained' href='/tools/video/compress'>Upload</Button>
                <Button size='large' variant='outlined' color='secondary' href='/tools/video/how-to-compress-video-online'>Learn More</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/video-compression-hero.jpg' alt='Laptop with video compression interface' title='Online Video Compressor' loading='lazy' />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center' flexGrow={1}>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Online Video Compressor?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {whyCards.map((c, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}> {c.icon} <Typography variant='h5' component='h3'>{c.title}</Typography> <Typography variant='body1'>{c.desc}</Typography> </CardContent>
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
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center" flexGrow={1}>
              {steps.map((s, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</Box>
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
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography variant='h2'>Key Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {features.map((f, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}> {f.icon} <Typography variant='h5' component='h3'>{f.title}</Typography> <Typography variant='body1'>{f.desc}</Typography> </CardContent>
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
              <Typography variant='h2' align='center'>FAQs</Typography>
              <Divider sx={{ width: 100, borderColor: 'text.primary', mx: 'auto', my: 2 }} />
            </Grid>
            {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
              <Grid key={idx} size={{ xs: 12 }}>
                <Accordion square disableGutters elevation={3}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`vcfaq-${idx}-content`} id={`vcfaq-${idx}-header`}>
                    <Typography variant='h6' component='h3'>{faq.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
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
          <Grid container spacing={3} justifyContent='center' flexGrow={1}>
            <Grid size={12}><Typography variant='h2' align='center'>Ready to compress a video?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Upload your file and shrink it instantly — private & free.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/video/compress'>Upload</Button>
              <Button size='large' href='/tools/video/how-to-compress-video-online' sx={{ color: 'common.white' }}>Learn More</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
