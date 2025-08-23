// React import omitted (new JSX transform)

import { Helmet } from 'react-helmet-async'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// MUI Icons
import ImageIcon from '@mui/icons-material/Image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CropIcon from '@mui/icons-material/Crop'
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw'
import FlipIcon from '@mui/icons-material/Flip'
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter'
import DownloadIcon from '@mui/icons-material/Download'
import LockIcon from '@mui/icons-material/Lock'
import DevicesIcon from '@mui/icons-material/Devices'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is my image uploaded to your servers?", "acceptedAnswer": { "@type": "Answer", "text": "No! All processing is done locally in your browser, so your images never leave your device." } },
    { "@type": "Question", "name": "What image formats do you support?", "acceptedAnswer": { "@type": "Answer", "text": "JPG, PNG, WebP, GIF, and more. You can also convert between these formats." } },
    { "@type": "Question", "name": "Can I maintain the aspect ratio when resizing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can lock or unlock the aspect ratio as needed." } },
    { "@type": "Question", "name": "How do I crop an image?", "acceptedAnswer": { "@type": "Answer", "text": "Simply drag over the image to select the crop area and hit the crop button." } },
    { "@type": "Question", "name": "Can I undo changes?", "acceptedAnswer": { "@type": "Answer", "text": "You can reset cropping and other adjustments at any time." } },
    { "@type": "Question", "name": "What if the image is too large?", "acceptedAnswer": { "@type": "Answer", "text": "The tool works best with images up to a certain size (depending on your device/browser). Large images may take longer to process." } },
    { "@type": "Question", "name": "Do you plan to add batch processing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Batch image editing and conversion features are coming soon." } }
  ]
}

const Root = styled(Paper)(({ theme }) => ({
  '& img': { maxWidth: '100%' },
  '& .hero-section': {
    minHeight: 500,
    paddingTop: theme.spacing(6),
    '& .hero-image': { '& > img': { marginBottom: theme.spacing(2) } },
    [theme.breakpoints.down('md')]: {
      '& .hero-text': { textAlign: 'center', paddingBottom: theme.spacing(6) },
      '& .hero-image > img': { display: 'table', marginInline: 'auto' }
    }
  },
  '& .why-us, & .cta-section': {
    paddingBlock: theme.spacing(8),
    background: `radial-gradient(circle at 50% 0%, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.common.white }
  },
  '& .features-section': {
    paddingBlock: theme.spacing(8),
    textAlign: 'center',
    '& .MuiTypography-h2': { color: theme.palette.text.primary }
  },
  '& .faq-section': {
    paddingBlock: theme.spacing(8),
    textAlign: 'center',
    // No background, default paper (like VideoCompressionLanding)
    '& .MuiTypography-h2': { color: theme.palette.text.primary }
  },
}))

export default function ImageConverterLanding() {
  return (
    <Root elevation={0}>
      <Helmet>
        <title>Ultimate Online Image Converter & Editor — Fast, Free, & Browser-Based</title>
        <meta name="description" content="Convert, resize, crop, rotate, and apply filters to images online for free. Supports JPG, PNG, WebP, GIF formats. Fast, secure, and works entirely in your browser." />
        <meta name="keywords" content="image converter, online image editor, free image resizer, crop image online, rotate image online, image quality adjustment, convert image format, webp converter, jpg to png converter, photo filter editor, image optimization tool, blur image, grayscale image, flip image, brightness contrast saturation, client-side image processing, drag and drop image editor" />
        <meta property="og:title" content="Free Online Image Converter & Editor | Resize, Crop, Rotate, Optimize Images" />
        <meta property="og:description" content="Convert, resize, crop, rotate, and apply filters to images online for free. No signup, no watermark, and fully browser-based for fast and secure processing." />
        <meta property="og:image" content="/images/landing/image-converter-landing.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/image/convert-image-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/image/convert-image-online" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <section className='hero-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} className='hero-text'>
              <Typography variant="h2" component="h1">Ultimate Online Image Converter & Editor — Fast, Free, & Browser-Based</Typography>
              <Typography variant="h6" component="p" color="text.secondary" mt={3} mb={4}>Resize, crop, rotate, optimize, and apply filters to your images instantly — no uploads, no installs, 100% client-side processing.</Typography>
              <Box display="flex" gap={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button color='secondary' size='large' href="/tools/image/convert" variant="contained">Upload & Edit Now</Button>
                <Button size='large' href="/tools/image/how-to-convert-image-online" variant="text" sx={{ color: 'text.secondary' }}>Learn More</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: -1, md: 1 }} className='hero-image'>
              <img src='/images/landing/image-converter-landing.png' alt='Laptop showing an image preview and editing options.' title='Image Converter & Editor' loading='lazy' width="auto" height="auto" />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className='features-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Powerful Image Editing & Conversion Features</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.black', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <CloudUploadIcon fontSize='large' color='secondary' />, title: 'Drag & Drop Upload', desc: 'Easily drag and drop images or click to select files. Supports JPG, PNG, WebP, GIF, and more.' },
            { icon: <ImageIcon fontSize='large' color='secondary' />, title: 'Resize with Aspect Ratio Lock', desc: 'Change image width and height while optionally maintaining the aspect ratio.' },
            { icon: <CropIcon fontSize='large' color='secondary' />, title: 'Crop & Reset', desc: 'Interactive cropping tool with easy reset functionality.' },
            { icon: <Rotate90DegreesCcwIcon fontSize='large' color='secondary' />, title: 'Rotate & Flip', desc: 'Rotate images to any angle and flip horizontally or vertically.' },
            { icon: <PhotoFilterIcon fontSize='large' color='secondary' />, title: 'Quality Control & Format Conversion', desc: 'Adjust image quality and convert images between popular formats: JPG, PNG, WebP, GIF, and original.' },
            { icon: <PhotoFilterIcon fontSize='large' color='secondary' />, title: 'Apply Advanced Filters', desc: 'Grayscale, blur, brightness, contrast, and saturation adjustments all within your browser.' },
            { icon: <DownloadIcon fontSize='large' color='secondary' />, title: 'Preview & Download', desc: 'Real-time preview with instant download once editing is done. No server uploads — privacy guaranteed.' },
            { icon: <LockIcon fontSize='large' color='secondary' />, title: 'Fast & Secure', desc: 'All processing happens client-side in your browser. Your images never leave your device.' }].map((item, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    {item.icon}
                    <Typography variant='h5' component='h3'>{item.title}</Typography>
                    <Typography variant='body1'>{item.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <section className='why-us'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent='center'>
            <Grid size={12}>
              <Typography variant='h2'>Why Choose Us?</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {[{ icon: <LockIcon fontSize='large' color='secondary' />, title: 'Free & No Sign-Up Required', desc: 'No sign-up, no watermark, and fully browser-based for fast and secure processing.' },
            { icon: <DevicesIcon fontSize='large' color='secondary' />, title: 'Works on All Devices', desc: 'Desktop, tablet, mobile.' },
            { icon: <LockIcon fontSize='large' color='secondary' />, title: 'No File Uploads', desc: '100% privacy and security.' },
            { icon: <ImageIcon fontSize='large' color='secondary' />, title: 'Intuitive & User-Friendly Interface', desc: 'Easy to use for everyone.' },
            { icon: <DownloadIcon fontSize='large' color='secondary' />, title: 'Support for Large Images', desc: 'Works with large images (performance depends on your device/browser).' },
            { icon: <PhotoFilterIcon fontSize='large' color='secondary' />, title: 'Batch Processing (coming soon!)', desc: 'Edit and convert multiple images at once.' }].map((item, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    {item.icon}
                    <Typography variant='h5' component='h3'>{item.title}</Typography>
                    <Typography variant='body1'>{item.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <section className='faq-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid size={12}>
              <Typography variant='h2' mb={4} align='center'>FAQs</Typography>
              <Divider sx={{ width: 100, borderColor: 'common.white', mx: 'auto', my: 2 }} />
            </Grid>
            {FAQ_SCHEMA.mainEntity.map((faq, idx) => (
              <Grid key={idx} size={{ xs: 12 }}>
                <Accordion square disableGutters elevation={3} sx={{ '& .MuiAccordionSummary-root': { px: 1, py: 0.5 }, '& .MuiAccordionDetails-root': { px: 1, py: 1 } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-img-${idx}-content`} id={`faq-img-${idx}-header`}>
                    <Typography variant="subtitle1">{faq.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 2 }}>
                    <Typography variant="body2">{faq.acceptedAnswer.text}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <section className='cta-section'>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid size={12}><Typography variant='h2' align='center'>Ready to convert or edit your images?</Typography></Grid>
            <Grid size={12}><Typography variant='h6' component='p' color='common.white'>Fast, private & free image editing — right in your browser.</Typography></Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button color='inherit' variant='contained' size='large' href='/tools/image/convert'>Upload & Edit Now</Button>
              <Button size='large' href='/tools/image/how-to-convert-image-online' sx={{ color: 'common.white' }}>Learn More</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Root>
  )
}
