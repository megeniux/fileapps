import { Helmet } from 'react-helmet-async'

// MUI Imports
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
    {
      "@type": "Question",
      "name": "Can I convert video without uploading my files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The converter runs FFmpeg compiled to WebAssembly in your browser so files stay on your device."
      }
    },
    {
      "@type": "Question",
      "name": "Which formats are best for social platforms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MP4 (H.264/AAC) is the most compatible for social platforms. WebM can offer better compression for web, and GIFs are useful for short clips."
      }
    }
  ]
}

export default function VideoConvertBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>How to Convert Video Online — Fast, Private & No Uploads</title>
        <meta name="description" content="Step-by-step guide to converting video in the browser using FFmpeg WASM. Learn format choices, quality settings, and tips for social video exports." />
        <meta property="og:title" content="How to Convert Video Online — Fast, Private & No Uploads" />
        <meta property="og:description" content="Step-by-step guide to converting video in the browser using FFmpeg WASM. Learn format choices, quality settings, and tips for social video exports." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <meta property="og:site_name" content="FileApps" />
        <meta property="og:url" content="https://fileapps.click/tools/video/convert-blog" />
        <link rel="canonical" href="https://fileapps.click/tools/video/convert-blog" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/video-convert-hero.jpg' alt='Convert Video' title='Video Converter' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 32px' }} />
          <Typography variant="h3" component="h1" gutterBottom> How to Convert Video Online (Privacy-First, No Uploads) </Typography>
          <Typography variant="body1">This guide covers why browser-based conversion is useful, format trade-offs, and step-by-step instructions using FFmpeg WASM tools.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom>Why convert video in the browser?</Typography>
          <Typography variant="body1" mb={2}> Browser-based conversion keeps your files private, avoids server bandwidth and can be faster for short clips or single-file jobs. </Typography>

          <Typography variant="h6" component="h3" gutterBottom>Best output formats</Typography>
          <ul>
            <li>MP4 (H.264/AAC) — highest compatibility for social platforms.</li>
            <li>WebM — smaller files for web distribution when supported.</li>
            <li>GIF — short animated clips and previews.</li>
            <li>MP3/WAV — extract audio for podcasts or clips.</li>
          </ul>

          <Typography variant="h4" component="h2" mt={2}>Step-by-step: Convert in your browser</Typography>
          <Typography variant="h6" component="h3" mt={2}>Step 1 — Choose a file</Typography>
          <Typography variant="body1">Drag & drop or select a video/audio file from your device.</Typography>

          <Typography variant="h6" component="h3" mt={2}>Step 2 — Pick format & settings</Typography>
          <Typography variant="body1">Choose an output format, set resolution, CRF quality or preset, and select audio bitrate if needed.</Typography>

          <Typography variant="h6" component="h3" mt={2}>Step 3 — Convert & download</Typography>
          <Typography variant="body1">Start conversion, watch live progress, and download the resulting file when complete.</Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h4" component="h2" gutterBottom>Troubleshooting & tips</Typography>
          <Typography variant="body1" mb={2}>If conversion fails, try trimming the file or reducing resolution. For best playback on social platforms use MP4 (H.264) with a reasonable bitrate and resolution for mobile.</Typography>

          <Box mt={4} textAlign="center">
            <Button color='primary' size='large' href="/tools/video/convert" variant="contained">Convert Now</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
