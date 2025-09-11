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

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does the video compressor work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg WebAssembly locally in your browser—no uploads, fully private." } },
    { "@type": "Question", "name": "Can I compress 4K videos?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Performance depends on your device CPU/RAM. You can also downscale to 1080p for big savings." } },
    { "@type": "Question", "name": "What is CRF?", "acceptedAnswer": { "@type": "Answer", "text": "CRF (Constant Rate Factor) balances quality and size. Lower CRF = higher quality & larger file. Typical range 18–28." } },
    { "@type": "Question", "name": "Can I keep original resolution?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Leave resolution unchanged and just adjust CRF / bitrate / preset." } },
    { "@type": "Question", "name": "Is it free and watermark‑free?", "acceptedAnswer": { "@type": "Answer", "text": "Completely free: no signup, no watermark, no credit card." } },
    { "@type": "Question", "name": "Does it work on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—modern mobile browsers on Android and iOS are supported (large files may be slower)." } }
  ]
}

export default function VideoCompressionBlog() {
  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Helmet>
        <title>How to Compress Video Online Free – Step-by-Step Guide</title>
        <meta name='description' content='Free online video compressor: reduce MP4 / MOV / MKV size with CRF, bitrate & resolution control. Private in‑browser processing, no signup, no watermark.' />
        <meta property='og:title' content='Free Video Compressor Online – Reduce Size Without Quality Loss' />
        <meta property='og:description' content='Compress videos locally: CRF, bitrate, resolution, presets & size estimate. Fast, private, watermark‑free.' />
        <meta property='og:type' content='article' />
        <meta property='og:image' content='/images/landing/video-compression-hero.jpg' />
        <meta property='og:url' content='/tools/video/compress-blog' />
        <meta property='og:site_name' content='FileApps' />
        <link rel='canonical' href='/tools/video/compress-blog' />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        <Box mb={4}>
          <img src='/images/landing/video-compression-hero.jpg' alt='Video compression interface demo' title='Online Video Compression' loading='lazy' width='480' height='auto' style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px' }} />
          <Typography variant='h3' component='h1' gutterBottom>Compress Videos Online — Free, Private & No Watermark</Typography>
          <Typography variant='body1'>Shrink MP4, MOV, MKV or WebM file size using CRF, bitrate and resolution controls — all processed locally in your browser. No uploads, no signup, no watermark.</Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant='h4' component='h2' gutterBottom>Why Compress Video?</Typography>
        <Box component='ul' sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant='body1'>Faster sharing (chat/email limits).</Typography></li>
          <li><Typography variant='body1'>Quicker uploads to YouTube / Shorts / Reels.</Typography></li>
          <li><Typography variant='body1'>Save local / cloud storage space.</Typography></li>
          <li><Typography variant='body1'>Bandwidth‑efficient archiving.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>How It Works (5 Steps)</Typography>
        <Box component='ol' sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant='body1' component='span'><strong>Upload</strong> (drag & drop).</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Set CRF & preset</strong> (quality vs speed).</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Adjust resolution</strong> (optional downscale).</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Estimate size</strong> (preview expected output).</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Compress & download</strong> — processed locally.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Key Features</Typography>
        <Box component='ul' sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant='body1'>Local FFmpeg WebAssembly (no uploads).</Typography></li>
          <li><Typography variant='body1'>CRF quality control & encoder presets.</Typography></li>
          <li><Typography variant='body1'>Resolution scaling & aspect preservation.</Typography></li>
          <li><Typography variant='body1'>Bitrate & audio stream tuning.</Typography></li>
          <li><Typography variant='body1'>Estimated size preview.</Typography></li>
          <li><Typography variant='body1'>Watermark‑free output.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Use Cases</Typography>
        <Box component='ul' sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant='body1'>Social media optimization.</Typography></li>
          <li><Typography variant='body1'>Email / messaging limits (≤25MB).</Typography></li>
          <li><Typography variant='body1'>Mobile storage reduction.</Typography></li>
          <li><Typography variant='body1'>Preview proxy generation.</Typography></li>
          <li><Typography variant='body1'>Archiving & backups.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Tips</Typography>
        <Box component='ul' sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant='body1'>CRF 18–22 for quality, 23–28 for smaller social clips.</Typography></li>
          <li><Typography variant='body1'>Use slower preset for better compression if time allows.</Typography></li>
          <li><Typography variant='body1'>Downscale 4K→1080p or 1080p→720p for large savings.</Typography></li>
          <li><Typography variant='body1'>Keep aspect ratio to avoid distortion.</Typography></li>
          <li><Typography variant='body1'>Test on a short segment first.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Social Platform Targets</Typography>
        <Box component='ul' sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant='body1'><strong>WhatsApp:</strong> 720p, CRF 26–30.</Typography></li>
          <li><Typography variant='body1'><strong>YouTube:</strong> 1080p, CRF 22–24, audio 128–192 kbps.</Typography></li>
          <li><Typography variant='body1'><strong>Instagram / TikTok:</strong> 720p vertical, CRF 24–27.</Typography></li>
        </Box>

        <Divider sx={{ my: 4 }} />
        <Typography variant='h4' component='h2' gutterBottom>FAQs</Typography>
        {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
          <Accordion key={idx} disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6' component='h3'>{faq.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Divider sx={{ my: 4 }} />
        <Typography variant='h4' component='h2' gutterBottom>Conclusion</Typography>
        <Typography variant='body1' mb={2}>Compress video privately: adjust CRF, preset, bitrate and resolution locally, preview estimated size, then export a clean, watermark‑free file.</Typography>

        <Box mt={4} textAlign='center'>
          <Button color='secondary' size='large' variant='contained' href='/tools/video/compress'>Upload</Button>
          <Button color='secondary' size='large' variant='outlined' href='/tools/video/compress-video-online' sx={{ ml: 2 }}>Features</Button>
        </Box>
      </Paper>
    </Container>
  )
}
