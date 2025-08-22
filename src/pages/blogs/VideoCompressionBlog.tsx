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
      "name": "Can I compress video without uploading my files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The compressor runs FFmpeg compiled to WebAssembly in your browser so files stay on your device. Processing is client-side and private."
      }
    },
    {
      "@type": "Question",
      "name": "What CRF value should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CRF 18-23 gives near-transparent quality; 24-28 is a good trade-off for web and social; 30+ is aggressive compression and may show visible artifacts. Always test with a short clip."
      }
    },
    {
      "@type": "Question",
      "name": "Should I change resolution before compressing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — downscaling resolution (for example 4K → 1080p or 1080p → 720p) often reduces file size much more effectively than high CRF values while maintaining acceptable visual quality for smaller screens."
      }
    },
    {
      "@type": "Question",
      "name": "Which codec and container should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MP4 with H.264 video and AAC audio is the safest choice for compatibility. AV1 and HEVC can offer better compression but may not be supported everywhere."
      }
    },
    {
      "@type": "Question",
      "name": "Why does compression fail on large files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Browser memory and CPU limits can cause failures for very large files. Try trimming the video, compressing smaller segments, or using a desktop tool for multi-gigabyte files."
      }
    }
  ]
}

export default function VideoCompressionBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>How to Compress Video Online — CRF, Presets & Best Practices</title>
        <meta name="description" content="Guide to compressing video in the browser using FFmpeg WASM. Learn CRF, presets, trade-offs and best settings for web and social." />
        <meta name="keywords" content="compress video online, reduce mp4 size, crf video compression, ffmpeg wasm compressor, browser video compressor, shrink video file" />
        <meta property="og:title" content="How to Compress Video Online — CRF, Presets & Best Practices" />
        <meta property="og:description" content="Guide to compressing video in the browser using FFmpeg WASM. Learn CRF, presets, trade-offs and best settings for web and social." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/branding/logo-xl.svg" />
        <meta property="og:url" content="https://fileapps.click/tools/video/compress-blog" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="https://fileapps.click/tools/video/compress-blog" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/video-compression-hero.jpg' alt='Compress Video' title='Video Compression' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px' }} />
          <Typography variant="h3" component="h1" gutterBottom> How to Compress Video Online (Private, No Uploads) </Typography>
          <Typography variant="body1">A practical guide to using CRF, presets and optional scaling to reduce MP4 file size while keeping acceptable quality for web and social platforms. This guide explains trade-offs, example settings and troubleshooting steps so you get the smallest file without surprising artifacts.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom>Why compress video in the browser?</Typography>
          <Typography variant="body1" mb={2}> Browser-based compression keeps your files private and avoids server bandwidth. It’s ideal for short clips or when you need one-off compression quickly. </Typography>

          <Typography variant="h6" component="h3" gutterBottom>Recommended settings</Typography>
          <ul>
            <li><strong>Container & codec:</strong> MP4 (H.264 + AAC) for widest compatibility.</li>
            <li><strong>CRF:</strong> 18–23 for near-original quality, 24–28 for web/social trade-offs, 30+ only for aggressive size reduction.</li>
            <li><strong>Preset:</strong> Choose slower presets (slow, slower, veryslow) when you want better compression and have time; choose faster presets when you need results quickly.</li>
            <li><strong>Resolution:</strong> Downscale 4K→1080p or 1080p→720p to reduce file size dramatically for mobile-first audiences.</li>
          </ul>

          <Typography variant="h4" component="h2" mt={2}>Step-by-step: Compress in your browser</Typography>
          <Typography variant="h6" component="h3" mt={2}>Step 1 — Choose a file</Typography>
          <Typography variant="body1">Drag & drop or select a video file from your device. Prefer MP4 input for predictable results; if your file uses a different container, preview it first.</Typography>

          <Typography variant="h6" component="h3" mt={2}>Step 2 — Set CRF, preset and optional scaling</Typography>
          <Typography variant="body1">Use the CRF slider to pick a target visual quality, choose a preset to trade speed vs efficiency, and optionally scale the resolution down to save more bytes. Try CRF 23 with the "medium" preset as a starting point.</Typography>

          <Typography variant="h6" component="h3" mt={2}>Step 3 — Preview and start compression</Typography>
          <Typography variant="body1">Preview the first few seconds to confirm visual quality. Start compression and monitor live progress — many builds report an estimated output size. When complete, download the result and compare with your original.</Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h4" component="h2" gutterBottom>Troubleshooting & tips</Typography>
          <Typography variant="body1" mb={2}>If compression fails, try these steps:</Typography>
          <ul>
            <li>Trim the clip to a smaller segment and test settings on the shorter video.</li>
            <li>Use a faster preset (ultrafast/veryfast) to reduce CPU pressure on low-end devices.</li>
            <li>Reduce resolution before compressing (for example 1080p → 720p) to dramatically lower memory usage.</li>
            <li>Export short test clips at multiple CRF values and compare file size and quality to pick the best tradeoff.</li>
          </ul>

          <Typography variant="h6" component="h3" mt={2}>Best practices for social platforms</Typography>
          <ul>
            <li>For Instagram Reels/TikTok: vertical aspect ratios and 720p or 1080p with CRF 24–28 work well.</li>
            <li>For YouTube: keep 1080p or higher and use CRF 18–22 depending on source quality.</li>
            <li>Always check how the platform re-encodes uploads — sometimes a slightly higher bitrate avoids double-compression artifacts.</li>
          </ul>

          <Box mt={4} textAlign="center">
            <Button color='secondary' size='large' href="/tools/video/compress" variant="contained">Compress Now</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
