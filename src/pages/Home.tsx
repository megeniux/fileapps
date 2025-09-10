import ImageIcon from '@mui/icons-material/Image';
import { Helmet } from 'react-helmet-async';
// react-router Link used below
import { APP_INFO } from "../constants";

// MUI imports
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// MUI Icons
import CompressIcon from '@mui/icons-material/Compress';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SpeedIcon from '@mui/icons-material/Speed';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

const videoTools: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: "primary" | "secondary" | "warning" | "info" | "success" | "error" | "inherit";
}[] = [
    {
      title: 'Video Converter',
      description: 'Convert MP4, MOV, MKV, AVI, WebM & more locally in your browser. Change resolution, codec, bitrate & FPS — private, fast & watermark‑free.',
      icon: <SwapHorizIcon fontSize="small" color="primary" />,
      link: '/tools/video/convert',
      color: 'primary'
    },
    {
      title: 'Video Compressor',
      description: 'Reduce video file size without quality loss using local browser processing. Adjust CRF, bitrate & resolution — no uploads, no signup required.',
      icon: <CompressIcon fontSize="small" color="secondary" />,
      link: '/tools/video/compress',
      color: 'secondary'
    },
    {
      title: 'Video Resizer',
      description: 'Resize videos to custom dimensions or aspect ratios (16:9, 4:3, 1:1) for social media. Change resolution privately in your browser.',
      icon: <AspectRatioIcon fontSize="small" color='warning' />,
      link: '/tools/video/resize',
      color: 'warning'
    },
    {
      title: 'Video Trimmer',
      description: 'Trim and cut videos with frame-accurate precision. Remove unwanted parts locally — no watermark, no signup, 100% browser-based.',
      icon: <ContentCutIcon fontSize="small" color="info" />,
      link: '/tools/video/trim',
      color: 'info'
    },
    {
      title: 'Video Merger',
      description: 'Merge multiple video clips into one file while preserving quality. Combine videos locally in your browser — private & watermark-free.',
      icon: <MergeTypeIcon fontSize="small" color="success" />,
      link: '/tools/video/merge',
      color: 'success'
    },
    {
      title: 'Extract Audio from Video',
      description: 'Extract high-quality audio from videos and save as MP3, WAV, AAC, or FLAC. Local processing — no uploads, no watermark, no signup.',
      icon: <MusicNoteIcon fontSize="small" color="error" />,
      link: '/tools/video/extract-audio',
      color: 'error'
    },
    {
      title: 'Burn Captions into Video',
      description: 'Embed SRT/VTT subtitles permanently into video files. Customize font, size, color & position — private browser-based processing.',
      icon: <SubtitlesIcon fontSize="small" color="primary" />,
      link: '/tools/video/burn-captions',
      color: 'primary'
    },
    {
      title: 'Video Speed Editor',
      description: 'Change video speed from -20x (reverse) to +20x with pitch correction. Slow motion & time-lapse effects — no watermark, browser-based.',
      icon: <SpeedIcon fontSize="small" color="secondary" />,
      link: '/tools/video/playback',
      color: 'secondary'
    },
  ];

const audioTools: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: "primary" | "secondary" | "warning" | "info" | "success" | "error" | "inherit";
}[] = [
    {
      title: 'Audio Converter',
      description: 'Convert MP3, WAV, AAC, FLAC, OGG, M4A locally in your browser. Choose bitrate (128k–320k) or lossless — no uploads, no signup, no watermark.',
      icon: <SwapHorizIcon fontSize="small" color="primary" />,
      link: '/tools/audio/convert',
      color: 'primary'
    },
    {
      title: 'Audio Trimmer',
      description: 'Trim and cut audio files with precision timing for podcasts, music, or voiceovers. Local processing — private & watermark-free.',
      icon: <ContentCutIcon fontSize="small" color="secondary" />,
      link: '/tools/audio/trim',
      color: 'secondary'
    },
    {
      title: 'Audio Merger',
      description: 'Join multiple audio tracks into one file instantly. Combine MP3, WAV, AAC files in your browser — no uploads or signup required.',
      icon: <MergeTypeIcon fontSize="small" color="warning" />,
      link: '/tools/audio/merge',
      color: 'warning'
    },
    {
      title: 'Audio Effects',
      description: 'Apply fades, normalization, pitch adjustment, speed changes & volume control to audio files. Professional effects in your browser.',
      icon: <GraphicEqIcon fontSize="small" color="info" />,
      link: '/tools/audio/effects',
      color: 'info'
    },
    {
      title: 'Audio Speed Editor',
      description: 'Change audio speed with pitch correction or reverse tracks completely. Export processed audio with no watermark — 100% browser-based.',
      icon: <SpeedIcon fontSize="small" color="success" />,
      link: '/tools/audio/playback',
      color: 'success'
    }
  ];

const imageTools: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: "primary" | "secondary" | "warning" | "info" | "success" | "error" | "inherit";
}[] = [
    {
      title: 'Image Converter & Editor',
      description: 'Convert, resize, crop, rotate, and apply filters to JPG, PNG, WebP, GIF images. Local processing in your browser — fast, secure, no watermark.',
      icon: <ImageIcon fontSize="small" color="primary" />,
      link: '/tools/image/convert',
      color: 'primary'
    },
    {
      title: 'Thumbnail Generator',
      description: 'Extract high-quality thumbnails from videos instantly. Generate preview images in multiple sizes — no watermark, no signup required.',
      icon: <PhotoSizeSelectActualIcon fontSize="small" color="secondary" />,
      link: '/tools/image/thumbnail',
      color: 'secondary'
    },
  ];

function Home() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>{APP_INFO.name} — Browser-based Video, Audio & Image Tools</title>
        <meta name="description" content="{APP_INFO.name} offers private, browser-based tools to convert, compress, trim and edit video, audio and images locally on your device. No signup, no uploads, no watermarks." />
        <meta name="keywords" content="{APP_INFO.name}, video tools, audio tools, image editor, online editor, browser-based" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={`${APP_INFO.name} — Browser-based Video, Audio & Image Tools`} />
        <meta property="og:description" content="Private browser-based media utilities: convert, compress, trim, merge and edit files locally on your device." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/" />
        <link rel="canonical" href="https://fileapps.click/" />
      </Helmet>
      <Box pt={20} pb={15} bgcolor="action.hover">
        <Typography variant="h1" component="h1" gutterBottom align='center' fontWeight={700}>Welcome to <span className='gradient-text-primary'>{APP_INFO.name}</span></Typography>
        <Typography variant="body1" component="p" color="text.secondary" align="center" sx={{ maxWidth: 980, marginInline: 'auto' }}>
          {APP_INFO.name} provides a suite of fast, privacy-first media tools that run entirely in your browser. Convert and edit videos, audio and images locally—no uploads, no account, no watermark. Choose a tool below to get started instantly.
        </Typography>
        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          <Button component={RouterLink} to="/tools/video/convert" variant="contained" color="primary">Start with Video</Button>
          <Button component={RouterLink} to="/tools/audio/convert" variant="outlined" color="primary">Start with Audio</Button>
          <Button component={RouterLink} to="/tools/image/convert" variant="outlined" color="secondary">Start with Images</Button>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ pb: 15 }}>
        <Grid container spacing={4} sx={{ my: 10 }}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>Privacy-first processing</Typography>
            <Typography variant="body1" color="text.secondary">All processing happens locally in your browser. Files are not uploaded unless you explicitly choose to upload them.</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>No signup or watermark</Typography>
            <Typography variant="body1" color="text.secondary">Use the core tools without creating an account. Exported files are free of watermarks for standard usage.</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>Broad format support</Typography>
            <Typography variant="body1" color="text.secondary">Supports common video, audio and image formats depending on the browser's capabilities.</Typography>
          </Grid>
        </Grid>

        {/* Combined 3-column section: Video, Audio, Image */}
        <Grid container spacing={4} sx={{ mt: 10, mb: 5 }}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h5" component="h2" gutterBottom>Video tools</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Our video toolset enables you to convert between popular container and codec formats, compress large video files while preserving visual quality, change resolution and frame rates for different platforms, trim and merge clips, and burn captions directly into your footage. All processing runs locally in the browser using modern Web APIs and WebAssembly-powered libraries so your files are not uploaded or stored on a server unless you explicitly choose to share them.
            </Typography>
            <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {videoTools.map((tool) => (
                <ListItem key={tool.title} disableGutters sx={{ flex: '1 0 25%' }}>
                  <Link color="inherit" component={RouterLink} to={tool.link} underline="none" sx={{ display: 'flex', alignItems: 'center' }} aria-label={tool.title}>
                    <Box mr={1}>{tool.icon}</Box>
                    <ListItemText primary={tool.title} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h5" component="h2" gutterBottom>Audio tools</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The audio tools let you convert between MP3, WAV, AAC, FLAC and other formats, trim and merge tracks, adjust bitrate and apply simple effects such as fades and normalization. Exports can be tailored for streaming or high-quality archival use. Processing is performed entirely client-side to keep your audio private and fast, with controls for bitrate and encoding to help you balance size and fidelity.
            </Typography>
            <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {audioTools.map((tool) => (
                <ListItem key={tool.title} disableGutters sx={{ flex: '1 0 25%' }}>
                  <Link color="inherit" component={RouterLink} to={tool.link} underline="none" sx={{ display: 'flex', alignItems: 'center' }} aria-label={tool.title}>
                    <Box mr={1}>{tool.icon}</Box>
                    <ListItemText primary={tool.title} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h5" component="h2" gutterBottom>Image tools</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Image tools support conversion between common image formats, resizing to custom dimensions, cropping, rotating and applying basic quality adjustments and filters. You can generate thumbnails from video frames, compress images for web delivery, and convert between JPG, PNG, WebP and GIF formats directly in your browser — all without uploading your images to a remote server.
            </Typography>
            <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {imageTools.map((tool) => (
                <ListItem key={tool.title} disableGutters sx={{ flex: '1 0 25%' }}>
                  <Link color="inherit" component={RouterLink} to={tool.link} underline="none" sx={{ display: 'flex', alignItems: 'center' }} aria-label={tool.title}>
                    <Box mr={1}>{tool.icon}</Box>
                    <ListItemText primary={tool.title} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Box mt={6}>
          <Typography variant='h5' component="h2" gutterBottom>Frequently asked questions</Typography>
          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Do you upload or store my files?</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">No — by default files are processed locally in your browser and are not uploaded. You may choose to save or share exported files using your own device's dialogs.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Is this free to use?</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">Most core features are free. Some advanced operations may require additional browser resources or a future paid option; check individual tools for details.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>What formats are supported?</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">Common video (MP4, MOV, MKV, AVI, WebM), audio (MP3, WAV, AAC, FLAC) and image (JPG, PNG, WebP, GIF) formats are supported depending on browser capabilities.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>How do I contact support?</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">Use the Contact page to send feedback, report bugs or request features.</Typography>
            </AccordionDetails>
          </Accordion>
          <Box mt={4}>
            <Typography variant='h5' component="h2" gutterBottom fontWeight={600}>Privacy & data</Typography>
            <Typography variant="body2" color="text.secondary">We prioritize privacy. By default, files are processed locally and we do not collect or store media files. Read the full privacy policy for details.</Typography>
          </Box>
        </Box>

        <script type="application/ld+json">{`{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type": "Question", "name": "Do you upload or store my files?", "acceptedAnswer": {"@type": "Answer", "text": "No — by default files are processed locally in your browser and are not uploaded."}},
          {"@type": "Question", "name": "Is this free to use?", "acceptedAnswer": {"@type": "Answer", "text": "Most core features are free. Some advanced operations may vary by tool."}},
          {"@type": "Question", "name": "What formats are supported?", "acceptedAnswer": {"@type": "Answer", "text": "Common video, audio and image formats are supported depending on the browser."}}
        ]
      }`}</script>
      </Container>
    </>
  )
}

export default Home
