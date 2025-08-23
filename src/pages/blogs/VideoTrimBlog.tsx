import { Helmet } from 'react-helmet-async'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I trim my video?", "acceptedAnswer": { "@type": "Answer", "text": "Upload your video, use the slider to select the start and end points, then click 'Trim' to process and download the file." } },
    { "@type": "Question", "name": "What video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "We support MP4, MOV, AVI, MKV, and many other popular video formats." } },
    { "@type": "Question", "name": "Do I need to sign up?", "acceptedAnswer": { "@type": "Answer", "text": "No, the tool is completely free and doesn’t require any signup." } },
    { "@type": "Question", "name": "Is the trimming process private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! All processing is done locally in your browser; your video is never uploaded to a server." } },
    { "@type": "Question", "name": "Is there a watermark on the trimmed video?", "acceptedAnswer": { "@type": "Answer", "text": "No, your trimmed video will have no watermark or branding." } }
  ]
}

export default function VideoTrimBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>How to Trim Your Video Online for Free</title>
        <meta name="description" content="Trim your videos online for free. Select the start and end points to cut MP4, MOV, AVI, MKV, and other formats. 100% browser-based, no signup required, no watermark. Step-by-step guide." />
        <meta name="keywords" content="video trimmer online free, trim video online free, cut video online, free video cutter, video editor trim, video trimming tool, online video trim, cut video in browser, free video cutting tool, trim video for free, free online video editor, trim MP4, MOV, AVI, MKV, free video cutter no watermark, online video cutter, trim video online, video editor free, no signup video trimmer, online video cut tool, free browser video trimmer" />
        <meta property="og:title" content="How to Trim Your Video Online for Free" />
        <meta property="og:description" content="Trim, cut, or edit your videos online for free. Supports MP4, MOV, AVI, MKV, and more. No signup required, no watermark, 100% private, browser-based." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/landing/video-trimmer-hero.jpg" />
        <meta property="og:url" content="/tools/video/how-to-trim-video-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/how-to-trim-video-online" />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/video-trimmer-hero.jpg' alt='Video Trimmer' title='Video Trimmer' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px' }} />
          <Typography variant="h3" component="h1" gutterBottom> How to Trim Your Video Online for Free </Typography>
          <Typography variant="body1">Trimming videos has never been easier. With our <strong>free online video trimmer</strong>, you can select the start and end points to cut your videos instantly—no software, no sign-up, and no watermark.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom>Why Trim Your Videos?</Typography>
          <Typography variant="body1" mb={2}>Remove unwanted sections: Cut out intros, outros, or irrelevant parts.<br />Create highlights: Perfect for trimming highlights for social media.<br />Adjust length for uploading: Make your video shorter for quicker uploads.<br />Trim multiple videos quickly: Save time on editing with a fast online tool.</Typography>

          <Typography variant="h4" component="h2" my={2}>How to Trim Video Online for Free</Typography>
          <Typography variant="body1">1. <strong>Upload Your Video</strong>: Drag and drop your file, or click to choose one from your device.<br />2. <strong>Set the Trim Points</strong>: Use the slider to define the section you want to keep.<br />3. <strong>Preview</strong>: Check the preview to ensure the trim looks perfect.<br />4. <strong>Download the Trimmed Video</strong>: Once you're happy, hit "Download" to save your edited file.</Typography>
  <Typography variant="body1">1. <strong>Upload Your Video</strong>: Drag and drop your file, or click to choose one from your device.<br />2. <strong>Set the Trim Points</strong>: Use the slider to define the section you want to keep.<br />3. <strong>No Installation Needed</strong>: Trim videos directly in your browser—no software required.<br />4. <strong>Download the Trimmed Video</strong>: Once you're happy, hit "Download" to save your edited file.</Typography>

          <Typography variant="h4" component="h2" mt={3} gutterBottom>Best Use Cases for Video Trimming</Typography>
          <Typography variant="body1" mb={2}>Social Media Creators: Trim videos for Instagram, YouTube, TikTok, etc.<br />Vloggers: Cut out unnecessary parts of your vlogs.<br />Students: Remove irrelevant parts from lecture or tutorial videos.<br />Businesses: Edit promotional videos for presentations.</Typography>

          <Typography variant="h4" component="h2" gutterBottom>Why Choose Our Free Video Trimmer?</Typography>
          <Typography variant="body1" mb={2}>No Watermarks: Your trimmed videos come out clean, no branding.<br />No Software Needed: Works completely in your browser.<br />Supports All Major Formats: MP4, MOV, AVI, MKV, and more.<br />Fast and Easy: Get your trimmed video within seconds.<br />Free & Private: Completely free, with no sign-ups required, and your data stays private.</Typography>

          <Typography variant="body1" mb={2}>With our <strong>free online video trimmer</strong>, you can trim your videos in seconds, without the hassle of installing software or creating an account. Get started now and trim your videos instantly!</Typography>

          <Box mt={4} textAlign="center">
            <Button color='info' size='large' href="/tools/video/trim" variant="contained">Upload Video</Button>
            <Button color='info' size='large' href="/tools/video/trim-video-online" variant="outlined" sx={{ ml: 2 }}>Features</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
