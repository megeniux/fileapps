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
import CropIcon from '@mui/icons-material/Crop';
import FilterIcon from '@mui/icons-material/Filter';
import RotateRightIcon from '@mui/icons-material/RotateRight';

const videoTools: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: "primary" | "secondary" | "warning" | "info" | "success" | "error" | "inherit";
}[] = [
    {
      title: 'Compress Video',
      description: 'Reduce video file size while maintaining quality. Fast and easy compression for all your videos.',
      icon: <CompressIcon fontSize="small" color="primary" />,
      link: '/compress',
      color: 'primary'
    },
    {
      title: 'Video Convert',
      description: 'Convert videos to different formats easily. Supports a wide range of formats for your convenience.',
      icon: <SwapHorizIcon fontSize="small" color="secondary" />,
      link: '/convert',
      color: 'secondary'
    },
    {
      title: 'Resize Video',
      description: 'Adjust video dimensions to fit your needs. Resize videos without losing quality.',
      icon: <AspectRatioIcon fontSize="small" color='inherit' />,
      link: '/resize',
      color: 'inherit'
    },
    {
      title: 'Trim Video',
      description: 'Cut and trim video files to extract specific sections',
      icon: <ContentCutIcon fontSize="small" color="warning" />,
      link: '/trim',
      color: 'warning'
    },
    {
      title: 'Merge Videos',
      description: 'Combine multiple videos into one seamlessly. Perfect for creating compilations.',
      icon: <MergeTypeIcon fontSize="small" color="info" />,
      link: '/merge',
      color: 'info'
    },
    {
      title: 'Extract Audio',
      description: 'Extract audio tracks from your videos. Save audio as separate files easily.',
      icon: <MusicNoteIcon fontSize="small" color="success" />,
      link: '/extract-audio',
      color: 'success'
    },
    {
      title: 'Thumbnail Generator',
      description: 'Generate thumbnails from your videos for previews and sharing.',
      icon: <ImageIcon fontSize="small" color="error" />,
      link: '/thumbnail',
      color: 'error'
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
      title: 'Audio Convert',
      description: 'Convert audio files between different formats like MP3, WAV, AAC, FLAC, and more.',
      icon: <SwapHorizIcon fontSize="small" color="primary" />,
      link: '/audio-convert',
      color: 'primary'
    },
    {
      title: 'Audio Trim',
      description: 'Cut and trim audio files to extract specific sections.',
      icon: <ContentCutIcon fontSize="small" color="secondary" />,
      link: '/audio-trim',
      color: 'secondary'
    },
    {
      title: 'Audio Merge',
      description: 'Combine multiple audio files into a single track. Perfect for creating playlists or podcasts.',
      icon: <MergeTypeIcon fontSize="small" color="warning" />,
      link: '/audio-merge',
      color: 'warning'
    },
    {
      title: 'Audio Effects',
      description: 'Apply various effects to your audio files including fade in/out, normalize, and more.',
      icon: <GraphicEqIcon fontSize="small" color="info" />,
      link: '/audio-effects',
      color: 'info'
    },
    {
      title: 'Audio Playback',
      description: 'Adjust the playback speed of audio files without altering pitch. Speed up or slow down audio easily.',
      icon: <SpeedIcon fontSize="small" color="success" />,
      link: '/audio-playback',
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
      title: 'Image Resize',
      description: 'Resize images to specific dimensions while maintaining quality. Perfect for web and social media.',
      icon: <AspectRatioIcon fontSize="small" color="primary" />,
      link: '/image-resize',
      color: 'primary'
    },
    {
      title: 'Image Convert',
      description: 'Convert images between formats like JPG, PNG, WebP, and more with quality control.',
      icon: <SwapHorizIcon fontSize="small" color="secondary" />,
      link: '/image-convert',
      color: 'secondary'
    },
    {
      title: 'Image Crop',
      description: 'Crop images to remove unwanted areas or focus on specific parts of your photos.',
      icon: <CropIcon fontSize="small" color="warning" />,
      link: '/image-crop',
      color: 'warning'
    },
    {
      title: 'Image Filters',
      description: 'Apply various filters and effects to enhance your images or create artistic styles.',
      icon: <FilterIcon fontSize="small" color="info" />,
      link: '/image-filters',
      color: 'info'
    },
    {
      title: 'Image Rotate',
      description: 'Rotate and flip images to correct orientation or create mirror effects.',
      icon: <RotateRightIcon fontSize="small" color="success" />,
      link: '/image-rotate',
      color: 'success'
    }
  ];

// SEO-friendly description for the Home page
export const description = "Your all-in-one online suite for media. Compress, convert, trim, resize, merge, extract audio, and generate thumbnails quickly and securely in your browser.";

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ marginBlock: 'auto', py: 5 }}>
      <Box mb={4}>
        <Typography variant="h1" gutterBottom align='center' fontSize={42} fontWeight="bold"> Welcome to <span className='gradient-text-primary'>{APP_INFO.name}</span> </Typography>
        <Typography variant="body1" component="h2" fontWeight={400} color="text.secondary" align='center' marginInline="auto" maxWidth={660}>{description}</Typography>
      </Box>
      <Typography variant='h6' component="h3" gutterBottom>Video Tools</Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {videoTools.map((tool) => (
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

      <Typography variant='h6' component="h3" gutterBottom>Audio Tools</Typography>
      <Divider sx={{ my: 2 }} />
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

      <Typography variant='h6' component="h3" gutterBottom>Image Tools</Typography>
      <Divider sx={{ my: 2 }} />
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
