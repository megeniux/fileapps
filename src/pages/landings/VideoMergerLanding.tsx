// React import omitted (new JSX transform)
import { Helmet } from 'react-helmet-async'

// MUI
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
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import MergeTypeIcon from '@mui/icons-material/MergeType'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ReorderIcon from '@mui/icons-material/Reorder'
import MovieIcon from '@mui/icons-material/Movie'
import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'
import SpeedIcon from '@mui/icons-material/Speed'

// FAQ schema derived from markdown
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I merge videos online with this tool?", "acceptedAnswer": { "@type": "Answer", "text": "Upload your clips, reorder them if needed, click Merge, then download the final video — all in your browser." } },
    { "@type": "Question", "name": "Which video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, AVI, MKV, WebM, and more common formats." } },
    { "@type": "Question", "name": "Is it really free with no watermark?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — completely free, no watermark, no signup required." } },
    { "@type": "Question", "name": "Will my files be uploaded to a server?", "acceptedAnswer": { "@type": "Answer", "text": "No. Processing happens locally via FFmpeg WebAssembly in your browser. Nothing is uploaded." } },
    { "@type": "Question", "name": "Can I use this on my phone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it works on modern mobile browsers (iOS, Android) as well as desktop." } }
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

export default function VideoMergerLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Video Merger – Merge MP4, MOV, AVI (No Signup, No Watermark)</title>
        <meta name="description" content="Merge multiple videos online for free. No signup, no watermark. Drag & drop clips, reorder, and combine them directly in your browser – 100% private." />
        <meta name="keywords" content="merge videos online free, combine videos online, join video clips free, merge mp4 videos, no signup video merger, video combiner online, no watermark video merger, merge mov and avi, browser-based video merger, video joiner tool" />
        <meta property="og:title" content="Merge Videos Online Free – MP4, MOV, AVI (No Signup)" />
        <meta property="og:description" content="Free online video merger – combine MP4, MOV, AVI & more. No signup, no watermark. Drag, reorder, merge, and download instantly." />
        <meta property="og:image" content="/images/landing/video-merge-hero.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/merge-videos-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/merge-videos-online" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Merge Videos Online – Free, Fast & No Signup</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Combine multiple video clips (MP4, MOV, AVI, MKV & more) directly in your browser. Drag, reorder, preview, and export — no watermark, no uploads, full privacy.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='success' size='large' href="/tools/video/merge" variant="contained">Upload</Button>
                <Button size='large' href="/tools/video/how-to-merge-videos-online" variant="text" sx={{ color: 'text.secondary' }}>Learn More</Button>
              </Box>
            </Grid>
            <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/video-merge-hero.png' alt='Interface for merging multiple video clips' title='Video Merger' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center' flexGrow={1}>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Online Video Merger?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <PrivacyTipIcon fontSize='large' color='success' />, title: '100% Private', desc: 'Everything processes locally — nothing uploaded.' },
            { icon: <FlashOnIcon fontSize='large' color='success' />, title: 'Free & No Signup', desc: 'No watermark, no credit card, unlimited merges.' },
            { icon: <MergeTypeIcon fontSize='large' color='success' />, title: 'Drag & Reorder', desc: 'Add clips and arrange order easily.' },
            { icon: <HighQualityIcon fontSize='large' color='success' />, title: 'Format Support', desc: 'MP4, MOV, AVI, MKV, WebM & more.' }].map((item, i) => (
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
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center" flexGrow={1}>
              {[{ icon: <CloudUploadIcon />, title: 'Upload Video Files', desc: 'Drag & drop or click to select.' },
              { icon: <ReorderIcon />, title: 'Arrange Order', desc: 'Move clips up or down.' },
              { icon: <MovieIcon />, title: 'Preview Merge', desc: 'Check sequence before combining.' },
              { icon: <MergeTypeIcon />, title: 'Click Merge', desc: 'FFmpeg WASM stitches locally.' },
              { icon: <DownloadIcon />, title: 'Download Video', desc: 'Export merged MP4 instantly.' }].map((step, i) => (
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
            {[{ icon: <UploadFileIcon fontSize='large' color='success' />, title: 'Multi-File Upload', desc: 'Add several clips at once.' },
            { icon: <PlaylistAddIcon fontSize='large' color='success' />, title: 'Reorder Friendly', desc: 'Adjust sequence anytime.' },
            { icon: <SmartDisplayIcon fontSize='large' color='success' />, title: 'Instant Preview', desc: 'Validate order visually.' },
            { icon: <SpeedIcon fontSize='large' color='success' />, title: 'Fast Processing', desc: 'Local merging, no queue.' },
            { icon: <MergeTypeIcon fontSize='large' color='success' />, title: 'Format Agnostic', desc: 'Different codecs accepted.' },
            { icon: <HighQualityIcon fontSize='large' color='success' />, title: 'No Watermarks', desc: 'Clean output every time.' }].map((feat, i) => (
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
            <Grid size={{ xs: 12 }}>
              {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
                <Accordion key={idx} square disableGutters elevation={3}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-vm-${idx}-content`} id={`faq-vm-${idx}-header`}>
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
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid size={12}><Typography variant='h2' align='center'>Ready to merge your videos?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free video merging — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/video/merge'>Upload</Button>
              <Button size='large' href='/tools/video/how-to-merge-videos-online' sx={{ color: 'common.white' }}>Learn More</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
