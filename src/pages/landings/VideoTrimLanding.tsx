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
import MovieIcon from '@mui/icons-material/Movie'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import DownloadIcon from '@mui/icons-material/Download'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I trim my video?", "acceptedAnswer": { "@type": "Answer", "text": "Upload your video, use the slider to select the start and end points, then click 'Trim' to process and download the file." } },
    { "@type": "Question", "name": "What video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "We support MP4, MOV, AVI, MKV, and many other popular video formats." } },
    { "@type": "Question", "name": "Do I need to sign up?", "acceptedAnswer": { "@type": "Answer", "text": "No, the tool is completely free and doesn’t require any signup." } },
    { "@type": "Question", "name": "Is the trimming process private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! All processing is done locally in your browser; your video is never uploaded to a server." } },
    { "@type": "Question", "name": "Is there a watermark on the trimmed video?", "acceptedAnswer": { "@type": "Answer", "text": "No, your trimmed video will have no watermark or branding." } }
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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
}))

export default function VideoTrimLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Video Trimmer – Trim, Cut, and Edit Your Videos</title>
        <meta name="description" content="Trim your videos online for free. Select the start and end points to cut MP4, MOV, AVI, MKV, and other formats. 100% browser-based, no signup required, no watermark." />
        <meta name="keywords" content="video trimmer online free, trim video online free, cut video online, free video cutter, video editor trim, video trimming tool, online video trim, cut video in browser, free video cutting tool, trim video for free, free online video editor, trim MP4, MOV, AVI, MKV, free video cutter no watermark, online video cutter, trim video online, video editor free, no signup video trimmer, online video cut tool, free browser video trimmer" />
        <meta property="og:title" content="Free Online Video Trimmer – Trim, Cut, and Edit Videos Instantly" />
        <meta property="og:description" content="Trim, cut, or edit your videos online for free. Supports MP4, MOV, AVI, MKV, and more. No signup required, no watermark, 100% private, browser-based." />
        <meta property="og:image" content="/images/landing/video-trimmer-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/trim-video-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/trim-video-online" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Free Online Video Trimmer – Trim, Cut & Edit Videos Instantly</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Trim, cut, or adjust the duration of your video files online for free. No signup, no watermark, and fully browser-based. Works with MP4, MOV, AVI, MKV, and more!</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='info' size='large' href="/tools/video/trim" variant="contained">Upload Video</Button>
                <Button size='large' href="/tools/video/how-to-trim-video-online" variant="text" sx={{ color: 'text.secondary' }}>Learn How to Trim</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/video-trimmer-hero.jpg' alt='Interface for trimming and cutting videos online' title='Video Trimmer' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Free Online Video Trimmer?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <ContentCutIcon fontSize='large' color='info' />, title: '100% Free', desc: 'No signup, no charges, and no watermark on your videos.' },
            { icon: <PlayArrowIcon fontSize='large' color='info' />, title: 'Simple & Easy', desc: 'Upload a video, set the trim points, and download the result.' },
            { icon: <MovieIcon fontSize='large' color='info' />, title: 'Works with All Major Formats', desc: 'MP4, MOV, AVI, MKV, and many more.' },
            { icon: <DownloadIcon fontSize='large' color='info' />, title: 'Fast & Instant', desc: 'Trim your video and download it in seconds.' },
            { icon: <PrivacyTipIcon fontSize='large' color='info' />, title: 'No Software Needed', desc: 'Browser-based—no downloads or installations.' },
            { icon: <HighQualityIcon fontSize='large' color='info' />, title: '100% Private', desc: 'Your files remain private—everything happens locally.' }].map((item, i) => (
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
              {[{ icon: <CloudUploadIcon />, title: 'Upload Your Video', desc: 'Drag and drop or click to select your video file.' },
              { icon: <ContentCutIcon />, title: 'Set the Trim Points', desc: 'Use the slider to select the start and end points for your trim.' },
              { icon: <PrivacyTipIcon />, title: 'No Installation Needed', desc: 'Trim videos directly in your browser—no software required.' },
              { icon: <DownloadIcon />, title: 'Download the Edited Video', desc: 'Click "Download" once you\'re satisfied with your video trim.' }].map((step, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'info.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
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
            {[{ icon: <ContentCutIcon fontSize='large' color='info' />, title: 'Trim Videos Instantly', desc: 'Select the start and end points for your video trim.' },
            { icon: <PrivacyTipIcon fontSize='large' color='info' />, title: 'No Installation Needed', desc: 'Trim videos directly in your browser—no software required.' },
            { icon: <HighQualityIcon fontSize='large' color='info' />, title: 'No Watermarks', desc: 'Your trimmed video is clean with no branding.' },
            { icon: <MovieIcon fontSize='large' color='info' />, title: 'Multiple Format Support', desc: 'Works with MP4, MOV, AVI, MKV, and more.' },
            { icon: <DownloadIcon fontSize='large' color='info' />, title: 'Fast & Simple', desc: 'Upload, trim, and download in a few clicks.' },
            { icon: <CloudUploadIcon fontSize='large' color='info' />, title: 'Free & No Signup', desc: 'No need to create an account or sign up.' }].map((feat, i) => (
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
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-vt-${idx}-content`} id={`faq-vt-${idx}-header`}>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to trim your video?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free video trimming — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/video/trim'>Upload Video</Button>
              <Button size='large' href='/tools/video/how-to-trim-video-online' sx={{ color: 'common.white' }}>Learn How to Trim</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
