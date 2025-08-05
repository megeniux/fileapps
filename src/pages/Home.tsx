import { Link } from 'react-router-dom'

// MUI imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

// Icons
import CompressIcon from '@mui/icons-material/Compress';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ImageIcon from '@mui/icons-material/Image';

const tools: {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  action: string;
  color: "primary" | "secondary" | "warning" | "info" | "success" | "error";
}[] = [
    {
      title: 'Compress Video',
      description: 'Reduce video file size while maintaining quality. Fast and easy compression for all your videos.',
      icon: <CompressIcon fontSize="large" color="primary" />,
      link: '/compress',
      action: 'Go to Compress',
      color: 'primary'
    },
    {
      title: 'Video Convert',
      description: 'Convert videos to different formats easily. Supports a wide range of formats for your convenience.',
      icon: <SwapHorizIcon fontSize="large" color="secondary" />,
      link: '/convert',
      action: 'Go to Convert',
      color: 'secondary'
    },
    {
      title: 'Trim Video',
      description: 'Cut unwanted parts from your video with precision. Simple trimming for quick edits.',
      icon: <ContentCutIcon fontSize="large" color="warning" />,
      link: '/trim',
      action: 'Go to Trim',
      color: 'warning'
    },
    {
      title: 'Merge Videos',
      description: 'Combine multiple videos into one seamlessly. Perfect for creating compilations.',
      icon: <MergeTypeIcon fontSize="large" color="info" />,
      link: '/merge',
      action: 'Go to Merge',
      color: 'info'
    },
    {
      title: 'Extract Audio',
      description: 'Extract audio tracks from your videos. Save audio as separate files easily.',
      icon: <MusicNoteIcon fontSize="large" color="success" />,
      link: '/extract-audio',
      action: 'Go to Extract Audio',
      color: 'success'
    },
    {
      title: 'Thumbnail Generator',
      description: 'Generate thumbnails from your videos for previews and sharing.',
      icon: <ImageIcon fontSize="large" color="error" />,
      link: '/thumbnail',
      action: 'Go to Thumbnail',
      color: 'error'
    }
  ];

function Home() {
  return (
    <Container maxWidth="lg" sx={{ marginBlock: 'auto' }}>
      <Typography variant="h3" align='center'> Welcome to the Video Tools Suite </Typography>
      <Typography variant="h6" color="text.secondary" align='center'> A collection of powerful tools to help you manage, compress, and optimize your videos. </Typography>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={{ sm: 2, md: 4 }}>
        {tools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={tool.title}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  {tool.icon}
                  <Typography color={tool.color} variant="h6" sx={{ ml: 1 }} gutterBottom>
                    {tool.title}
                  </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {tool.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button component={Link} to={tool.link} color={tool.color} variant="contained" size="small">
                  {tool.action}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
