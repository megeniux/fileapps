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
import MergeTypeIcon from '@mui/icons-material/MergeType'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import ReorderIcon from '@mui/icons-material/Reorder'
import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import SpeedIcon from '@mui/icons-material/Speed'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I merge audio files online?", "acceptedAnswer": { "@type": "Answer", "text": "Simply upload your audio files, reorder them, hit “Merge,” and download the combined file." } },
    { "@type": "Question", "name": "Which audio formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP3, WAV, FLAC, AAC, OGG, and many others." } },
    { "@type": "Question", "name": "Is it truly free with no watermark?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—100% free, watermark-free, and no signup required." } },
    { "@type": "Question", "name": "Are my audio files uploaded to any server?", "acceptedAnswer": { "@type": "Answer", "text": "Not at all. The merge happens entirely within your browser—nothing is uploaded." } },
    { "@type": "Question", "name": "Can I use this on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—fully compatible across modern iOS, Android, Windows, and macOS browsers." } }
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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
}))

export default function AudioMergerLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Audio Merger – Merge MP3, WAV, FLAC (No Signup, No Watermark)</title>
        <meta name="description" content="Merge multiple audio files online for free. No signup, no watermark. Drag & drop clips, reorder, and combine them directly in your browser – 100% private." />
        <meta name="keywords" content="merge audio online free, combine audio files, join mp3 files online, merge wav and mp3, free audio combiner, audio merger tool online, no signup audio merger, audio merger no watermark, merge aac online free, browser-based audio merger, audio joiner online" />
        <meta property="og:title" content="Merge Audio Files Online – MP3, WAV, FLAC (No Signup)" />
        <meta property="og:description" content="Free online audio merger – combine MP3, WAV, FLAC, AAC & more. No signup, no watermark. Drag, reorder, merge, and download instantly." />
        <meta property="og:image" content="/images/landing/audio-merger-landing.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/audio/merge-audio-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/audio/merge-audio-online" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Merge Audio Files Online – Free, Fast & No Signup</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Combine multiple audio tracks (MP3, WAV, FLAC, AAC & more) directly in your browser. Drag, reorder, preview, and export — no watermark, no uploads, full privacy.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='warning' size='large' href="/tools/audio/merge" variant="contained">Add Audios</Button>
                <Button size='large' href="/tools/audio/how-to-merge-audio-online" variant="text" sx={{ color: 'text.secondary' }}>Read Guide</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/audio-merger-landing.png' alt='Interface for merging multiple audio clips' title='Audio Merger' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Online Audio Merger?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <PrivacyTipIcon fontSize='large' color='warning' />, title: '100% Private', desc: 'Everything processes locally — nothing uploaded.' },
            { icon: <FlashOnIcon fontSize='large' color='warning' />, title: 'Free & No Signup', desc: 'No watermark, no credit card, unlimited merges.' },
            { icon: <AudiotrackIcon fontSize='large' color='warning' />, title: 'Drag & Reorder', desc: 'Add clips and arrange order easily.' },
            { icon: <HighQualityIcon fontSize='large' color='warning' />, title: 'Format Support', desc: 'MP3, WAV, FLAC, AAC, OGG & more.' }].map((item, i) => (
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
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent="center">
              {[{ icon: <CloudUploadIcon />, title: 'Upload Audio Files', desc: 'Drag & drop or click to add.' },
              { icon: <ReorderIcon />, title: 'Reorder Your Tracks', desc: 'Move tracks up or down.' },
              { icon: <AudiotrackIcon />, title: 'Preview & Edit', desc: 'Listen before merging.' },
              { icon: <MergeTypeIcon />, title: 'Click Merge', desc: 'FFmpeg WASM stitches locally.' },
              { icon: <DownloadIcon />, title: 'Download Merged Track', desc: 'Export merged audio instantly.' }].map((step, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'warning.main', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</Box>
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
            {[{ icon: <UploadFileIcon fontSize='large' color='warning' />, title: 'Multi-File Upload', desc: 'Add several tracks at once.' },
            { icon: <PlaylistAddIcon fontSize='large' color='warning' />, title: 'Reorder Friendly', desc: 'Adjust sequence anytime.' },
            { icon: <AudiotrackIcon fontSize='large' color='warning' />, title: 'Instant Preview', desc: 'Validate order by listening.' },
            { icon: <SpeedIcon fontSize='large' color='warning' />, title: 'Fast Processing', desc: 'Local merging, no queue.' },
            { icon: <MergeTypeIcon fontSize='large' color='warning' />, title: 'Format Agnostic', desc: 'Different codecs accepted.' },
            { icon: <HighQualityIcon fontSize='large' color='warning' />, title: 'No Watermarks', desc: 'Clean output every time.' }].map((feat, i) => (
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
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-am-${idx}-content`} id={`faq-am-${idx}-header`}>
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
            <Grid size={12}><Typography variant='h2' align='center'>Ready to merge your audios?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free audio merging — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/audio/merge'>Add Audios</Button>
              <Button size='large' href='/tools/audio/how-to-merge-audio-online' sx={{ color: 'common.white' }}>Read Guide</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
