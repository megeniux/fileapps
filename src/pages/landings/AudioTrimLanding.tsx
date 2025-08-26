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
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import SpeedIcon from '@mui/icons-material/Speed'
import DownloadIcon from '@mui/icons-material/Download'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

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
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
  '& .use-cases': {
    paddingBlock: theme.spacing(8),
    '& .MuiTypography-h2': { textAlign: 'center', marginBottom: theme.spacing(2) }
  },
}))

export default function AudioTrimLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Free Online Audio Trimmer – Cut & Trim MP3, WAV, FLAC (No Signup)</title>
        <meta name="description" content="Trim MP3, WAV, FLAC, AAC, OGG & M4A locally in your browser. Free, private, no uploads or watermark." />
        <meta property="og:title" content="Free Online Audio Trimmer – Cut & Trim MP3, WAV, FLAC" />
        <meta property="og:description" content="Cut audio privately in your browser. MP3, WAV, FLAC, AAC support. No signup or watermark." />
        <meta property="og:image" content="/images/landing/audio-trimmer-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/audio/trim-audio-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/audio/trim-audio-online" />
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Trim Audio Files Online – Free & No Signup</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Cut MP3, WAV, FLAC, AAC, OGG & M4A precisely in your browser — free, private & watermark‑free.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='secondary' size='large' href="/tools/audio/trim" variant="contained">Upload Audio</Button>
                <Button size='large' href="/tools/audio/how-to-trim-audio-online" variant="text" sx={{ color: 'text.secondary' }}>Learn How to Use</Button>
              </Box>
            </Grid>
            <Grid container size={{ xs: 12, md: 6 }} justifyContent={{ xs: 'center', md: 'flex-end' }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/audio-trimmer-hero.jpg' alt='Interface for cutting and trimming audio online' title='Audio Trimmer' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center' flexGrow={1}>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Online Audio Trimmer?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <ContentCutIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>100% Free</Typography>
                <Typography variant='body1'>No signup, fees or watermark.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PrivacyTipIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Private</Typography>
                <Typography variant='body1'>All processing stays local.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <AudiotrackIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Format Support</Typography>
                <Typography variant='body1'>MP3, WAV, FLAC, AAC, OGG.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <HighQualityIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Accurate</Typography>
                <Typography variant='body1'>Precise region selection.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <SpeedIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Fast Preview</Typography>
                <Typography variant='body1'>Instant in‑browser play.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <CloudUploadIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Cross‑Platform</Typography>
                <Typography variant='body1'>Desktop & mobile browsers.</Typography>
              </CardContent></Card>
            </Grid>
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
            <Grid container spacing={{ xs: 8, sm: 6 }} justifyContent='center' flexGrow={1}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CloudUploadIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>1. Upload</Typography>
                  <Typography variant='body1'>Drag & drop audio.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ContentCutIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>2. Set Range</Typography>
                  <Typography variant='body1'>Adjust start & end.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayArrowIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>3. Preview</Typography>
                  <Typography variant='body1'>Confirm selection.</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: '50%', width: 56, height: 56, mx: 'auto', mb: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DownloadIcon />
                  </Box>
                  <Typography variant='h5' component='h3' gutterBottom>4. Download</Typography>
                  <Typography variant='body1'>Export trimmed file.</Typography>
                </Box>
              </Grid>
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
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <ContentCutIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Precise Trimming</Typography>
                <Typography variant='body1'>Accurate start/end control.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <AudiotrackIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Format Support</Typography>
                <Typography variant='body1'>MP3, WAV, FLAC, AAC, OGG.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <PrivacyTipIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Local Only</Typography>
                <Typography variant='body1'>No uploads required.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <HighQualityIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Clean Output</Typography>
                <Typography variant='body1'>No watermark branding.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <SpeedIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Instant Preview</Typography>
                <Typography variant='body1'>Check result quickly.</Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%' }}><CardContent sx={{ p: 2 }}>
                <CloudUploadIcon fontSize='large' color='secondary' />
                <Typography variant='h5' component='h3'>Cross‑Device</Typography>
                <Typography variant='body1'>Desktop & mobile ready.</Typography>
              </CardContent></Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='use-cases'>
        <Container maxWidth="lg">
          <Typography variant='h2'>Use Cases & Tips</Typography>
          <Divider sx={{ width: 100, mx: 'auto', my: 2 }} />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Common Scenarios</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Create ringtones/snippets</li>
                  <li>Podcast ad removal</li>
                  <li>Lecture segment extraction</li>
                  <li>Music practice loops</li>
                </Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Tips</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Export lossless if re‑editing</li>
                  <li>Add tiny fades to avoid clicks</li>
                  <li>Keep originals for lossy edits</li>
                  <li>Trim on zero crossings (future)</li>
                </Typography>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}><CardContent>
                <Typography variant='h5' component='h3' gutterBottom>Who It’s For</Typography>
                <Typography component='ul' sx={{ pl: 3, m: 0 }}>
                  <li>Musicians & learners</li>
                  <li>Podcasters & editors</li>
                  <li>Content creators</li>
                  <li>Students & speakers</li>
                </Typography>
              </CardContent></Card>
            </Grid>
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
              {FAQ_SCHEMA.mainEntity.map((faq, idx) => (
                <Accordion key={idx} square disableGutters elevation={3}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-trim-${idx}-content`} id={`faq-trim-${idx}-header`}>
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
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid size={12}><Typography variant='h2' align='center'>Ready to trim your audio?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free audio trimming — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/audio/trim'>Upload Audio</Button>
              <Button size='large' href='/tools/audio/how-to-trim-audio-online' sx={{ color: 'common.white' }}>Learn How to Use</Button>
            </Grid>
          </Grid>
        </Container>
      </section>

  {/* FAQ Schema moved to bottom */}
  <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
    </Root>
  )
}

// FAQ schema constant for mapping and structured data
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I trim MP3 files?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — MP3 plus WAV, FLAC, AAC, OGG and other browser‑decodable formats." } },
    { "@type": "Question", "name": "Are files uploaded?", "acceptedAnswer": { "@type": "Answer", "text": "No. All trimming runs locally in your browser for privacy." } },
    { "@type": "Question", "name": "Is it free and watermark‑free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The trimmer is fully free with no watermark or signup." } },
    { "@type": "Question", "name": "Will quality degrade?", "acceptedAnswer": { "@type": "Answer", "text": "Lossless inputs can stay lossless; lossy formats may re‑encode when exporting." } },
    { "@type": "Question", "name": "Do I need an account?", "acceptedAnswer": { "@type": "Answer", "text": "No account required — completely browser‑based." } }
  ]
}
