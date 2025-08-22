import { Helmet } from 'react-helmet-async'

// MUI Imports (mirrors other blog pages)
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
        { "@type": "Question", "name": "How does the browser-based video resizer work?", "acceptedAnswer": { "@type": "Answer", "text": "It uses FFmpeg compiled to WebAssembly inside your browser. No uploads — everything stays on your device." } },
        { "@type": "Question", "name": "Which video formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "MP4, MOV, AVI, MKV, and more common video formats." } },
        { "@type": "Question", "name": "Can I resize videos for social platforms?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, presets are available for YouTube, TikTok, Instagram, and Reels." } },
        { "@type": "Question", "name": "Is it really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — no signup, no credit card required, and no watermarks." } },
        { "@type": "Question", "name": "What if my video is too large?", "acceptedAnswer": { "@type": "Answer", "text": "Processing depends on your browser's memory. For very large files, consider compressing first." } }
    ]
};

export default function VideoResizerBlog() {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Helmet>
                <title>How to Resize Videos Online Free (No Signup, No Uploads)</title>
                <meta name="description" content="This guide explains how to resize videos online without installing software, without uploading files to servers, and with full privacy. We'll walk through step-by-step instructions using our free browser-based video resizer." />
                <meta name="keywords" content="resize video online free, online video resizer no signup, resize mp4 video online, change video resolution online, video aspect ratio changer, resize MOV AVI MKV online, private video resizer browser, no credit card video tool" />
                <meta property="og:title" content="How to Resize Videos Online Free (No Signup, No Uploads)" />
                <meta property="og:description" content="This guide explains how to resize videos online without installing software, without uploading files to servers, and with full privacy." />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="/images/landing/video-resizer-hero.jpg" />
                <meta property="og:url" content="/tools/video/how-to-resize-video-online" />
                <meta property="og:site_name" content="FileApps" />
                <link rel="canonical" href="/tools/video/how-to-resize-video-online" />
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <Paper sx={{ p: 4 }}>
                <Box mb={4}>
                    <img src='/images/landing/video-resizer-hero.jpg' alt='Video Resizer' title='Video Resizer' loading='lazy' width="400px" height="auto" style={{ maxWidth: '100%', display: 'table', margin: '0 auto 16px' }} />
                    <Typography variant="h3" component="h1" gutterBottom> How to Resize Videos Online Free (No Signup, No Uploads) </Typography>
                    <Typography variant="body1">This guide explains how to resize videos online without installing software, without uploading files to servers, and with full privacy. We’ll walk through step-by-step instructions using our free browser-based video resizer.</Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box>
                    <Typography variant="h4" component="h2" gutterBottom>Why Resize Videos?</Typography>
                    <Typography variant="body1" mb={2}>Match platform requirements (TikTok 9:16, YouTube 16:9, Instagram 1:1).<br />Improve video playback performance by lowering resolution or FPS.<br />Save storage and bandwidth by compressing large files.<br />Create consistent video content across devices.</Typography>

                    <Typography variant="h4" component="h2" my={2}>Step-by-Step: Resize Videos in Browser</Typography>
                    <Typography variant="body1">1. <strong>Upload your video file</strong> (drag &amp; drop supported).<br />2. <strong>Select resolution or aspect ratio</strong> (custom size or presets).<br />3. <strong>Choose resize mode</strong> (Fit, Fill, Stretch).<br />4. <strong>Adjust FPS if needed</strong> for smoother playback.<br />5. <strong>Click Resize &amp; Download</strong> – your resized MP4 will be ready instantly.</Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h4" component="h2" gutterBottom>Troubleshooting &amp; Tips</Typography>
                    <Typography variant="body1" mb={2}>For smoother performance, use shorter video clips. If resizing large 4K videos, lower resolution to 1080p or 720p. Ensure your browser (Chrome/Firefox/Safari/Edge) is up to date.</Typography>

                    <Typography variant="h4" component="h2" gutterBottom>Best Practices for Social Platforms</Typography>
                    <Typography variant="body1" mb={2}><strong>TikTok/Reels:</strong> Use 9:16 vertical ratio.<br /><strong>YouTube:</strong> Stick to 16:9 widescreen.<br /><strong>Instagram Feed:</strong> Square 1:1 works best.<br /><strong>Stories/Shorts:</strong> Opt for vertical full-screen 9:16.</Typography>

                    <Typography variant="h4" component="h2" gutterBottom>Conclusion</Typography>
                    <Typography variant="body1" mb={2}>Resizing videos doesn't need signups, uploads, or watermarks. With our free browser-based tool, you can adjust resolution, ratio, and FPS instantly — while keeping all your files private on your device.</Typography>

                    <Box mt={4} textAlign="center">
                        <Button color='warning' size='large' href="/tools/video/resize" variant="contained">Upload</Button>
                        <Button color='warning' size='large' href="/tools/video/resize-video-online" variant="outlined" sx={{ ml: 2 }}>Features</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
