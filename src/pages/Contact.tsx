import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';

function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact {APP_INFO.name} - Get Support for Video, Audio & Image Tools</title>
        <meta name="description" content={`Contact ${APP_INFO.name} for questions, feedback, or support. Reach out to our team for help with free video, audio, and image editing tools. Developer support available.`} />
        <meta name="keywords" content={`contact ${APP_INFO.name.toLowerCase()}, video tools support, audio editor help, image converter support, video editing assistance, customer support`} />
        <meta property="og:title" content={`Contact ${APP_INFO.name} - Get Support for Video, Audio & Image Tools`} />
        <meta property="og:description" content={`Contact ${APP_INFO.name} for questions, feedback, or support. Reach out to our team for help with free video, audio, and image editing tools. Developer support available.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://videotools.netlify.app/contact" />
        <link rel="canonical" href="https://videotools.netlify.app/contact" />
      </Helmet>
      <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Contact
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="body1">
            Thank you for using {APP_INFO.name}. If you have any questions, feedback, or require support, please feel free to reach out to us.
            We value your input and strive to provide the best possible experience.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Developed and maintained by Ayaz Ullah Burki.<br />
            For inquiries or support, please contact: <Link href="mailto:ayazullahburki@gmail.com">ayazullahburki@gmail.com</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </>
  )
}

export default Contact
