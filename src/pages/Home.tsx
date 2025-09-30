import ImageIcon from '@mui/icons-material/Image';
import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";
import { Link as RouterLink } from 'react-router-dom'

// MUI imports
import { alpha, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
// removed unused List and ListItem imports (we now use Grid for layout)
import ListItemText from '@mui/material/ListItemText';

// MUI Icons
import CompressIcon from '@mui/icons-material/Compress';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VideocamIcon from '@mui/icons-material/Videocam';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SpeedIcon from '@mui/icons-material/Speed';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

function Home() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>{APP_INFO.name} — Free Online Video, Audio & Image Tools with No Signup Required</title>
        <meta
          name="description"
          property='og:description'
          content={`${APP_INFO.name} offers private, browser-based tools to convert, compress, trim and edit video, audio and images locally on your device. No signup, no uploads, no watermarks.`}
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={`${APP_INFO.name} — Free Online Video, Audio & Image Tools with No Signup Required`} />
        <meta property="og:image" content="/images/branding/logo-small.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/" />
        <meta property="og:site_name" content={APP_INFO.name} />
        <link rel="canonical" href="https://fileapps.click/" />
      </Helmet>
      <section className='hero' style={{ background: `linear-gradient(180deg, ${alpha(theme.palette.grey[900], 0.25)} 0%, transparent 100%)` }}>
        <Container maxWidth="lg" sx={{ pt: 5, mt: 5 }}>
          <Grid container gap={4}>
            <Grid size={12}>
              <Typography variant="h1" component="h1" gutterBottom align='center' fontWeight={700}>Welcome to <span className='gradient-text-primary'>{APP_INFO.name}</span></Typography>
              <Typography variant="body1" component="p" color="text.secondary" align="center">
                {APP_INFO.name} provides a suite of fast, privacy-first media tools that run entirely in your browser. Convert and edit videos, audio and images locally—no uploads, no account, no watermark. Choose a tool below to get started instantly.
              </Typography>
            </Grid>
            <Grid container size={12} justifyContent="center" gap={2}>
              <Button component={RouterLink} to="/tools/video/convert" size='medium' variant="outlined" color="info">Start with Video</Button>
              <Button component={RouterLink} to="/tools/audio/convert" size='medium' variant="outlined" color="secondary">Start with Audio</Button>
              <Button component={RouterLink} to="/tools/image/convert" size='medium' variant="outlined" color="warning">Start with Images</Button>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className='features'>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 12 }} mb={4}>
              <Typography variant="h3" component="h2" gutterBottom align='center'>Why choose {APP_INFO.name}?</Typography>
              <Typography variant="body1" component="p" color="text.secondary" align="center">
                {APP_INFO.name} is designed to be fast, easy to use, and respectful of your privacy. Here are some of the key features that set us apart:
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight={600} align='center'>Privacy-first processing</Typography>
              <Typography variant="body1" color="text.secondary" align='center'>All processing happens locally in your browser. Files are not uploaded unless you explicitly choose to upload them.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight={600} align='center'>No signup or watermark</Typography>
              <Typography variant="body1" color="text.secondary" align='center'>Use the core tools without creating an account. Exported files are free of watermarks for standard usage.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight={600} align='center'>Broad format support</Typography>
              <Typography variant="body1" color="text.secondary" align='center'>Supports common video, audio and image formats depending on the browser's capabilities.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight={600} align='center'>Customizable settings</Typography>
              <Typography variant="body1" color="text.secondary" align='center'>Adjust encoding options like bitrate, resolution and codec to balance quality and file size.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight={600} align='center'>Completely free to use</Typography>
              <Typography variant="body1" color="text.secondary" align='center'>Access essential features at no cost. We display ads to support the service, but there are no hidden fees.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight={600} align='center'>Cross-platform compatibility</Typography>
              <Typography variant="body1" color="text.secondary" align='center'>Works on desktop and mobile browsers. Performance may vary based on device capabilities.</Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className='tools video' style={{ background: `linear-gradient(90deg, ${alpha(theme.palette.info.main, 0.25)} 0%, transparent 75%)` }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h3" component="h2" mb={3}><VideocamIcon fontSize="large" sx={{ mr: 1 }} />Video Tools</Typography>
              <Typography variant="body1" color="text.secondary">
                Our video toolset enables you to convert between popular container and codec formats, compress large video files while preserving visual quality, change resolution and frame rates for different platforms, trim and merge clips, and burn captions directly into your footage. All processing runs locally in the browser using modern Web APIs and WebAssembly-powered libraries so your files are not uploaded or stored on a server unless you explicitly choose to share them.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 4 }}>
                {videoTools.map((tool) => (
                  <Grid
                    key={tool.title}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <Link color="inherit" component={RouterLink} to={tool.link} underline="none" sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }} aria-label={tool.title}>
                      {tool.icon}
                      <ListItemText primary={tool.title} sx={{ ml: 1 }} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className='tools audio' style={{ background: `linear-gradient(270deg, ${alpha(theme.palette.primary.main, 0.25)} 0%, transparent 75%)` }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h3" component="h2" mb={3}><MusicNoteIcon fontSize="large" sx={{ mr: 1 }} />Audio Tools</Typography>
              <Typography variant="body1" color="text.secondary">
                The audio tools let you convert between MP3, WAV, AAC, FLAC and other formats, trim and merge tracks, adjust bitrate and apply simple effects such as fades and normalization. Exports can be tailored for streaming or high-quality archival use. Processing is performed entirely client-side to keep your audio private and fast, with controls for bitrate and encoding to help you balance size and fidelity.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 4 }}>
                {audioTools.map((tool) => (
                  <Grid
                    key={tool.title}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <Link color="inherit" component={RouterLink} to={tool.link} underline="none" sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }} aria-label={tool.title}>
                      {tool.icon}
                      <ListItemText primary={tool.title} sx={{ ml: 1 }} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className='tools image' style={{ background: `linear-gradient(90deg, ${alpha(theme.palette.warning.main, 0.25)} 0%, transparent 75%)` }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h3" component="h2" mb={3}><ImageIcon fontSize="large" sx={{ mr: 1 }} />Image Tools</Typography>
              <Typography variant="body1" color="text.secondary">
                Image tools support conversion between common image formats, resizing to custom dimensions, cropping, rotating and applying basic quality adjustments and filters. You can generate thumbnails from video frames, compress images for web delivery, and convert between JPG, PNG, WebP and GIF formats directly in your browser — all without uploading your images to a remote server.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 4 }}>
                {imageTools.map((tool) => (
                  <Grid
                    key={tool.title}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <Link color="inherit" component={RouterLink} to={tool.link} underline="none" sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }} aria-label={tool.title}>
                      {tool.icon}
                      <ListItemText primary={tool.title} sx={{ ml: 1 }} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className='faq'>
        <Container maxWidth="lg" sx={{ pt: 10 }}>
          <Typography variant="h3" component="h2" mb={3} align='center'>Frequently Asked Questions</Typography>
          {faqItems.map((item) => (
            <div key={item.question} style={{ marginBottom: '1.5rem' }}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>{item.question}</Typography>
              <Typography variant="body1" color="text.secondary">{item.answer}</Typography>
            </div>
          ))}
        </Container>
      </section>
      <section className='privacy' style={{ background: `linear-gradient(0deg, ${alpha(theme.palette.grey[900], 0.25)} 0%, transparent 100%)` }}>
        <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>Privacy is our priority</Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            We respect your privacy and are committed to protecting your personal data. All processing is done locally in your browser using WebAssembly and modern Web APIs. Your files are not uploaded to any server unless you explicitly choose to share them. We do not store or log any of your data.
          </Typography>
        </Container>
      </section>
    </>
  )
}

const faqItems: { question: string; answer: string | JSX.Element }[] = [
  {
    question: `Is ${APP_INFO.name} really free to use?`,
    answer: `${APP_INFO.name} offers a suite of core tools that are completely free to use without any signup or watermark. We display ads to support the service, but you can access all essential features at no cost.`
  },
  {
    question: `How does ${APP_INFO.name} protect my privacy?`,
    answer: `All processing is done locally in your browser using WebAssembly and modern Web APIs. Your files are not uploaded to any server unless you explicitly choose to share them. We do not store or log any of your data.`
  },
  {
    question: 'What video formats are supported?',
    answer: `We support a wide range of video formats including MP4, MOV, MKV, AVI, WebM and more. The exact formats available depend on your browser's capabilities.`
  },
  {
    question: `Can I use ${APP_INFO.name} on my mobile device?`,
    answer: `Yes! ${APP_INFO.name} is designed to work on both desktop and mobile browsers. However, performance may vary depending on your device's hardware and browser support for WebAssembly.`
  },
  {
    question: 'Are there any file size limits?',
    answer: `While there are no strict file size limits, performance may degrade with very large files due to browser memory constraints. For best results, we recommend using files under a few gigabytes.`
  },
  {
    question: 'What should I do if I encounter a bug or issue?',
    answer: <>If you experience any problems, please visit our <Link to="/about" underline="hover" component={RouterLink}>About Us</Link> page to find contact information and report the issue. We appreciate your feedback!</>
  }
];

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

export default Home
