import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { Helmet } from 'react-helmet-async'

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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Helmet>
        <title>How to Burn Captions into Video Online — Ultimate Guide</title>
        <meta name="description" content="Step-by-step guide to burning captions into video in the browser. Learn best practices, troubleshooting and how to style subtitles before export." />
        <meta property="og:title" content="How to Burn Captions into Video Online — Ultimate Guide" />
        <meta property="og:description" content="Step-by-step guide to burning captions into video in the browser. Learn best practices, troubleshooting and how to style subtitles before export." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Box mb={4}>
        <Typography variant="h1" component="h1" fontSize={32} fontWeight="700" gutterBottom>
          How to Burn Captions into Video Online (Privacy-First, No Uploads)
        </Typography>
        <Typography variant="body1" color="text.secondary">This guide covers why hard-burn captions matter, how to prepare SRT/VTT files, and a step-by-step workflow to burn captions in the browser using FFmpeg WASM tools.</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box>
        <Typography variant="h2" component="h2" fontSize={22} fontWeight={700} gutterBottom>Why burn captions into video?</Typography>
        <Typography variant="body1" paragraph>
          Hard-burn captions (also called burned-in or burned captions) are embedded directly into the video pixels. They play everywhere — on platforms that don’t support separate caption tracks and on social feeds that autoplay without sound.
        </Typography>

        <Typography variant="h3" component="h3" fontSize={18} fontWeight={700} gutterBottom>Benefits for creators</Typography>
        <ul>
          <li>Guaranteed visibility on social platforms.</li>
          <li>Improved accessibility for deaf and hard-of-hearing viewers.</li>
          <li>Consistent styling across players and platforms.</li>
        </ul>

        <Typography variant="h2" component="h2" fontSize={20} fontWeight={700} gutterBottom>Step-by-step: Burn captions in your browser</Typography>
        <Typography variant="h3" component="h3" fontSize={18} fontWeight={700} gutterBottom>Step 1 — Prepare your subtitle file</Typography>
        <Typography variant="body1" paragraph>
          Use SRT or VTT. Ensure UTF-8 encoding. Tools like <em>Subtitle Edit</em> or online editors can fix timecodes and encoding problems.
        </Typography>

        <Typography variant="h3" component="h3" fontSize={18} fontWeight={700} gutterBottom>Step 2 — Upload video & subtitle to the tool</Typography>
        <Typography variant="body1" paragraph>
          Drag & drop your video and SRT/VTT. Preview the video to confirm timing and formatting.
        </Typography>

        <Typography variant="h3" component="h3" fontSize={18} fontWeight={700} gutterBottom>Step 3 — Style captions before burning</Typography>
        <Typography variant="body1" paragraph>
          Choose font size, colors and outline width. Test legibility on small screens. Use bold/outline for high-contrast playback on mobile.
        </Typography>

        <Typography variant="h3" component="h3" fontSize={18} fontWeight={700} gutterBottom>Step 4 — Burn & download</Typography>
        <Typography variant="body1" paragraph>
          The tool runs FFmpeg in your browser to render subtitles into the video pixels. Wait for processing to finish and download your MP4.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h2" component="h2" fontSize={20} fontWeight={700} gutterBottom>Troubleshooting & tips</Typography>
        <Typography variant="body1" paragraph>
          If you see missing characters, verify the subtitle file encoding and font. For long videos, consider trimming or compressing before processing in your browser.
        </Typography>

        <Typography variant="h2" component="h2" fontSize={20} fontWeight={700} gutterBottom>Best practices for social platforms</Typography>
        <ul>
          <li>Keep captions large and high-contrast for mobile viewers.</li>
          <li>Respect safe areas — avoid placing captions too close to edges where overlays may hide them.</li>
          <li>Use simple, readable fonts for speed and clarity.</li>
        </ul>

        <Box mt={4} textAlign="center">
          <Button href="/pages/landings/BurnCaptionLanding" variant="contained">Try the Tool</Button>
        </Box>
      </Box>
    </Container>
  )
}
