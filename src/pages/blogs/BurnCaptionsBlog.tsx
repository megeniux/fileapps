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

export default function BurnCaptionsBlog(){
  return (
    <Container maxWidth='lg' sx={{ py:6 }}>
      <Helmet>
        <title>How to Burn Subtitles into Video Online – Hardcode Captions Guide</title>
        <meta name='description' content='Learn how to hardcode subtitles: upload video, add SRT/VTT, style font, color, outline & background then burn locally with no watermark.' />
        <meta property='og:title' content='Burn Subtitles into Video Online – Free & Private (No Watermark)' />
        <meta property='og:description' content='Hardcode SRT / VTT captions into MP4 locally. Style & export watermark‑free.' />
        <meta property='og:type' content='article' />
        <meta property='og:image' content='/images/landing/burn-captions-hero.jpg' />
        <meta property='og:url' content='/tools/video/how-to-burn-captions-into-video-online' />
        <meta property='og:site_name' content='FileApps' />
        <link rel='canonical' href='/tools/video/how-to-burn-captions-into-video-online' />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p:{ xs:3, md:5 } }}>
        <Box mb={4}>
          <img src='/images/landing/burn-captions-hero.jpg' alt='Subtitle Burner' title='Subtitle Burner' loading='lazy' width='480' height='auto' style={{ display:'table', margin:'0 auto 16px', maxWidth:'100%', filter: 'hue-rotate(60deg)'}}/>
          <Typography variant='h3' component='h1' gutterBottom>Burn Subtitles into Video — Free, Private & Watermark‑Free</Typography>
          <Typography variant='body1'>Hardcode captions (SRT / VTT) into MP4, MOV or MKV entirely in your browser. Style font, size, color, outline and background box, then export a clean video — no uploads, signup or watermark.</Typography>
        </Box>

        <Divider sx={{ mb:4 }} />

        <Typography variant='h4' component='h2' gutterBottom>Why Burn Captions?</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Guarantee visibility on platforms lacking subtitle toggles.</Typography></li>
          <li><Typography variant='body1'>Ensure accessibility in embeds or social feeds.</Typography></li>
          <li><Typography variant='body1'>Maintain brand styling & consistent typography.</Typography></li>
          <li><Typography variant='body1'>Prevent mismatch between external SRT & playback timing.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>How It Works (5 Steps)</Typography>
        <Box component='ol' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1' component='span'><strong>Upload</strong> your video (drag & drop).</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Load subtitles</strong> (SRT / VTT) or paste text.</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Style</strong> font size, color, outline, background & position.</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Preview</strong> a short segment to verify timing.</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Burn & download</strong> watermark‑free MP4.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Key Features</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Local FFmpeg WebAssembly burning (privacy‑first).</Typography></li>
          <li><Typography variant='body1'>SRT / VTT ingestion & timing shift (if available).</Typography></li>
          <li><Typography variant='body1'>Font, size, color, outline, shadow & background box.</Typography></li>
          <li><Typography variant='body1'>Top / bottom positioning & safe‑area awareness.</Typography></li>
          <li><Typography variant='body1'>Watermark‑free export.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Styling Options</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'><strong>Font Size:</strong> Adjust for mobile readability (e.g. 42–48 px at 1080p).</Typography></li>
          <li><Typography variant='body1'><strong>Color & Outline:</strong> White + dark outline for contrast; use brand hex codes for custom themes.</Typography></li>
          <li><Typography variant='body1'><strong>Background Box:</strong> Semi‑transparent black (40–60% alpha) improves legibility over busy footage.</Typography></li>
          <li><Typography variant='body1'><strong>Line Length:</strong> Keep under ~42 characters per line for readability.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Use Cases</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Social platform videos (Reels, Shorts) that auto‑play mute.</Typography></li>
          <li><Typography variant='body1'>Training / e‑learning modules ensuring mandatory captions.</Typography></li>
          <li><Typography variant='body1'>Public displays / kiosks where toggling is impossible.</Typography></li>
          <li><Typography variant='body1'>Marketing content needing branded text styling.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Tips</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Test short preview to verify sync before full export.</Typography></li>
          <li><Typography variant='body1'>Use sentence case & consistent punctuation.</Typography></li>
          <li><Typography variant='body1'>Keep two lines max; split long sentences logically.</Typography></li>
          <li><Typography variant='body1'>Retain an original (no‑caption) master for future edits.</Typography></li>
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
        <Typography variant='body1' mb={2}>Burn captions privately: upload, add SRT/VTT, style, preview then export a clean MP4 — no signup, no watermark, full control.</Typography>

        <Box mt={4} textAlign='center'>
          <Button variant='contained' color='primary' size='large' href='/tools/video/burn-captions'>Upload Video</Button>
          <Button variant='outlined' color='primary' size='large' sx={{ ml:2 }} href='/tools/video/burn-subtitles-into-video'>Features</Button>
        </Box>
      </Paper>
    </Container>
  )
}

const FAQ_SCHEMA = {
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    { "@type":"Question","name":"What does burning subtitles mean?","acceptedAnswer":{ "@type":"Answer","text":"Burning (hardcoding) embeds captions directly into the video frames so they are always visible and cannot be toggled off." }},
    { "@type":"Question","name":"Which subtitle formats can I use?","acceptedAnswer":{ "@type":"Answer","text":"Upload SRT or WebVTT (VTT). Plain text paste (if supported) can be converted to a basic timeline." }},
    { "@type":"Question","name":"Is the process private?","acceptedAnswer":{ "@type":"Answer","text":"Yes. Encoding runs locally via FFmpeg WebAssembly—your media never uploads to a server." }},
    { "@type":"Question","name":"Will there be a watermark?","acceptedAnswer":{ "@type":"Answer","text":"No watermark, branding or signup required." }},
    { "@type":"Question","name":"Can I edit caption timing?","acceptedAnswer":{ "@type":"Answer","text":"You can shift timing or reload an adjusted SRT externally. Full line-level editing may depend on UI features." }},
    { "@type":"Question","name":"Can viewers turn off burned captions?","acceptedAnswer":{ "@type":"Answer","text":"No. Burned captions are permanent pixels. Use soft subtitles (separate SRT) if toggling is required." }}
  ]
}