import { Helmet } from 'react-helmet-async'
// MUI Imports
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does this online video converter work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg WASM inside your browser – no uploads, no server processing." } },
    { "@type": "Question", "name": "Which video formats can I convert?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, MKV, AVI, WebM, FLV, and more." } },
    { "@type": "Question", "name": "Can I change video resolution and FPS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – set custom resolution and FPS during conversion." } },
    { "@type": "Question", "name": "Is this tool free and private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – completely free, no signup, no watermark, and 100% browser-based for privacy." } },
    { "@type": "Question", "name": "Does it work on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – works on Android and iOS with modern browsers." } }
  ]
}

export default function VideoConvertBlog() {
  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Helmet>
        <title>Convert Video Online Free – Private No‑Signup Video Converter (No Watermark)</title>
        <meta name='description' content='Free online video converter: convert MP4, MOV, MKV, AVI, WebM & more locally. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free.' />
        <meta property='og:title' content='Free Online Video Converter – Fast, Private & No Watermark' />
        <meta property='og:description' content='Convert video formats (MP4, MOV, MKV, AVI, WebM) in your browser. Customize resolution, codec, bitrate & FPS. No signup or uploads.' />
        <meta property='og:type' content='article' />
        <meta property='og:image' content='/images/landing/video-convert-hero.jpg' />
        <meta property='og:url' content='/tools/video/how-to-convert-video-online' />
        <meta property='og:site_name' content='FileApps' />
        <link rel='canonical' href='/tools/video/how-to-convert-video-online' />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/video-convert-hero.jpg' alt='Video Converter' title='Video Converter' loading='lazy' width='400px' height='auto' style={{ maxWidth:'100%',display:'table',margin:'0 auto 24px' }} />
          <Typography variant='h3' component='h1' gutterBottom>Convert Videos Online — Free, Private & No Watermark</Typography>
          <Typography variant='body1'>Convert MP4, MOV, MKV, AVI, WebM and more directly in your browser. Adjust resolution, codec, bitrate & FPS — no uploads, signup or watermark.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant='h4' component='h2' gutterBottom>Why Convert Video?</Typography>
          <Box component='ul' sx={{ pl:3, mb:2 }}>
            <li><Typography variant='body1'>Cross‑platform playback compatibility.</Typography></li>
            <li><Typography variant='body1'>Smaller size for faster sharing.</Typography></li>
            <li><Typography variant='body1'>Match platform specs (YouTube / Reels / Shorts).</Typography></li>
            <li><Typography variant='body1'>Archival or editing codec changes.</Typography></li>
          </Box>

          <Typography variant='h4' component='h2' gutterBottom>How It Works (5 Steps)</Typography>
          <Box component='ol' sx={{ pl:3, mb:2 }}>
            <li><Typography variant='body1' component='span'><strong>Upload</strong> source video (drag & drop).</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Choose format</strong> (MP4, MOV, MKV, AVI, WebM).</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Set options</strong> (resolution, codec, bitrate, FPS).</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Convert locally</strong> via WebAssembly FFmpeg.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Download</strong> watermark‑free output.</Typography></li>
          </Box>

          <Typography variant='h4' component='h2' gutterBottom mt={3}>Key Features</Typography>
          <Box component='ul' sx={{ pl:3, mb:2 }}>
            <li><Typography variant='body1'>Local (private) FFmpeg WASM conversion.</Typography></li>
            <li><Typography variant='body1'>Multiple containers & codecs.</Typography></li>
            <li><Typography variant='body1'>Resolution & FPS control.</Typography></li>
            <li><Typography variant='body1'>Video + audio bitrate tuning.</Typography></li>
            <li><Typography variant='body1'>No signup, watermark or queue.</Typography></li>
          </Box>

          <Typography variant='h4' component='h2' gutterBottom>Use Cases</Typography>
          <Box component='ul' sx={{ pl:3, mb:2 }}>
            <li><Typography variant='body1'>Prepare uploads (YouTube / social).</Typography></li>
            <li><Typography variant='body1'>Device playback compatibility.</Typography></li>
            <li><Typography variant='body1'>Create lightweight review copies.</Typography></li>
            <li><Typography variant='body1'>Archive in a standard format.</Typography></li>
          </Box>

          <Typography variant='h4' component='h2' gutterBottom>Tips</Typography>
            <Box component='ul' sx={{ pl:3, mb:2 }}>
              <li><Typography variant='body1'>Use H.264 for widest support; H.265 for smaller size (if supported).</Typography></li>
              <li><Typography variant='body1'>Downscale 4K → 1080p or 720p for large savings.</Typography></li>
              <li><Typography variant='body1'>Keep FPS original unless platform needs 60fps.</Typography></li>
              <li><Typography variant='body1'>Target constant quality (CRF) over fixed bitrate when possible.</Typography></li>
            </Box>

          <Typography variant='h4' component='h2' gutterBottom>Social Platform Targets</Typography>
          <Box component='ul' sx={{ pl:3, mb:2 }}>
            <li><Typography variant='body1'><strong>YouTube:</strong> 1080p (or 4K), 24–60fps MP4 (H.264).</Typography></li>
            <li><Typography variant='body1'><strong>Instagram / TikTok:</strong> 720p vertical (9:16), 30fps.</Typography></li>
            <li><Typography variant='body1'><strong>Facebook:</strong> 720p MP4 for faster loads.</Typography></li>
          </Box>

          <Typography variant='h4' component='h2' gutterBottom>FAQs</Typography>
          {FAQ_SCHEMA.mainEntity.map((faq:any,idx:number)=>(
            <Accordion key={idx} disableGutters square>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>{faq.name}</Typography></AccordionSummary>
              <AccordionDetails><Typography variant='body1'>{faq.acceptedAnswer.text}</Typography></AccordionDetails>
            </Accordion>
          ))}
          <Divider sx={{ my:3 }} />
          <Typography variant='h4' component='h2' gutterBottom>Conclusion</Typography>
          <Typography variant='body1' mb={2}>Convert videos privately — set format, resolution, codec, bitrate & FPS locally, then export a clean, watermark‑free file.</Typography>
          <Box mt={4} textAlign='center'>
            <Button color='primary' size='large' href='/tools/video/convert' variant='contained'>Upload</Button>
            <Button color='primary' size='large' href='/tools/video/convert-video-online' variant='outlined' sx={{ ml:2 }}>Features</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
