// React import intentionally omitted to use the new JSX transform
import { Helmet } from 'react-helmet-async'

// MUI Components
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Icons
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does the browser-based caption burner work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The tool runs FFmpeg compiled to WebAssembly inside your browser. Your video and subtitle files are processed locally — nothing is uploaded to our servers."
            }
        },
        {
            "@type": "Question",
            "name": "Which subtitle formats are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The tool supports SRT and VTT subtitle files. UTF-8 encoding is recommended for best results."
            }
        },
        {
            "@type": "Question",
            "name": "Can I customize caption style before burning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes — choose font size, font color, outline color and outline width to match your brand or platform requirements before exporting."
            }
        },
        {
            "@type": "Question",
            "name": "Will my files leave my device?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No — processing is client-side. Your video and subtitles stay on your machine unless you choose to share the resulting file."
            }
        },
        {
            "@type": "Question",
            "name": "What if my video is very large?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Large files depend on your device’s CPU and memory. We recommend trimming or compressing very large videos first for reliable browser performance."
            }
        }
    ]
}

export default function BurnCaptionLanding() {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Helmet>
                <title>Free Online Caption Burner | Burn Subtitles into Videos in Browser</title>
                <meta name="description" content="Add and style subtitles, then burn them into your video — 100% client-side, no upload, privacy-first. Free caption burner tool for creators." />
                <meta property="og:title" content="Burn Subtitles into Videos Online – Fast, Free & Private" />
                <meta property="og:description" content="Hardcode captions into videos in your browser with full style control. No upload. No watermark." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/branding/logo-xl.svg" />
                <meta property="og:url" content="https://fileapps.click/tools/video/burn-caption" />
                <meta property="og:site_name" content="FileApps" />
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            Burn Captions into Videos Online – 100% Private & Free
                        </Typography>
                        <Typography variant="body1" component="p" color="text.secondary">
                            Add subtitles to your videos easily with our browser-based caption burner. Upload your video, choose an SRT or VTT subtitle file, customize your caption style, and burn captions directly into your video — no uploads, no watermarks, no sign-ups. Everything runs client-side for maximum privacy.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid container size={12}>
                    <Grid size={12}>
                        <Typography variant='h2'>Why Use Our Online Caption Burner?</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <Card sx={{ height: '100%', textAlign: 'center' }}>
                            <CardContent sx={{ p: 2 }}>
                                <SecurityOutlinedIcon fontSize='large' />
                                <Typography variant='h3' gutterBottom>Privacy First</Typography>
                                <Typography variant='body2'>Our tool processes videos quickly in your browser, so you can get your work done without delays.</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Container>
    )
}
