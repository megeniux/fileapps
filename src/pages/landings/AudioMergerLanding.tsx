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
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import MergeTypeIcon from '@mui/icons-material/MergeType'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ReorderIcon from '@mui/icons-material/Reorder'
import DownloadIcon from '@mui/icons-material/Download'
import FlashOnIcon from '@mui/icons-material/FlashOn'

// Component (moved above constants)
export default function AudioMergerLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Audio Merger – Combine MP3, WAV, FLAC, AAC</title>
        <meta name="description" content="Merge multiple audio tracks into one file in your browser. Reorder, preview & export MP3, WAV, FLAC, AAC & OGG. Private, free & watermark‑free." />
        <meta property="og:title" content="Merge Audio Online Free – Fast, Private & Watermark‑Free" />
        <meta property="og:description" content="Drag, reorder & merge audio clips locally (MP3, WAV, FLAC, AAC). No uploads, watermark or signup." />
        <meta property="og:image" content="/images/landing/audio-merger-landing.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/audio/merge-audio-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/audio/merge-audio-online" />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      {/* Hero */}
      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Merge Audio Files Online – Free, Fast & Private</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>
                Combine multiple audio tracks (MP3, WAV, FLAC, AAC, OGG) directly in your browser. Drag, reorder, preview & export — no uploads, no signup, no watermark.
              </Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='warning' size='large' href="/tools/audio/merge" variant="contained">Add Audios</Button>
                <Button size='large' href="/tools/audio/how-to-merge-audio-online" variant="text" sx={{ color: 'text.secondary' }}>Read Guide</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/audio-merger-landing.png' alt='Audio Merger UI' title='Audio Merger' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Why Us */}
      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Online Audio Merger?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PrivacyTipIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Local Privacy</Typography>
                <Typography variant='body1'>All merging runs in your browser.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PlaylistAddIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Drag & Reorder</Typography>
                <Typography variant='body1'>Full control over sequence.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <HighQualityIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Format Support</Typography>
                <Typography variant='body1'>MP3, WAV, FLAC, AAC, OGG.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <FlashOnIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Fast & Free</Typography>
                <Typography variant='body1'>No signup. No watermark.</Typography>
              </CardContent></Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* How It Works */}
      <section className='how-it-works'>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography variant='h2'>How It Works</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent='center' flexGrow={1}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'warning.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CloudUploadIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>1. Add Files</Typography>
                  <Typography variant='body1'>Drag & drop or select.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'warning.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ReorderIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>2. Reorder</Typography>
                  <Typography variant='body1'>Arrange track order.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'warning.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AudiotrackIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>3. Preview</Typography>
                  <Typography variant='body1'>Check sequence flow.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'warning.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MergeTypeIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>4. Merge & Download</Typography>
                  <Typography variant='body1'>Export final file.</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Key Features */}
      <section className='key-features'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <CloudUploadIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Batch Import</Typography>
                <Typography variant='body1'>Add multiple clips together.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <MergeTypeIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Format Normalization</Typography>
                <Typography variant='body1'>Mixed codecs re‑encoded.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <DownloadIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Instant Export</Typography>
                <Typography variant='body1'>Quick local processing.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <HighQualityIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Clean Output</Typography>
                <Typography variant='body1'>No watermark branding.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PlaylistAddIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Order Control</Typography>
                <Typography variant='body1'>Drag to arrange tracks.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PrivacyTipIcon fontSize='large' color='warning' />
                <Typography variant='h5' component='h3' gutterBottom>Private</Typography>
                <Typography variant='body1'>Stays on your device.</Typography>
              </CardContent></Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Use Cases & Tips */}
      <section className='use-cases'>
        <Container maxWidth="lg">
          <Typography variant='h2'>Use Cases & Tips</Typography>
          <Divider sx={{ width: 100, mx: 'auto', my: 2 }} />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Common Scenarios</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Podcast intro + main + outro</li>
                  <li>Combine practice loops</li>
                  <li>Lecture segment stitching</li>
                  <li>Voice note compilation</li>
                </Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Tips</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Match sample rates if possible</li>
                  <li>Normalize loudness first</li>
                  <li>Export as uniform format</li>
                  <li>Large merges need RAM</li>
                </Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Who It’s For</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Podcasters / editors</li>
                  <li>Musicians & learners</li>
                  <li>Lecturers & educators</li>
                  <li>Voice memo users</li>
                </Typography>
              </CardContent></Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* FAQs */}
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
                  <Typography variant='h6' component='h3'>How do I merge audio?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>Add tracks, arrange order, then merge & download.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Are files uploaded?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>No — all processing is local in your browser.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Do formats need to match?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>Not strictly — mixed formats are re‑encoded as needed.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Is there a size limit?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>Only practical device memory limits apply.</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion square disableGutters elevation={3}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' component='h3'>Watermark or signup?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1'>None — fully free & watermark‑free.</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* CTA */}
      <section className='cta-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}><Typography variant='h2' align='center'>Ready to merge your audio?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & watermark‑free merging — all local.</Typography></Grid>
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

// FAQ Schema (bottom)
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I merge audio?", "acceptedAnswer": { "@type": "Answer", "text": "Add tracks, arrange order, then merge & download locally in your browser." } },
    { "@type": "Question", "name": "Are files uploaded?", "acceptedAnswer": { "@type": "Answer", "text": "No. All merging runs client‑side with WebAssembly — nothing leaves your device." } },
    { "@type": "Question", "name": "Do formats need to match?", "acceptedAnswer": { "@type": "Answer", "text": "Not necessarily. Mixed sources are re‑encoded to a consistent output when needed." } },
    { "@type": "Question", "name": "Is there a size limit?", "acceptedAnswer": { "@type": "Answer", "text": "Only limited by your device memory. Very large merges may require more RAM." } },
    { "@type": "Question", "name": "Watermark or signup?", "acceptedAnswer": { "@type": "Answer", "text": "None. The tool is free, private and watermark‑free." } }
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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
  '& .use-cases': {
    paddingBlock: theme.spacing(8),
    '& .MuiTypography-h2': { textAlign: 'center', marginBottom: theme.spacing(2) }
  },
}))
