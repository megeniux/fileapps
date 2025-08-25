import { Helmet } from 'react-helmet-async'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I extract audio from only part of the video?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—you can select a time range using the slider before extraction." } },
    { "@type": "Question", "name": "Which audio formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "You can extract audio as MP3, WAV, or AAC." } },
    { "@type": "Question", "name": "Do I need to sign up or install anything?", "acceptedAnswer": { "@type": "Answer", "text": "No, the tool is completely free and browser-based." } },
    { "@type": "Question", "name": "Is the process safe?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, extraction happens in-browser or on secure servers, and videos are deleted after processing." } },
    { "@type": "Question", "name": "Can I preview the audio before extracting it?", "acceptedAnswer": { "@type": "Answer", "text": "The built-in preview player plays the original video only. To listen to the extracted audio, download the file and play it on your device." } }
  ]
}

export default function ExtractAudioBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>Extract Audio from Video – Free Online Audio Extractor (No Signup)</title>
        <meta name="description" content="Extract audio (MP3, WAV, AAC) from MP4, MOV, MKV, WebM in your browser. Select a time range & download – fast, private & watermark‑free." />
        <meta property="og:title" content="Extract Audio from Video – Free Online Tool" />
        <meta property="og:description" content="Pull MP3, WAV or AAC from MP4, MOV, MKV, WebM locally. Select range & export – no uploads or watermark." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/landing/audio-extract-hero.jpg" />
        <meta property="og:url" content="/tools/video/how-to-extract-audio-from-video" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/how-to-extract-audio-from-video" />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/audio-extract-hero.jpg' alt='Audio Extractor' title='Audio Extractor' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px' }} />
          <Typography variant="h3" component="h1" gutterBottom>Extract Audio from Video – Free, Fast & Private</Typography>
          <Typography variant="body1">Use this free in‑browser tool to pull MP3, WAV or AAC from MP4, MOV, MKV or WebM. Select a time range, extract locally, and download a clean, watermark‑free file — no signup required.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom>Why Extract Audio?</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Save dialogue or soundtrack without re‑rendering video.</Typography></li>
            <li><Typography variant='body1'>Create podcast / voiceover source tracks.</Typography></li>
            <li><Typography variant='body1'>Capture music, ambience or SFX.</Typography></li>
            <li><Typography variant='body1'>Study lectures as audio only.</Typography></li>
            <li><Typography variant='body1'>Trim to an exact segment before export.</Typography></li>
          </Box>

          <Typography variant="h4" component="h2" gutterBottom>How It Works (4 Steps)</Typography>
          <Box component='ol' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1' component='span'><strong>Upload</strong> MP4 / MOV / MKV / WebM.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Select range</strong> (set start & end if needed).</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Extract</strong> to MP3, WAV or AAC locally.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Download</strong> watermark‑free audio.</Typography></li>
          </Box>

          <Typography variant="h4" component="h2" gutterBottom>Use Cases</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Podcast / lecture extraction</Typography></li>
            <li><Typography variant='body1'>Voiceover & dialogue isolation</Typography></li>
            <li><Typography variant='body1'>Music / ambience sampling</Typography></li>
            <li><Typography variant='body1'>Ringtone / snippet creation</Typography></li>
            <li><Typography variant='body1'>Archival & transcription workflows</Typography></li>
          </Box>

          <Typography variant="h4" component="h2" gutterBottom>Key Features</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Local (privacy‑first) processing.</Typography></li>
            <li><Typography variant='body1'>Time range selection before export.</Typography></li>
            <li><Typography variant='body1'>Multi‑container video input.</Typography></li>
            <li><Typography variant='body1'>MP3 / WAV / AAC output options.</Typography></li>
            <li><Typography variant='body1'>Fast WebAssembly engine.</Typography></li>
            <li><Typography variant='body1'>No signup, watermark or queue.</Typography></li>
          </Box>
          <Typography variant="h4" component="h2" gutterBottom>Tips</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Choose WAV for further editing fidelity.</Typography></li>
            <li><Typography variant='body1'>MP3 128 kbps for speech; 192–320 kbps for music.</Typography></li>
            <li><Typography variant='body1'>Trim the exact range to reduce size.</Typography></li>
            <li><Typography variant='body1'>Keep the original video as a source.</Typography></li>
          </Box>
          <Typography variant="body1" mb={2}>Try it now — upload a video, set a range, and export clean audio instantly.</Typography>

          <Box mt={4} textAlign="center">
            <Button color='error' size='large' href="/tools/video/extract-audio" variant="contained">Upload Video</Button>
            <Button color='error' size='large' href="/tools/video/extract-audio-from-video" variant="outlined" sx={{ ml: 2 }}>Features</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
