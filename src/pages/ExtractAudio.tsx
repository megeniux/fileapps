import { Container, Typography } from '@mui/material';

function ExtractAudio() {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Extract Audio
      </Typography>
      <Typography>
        This tool will allow you to extract audio from your video files. (Coming soon)
      </Typography>
    </Container>
  );
}

export default ExtractAudio;
