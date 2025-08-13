import { useNavigate } from 'react-router-dom'
import { APP_INFO } from "../constants";

// MUI imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      title: 'Change Speed',
      description: 'Adjust the playback speed of your audio files without changing the pitch.',
      icon: <SpeedIcon fontSize="small" color="success" />,
      link: '/audio-speed',
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
  return (
    <Container maxWidth="lg" sx={{ marginBlock: 'auto' }}>
      <Typography variant="h1" gutterBottom align='center'> Welcome to {APP_INFO.name} </Typography>
      <Typography variant="body2" component="h2" fontWeight={400} color="text.secondary" align='center'>{description}</Typography>
      <Divider sx={{ my: 4 }} />
      
      <Typography variant='h6' component="h3">Video Tools</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography color="text.primary" fontWeight="bold">Tool</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.primary" fontWeight="bold">Description</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videoTools.map((tool) => (
              <TableRow
                key={tool.title}
                hover
                sx={{ cursor: 'pointer', '& > .MuiTableCell-root': { borderColor: 'divider' }, '&:last-child > .MuiTableCell-root': { borderBottom: 0 } }}
                onClick={() => navigate(tool.link)}
              >
                <TableCell width={64}>{tool.icon}</TableCell>
                <TableCell width={200}>
                  <Typography color="text.primary" noWrap>{tool.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' color="text.secondary">{tool.description}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant='h6' component="h3">Audio Tools</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography color="text.primary" fontWeight="bold">Tool</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.primary" fontWeight="bold">Description</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audioTools.map((tool) => (
              <TableRow
                key={tool.title}
                hover
                sx={{ cursor: 'pointer', '& > .MuiTableCell-root': { borderColor: 'divider' }, '&:last-child > .MuiTableCell-root': { borderBottom: 0 } }}
                onClick={() => navigate(tool.link)}
              >
                <TableCell width={64}>{tool.icon}</TableCell>
                <TableCell width={200}>
                  <Typography color="text.primary" noWrap>{tool.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' color="text.secondary">{tool.description}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant='h6' component="h3">Image Tools</Typography>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography color="text.primary" fontWeight="bold">Tool</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.primary" fontWeight="bold">Description</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {imageTools.map((tool) => (
              <TableRow
                key={tool.title}
                hover
                sx={{ cursor: 'pointer', '& > .MuiTableCell-root': { borderColor: 'divider' }, '&:last-child > .MuiTableCell-root': { borderBottom: 0 } }}
                onClick={() => navigate(tool.link)}
              >
                <TableCell width={64}>{tool.icon}</TableCell>
                <TableCell width={200}>
                  <Typography color="text.primary" noWrap>{tool.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' color="text.secondary">{tool.description}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Home
