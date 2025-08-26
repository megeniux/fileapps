// General Imports
import { Helmet } from 'react-helmet-async'
// MUI Components
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
// MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import MergeIcon from '@mui/icons-material/CallMerge'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import DownloadIcon from '@mui/icons-material/Download'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import SpeedIcon from '@mui/icons-material/Speed'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ReorderIcon from '@mui/icons-material/Reorder'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'

// Component (moved above constants)
export default function AudioMergerLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Merge Audio Files Online Free – MP3, WAV, FLAC Combiner</title>
        <meta name="description" content="Free online audio merger: combine MP3, WAV, FLAC, OGG, M4A tracks locally. Drag to reorder, optional crossfade & export — private & watermark‑free." />
        <meta property="og:title" content="Free Online Audio Merger – Private MP3 / WAV / FLAC Combiner" />
        <meta property="og:description" content="Merge multiple audio files (MP3, WAV, FLAC, OGG, M4A) in your browser. Reorder, join & export clean output — no uploads or signup." />
        <meta property="og:image" content="/images/landing/audio-merger-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/audio/merge-audio-files-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/audio/merge-audio-files-online" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      {/* Hero */}
      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs:12, md:6 }} className='hero-text'>
              <Typography variant='h2' component='h1'>Merge Audio Online – Free, Private & No Watermark</Typography>
              <Typography variant='h6' component='p' color='text.secondary' mt={3} mb={4}>
                Combine MP3, WAV, FLAC, OGG, M4A tracks. Drag, reorder, merge & export locally — no signup or uploads.
              </Typography>
              <Box display='flex' gap={1} justifyContent={{ xs:'center', md:'flex-start' }}>
                <Button variant='contained' color='warning' size='large' href='/tools/audio/merge'>Upload</Button>
                <Button variant='text' size='large' href='/tools/audio/how-to-merge-audio-online' sx={{ color:'text.secondary' }}>How-to Guide</Button>
              </Box>
            </Grid>
            <Grid container size={{ xs:12, md:6 }} justifyContent={{ xs:'center', md:'flex-end' }} order={{ xs:-1, md:1 }} className='hero-image'>
              <img src='/images/landing/audio-merger-hero.jpg' alt='Audio merger interface joining multiple tracks' title='Audio Merger' loading='lazy' />
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Why Us */}
      <section className='why-us'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Audio Merger?</Typography>
              <Divider sx={{ width:100, borderColor:'common.white', mx:'auto', my:2 }} />
            </Grid>
            {[{ icon:<PrivacyTipIcon fontSize='large' color='warning'/>, title:'Local & Private', desc:'Processing stays in your browser.' },
              { icon:<PlaylistAddIcon fontSize='large' color='warning'/>, title:'Drag & Reorder', desc:'Arrange track order easily.' },
              { icon:<LibraryMusicIcon fontSize='large' color='warning'/>, title:'Format Support', desc:'MP3, WAV, FLAC, OGG, M4A.' },
              { icon:<HighQualityIcon fontSize='large' color='warning'/>, title:'Clean Output', desc:'No watermark or signup.' }].map((c,i)=>(
              <Grid key={i} size={{ xs:12, sm:6, md:4, lg:3 }}>
                <Card sx={{ height:'100%' }}><CardContent sx={{ p:2 }}>
                  {c.icon}
                  <Typography variant='h5' component='h3'>{c.title}</Typography>
                  <Typography variant='body1'>{c.desc}</Typography>
                </CardContent></Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* How It Works */}
      <section className='how-it-works'>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography variant='h2'>How It Works</Typography>
              <Divider sx={{ width:100, borderColor:'text.warning', mx:'auto', my:2 }} />
            </Grid>
            <Grid container spacing={{ xs:8, sm:6 }} justifyContent='center' flexGrow={1}>
              {[{ icon:<CloudUploadIcon/>, title:'Upload', desc:'Add multiple audio files.' },
                { icon:<ReorderIcon/>, title:'Reorder', desc:'Drag to set sequence.' },
                { icon:<MergeIcon/>, title:'Merge Locally', desc:'FFmpeg WASM join.' },
                { icon:<DownloadIcon/>, title:'Download', desc:'Single merged file.' }].map((s,i)=>(
                <Grid key={i} size={{ xs:12, sm:6, md:4, lg:3 }}>
                  <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                    <Box sx={{ bgcolor:'warning.main', color:'white', width:56, height:56, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>{s.icon}</Box>
                    <Box>
                      <Typography variant='h5' component='h3'>{s.title}</Typography>
                      <Typography variant='body1'>{s.desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Key Features */}
      <section className='key-features'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width:100, borderColor:'common.white', mx:'auto', my:2 }} />
            </Grid>
            {[{ icon:<QueueMusicIcon fontSize='large' color='warning'/>, title:'Multi‑File Upload', desc:'Add many tracks at once.' },
              { icon:<PlaylistAddIcon fontSize='large' color='warning'/>, title:'Reorder Control', desc:'Drag & arrange order.' },
              { icon:<GraphicEqIcon fontSize='large' color='warning'/>, title:'Optional Crossfade', desc:'Smooth transitions (if enabled).' },
              { icon:<AudiotrackIcon fontSize='large' color='warning'/>, title:'Format Flexible', desc:'Mixed input accepted.' },
              { icon:<SpeedIcon fontSize='large' color='warning'/>, title:'Fast Local Merge', desc:'No queue or upload.' },
              { icon:<HighQualityIcon fontSize='large' color='warning'/>, title:'Watermark‑Free', desc:'Clean final file.' }].map((f,i)=>(
              <Grid key={i} size={{ xs:12, sm:6, md:4, lg:3 }}>
                <Card sx={{ height:'100%' }}><CardContent sx={{ p:2 }}>
                  {f.icon}
                  <Typography variant='h5' component='h3'>{f.title}</Typography>
                  <Typography variant='body1'>{f.desc}</Typography>
                </CardContent></Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* FAQs */}
      <section className='faq-section'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2' align='center' mb={4}>FAQs</Typography>
              <Divider sx={{ width:100, borderColor:'text.warning', mx:'auto', my:2 }} />
            </Grid>
            <Grid size={{ xs:12 }}>
              {FAQ_SCHEMA.mainEntity.map((faq:any,idx:number)=>(
                <Accordion key={idx} disableGutters square elevation={3}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-am-${idx}-content`} id={`faq-am-${idx}-header`}>
                    <Typography variant='h6' component='h3'>{faq.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* CTA */}
      <section className='cta-section'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}><Typography variant='h2' align='center'>Ready to merge your audio?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free audio merging — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display:'flex', justifyContent:'center', gap:1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/audio/merge'>Upload</Button>
              <Button size='large' href='/tools/audio/how-to-merge-audio-online' sx={{ color:'common.white' }}>How-to Guide</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}

// FAQ Schema (bottom)
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I merge audio files?", "acceptedAnswer": { "@type": "Answer", "text": "Upload multiple audio files, drag to reorder, choose output format/quality, then click Merge to generate a single file." } },
    { "@type": "Question", "name": "Which formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP3, WAV, FLAC, OGG, M4A, AAC and other browser‑decodable formats." } },
    { "@type": "Question", "name": "Is merging private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Processing occurs locally in your browser with WebAssembly FFmpeg — no uploads." } },
    { "@type": "Question", "name": "Is it free and watermark‑free?", "acceptedAnswer": { "@type": "Answer", "text": "Completely free, no signup, no watermark." } },
    { "@type": "Question", "name": "Can I reorder tracks?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, simply drag tracks into the desired order before merging." } }
  ]
}

// Styled Root
const Root = styled(Paper)(({ theme }) => ({
  '& img': { maxWidth:'100%' },
  '& .hero-section': {
    display:'flex',
    alignItems:'center',
    minHeight:500,
    '& .hero-image img':{ marginBottom:theme.spacing(2) },
    [theme.breakpoints.down('md')]:{
      '& .hero-text':{ textAlign:'center', paddingBottom:theme.spacing(6) },
      '& .hero-image img':{ display:'table', marginInline:'auto' }
    }
  },
  '& .why-us, & .key-features, & .cta-section':{
    paddingBlock:theme.spacing(8),
    background:`radial-gradient(circle at 50% 0%, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
    textAlign:'center',
    '& .MuiTypography-h2':{ color:theme.palette.common.white }
  },
  '& .how-it-works':{
    paddingBlock:theme.spacing(8),
    textAlign:'center'
  },
  '& .faq-section':{
    paddingBlock:theme.spacing(8),
    background: theme.palette.mode==='dark'?theme.palette.grey[900]:theme.palette.grey[50]
  }
}))