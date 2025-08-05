import { Container, Typography } from '@mui/material';

function ThumbnailGenerator() {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Generate Thumbnail
      </Typography>
      <Typography>
        This tool will allow you to generate thumbnails from your videos. (Coming soon)
      </Typography>
    </Container>
  );
}

export default ThumbnailGenerator;
