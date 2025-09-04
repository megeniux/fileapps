// Clean implementation after previous corruption
import { Helmet } from 'react-helmet-async'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// MUI Icons
import SubtitlesIcon from '@mui/icons-material/Subtitles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TuneIcon from '@mui/icons-material/Tune'
import PaletteIcon from '@mui/icons-material/Palette'
import SecurityIcon from '@mui/icons-material/Security'
import DownloadIcon from '@mui/icons-material/Download'
import StyleIcon from '@mui/icons-material/Style'
import PreviewIcon from '@mui/icons-material/Preview'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import SpeedIcon from '@mui/icons-material/Speed'
import FontDownloadIcon from '@mui/icons-material/FontDownload'

export default function BurnCaptionLanding(){
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Burn Subtitles into Video Online – Hardcode Captions Free & Private</title>
        <meta name="description" content="Free online subtitle burner: hardcode SRT / VTT captions into MP4, MOV, MKV. Style font, size, color, outline & background. Private local processing – no signup or watermark." />
        <meta property="og:title" content="Online Subtitle Burner – Hardcode Captions Free (No Watermark)" />
        <meta property="og:description" content="Burn subtitles (SRT/VTT) into video locally. Style & encode MP4 without uploads or signup." />
        <meta property="og:image" content="/images/landing/burn-captions-hero.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/video/burn-subtitles-into-video" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/burn-subtitles-into-video" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs:12, md:6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Burn Subtitles into Video – Free, Private & No Watermark</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>
                Hardcode SRT / VTT captions into MP4, MOV, MKV locally. Style font, size, color & background — no uploads, signup or watermark.
              </Typography>
              <Box display="flex" gap={1} justifyContent={{ xs:'center', md:'flex-start' }}>
                <Button color='primary' size='large' variant='contained' href='/tools/video/burn-captions'>Upload</Button>
                <Button size='large' variant='text' sx={{ color:'text.secondary' }} href='/tools/video/how-to-burn-captions-into-video-online'>How-to Guide</Button>
              </Box>
            </Grid>
            <Grid container size={{ xs:12, md:6 }} className='hero-image' justifyContent={{ xs:'center', md:'flex-end' }}>
              <img src='/images/landing/burn-captions-hero.jpg' alt='Subtitle burner interface overlaying styled captions on video' title='Subtitle Burner' loading='lazy' style={{filter: 'hue-rotate(60deg)'}} />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Use Our Subtitle Burner?</Typography>
              <Divider sx={{ width:100, borderColor:'common.white', mx:'auto', my:2 }} />
            </Grid>
            {[{
              icon:<SecurityIcon fontSize='large' color='primary' />,
              title:'Local & Private',
              desc:'Encoding stays on device.'
            },{
              icon:<SubtitlesIcon fontSize='large' color='primary' />,
              title:'SRT / VTT Support',
              desc:'Load or paste captions.'
            },{
              icon:<PaletteIcon fontSize='large' color='primary' />,
              title:'Styling Controls',
              desc:'Color, outline, box, size.'
            },{
              icon:<HighQualityIcon fontSize='large' color='primary' />,
              title:'No Watermark',
              desc:'Clean final MP4.'
            }].map((c,i)=>(
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

      <section className='how-it-works'>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Typography variant='h2'>How It Works</Typography>
              <Divider sx={{ width:100, borderColor:'text.primary', mx:'auto', my:2 }} />
            </Grid>
            <Grid container spacing={{ xs:8, sm:6 }} justifyContent='center' flexGrow={1}>
              {[{ icon:<CloudUploadIcon />, title:'Upload', desc:'Drag & drop video.' },
                { icon:<SubtitlesIcon />, title:'Add Subtitles', desc:'Load SRT / VTT or paste.' },
                { icon:<StyleIcon />, title:'Style', desc:'Font, size, color, box.' },
                { icon:<PreviewIcon />, title:'Preview', desc:'Check timing & look.' },
                { icon:<DownloadIcon />, title:'Burn & Export', desc:'Hardcode & download.' }
              ].map((s,i)=>(
                <Grid key={i} size={{ xs:12, sm:6, md:4, lg:3 }}>
                  <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                    <Box sx={{ bgcolor:'primary.main', color:'white', width:56, height:56, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>{s.icon}</Box>
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

      <section className='key-features'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2' mb={4}>Key Features</Typography>
              <Divider sx={{ width:100, borderColor:'common.white', mx:'auto', my:2 }} />
            </Grid>
            {[{ icon:<SubtitlesIcon fontSize='large' color='primary' />, title:'SRT / VTT Input', desc:'Standard caption formats.' },
              { icon:<FontDownloadIcon fontSize='large' color='primary' />, title:'Font & Size', desc:'Readable styling.' },
              { icon:<PaletteIcon fontSize='large' color='primary' />, title:'Color & Box', desc:'Outline / background.' },
              { icon:<TuneIcon fontSize='large' color='primary' />, title:'Positioning', desc:'Top / bottom alignment.' },
              { icon:<SpeedIcon fontSize='large' color='primary' />, title:'Local FFmpeg', desc:'Private WASM encoder.' },
              { icon:<DownloadIcon fontSize='large' color='primary' />, title:'Watermark‑Free', desc:'Clean MP4 export.' }
            ].map((f,i)=>(
              <Grid key={i} size={{ xs:12, sm:6, md:4, lg:3 }}>
                <Card sx={{ height:'100%' }}>
                  <CardContent sx={{ p:2 }}>
                    {f.icon}
                    <Typography variant='h5' component='h3'>{f.title}</Typography>
                    <Typography variant='body1'>{f.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <section className='faq-section'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2' align='center'>FAQs</Typography>
              <Divider sx={{ width:100, borderColor:'text.primary', mx:'auto', my:2 }} />
            </Grid>
            <Grid size={{ xs:12 }}>
              {FAQ_SCHEMA.mainEntity.map((faq:any,i:number)=>(
                <Accordion key={i} square disableGutters elevation={3}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

      <section className='cta-section'>
        <Container maxWidth='lg'>
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}><Typography variant='h2' align='center'>Ready to burn subtitles?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Hardcode captions privately — fast, free & watermark‑free.</Typography></Grid>
            <Grid size={12} sx={{ display:'flex', justifyContent:'center', gap:1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/video/burn-captions'>Upload</Button>
              <Button size='large' href='/tools/video/how-to-burn-captions-into-video-online' sx={{ color:'common.white' }}>How-to Guide</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}

const FAQ_SCHEMA = {
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    { "@type":"Question","name":"How do I burn subtitles into a video?","acceptedAnswer":{ "@type":"Answer","text":"Upload your video, load (or create) an SRT/VTT subtitle file, adjust styling, then click Burn to hardcode the captions and download the new video." }},
    { "@type":"Question","name":"Which subtitle formats are supported?","acceptedAnswer":{ "@type":"Answer","text":"Standard text subtitle formats like SRT and WebVTT. You can also paste text to auto-generate simple timing (if supported)." }},
    { "@type":"Question","name":"Are the burned captions removable?","acceptedAnswer":{ "@type":"Answer","text":"No. Burning (hardcoding) renders the text into the pixels permanently so players cannot toggle them off." }},
    { "@type":"Question","name":"Is the process private?","acceptedAnswer":{ "@type":"Answer","text":"Yes. Encoding runs locally via FFmpeg WebAssembly in your browser — no uploads to a server." }},
    { "@type":"Question","name":"Do I need an account or pay?","acceptedAnswer":{ "@type":"Answer","text":"No account, no fees, no watermark. 100% free." }},
    { "@type":"Question","name":"Can I change font, size or background?","acceptedAnswer":{ "@type":"Answer","text":"Yes. Adjust font family (system), size, color, outline, shadow, and optional semi‑transparent box/background." }}
  ]
}

const Root = styled(Paper)(({ theme }) => ({
  '& img':{ maxWidth:'100%' },
  '& .hero-section':{
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
    background:`radial-gradient(circle at 50% 0%, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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