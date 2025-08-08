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

const tools: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: "primary" | "secondary" | "warning" | "info" | "success" | "error" | "inherit";
}[] = [
    {
      title: 'Compress Video',
      description: 'Reduce video file size while maintaining quality. Fast and easy compression for all your videos.',
      icon: <CompressIcon fontSize="large" color="primary" />,
      link: '/compress',
      color: 'primary'
    },
    {
      title: 'Video Convert',
      description: 'Convert videos to different formats easily. Supports a wide range of formats for your convenience.',
      icon: <SwapHorizIcon fontSize="large" color="secondary" />,
      link: '/convert',
      color: 'secondary'
    },
    {
      title: 'Resize Video',
      description: 'Adjust video dimensions to fit your needs. Resize videos without losing quality.',
      icon: <AspectRatioIcon fontSize="large" color='inherit' />,
      link: '/resize',
      color: 'inherit'
    },
    {
      title: 'Trim Video',
      description: 'Cut unwanted parts from your video with precision. Simple trimming for quick edits.',
      icon: <ContentCutIcon fontSize="large" color="warning" />,
      link: '/trim',
      color: 'warning'
    },
    {
      title: 'Merge Videos',
      description: 'Combine multiple videos into one seamlessly. Perfect for creating compilations.',
      icon: <MergeTypeIcon fontSize="large" color="info" />,
      link: '/merge',
      color: 'info'
    },
    {
      title: 'Extract Audio',
      description: 'Extract audio tracks from your videos. Save audio as separate files easily.',
      icon: <MusicNoteIcon fontSize="large" color="success" />,
      link: '/extract-audio',
      color: 'success'
    },
    {
      title: 'Thumbnail Generator',
      description: 'Generate thumbnails from your videos for previews and sharing.',
      icon: <ImageIcon fontSize="large" color="error" />,
      link: '/thumbnail',
      color: 'error'
    }
  ];

function Home() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ marginBlock: 'auto' }}>
      <Typography variant="h1" gutterBottom align='center'> Welcome to {APP_INFO.name} </Typography>
      <Typography variant="h2" color="text.secondary" align='center'> A collection of powerful tools to help you manage, compress, and optimize your videos. </Typography>
      <Divider sx={{ my: 4 }} />
      <TableContainer component={Paper}>
        <Table>
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
            {tools.map((tool) => (
              <TableRow
                key={tool.title}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(tool.link)}
              >
                <TableCell width={64}>{tool.icon}</TableCell>
                <TableCell>
                  <Typography color="text.primary">{tool.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">{tool.description}</Typography>
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
