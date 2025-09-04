import { Helmet } from 'react-helmet-async'
// MUI Imports
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
    { "@type": "Question", "name": "Is my image uploaded to a server?", "acceptedAnswer": { "@type": "Answer", "text": "No. All image processing is done in your browser using WebAssembly. Nothing gets uploaded." } },
    { "@type": "Question", "name": "Which image formats can I upload and export?", "acceptedAnswer": { "@type": "Answer", "text": "JPG, PNG, WebP, GIF. You can upload one and export in another." } },
    { "@type": "Question", "name": "Can I maintain aspect ratio while resizing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. There’s a toggle to lock or unlock the aspect ratio." } },
    { "@type": "Question", "name": "Does it support cropping?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can click and drag to create a custom crop selection, or reset it anytime." } },
    { "@type": "Question", "name": "What filters are available?", "acceptedAnswer": { "@type": "Answer", "text": "Grayscale, blur, brightness, contrast, saturation, and rotate/flip." } }
  ]
}

export default function ImageConverterBlog() {
  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Helmet>
        <title>How to Convert & Edit Images Online Free – Resize, Crop, Rotate Guide</title>
        <meta name='description' content='Resize, crop, rotate & convert JPG, PNG, WebP, GIF locally in your browser. Apply filters & quality settings. Free, private, no watermark.' />
        <meta property='og:title' content='Free Online Image Converter – Private Resize, Crop & Convert' />
        <meta property='og:description' content='Convert & edit images (JPG, PNG, WebP, GIF) without uploads. Resize, crop, rotate, filter & export — free & watermark‑free.' />
        <meta property='og:type' content='article' />
  <meta property='og:image' content='/images/landing/image-converter-hero.jpg' />
  <meta property='og:url' content='/tools/image/how-to-convert-image-online' />
        <meta property='og:site_name' content='FileApps' />
  <link rel='canonical' href='/tools/image/how-to-convert-image-online' />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/image-converter-hero.jpg' alt='Image Converter' title='Image Converter' loading='lazy' width='400px' height='auto' style={{ maxWidth: '100%', display: 'table', margin: '0 auto 32px' }} />
          <Typography variant='h3' component='h1' gutterBottom>How to Convert and Edit Images Online Without Uploading – Free & Private</Typography>
          <Typography variant='body1'>Editing images shouldn’t require complex software or uploading your private files to unknown servers. Our free online image converter & editor works entirely in your browser – fast, private, and powerful.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant='h4' component='h2' gutterBottom>Why Use a Browser-Based Image Converter?</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Privacy: fully local — no uploads.</Typography></li>
            <li><Typography variant='body1'>Speed: instant operations in memory.</Typography></li>
            <li><Typography variant='body1'>Convenience: no installs or accounts.</Typography></li>
          </Box>

          <Typography variant='h4' component='h2' gutterBottom>How It Works (4 Steps)</Typography>
          <Box component='ol' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1' component='span'><strong>Upload</strong> JPG / PNG / WebP / GIF.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Resize or crop</strong> (lock aspect if needed).</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Adjust</strong> filters, rotate, quality.</Typography></li>
            <li><Typography variant='body1' component='span'><strong>Export</strong> desired format — watermark‑free.</Typography></li>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant='h4' component='h2' gutterBottom>Key Features</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Local conversion (privacy‑first).</Typography></li>
            <li><Typography variant='body1'>Resize & crop with aspect lock toggle.</Typography></li>
            <li><Typography variant='body1'>Rotate & flip (horizontal / vertical).</Typography></li>
            <li><Typography variant='body1'>Filters: brightness, contrast, saturation, blur, grayscale.</Typography></li>
            <li><Typography variant='body1'>Format switching: JPG ⇄ PNG ⇄ WebP ⇄ GIF.</Typography></li>
            <li><Typography variant='body1'>Quality / compression control.</Typography></li>
          </Box>

          <Typography variant='h4' component='h2' gutterBottom>Use Cases</Typography>
          <Box component='ul' sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant='body1'>Social media & thumbnail prep.</Typography></li>
            <li><Typography variant='body1'>Blog / CMS image optimization.</Typography></li>
            <li><Typography variant='body1'>Lightweight compression for performance.</Typography></li>
            <li><Typography variant='body1'>Quick edits on shared machines.</Typography></li>
          </Box>

            <Typography variant='h4' component='h2' gutterBottom>Tips</Typography>
            <Box component='ul' sx={{ pl: 3, mb: 2 }}>
              <li><Typography variant='body1'>Use WebP for quality + smaller size.</Typography></li>
              <li><Typography variant='body1'>Keep aspect ratio locked for platform specs.</Typography></li>
              <li><Typography variant='body1'>Lower quality slider for faster page loads.</Typography></li>
              <li><Typography variant='body1'>Flip selfies horizontally for natural perspective.</Typography></li>
            </Box>

          <Divider sx={{ my: 3 }} />
          <Typography variant='h4' component='h2' gutterBottom>FAQs</Typography>
          {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
            <Accordion key={idx} disableGutters square>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant='h6' component='h3'>{faq.name}</Typography></AccordionSummary>
              <AccordionDetails><Typography variant='body1'>{faq.acceptedAnswer.text}</Typography></AccordionDetails>
            </Accordion>
          ))}

          <Divider sx={{ my: 3 }} />
          <Typography variant='h4' component='h2' gutterBottom>Conclusion</Typography>
          <Typography variant='body1' mb={2}>Convert & edit images quickly without installs or uploads. Resize, crop, adjust and export a clean file — private, fast and free.</Typography>

          <Box mt={4} textAlign='center'>
            <Button color='primary' size='large' href='/tools/image/convert' variant='contained'>Upload</Button>
            <Button color='primary' size='large' href='/tools/image/convert-image-online' variant='outlined' sx={{ ml: 2 }}>Features</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
// (Optional) Could update FAQ schema to include only displayed FAQs
