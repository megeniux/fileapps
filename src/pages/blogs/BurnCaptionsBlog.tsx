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
      "name": "Can I burn captions without uploading my files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Browser-based tools run locally so your files don’t leave your device."
      }
    },
    {
      "@type": "Question",
      "name": "What subtitle formats should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use UTF-8 encoded SRT or VTT files. SRT is the most common and works well for most platforms."
      }
    }
  ]
}

export default function BurnCaptionsBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>How to Burn Captions into Video Online — Ultimate Guide</title>
        <meta name="description" content="Step-by-step guide to burning captions into video in the browser. Learn best practices, troubleshooting and how to style subtitles before export." />
  <meta name="keywords" content="burn captions into video, add subtitles online, hardcode subtitles, embed srt into mp4, browser caption burner, ffmpeg wasm subtitles" />
        <meta property="og:title" content="How to Burn Captions into Video Online — Ultimate Guide" />
        <meta property="og:description" content="Step-by-step guide to burning captions into video in the browser. Learn best practices, troubleshooting and how to style subtitles before export." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <meta property="og:site_name" content="FileApps" />
        <meta property="og:url" content="https://fileapps.click/tools/video/burn-captions-blog" />
        <link rel="canonical" href="https://fileapps.click/tools/video/burn-captions-blog" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/burn-caption-hero.jpg' alt='Burn Captions' title='Burn Captions' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px', filter: 'hue-rotate(60deg)' }} />
          <Typography variant="h3" component="h1" gutterBottom> How to Burn Captions into Video Online (Privacy-First, No Uploads) </Typography>
          <Typography variant="body1">This guide covers why hard-burn captions matter, how to prepare SRT/VTT files, and a step-by-step workflow to burn captions in the browser using FFmpeg WASM tools.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom>Why burn captions into video?</Typography>
          <Typography variant="body1" mb={2}> Hard-burn captions (also called burned-in or burned captions) are embedded directly into the video pixels. They play everywhere — on platforms that don’t support separate caption tracks and on social feeds that autoplay without sound. </Typography>

          <Typography variant="h6" component="h3" gutterBottom>Benefits for creators</Typography>
          <ul>
            <li>Guaranteed visibility on social platforms.</li>
            <li>Improved accessibility for deaf and hard-of-hearing viewers.</li>
            <li>Consistent styling across players and platforms.</li>
          </ul>

          <Typography variant="h4" component="h2" mt={2}>Step-by-step: Burn captions in your browser</Typography>
          <Typography variant="h6" component="h3" mt={2}>Step 1 — Prepare your subtitle file</Typography>
          <Typography variant="body1"> Use SRT or VTT. Ensure UTF-8 encoding. Tools like <em>Subtitle Edit</em> or online editors can fix timecodes and encoding problems. </Typography>

          <Typography variant="h6" component="h3" mt={2}>Step 2 — Upload video & subtitle to the tool</Typography>
          <Typography variant="body1"> Drag & drop your video and SRT/VTT. Preview the video to confirm timing and formatting. </Typography>

          <Typography variant="h6" component="h3" mt={2}>Step 3 — Style captions before burning</Typography>
          <Typography variant="body1"> Choose font size, colors and outline width. Test legibility on small screens. Use bold/outline for high-contrast playback on mobile. </Typography>

          <Typography variant="h6" component="h3" mt={2}>Step 4 — Burn & download</Typography>
          <Typography variant="body1"> The tool runs FFmpeg in your browser to render subtitles into the video pixels. Wait for processing to finish and download your MP4. </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h4" component="h2" gutterBottom>Troubleshooting & tips</Typography>
          <Typography variant="body1" mb={2}> If you see missing characters, verify the subtitle file encoding and font. For long videos, consider trimming or compressing before processing in your browser. </Typography>

          <Typography variant="h4" component="h2" gutterBottom>Best practices for social platforms</Typography>
          <ul>
            <li>Keep captions large and high-contrast for mobile viewers.</li>
            <li>Respect safe areas — avoid placing captions too close to edges where overlays may hide them.</li>
            <li>Use simple, readable fonts for speed and clarity.</li>
          </ul>

          <Box mt={4} textAlign="center">
            <Button color='primary' size='large' href="/tools/video/burn-caption" variant="contained">Upload Now</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
