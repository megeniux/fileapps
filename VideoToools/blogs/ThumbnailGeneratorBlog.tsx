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
    { "@type": "Question", "name": "How does the video frame extraction tool work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses browser-based video processing to extract frames, create thumbnails, and generate video scrub strips locally—no uploads or data sharing." } },
    { "@type": "Question", "name": "What extraction modes are available?", "acceptedAnswer": { "@type": "Answer", "text": "You can extract single frames at specific times, create video scrub strips, or batch extract multiple frames at intervals." } },
    { "@type": "Question", "name": "Which video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, AVI, MKV, and most popular video formats are supported." } },
    { "@type": "Question", "name": "Can I choose specific frames to extract?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can select any frame or timestamp, create scrub strips from time ranges, or extract frames at custom intervals." } },
    { "@type": "Question", "name": "Is this service really free?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely, no signups, no watermarks, completely free with all features available." } },
    { "@type": "Question", "name": "Does it work on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it supports modern mobile browsers on Android and iOS." } }
  ]
}

export default function ThumbnailGeneratorBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>How to Extract Frames from Video Online for Free – Complete Guide</title>
        <meta name="description" content="Learn how to extract frames, generate thumbnails, and create video scrub strips online. Free step-by-step guide with no uploads required." />
        <meta property="og:title" content="How to Extract Frames from Video Online for Free (No Signup)" />
        <meta property="og:description" content="Learn how to extract frames, generate thumbnails, and create video scrub strips online. Free step-by-step guide with no uploads required." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/landing/thumbnail-generator-hero.jpg" />
        <meta property="og:url" content="/tools/image/how-to-generate-thumbnail" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/image/how-to-generate-thumbnail" />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        <Box mb={4}>
          <img src='/images/landing/thumbnail-generator-hero.jpg' alt='Video frame extraction interface demo' title='Video Frame Extraction Tool' loading='lazy' width="480" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px' }} />
          <Typography variant="h3" component="h1" gutterBottom>Extract Frames from Video Online — Free, Private & No Watermark</Typography>
          <Typography variant="body1">Extract single frames, create video scrub strips, or batch extract multiple frames from MP4, MOV, MKV files — all processed locally in your browser. No uploads, no signup, no watermark.</Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>Why Extract Frames from Videos?</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1">Create eye-catching thumbnails for YouTube and social media.</Typography></li>
          <li><Typography variant="body1">Generate contact sheets or video scrub strips for previews.</Typography></li>
          <li><Typography variant="body1">Extract specific moments for presentations or documentation.</Typography></li>
          <li><Typography variant="body1">Create promotional images from video content.</Typography></li>
          <li><Typography variant="body1">Build video galleries with representative frames.</Typography></li>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom mt={4}>How It Works (4 Steps)</Typography>
        <Box component="ol" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1" component="span"><strong>Upload your video</strong> (drag & drop or browse).</Typography></li>
          <li><Typography variant="body1" component="span"><strong>Choose extraction mode</strong> (single frame, scrub strip, or batch).</Typography></li>
          <li><Typography variant="body1" component="span"><strong>Set parameters</strong> like timing, size, and intervals.</Typography></li>
          <li><Typography variant="body1" component="span"><strong>Extract and download</strong> your frames instantly with no watermark.</Typography></li>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom mt={4}>Extraction Modes</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1"><strong>Single Frame:</strong> Extract one perfect frame at any timestamp.</Typography></li>
          <li><Typography variant="body1"><strong>Video Scrub:</strong> Create strips showing multiple frames in sequence.</Typography></li>
          <li><Typography variant="body1"><strong>Batch Extraction:</strong> Extract multiple frames at custom intervals.</Typography></li>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom mt={4}>Key Features</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1">Local FFmpeg processing (no uploads).</Typography></li>
          <li><Typography variant="body1">Multiple extraction modes for different needs.</Typography></li>
          <li><Typography variant="body1">Customizable frame sizes and presets.</Typography></li>
          <li><Typography variant="body1">Precise timing control for frame selection.</Typography></li>
          <li><Typography variant="body1">Supports all popular video formats.</Typography></li>
          <li><Typography variant="body1">Watermark-free output.</Typography></li>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom mt={4}>Use Cases</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1">YouTube thumbnail creation.</Typography></li>
          <li><Typography variant="body1">Social media content preparation.</Typography></li>
          <li><Typography variant="body1">Video storyboards and contact sheets.</Typography></li>
          <li><Typography variant="body1">Presentation slides from video content.</Typography></li>
          <li><Typography variant="body1">Video analysis and documentation.</Typography></li>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom mt={4}>Pro Tips</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1">Use scrub strips to show video progression in one image.</Typography></li>
          <li><Typography variant="body1">Extract frames at key moments for maximum impact.</Typography></li>
          <li><Typography variant="body1">Choose appropriate sizes for your intended platform.</Typography></li>
          <li><Typography variant="body1">For batch extraction, consider your video length and desired frame count.</Typography></li>
          <li><Typography variant="body1">Save processing time by using preset dimensions.</Typography></li>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom mt={4}>Platform Size Recommendations</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1"><strong>YouTube:</strong> 1280×720 or 1920×1080 for thumbnails.</Typography></li>
          <li><Typography variant="body1"><strong>Instagram:</strong> 1080×1080 (square) or 1080×1350 (portrait).</Typography></li>
          <li><Typography variant="body1"><strong>Facebook:</strong> 1200×630 for posts, 1920×1080 for videos.</Typography></li>
        </Box>

        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" component="h2" gutterBottom>FAQs</Typography>
        {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
          <Accordion key={idx} disableGutters square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" component="h3">{faq.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.acceptedAnswer.text}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" component="h2" gutterBottom>Conclusion</Typography>
        <Typography variant="body1" mb={2}>With our free online video frame extraction tool, getting the perfect frames from your videos is fast, easy, and completely private. Extract single frames, create scrub strips, or batch extract multiple frames — all with no signups, no watermarks, and all processing happens securely in your browser. Start extracting frames today!</Typography>

        <Box mt={4} textAlign="center">
          <Button color="secondary" size="large" variant="contained" href="/tools/image/thumbnail">Upload</Button>
          <Button color="secondary" size="large" variant="outlined" href="/tools/image/extract-thumbnail-from-video" sx={{ ml: 2 }}>View Features</Button>
        </Box>
      </Paper>
    </Container>
  )
}