import { Helmet } from 'react-helmet-async'

// MUI Imports (mirrors other blog pages)
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
                <title>Free Online Video Resizer – Change Resolution & Aspect Ratio (No Signup)</title>
                <meta name="description" content="Resize videos locally: change resolution, aspect ratio (16:9, 9:16, 1:1, 4:3, 21:9), modes (Fit, Fill, Stretch) & FPS. Private, fast & watermark‑free." />
                <meta name="keywords" content="resize video online free, online video resizer no signup, resize mp4 video online, change video resolution online, video aspect ratio changer, resize MOV AVI MKV online, private video resizer browser, no credit card video tool" />
                <meta property="og:title" content="Resize Videos Online Free – Fast Aspect Ratio & Resolution Editor" />
                <meta property="og:description" content="Resize & reformat video dimensions locally in your browser. No uploads, no signup, no watermark." />
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
                    <Typography variant="h3" component="h1" gutterBottom>Resize Videos Online — Free, Private & Watermark‑Free</Typography>
                    <Typography variant="body1">Change resolution, aspect ratio (16:9, 9:16, 1:1, 4:3, 21:9), resize mode (Fit, Fill, Stretch) and FPS locally with WebAssembly — no uploads or signup.</Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box>
                    <Typography variant="h4" component="h2" gutterBottom>Why Resize?</Typography>
                    <Box component='ul' sx={{ pl:3, mb:2 }}>
                        <li><Typography variant='body1'>Match platform ratios (Reels 9:16, YouTube 16:9, Feed 1:1).</Typography></li>
                        <li><Typography variant='body1'>Downscale 4K → 1080p / 720p to reduce size.</Typography></li>
                        <li><Typography variant='body1'>Maintain consistent branding & layout.</Typography></li>
                        <li><Typography variant='body1'>Optimize playback & bandwidth.</Typography></li>
                    </Box>

                    <Typography variant="h4" component="h2" gutterBottom>How It Works (5 Steps)</Typography>
                    <Box component='ol' sx={{ pl:3, mb:2 }}>
                        <li><Typography variant='body1' component='span'><strong>Upload</strong> video (drag & drop).</Typography></li>
                        <li><Typography variant='body1' component='span'><strong>Select aspect / size</strong> (preset or custom).</Typography></li>
                        <li><Typography variant='body1' component='span'><strong>Pick mode</strong> Fit (letterbox), Fill (crop) or Stretch.</Typography></li>
                        <li><Typography variant='body1' component='span'><strong>Optionally set FPS</strong> (optimize motion / size).</Typography></li>
                        <li><Typography variant='body1' component='span'><strong>Resize & download</strong> watermark‑free MP4.</Typography></li>
                    </Box>

                    <Divider sx={{ my:3 }} />

                    <Typography variant='h4' component='h2' gutterBottom>Feature Highlights</Typography>
                    <Box component='ul' sx={{ pl:3, mb:2 }}>
                        <li><Typography variant='body1'>Aspect presets: 16:9, 9:16, 1:1, 4:3, 21:9.</Typography></li>
                        <li><Typography variant='body1'>Modes: Fit (letterbox), Fill (crop), Stretch.</Typography></li>
                        <li><Typography variant='body1'>FPS control for smoothness or size reduction.</Typography></li>
                        <li><Typography variant='body1'>Local WebAssembly processing — private.</Typography></li>
                        <li><Typography variant='body1'>Instant MP4 export, no watermark or signup.</Typography></li>
                    </Box>

                    <Typography variant='h4' component='h2' gutterBottom>Social Presets</Typography>
                    <Box component='ul' sx={{ pl:3, mb:2 }}>
                        <li><Typography variant='body1'><strong>TikTok / Reels / Shorts:</strong> 1080×1920 (9:16) Fill or Fit.</Typography></li>
                        <li><Typography variant='body1'><strong>YouTube:</strong> 1920×1080 (16:9).</Typography></li>
                        <li><Typography variant='body1'><strong>Instagram Feed:</strong> 1080×1080 (1:1).</Typography></li>
                    </Box>

                    <Typography variant='h4' component='h2' gutterBottom>Best Practices</Typography>
                    <Box component='ul' sx={{ pl:3, mb:2 }}>
                        <li><Typography variant='body1'>Use Fill for full‑bleed vertical reframes; Fit to avoid cropping subjects.</Typography></li>
                        <li><Typography variant='body1'>Downscale 4K → 1080p before further editing to save time.</Typography></li>
                        <li><Typography variant='body1'>Keep even dimensions (e.g., 1080 not 1079) for codec efficiency.</Typography></li>
                        <li><Typography variant='body1'>Lower FPS (24–30) for narration or talking head to reduce size.</Typography></li>
                    </Box>

                    <Divider sx={{ my:3 }} />

                    <Typography variant="h4" component="h2" gutterBottom>FAQs</Typography>
                    {FAQ_SCHEMA.mainEntity.map((faq: any, idx: number) => (
                      <Accordion key={idx} disableGutters square>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant='h6' component='h3'>{faq.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant='body1'>{faq.acceptedAnswer.text}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                    <Divider sx={{ my:3 }} />
                    <Typography variant="h4" component="h2" gutterBottom>Conclusion</Typography>
                    <Typography variant="body1" mb={2}>Resize & reformat videos privately — choose aspect, mode, resolution & FPS, then export a clean MP4 without uploads or watermark.</Typography>
                    <Box mt={4} textAlign="center">
                        <Button color='warning' size='large' href="/tools/video/resize" variant="contained">Upload</Button>
                        <Button color='warning' size='large' href="/tools/video/resize-video-online" variant="outlined" sx={{ ml: 2 }}>Features</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
