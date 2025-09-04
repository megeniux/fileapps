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
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    { "@type":"Question","name":"Is trimming private?","acceptedAnswer":{ "@type":"Answer","text":"Yes. All processing runs locally in your browser with WebAssembly — files are never uploaded." } },
    { "@type":"Question","name":"Which formats are supported?","acceptedAnswer":{ "@type":"Answer","text":"Typical browser‑decodable containers: MP4, MOV, MKV, WebM, AVI (device dependent)." } },
    { "@type":"Question","name":"Does trimming re‑encode?","acceptedAnswer":{ "@type":"Answer","text":"Some trims may re‑encode depending on cut accuracy and codec; quality impact is minimal for a single pass." } },
    { "@type":"Question","name":"Is there a watermark or signup?","acceptedAnswer":{ "@type":"Answer","text":"No. The tool is free, watermark‑free and requires no account." } },
    { "@type":"Question","name":"Can I trim large / 4K files?","acceptedAnswer":{ "@type":"Answer","text":"Yes—limited only by available memory and CPU. For huge clips consider trimming a proxy first." } }
  ]
}

export default function VideoTrimBlog() {
  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Helmet>
        <title>How to Trim Video Online Free – Complete Guide</title>
        <meta name='description' content='Free online video trimmer: cut MP4, MOV, MKV, WebM clips locally. Set start/end, preview & export – private, fast & watermark‑free.' />
        <meta property='og:title' content='Free Online Video Trimmer – Fast, Private & No Watermark' />
        <meta property='og:description' content='Trim video segments (MP4, MOV, MKV, WebM) in your browser. No uploads, signup or watermark.' />
        <meta property='og:type' content='article' />
        <meta property='og:image' content='/images/landing/video-trimmer-hero.jpg' />
        <meta property='og:url' content='/tools/video/how-to-trim-video-online' />
        <meta property='og:site_name' content='FileApps' />
        <link rel='canonical' href='/tools/video/how-to-trim-video-online' />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p:{ xs:3, md:5 } }}>
        <Box mb={4}>
          <img src='/images/landing/video-trimmer-hero.jpg' alt='Video Trimmer' title='Video Trimmer' loading='lazy' width='480' height='auto' style={{ maxWidth:'100%',display:'table',margin:'0 auto 16px' }} />
          <Typography variant='h3' component='h1' gutterBottom>Trim Videos Online — Free, Private & Watermark‑Free</Typography>
          <Typography variant='body1'>Cut unwanted intros, outros, pauses or mistakes from MP4, MOV, MKV or WebM directly in your browser — no uploads, signup or watermark. Local FFmpeg WebAssembly ensures privacy.</Typography>
        </Box>

        <Divider sx={{ mb:4 }} />

        <Typography variant='h4' component='h2' gutterBottom>Why Trim Video?</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Remove dead time, ads or mistakes.</Typography></li>
          <li><Typography variant='body1'>Create highlight or teaser clips.</Typography></li>
          <li><Typography variant='body1'>Shorten length for platform limits.</Typography></li>
          <li><Typography variant='body1'>Prep segments for further editing.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>How It Works (4 Steps)</Typography>
        <Box component='ol' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1' component='span'><strong>Upload</strong> (drag & drop video file).</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Select range</strong> (set start & end markers).</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Preview</strong> trimmed segment locally.</Typography></li>
          <li><Typography variant='body1' component='span'><strong>Export & download</strong> clean MP4 (no watermark).</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Key Features</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Local private processing (no uploads).</Typography></li>
          <li><Typography variant='body1'>Precise start / end selection.</Typography></li>
          <li><Typography variant='body1'>Instant in‑browser preview.</Typography></li>
          <li><Typography variant='body1'>Multi‑format support (MP4, MOV, MKV, WebM).</Typography></li>
          <li><Typography variant='body1'>Watermark‑free export.</Typography></li>
          <li><Typography variant='body1'>Fast one‑pass trimming workflow.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Use Cases</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Social media highlight reels.</Typography></li>
          <li><Typography variant='body1'>Lecture / webinar excerpt extraction.</Typography></li>
          <li><Typography variant='body1'>Gameplay or reaction clip cutting.</Typography></li>
          <li><Typography variant='body1'>Removing mistakes before merging.</Typography></li>
        </Box>

        <Typography variant='h4' component='h2' gutterBottom mt={4}>Tips</Typography>
        <Box component='ul' sx={{ pl:3, mb:2 }}>
          <li><Typography variant='body1'>Trim first, then compress for maximum quality.</Typography></li>
          <li><Typography variant='body1'>Keep an untouched original for future edits.</Typography></li>
          <li><Typography variant='body1'>Cut on scene boundaries to avoid abrupt transitions.</Typography></li>
          <li><Typography variant='body1'>Consider exporting MP4 (H.264) for wide compatibility.</Typography></li>
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
        <Typography variant='body1' mb={2}>Trim video clips quickly and privately — upload locally, mark start & end, preview, then export a clean, watermark‑free result.</Typography>

        <Box mt={4} textAlign='center'>
          <Button size='large' variant='contained' color='info' href='/tools/video/trim'>Upload</Button>
          <Button size='large' variant='outlined' color='info' href='/tools/video/trim-video-online' sx={{ ml:2 }}>Features</Button>
        </Box>
      </Paper>
    </Container>
  )
}
