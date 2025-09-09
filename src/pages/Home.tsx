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
        <title>{APP_INFO.name} - Free Online Video, Audio & Image Editor Tools</title>
        <meta name="description" content="Professional browser-based media tools for free. Compress, convert, resize, trim, merge videos; extract audio, burn captions; edit audio files; convert images. No signup, no watermarks, private processing." />
        <meta name="keywords" content="video editor, audio editor, image converter, video compressor, video converter, audio converter, free online tools, video tools, audio tools" />
        <meta property="og:title" content={`${APP_INFO.name} - Free Online Video, Audio & Image Editor Tools`} />
        <meta property="og:description" content="Professional browser-based media tools for free. Compress, convert, resize, trim, merge videos; extract audio, burn captions; edit audio files; convert images. No signup, no watermarks, private processing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/" />
        <link rel="canonical" href="https://fileapps.click/" />
      </Helmet>
      <Container maxWidth="lg" sx={{ marginBlock: 'auto', py: 5 }}>
      <Box mb={4}>
        <Typography variant="h2" component="h1" gutterBottom align='center' fontWeight="bold"> Welcome to <span className='gradient-text-primary'>{APP_INFO.name}</span> </Typography>
        <Typography
          variant="body1"
          component="h2"
          fontWeight={400}
          color="text.secondary"
          align='center'
          marginInline="auto"
        >
          Professional browser-based media tools: compress, convert, resize, trim, merge videos with custom resolution & codecs; extract audio, burn captions, adjust playback speed; convert, trim, merge audio with bitrate control; edit & convert images — all free, private, no signup, no watermark, with local processing.
        </Typography>
      </Box>
      <Typography variant='h6' component="h3">Video Tools</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {videoTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.title}>
            <Link
              component={RouterLink}
              to={tool.link}
              underline="none"
              sx={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                background: theme.palette.action.selected,
              }}
              aria-label={tool.title}
            >
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" justifyContent="center" width={30} height={30} p={0.5} borderRadius={4}>{tool.icon}</Box>
                <Typography variant="subtitle1" color={tool.color} fontWeight="bold" ml={1}>{tool.title}</Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Typography variant='h6' component="h3">Audio Tools</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {audioTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.title}>
            <Link
              component={RouterLink}
              to={tool.link}
              underline="none"
              sx={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                background: theme.palette.action.selected,
              }}
              aria-label={tool.title}
            >
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" justifyContent="center" width={30} height={30} p={0.5} borderRadius={4}>{tool.icon}</Box>
                <Typography variant="subtitle1" color={tool.color} fontWeight="bold" ml={1}>{tool.title}</Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Typography variant='h6' component="h3">Image Tools</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Grid container spacing={2}>
        {imageTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.title}>
            <Link
              component={RouterLink}
              to={tool.link}
              underline="none"
              sx={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                background: theme.palette.action.selected,
              }}
              aria-label={tool.title}
            >
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" justifyContent="center" width={30} height={30} p={0.5} borderRadius={4}>{tool.icon}</Box>
                <Typography variant="subtitle1" color={tool.color} fontWeight="bold" ml={1}>{tool.title}</Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  )
}

export default Home
