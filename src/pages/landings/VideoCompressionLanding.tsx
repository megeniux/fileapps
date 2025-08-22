// React import intentionally omitted to use the new JSX transform
import { Helmet } from 'react-helmet-async'

// MUI Components
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

// Icons
import CompressIcon from '@mui/icons-material/Compress';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I compress videos without uploading my files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The compressor runs FFmpeg compiled to WebAssembly in your browser so files remain on your device."
      }
    },
    {
      "@type": "Question",
      "name": "How do CRF and presets affect compression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CRF controls visual quality (lower = higher quality). Presets trade encoding speed for compression efficiency (ultrafast -> veryslow)."
      }
    }
  ]
}

const Root = styled(Paper)(({ theme }) => ({
  '& img': {
    maxWidth: '100%'
  },
  '& .hero-section': {
    minHeight: 500,
    paddingTop: theme.spacing(6),
    '& .hero-image img': { marginBottom: theme.spacing(2) },
    [theme.breakpoints.down('md')]: {
      '& .hero-text': {
        textAlign: 'center',
        paddingBottom: theme.spacing(6)
      },
      '& .hero-image img': {
        display: 'table',
        marginInline: 'auto'
      }
    }
  },
  '& .how-it-works': {
    paddingBlock: theme.spacing(8),
    textAlign: 'center',
    '& .MuiTypography-h2': {
      color: theme.palette.text.primary,
    }
  },
  '& .faq-section': {
    paddingBlock: theme.spacing(8),
    '& .MuiTypography-h2': {
      color: theme.palette.text.primary,
    },
    '& .MuiAccordionSummary-root': {
      padding: theme.spacing(0, 2, 0, 2)
    },
    '& .MuiAccordionDetails-root': {
      padding: theme.spacing(0, 2, 2, 2)
    }
  },
  '& .why-us, & .key-features, & .cta-section': {
    paddingBlock: theme.spacing(8),
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': {
      color: theme.palette.common.white
    }
  },
}));

export default function VideoCompressionLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Browser-based Video Compressor — Compress MP4 Online Without Uploads</title>
        <meta name="description" content="Compress MP4 and other videos in your browser using FFmpeg WASM. Private, fast, and free — CRF and preset controls, live progress, estimated file size." />
        <meta property="og:title" content="Browser-based Video Compressor — Compress MP4 Online Without Uploads" />
        <meta property="og:description" content="Reduce MP4 file size in your browser with CRF control and presets. No uploads, privacy-first video compression for social and web." />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <meta property="og:url" content="https://fileapps.click/tools/video/compress-landing" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fileapps.click/tools/video/compress-landing" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12,  md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Compress Videos Online — Private, Fast & Free</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>
                Compress MP4 and other videos directly in your browser using FFmpeg WebAssembly — no uploads, no sign-ups, full control over quality and speed.
              </Typography>
              <Box display="flex" gap={1}>
                <Button color='secondary' size='large' href="/tools/video/compress" variant="contained">Compress Now</Button>
                <Button size='large' href="/tools/video/compress-blog" variant="text" sx={{ color: 'text.secondary' }}>Read Guide</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12,  md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/video-compression-hero.jpg' alt='Compress Video' title='Compress Video' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography variant='h2'>Why use our video compressor?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <SecurityOutlinedIcon fontSize='large' color="secondary" />
                  <Typography variant='h5' component="h3">Privacy-first</Typography>
                  <Typography variant='body1'>Compression runs in your browser — your files never leave your device.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <SpeedIcon fontSize='large' color="secondary" />
                  <Typography variant='h5' component="h3">Fast & Free</Typography>
                  <Typography variant='body1'>No installs or sign-ups — compress videos quickly from your browser.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <SettingsSuggestIcon fontSize='large' color="secondary" />
                  <Typography variant='h5' component="h3">Precision Controls</Typography>
                  <Typography variant='body1'>Adjust CRF and presets to balance quality, speed and file size.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <DriveFolderUploadIcon fontSize='large' color="secondary" />
                  <Typography variant='h5' component="h3">Drag & Drop</Typography>
                  <Typography variant='body1'>Easily add videos and preview before compressing.</Typography>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </section>

      <section className='how-it-works'>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid size={12}><Typography variant='h2'>How compression works</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} /></Grid>

            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center">
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DriveFolderUploadIcon />
                  </Box>
                  <Box>
                    <Typography variant='h5' component='h3'>Upload your video</Typography>
                    <Typography variant='body1'>Drag & drop or select a video to compress.</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SettingsSuggestIcon />
                  </Box>
                  <Box>
                    <Typography variant='h5' component='h3'>Choose CRF & Presets</Typography>
                    <Typography variant='body1'>Set quality and speed preferences for the best tradeoff.</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SpeedIcon />
                  </Box>
                  <Box>
                    <Typography variant='h5' component='h3'>Compress in browser</Typography>
                    <Typography variant='body1'>FFmpeg WASM performs compression and shows live progress.</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='key-features'>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid size={12}><Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} /></Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <CompressIcon fontSize='large' color="secondary" />
                  <Typography variant='h5' component="h3">CRF control</Typography>
                  <Typography variant='body1'>Adjust constant rate factor to control quality and file size.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <SettingsSuggestIcon fontSize='large' color="secondary" />
                  <Typography variant='h5' component="h3">Preset slider</Typography>
                  <Typography variant='body1'>Choose encoding presets to balance speed and efficiency.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <DriveFolderUploadIcon fontSize='large' color="secondary" />
                  <Typography variant='h5' component="h3">Estimated output size</Typography>
                  <Typography variant='body1'>See an estimated compressed file size before you start.</Typography>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </section>

      <section className='faq-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid size={12}><Typography variant='h2' mb={4} align='center'>FAQs</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} /></Grid>
            {FAQ_SCHEMA.mainEntity.map((faq, idx) => (
              <Grid key={idx} size={{ xs: 12 }}>
                <Accordion
                  square
                  disableGutters
                  elevation={3}
                  sx={{
                    '& .MuiAccordionSummary-root': { px: 1, py: 0.5 },
                    '& .MuiAccordionDetails-root': { px: 1, py: 1 },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-${idx}-content`}
                    id={`faq-${idx}-header`}
                  >
                    <Typography variant='h6' component="h3">{faq.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 2 }}>
                    <Typography variant='body1'>
                      {faq.acceptedAnswer?.text}
                    </Typography>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to shrink your files?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component="p" color='common.white'>Compress video quickly and privately in your browser — free to use.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant="contained" size='large' href="/tools/video/compress">Compress Now</Button>
              <Button size='large' href="/tools/video/compress-blog" sx={{ color: 'common.white' }}>Read Guide</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
