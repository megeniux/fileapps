import { Helmet } from 'react-helmet-async'

// MUI Imports
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

export default function BurnCaptionsBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>Burn Subtitles into Video – Free Online Caption Burner (No Signup)</title>
        <meta name="description" content="Hardcode SRT/VTT into MP4, MOV, MKV, WebM in your browser. Style font, size, color, outline & position. Preview then export – private & watermark‑free." />
        <meta property="og:title" content="Burn Captions into Video Online – Fast, Private & Free" />
        <meta property="og:description" content="Hardcode SRT/VTT with styling & position control locally. No uploads, signup or watermark." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/landing/burn-caption-hero.jpg" />
        <meta property="og:url" content="/tools/video/how-to-burn-captions-into-video-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/how-to-burn-captions-into-video-online" />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/burn-caption-hero.jpg' alt='Burn Captions' title='Burn Captions' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px', filter: 'hue-rotate(65deg)' }} />
          <Typography variant="h3" component="h1" gutterBottom>Burn Subtitles into Video — Free, Private & Watermark‑Free</Typography>
          <Typography variant="body1">Hardcode SRT / VTT into MP4, MOV, MKV or WebM entirely in your browser. Customize font, size, color, outline & position; preview timing before exporting.</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>Why Burn Captions?</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Accessibility for hearing‑impaired viewers.</Typography></li>
            <li><Typography variant='body1'>Silent autoplay on social feeds.</Typography></li>
            <li><Typography variant='body1'>Permanent translations / branding.</Typography></li>
            <li><Typography variant='body1'>Cross‑platform consistency (always visible).</Typography></li>
          </Box>

          <Typography variant="h4" component="h2" gutterBottom>How It Works (5 Steps)</Typography>
          <Box component='ol' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1' component='span'><strong>Upload</strong> video (MP4, MOV, MKV, WebM).</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Add subtitles</strong> (SRT or VTT).</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Style</strong> font size, color, outline & position.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Preview</strong> timing & legibility.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Burn & download</strong> locally (no watermark).</Typography></li>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h4" component="h2" gutterBottom>Key Features</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Local FFmpeg WASM — no uploads.</Typography></li>
            <li><Typography variant='body1'>SRT & VTT support.</Typography></li>
            <li><Typography variant='body1'>Video: MP4, MOV, MKV, WebM (browser decode).</Typography></li>
            <li><Typography variant='body1'>Styling: font size, color, outline.</Typography></li>
            <li><Typography variant='body1'>Position toggle (top / bottom).</Typography></li>
            <li><Typography variant='body1'>Resolution preservation (no quality loss).</Typography></li>
            <li><Typography variant='body1'>Preview before final burn.</Typography></li>
            <li><Typography variant='body1'>No watermark or signup.</Typography></li>
          </Box>
          <Typography variant="h4" component="h2" gutterBottom>Use Cases</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Social media reels / shorts.</Typography></li>
            <li><Typography variant='body1'>Course & tutorial exports.</Typography></li>
            <li><Typography variant='body1'>Accessibility compliance.</Typography></li>
            <li><Typography variant='body1'>Marketing & promo videos.</Typography></li>
          </Box>
          <Typography variant="h4" component="h2" gutterBottom>Tips</Typography>
            <Box component='ul' sx={{ pl: 3, mb: 2 }}>
              <li><Typography variant='body1'>Use high contrast (white + dark outline).</Typography></li>
              <li><Typography variant='body1'>Keep lines ≈32–42 chars for mobile readability.</Typography></li>
              <li><Typography variant='body1'>Pre‑sync subtitles (no in‑app timing edit yet).</Typography></li>
              <li><Typography variant='body1'>Preview after styling & position change.</Typography></li>
              <li><Typography variant='body1'>Export MP4 for widest compatibility.</Typography></li>
            </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant='h4' component='h2' gutterBottom>FAQs</Typography>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>Is processing private?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant='body1'>Yes — caption burning happens locally (no uploads).</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>Can I preview before burning?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant='body1'>Yes — review timing & styling, then finalize.</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>What subtitle formats?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant='body1'>SRT and VTT (WebVTT).</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>Which video formats?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant='body1'>MP4, MOV, MKV, WebM (others if browser supports).</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>Can I change caption position?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant='body1'>Yes — choose top or bottom before burning.</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>Are captions removable later?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant='body1'>No — hardsubbed captions are permanent.</Typography></AccordionDetails>
          </Accordion>
          <Accordion disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>Any watermark or signup?</Typography></AccordionSummary>
            <AccordionDetails><Typography variant='body1'>No — free, watermark‑free & no account.</Typography></AccordionDetails>
          </Accordion>
          <Divider sx={{ my: 3 }} />
          <Typography variant='h4' component='h2' gutterBottom>Conclusion</Typography>
          <Typography variant='body1' mb={2}>Upload, add SRT/VTT, style & position, preview, then burn and download — fast, private & watermark‑free.</Typography>
          <Box mt={4} textAlign="center">
            <Button color='primary' size='large' href="/tools/video/burn-caption" variant="contained">Upload</Button>
            <Button color='primary' size='large' href="/tools/video/burn-captions-into-video-online" variant="outlined" sx={{ ml: 2 }}>Features</Button>
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
    { "@type": "Question", "name": "Is processing private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All burning is executed locally — no uploads." } },
    { "@type": "Question", "name": "Can I preview before burning?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can review timing & styling before finalizing." } },
    { "@type": "Question", "name": "What subtitle formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "SRT and VTT (WebVTT) files." } },
    { "@type": "Question", "name": "Which video formats can I use?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, MKV, WebM and others the browser supports." } },
    { "@type": "Question", "name": "Can I change caption position?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Toggle top or bottom before burning." } },
    { "@type": "Question", "name": "Are captions removable after burning?", "acceptedAnswer": { "@type": "Answer", "text": "No. Burned (hardsub) captions are permanent in the video frames." } },
    { "@type": "Question", "name": "Is there any watermark or required signup?", "acceptedAnswer": { "@type": "Answer", "text": "No. The tool is free, watermark‑free and requires no account." } }
  ]
}
