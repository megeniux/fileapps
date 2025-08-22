import { Helmet } from 'react-helmet-async'

// MUI Imports
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
    { "@type": "Question", "name": "How do I merge videos online with this tool?", "acceptedAnswer": { "@type": "Answer", "text": "Upload your clips, rearrange them as needed, click Merge, then download the final video." } },
    { "@type": "Question", "name": "Which video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, AVI, MKV, WebM, and many others." } },
    { "@type": "Question", "name": "Is it really free with no watermark?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – 100% free, no watermark, no signup required." } },
    { "@type": "Question", "name": "Will my files be uploaded to a server?", "acceptedAnswer": { "@type": "Answer", "text": "No – the merge happens entirely in your browser." } },
    { "@type": "Question", "name": "Can I use this on my phone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes – it works on iOS, Android, Windows, Mac, and more." } }
  ]
}

export default function VideoMergerBlog() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>How to Merge Videos Online for Free (No Signup, No Watermarks)</title>
        <meta name="description" content="Learn how to combine multiple video clips into one file online with no signup, no watermark, and full privacy. Step-by-step guide using our free browser-based video merger." />
        <meta name="keywords" content="merge videos online free, combine videos online, join video clips free, merge mp4 videos, no signup video merger, video combiner online, no watermark video merger, merge mov and avi, browser-based video merger, video joiner tool" />
        <meta property="og:title" content="How to Merge Videos Online for Free (No Signup, No Watermarks)" />
        <meta property="og:description" content="Combine video clips in your browser – free, private, no watermark." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/images/landing/video-merge-hero.png" />
        <meta property="og:url" content="/tools/video/how-to-merge-videos-online" />
        <meta property="og:site_name" content="FileApps" />
        <link rel="canonical" href="/tools/video/how-to-merge-videos-online" />
        <script type='application/ld+json'>{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <img src='/images/landing/video-merge-hero.png' alt='Video Merger' title='Video Merger' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px' }} />
          <Typography variant="h3" component="h1" gutterBottom> How to Merge Videos Online for Free (No Signup, No Watermarks) </Typography>
          <Typography variant="body1">Want to combine multiple video clips into one? Here's how you can merge videos online without installing software or registering an account.</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant="h4" component="h2" gutterBottom>Why Merge Videos?</Typography>
          <Typography variant="body1" mb={2}>Combine clips into one for sharing or editing.<br />Create highlight reels for events or projects.<br />Merge TikTok or Instagram story segments.<br />Stitch footage from different cameras.</Typography>

          <Typography variant="h4" component="h2" my={2}>Step-by-Step Guide</Typography>
          <Typography variant="body1">1. <strong>Add your video files</strong> (drag &amp; drop or click).<br />2. <strong>Reorder the clips</strong> (move them up or down).<br />3. <strong>Click Merge</strong> to combine them.<br />4. <strong>Download your video</strong> – no watermark, instant export.</Typography>

          <Typography variant="h4" component="h2" mt={3} gutterBottom>Best Use Cases</Typography>
          <Typography variant="body1" mb={2}>YouTube compilations, event highlights, fitness workouts, BTS & vlogs, classroom edits.</Typography>

          <Typography variant="h4" component="h2" gutterBottom>Tips for Best Results</Typography>
          <Typography variant="body1" mb={2}>Use clips with the same resolution/format for smooth merging. Name files clearly to help ordering.</Typography>

          <Typography variant="h4" component="h2" gutterBottom>Final Thoughts</Typography>
          <Typography variant="body1" mb={2}>With our free, browser-based video merger, anyone can combine video clips quickly and securely. No software, no account, no watermark – just drag, drop, and merge.</Typography>

          <Box mt={4} textAlign="center">
            <Button color='success' size='large' href="/tools/video/merge" variant="contained">Upload</Button>
            <Button color='success' size='large' href="/tools/video/merge-videos-online" variant="outlined" sx={{ ml: 2 }}>Features</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
