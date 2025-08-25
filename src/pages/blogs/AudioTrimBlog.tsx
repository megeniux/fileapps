import { Helmet } from 'react-helmet-async'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function AudioTrimBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>How to Trim Audio Files Online Free (No Signup, No Uploads)</title>
        <meta name="description" content="Free online audio trimmer – cut MP3, WAV, FLAC, AAC, OGG & M4A privately in your browser. No signup, no watermark." />
        <meta property="og:title" content="Trim Audio Online Free – MP3, WAV, FLAC (No Signup)" />
        <meta property="og:description" content="Cut & preview audio locally (MP3, WAV, FLAC, AAC). Private, fast & watermark‑free." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/landing/audio-trimmer-hero.jpg" />
        <meta property="og:url" content="/tools/audio/how-to-trim-audio-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/audio/how-to-trim-audio-online" />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/audio-trimmer-hero.jpg' alt='Audio Trimmer' title='Audio Trimmer' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px' }} />
          <Typography variant="h3" component="h1" gutterBottom>Trim Audio Files Online — Free, Private & No Watermark</Typography>
          <Typography variant="body1">Cut MP3, WAV, FLAC, AAC, OGG & M4A directly in your browser — no uploads, signup or watermark. Ideal for ringtones, loops, podcast cleanup & excerpts.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom>Why Trim Audio?</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Create ringtones or highlights.</Typography></li>
            <li><Typography variant='body1'>Remove silence, ads or mistakes.</Typography></li>
            <li><Typography variant='body1'>Extract study or rehearsal sections.</Typography></li>
            <li><Typography variant='body1'>Shorten voice notes for sharing.</Typography></li>
          </Box>

          <Typography variant="h4" component="h2" gutterBottom>How It Works (4 Steps)</Typography>
          <Box component='ol' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1' component='span'><strong>Upload</strong> (drag & drop supported).</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Select range</strong> by adjusting start & end markers.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Preview</strong> to confirm accuracy.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Download</strong> trimmed audio — watermark‑free.</Typography></li>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h4" component="h2" gutterBottom>Key Features</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'><strong>Local trimming:</strong> privacy by design.</Typography></li>
            <li><Typography variant='body1'><strong>Multi‑format:</strong> MP3, WAV, FLAC, AAC, OGG, M4A.</Typography></li>
            <li><Typography variant='body1'><strong>Instant preview:</strong> no waiting.</Typography></li>
            <li><Typography variant='body1'><strong>Clean output:</strong> no watermark or branding.</Typography></li>
            <li><Typography variant='body1'><strong>Fast export:</strong> browser WebAssembly pipeline.</Typography></li>
          </Box>

          <Typography variant="h4" component="h2" gutterBottom>Use Cases</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Ringtones & notifications.</Typography></li>
            <li><Typography variant='body1'>Podcast segment cleanup.</Typography></li>
            <li><Typography variant='body1'>Practice loops for music.</Typography></li>
            <li><Typography variant='body1'>Lecture excerpt extraction.</Typography></li>
          </Box>

          <Typography variant="h4" component="h2" gutterBottom>Tips</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Export WAV/FLAC if you will re‑edit.</Typography></li>
            <li><Typography variant='body1'>Keep originals for lossy formats.</Typography></li>
            <li><Typography variant='body1'>Add tiny fades (when available) to avoid clicks.</Typography></li>
            <li><Typography variant='body1'>Trim on zero crossings for clean loops (future feature).</Typography></li>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h4" component="h2" gutterBottom>FAQs</Typography>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" component="h3">Can I cut MP3 files?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant="body1">Yes — MP3 plus WAV, FLAC, AAC, OGG, M4A and other browser‑supported formats.</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" component="h3">Do I need to upload?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant="body1">No. Trimming runs entirely in your browser for privacy.</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" component="h3">Is it free & watermark‑free?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant="body1">Yes — fully free with no watermark or signup.</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" component="h3">Will quality drop?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant="body1">Lossless inputs can remain lossless; lossy formats may re‑encode.</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" component="h3">Any size limits?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant="body1">Only constrained by available device memory.</Typography></AccordionDetails>
          </Accordion>

          <Divider sx={{ my: 3 }} />
          <Typography variant="h4" component="h2" gutterBottom>Conclusion</Typography>
          <Typography variant="body1" mb={2}>Trim audio quickly & privately — upload locally, set range, preview, and export a clean, watermark‑free file in seconds.</Typography>

          <Box mt={4} textAlign="center">
            <Button color='secondary' size='large' href="/tools/audio/trim" variant="contained">Upload Audio</Button>
            <Button color='secondary' size='large' href="/tools/audio/trim-audio-online" variant="outlined" sx={{ ml: 2 }}>Features</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I cut MP3 files?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — MP3 plus WAV, FLAC, AAC, OGG, M4A and other browser‑supported formats." } },
    { "@type": "Question", "name": "Do I need to upload?", "acceptedAnswer": { "@type": "Answer", "text": "No. Trimming runs entirely in your browser for privacy." } },
    { "@type": "Question", "name": "Is it free & watermark‑free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — fully free with no watermark or signup." } },
    { "@type": "Question", "name": "Will quality drop?", "acceptedAnswer": { "@type": "Answer", "text": "Lossless inputs can remain lossless; lossy formats may re‑encode." } },
    { "@type": "Question", "name": "Any size limits?", "acceptedAnswer": { "@type": "Answer", "text": "Only constrained by available device memory." } }
  ]
}
