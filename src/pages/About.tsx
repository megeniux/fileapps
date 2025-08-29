import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About {APP_INFO.name} - Free Online Video, Audio & Image Editor</title>
        <meta name="description" content={`Learn about ${APP_INFO.name}, a comprehensive platform providing free video compression and editing tools. Professional media editing without cost or technical barriers.`} />
        <meta name="keywords" content={`about ${APP_INFO.name.toLowerCase()}, video editing platform, free video tools, video compression, media editing, online video editor`} />
        <meta property="og:title" content={`About ${APP_INFO.name} - Free Online Video, Audio & Image Editor`} />
        <meta property="og:description" content={`Learn about ${APP_INFO.name}, a comprehensive platform providing free video compression and editing tools. Professional media editing without cost or technical barriers.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/about" />
        <link rel="canonical" href="https://fileapps.click/about" />
      </Helmet>
      <Container maxWidth="md" sx={{ py: 2, my: 'auto' }}>
      <Typography variant="h2" component="h1" gutterBottom>
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
    </>
  )
}

export default AboutUs
