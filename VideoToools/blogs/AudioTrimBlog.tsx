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

export default function AudioTrimBlog(){
  return (
    <Container maxWidth='lg' sx={{ py:6 }}>
      <Helmet>
        <title>How to Trim Audio Online Free – Cut MP3, WAV, M4A Complete Guide</title>
        <meta name='description' content='Free online audio trimmer: cut MP3, WAV, M4A, FLAC, OGG locally. Set start/end, preview & export — private, fast & watermark‑free.' />
        <meta property='og:title' content='Free Online Audio Trimmer – Fast, Private & No Watermark' />
        <meta property='og:description' content='Trim or cut audio segments (MP3, WAV, M4A, FLAC) in your browser. No uploads, signup or watermark.' />
        <meta property='og:type' content='article' />
        <meta property='og:image' content='/images/landing/audio-trim-hero.jpg' />
        <meta property='og:url' content='/tools/audio/how-to-trim-audio-online' />
        <meta property='og:site_name' content='FileApps' />
        <link rel='canonical' href='/tools/audio/how-to-trim-audio-online' />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p:{ xs:3, md:5 } }}>
        <Box mb={4}>
          <img src='/images/landing/audio-trim-hero.jpg' alt='Audio Trimmer' title='Audio Trimmer' loading='lazy' width='480' height='auto' style={{ maxWidth:'100%',display:'table',margin:'0 auto 16px' }} />
          <Typography variant='h3' component='h1' gutterBottom>Trim Audio Online — Free, Private & Watermark‑Free</Typography>
          <Typography variant='body1'>Cut intros, silence, mistakes or extract highlights from MP3, WAV, M4A, FLAC or OGG directly in your browser — no uploads, signup or watermark.</Typography>
        </Box>

        <Divider sx={{ mb:4 }} />

        <Typography variant='h4' component='h2' gutterBottom>Why Trim Audio?</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Remove dead air, noise or mistakes.</Typography></li>
          <li><Typography variant='body1'>Create ringtone, loop or highlight clips.</Typography></li>
          <li><Typography variant='body1'>Shorten length for platform limits.</Typography></li>
          <li><Typography variant='body1'>Extract a precise quote or sample.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>How It Works (4 Steps)</Typography>
        <Box component='ol' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1' component='span'><strong>Upload</strong> audio (drag & drop supported).</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Select range</strong> by adjusting start & end markers.</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Preview</strong> the trimmed segment locally.</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Export & download</strong> a clean file (no watermark).</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Key Features</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Local WebAssembly trimming (privacy‑first).</Typography></li>
          <li><Typography variant='body1'>Precise start / end selection controls.</Typography></li>
          <li><Typography variant='body1'>Instant waveform preview.</Typography></li>
          <li><Typography variant='body1'>Multi‑format support (MP3, WAV, M4A, FLAC, OGG).</Typography></li>
          <li><Typography variant='body1'>Watermark‑free export.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Use Cases</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Podcast & interview cleanup.</Typography></li>
          <li><Typography variant='body1'>Music sampling / loop creation.</Typography></li>
          <li><Typography variant='body1'>Ringtone or notification sound prep.</Typography></li>
          <li><Typography variant='body1'>Voice memo refinement.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Tips</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Leave a tiny fade (10–30 ms) to avoid clicks at cut boundaries.</Typography></li>
          <li><Typography variant='body1'>Keep a lossless original (WAV/FLAC) for future edits.</Typography></li>
          <li><Typography variant='body1'>Trim before compressing for best quality.</Typography></li>
          <li><Typography variant='body1'>Zoom waveform (if available) for frame‑level precision.</Typography></li>
        </Box>

        <Divider sx={{ my:4 }} />
        <Typography variant='h4' component='h2' gutterBottom>FAQs</Typography>
        {FAQ_SCHEMA.mainEntity.map((faq:any,i:number)=>(
          <Accordion key={i} disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6' component='h3'>{faq.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Divider sx={{ my:4 }} />
        <Typography variant='h4' component='h2' gutterBottom>Conclusion</Typography>
        <Typography variant='body1' mb={2}>Trim audio clips privately — upload, mark start & end, preview and export a clean result with no signup or watermark.</Typography>

        <Box mt={4} textAlign='center'>
          <Button size='large' variant='contained' color='secondary' href='/tools/audio/trim'>Upload</Button>
          <Button size='large' variant='outlined' color='secondary' href='/tools/audio/trim-audio-online' sx={{ ml:2 }}>Features</Button>
        </Box>
      </Paper>
    </Container>
  )
}

const FAQ_SCHEMA = {
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    { "@type":"Question","name":"Is audio trimming private?","acceptedAnswer":{ "@type":"Answer","text":"Yes. Trimming runs locally in your browser via WebAssembly FFmpeg — no uploads." } },
    { "@type":"Question","name":"Which audio formats are supported?","acceptedAnswer":{ "@type":"Answer","text":"Common formats: MP3, WAV, M4A, AAC, FLAC, OGG (others if the browser decodes them)." } },
    { "@type":"Question","name":"Can I trim only part of the file?","acceptedAnswer":{ "@type":"Answer","text":"Yes. Set start and end markers to export just the selected segment." } },
    { "@type":"Question","name":"Is there any quality loss?","acceptedAnswer":{ "@type":"Answer","text":"Lossless export (WAV/FLAC) preserves quality. MP3/AAC re‑encoding uses selected bitrate." } },
    { "@type":"Question","name":"Do I need to sign up or pay?","acceptedAnswer":{ "@type":"Answer","text":"No signup, no fees, no watermark." } },
    { "@type":"Question","name":"Is there a maximum file size?","acceptedAnswer":{ "@type":"Answer","text":"Limited only by available memory in your browser. Very large files may require more RAM." } }
  ]
}
