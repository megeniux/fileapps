import { useNavigate } from 'react-router-dom'
import { APP_INFO } from "../constants";

// MUI imports
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

// Icons
import CompressIcon from '@mui/icons-material/Compress';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ImageIcon from '@mui/icons-material/Image';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SpeedIcon from '@mui/icons-material/Speed';
import SubtitlesIcon from '@mui/icons-material/Subtitles';

const videoTools: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: "primary" | "secondary" | "warning" | "info" | "success" | "error" | "inherit";
}[] = [
    {
      title: 'Video Converter',
      description: 'Convert videos between MP4, WebM, MKV, MOV and more. Preserve quality and choose codecs, resolution and bitrate.',
      icon: <SwapHorizIcon fontSize="small" color="primary" />,
      link: '/tools/video/convert-video-online',
      color: 'primary'
    },
    {
      title: 'Compress Video',
      description: 'Reduce video file size while maintaining quality. Fast and easy compression for all your videos.',
      icon: <CompressIcon fontSize="small" color="secondary" />,
      link: '/tools/video/compress-video-online',
      color: 'secondary'
    },
    {
      title: 'Video Resizer',
      description: 'Resize videos to custom dimensions or common aspect ratios for web and social platforms.',
      icon: <AspectRatioIcon fontSize="small" color='warning' />,
      link: '/tools/video/resize-video-online',
      color: 'warning'
    },
    {
      title: 'Video Trimmer',
      description: 'Quickly trim and cut unwanted parts from videos with frame-accurate trimming.',
      icon: <ContentCutIcon fontSize="small" color="info" />,
      link: '/tools/video/trim-video-online',
      color: 'info'
    },
    {
      title: 'Video Merger',
      description: 'Combine multiple clips into a single video file while preserving order and quality.',
      icon: <MergeTypeIcon fontSize="small" color="success" />,
      link: '/tools/video/merge-videos-online',
      color: 'success'
    },
    {
      title: 'Video Playback Speed Editor',
      description: 'Change video playback speed from -20x (reverse) to +20x online. No watermark, no signup, 100% browser-based.',
      icon: <SpeedIcon fontSize="small" color="secondary" />,
      link: '/tools/video/video-playback-speed-editor',
      color: 'secondary'
    },
    {
      title: 'Extract Audio',
      description: 'Extract high-quality audio from video files and save as MP3, WAV or AAC for reuse.',
      icon: <MusicNoteIcon fontSize="small" color="error" />,
      link: '/tools/video/extract-audio',
      color: 'error'
    },
    {
      title: 'Thumbnail Generator',
      description: 'Capture clean, high-resolution thumbnails from video frames for previews and social sharing.',
      icon: <ImageIcon fontSize="small" color="inherit" />,
      link: '/tools/video/thumbnail',
      color: 'inherit'
    },
    {
      title: 'Extract Audio',
      description: 'Extract high-quality audio from video files and save as MP3, WAV or AAC for reuse.',
      icon: <MusicNoteIcon fontSize="small" color="error" />,
      link: '/tools/video/extract-audio-from-video',
      color: 'error'
    },
    {
      title: 'Burn Captions',
      description: 'Embed subtitles into video files (SRT/VTT). Customize font, size and color before burning in.',
      icon: <SubtitlesIcon fontSize="small" color="primary" />,
      link: '/tools/video/burn-captions-into-video-online',
      color: 'primary'
    },
    {
      title: 'Video Playback Speed',
      description: 'Speed up, slow down or reverse video playback and export the processed file at the chosen speed.',
      icon: <SpeedIcon fontSize="small" color="secondary" />,
      link: '/tools/video/playback',
      color: 'secondary'
    }

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
      description: 'Convert audio between MP3, WAV, AAC, FLAC and more. Keep bitrate and quality control options.',
      icon: <SwapHorizIcon fontSize="small" color="primary" />,
      link: '/tools/audio/convert-audio-online',
      color: 'primary'
    },
    {
      title: 'Audio Trimmer',
      description: 'Trim and cut audio files to extract clips for podcasts, music or voiceovers.',
      icon: <ContentCutIcon fontSize="small" color="secondary" />,
      link: '/tools/audio/trim-audio-online',
      color: 'secondary'
    },
    {
      title: 'Audio Merger',
      description: 'Join multiple audio tracks into one file quickly and reliably in your browser.',
      icon: <MergeTypeIcon fontSize="small" color="warning" />,
      link: '/tools/audio/merge-audio-online',
      color: 'warning'
    },
    {
      title: 'Audio Effects',
      description: 'Apply fades, normalization, pitch, speed and volume adjustments to audio files.',
      icon: <GraphicEqIcon fontSize="small" color="info" />,
      link: '/tools/audio/audio-effects-online',
      color: 'info'
    },
    {
      title: 'Audio Playback Speed',
      description: 'Change audio speed (with pitch correction) or reverse tracks. Export processed audio quickly.',
      icon: <SpeedIcon fontSize="small" color="success" />,
      link: '/tools/audio/audio-playback-speed-editor',
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
      description: 'Convert, resize and optimize images for web and social platforms. Adjust quality, crop and more.',
      icon: <SwapHorizIcon fontSize="small" color="primary" />,
      link: '/tools/image/convert',
      color: 'primary'
    },
  ];

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
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
          Explore our browser-based suite for video, audio and images: compress, convert, resize, trim, merge and adjust playback speed for videos; extract high-quality audio and generate thumbnails; burn captions into videos; convert, trim, merge and apply effects to audio; and convert, resize and optimize images — all fast, secure and privacy-first with no installs required.
        </Typography>
      </Box>
      <Typography variant='h6' component="h3">Video Tools</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {videoTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tool.title}>
            <Card sx={{ display: 'flex', height: '100%', alignItems: 'flex-start' }}>
              <CardActionArea onClick={() => navigate(tool.link)} sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Box display="flex" alignItems="center" justifyContent="center" width={30} height={30} p={0.5} borderRadius={4} sx={{ background: theme.palette.action.selected }}>{tool.icon}</Box>
                    <Typography variant="subtitle1" color={tool.color} fontWeight="bold" ml={1}>{tool.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">{tool.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant='h6' component="h3">Audio Tools</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {audioTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tool.title}>
            <Card sx={{ display: 'flex', height: '100%', alignItems: 'flex-start' }}>
              <CardActionArea onClick={() => navigate(tool.link)} sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Box width={30} height={30} p={0.5} borderRadius={4} sx={{ background: theme.palette.action.selected }}>{tool.icon}</Box>
                    <Typography variant="subtitle1" color={tool.color} fontWeight="bold" ml={1}>{tool.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">{tool.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant='h6' component="h3">Image Tools</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Grid container spacing={2}>
        {imageTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tool.title}>
            <Card sx={{ display: 'flex', height: '100%', alignItems: 'flex-start' }}>
              <CardActionArea onClick={() => navigate(tool.link)} sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Box width={30} height={30} p={0.5} borderRadius={4} sx={{ background: theme.palette.action.selected }}>{tool.icon}</Box>
                    <Typography variant="subtitle1" color={tool.color} fontWeight="bold" ml={1}>{tool.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">{tool.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
