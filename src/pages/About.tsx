import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Typography variant="h1" gutterBottom>
        About
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="body1" mb={2}>
            Welcome to {APP_INFO.name}, a comprehensive platform dedicated to providing free and user-friendly tools for video compression and editing. Our mission is to empower users to efficiently manage and enhance their video content without any cost or technical barriers.
          </Typography>
          <Typography variant="body1">
            {APP_INFO.name} offers a suite of features designed to simplify the process of optimizing videos for various purposes, including sharing, storage, and professional editing. We are committed to maintaining high standards of quality, privacy, and accessibility for all our users.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default AboutUs
