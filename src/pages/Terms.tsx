import { Helmet } from 'react-helmet-async';
import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function TOS() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - FileApps Service Agreement</title>
        <meta name="description" content="FileApps terms and conditions: Browser-based platform providing free file editing tools. All processing is local, service provided as-is. User responsibilities and service terms." />
        <meta name="keywords" content="terms and conditions, service terms, user agreement, fileapps terms, video editor terms, file editing agreement" />
        <meta property="og:title" content="Terms and Conditions - FileApps Service Agreement" />
        <meta property="og:description" content="FileApps terms and conditions: Browser-based platform providing free file editing tools. All processing is local, service provided as-is. User responsibilities and service terms." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://videotools.netlify.app/terms" />
        <link rel="canonical" href="https://videotools.netlify.app/terms" />
      </Helmet>
      <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Terms and Conditions
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="body1" mb={2}>
            By accessing and using {APP_INFO.name}, you agree to the following terms and conditions. {APP_INFO.name} is a browser-based platform that provides free tools for files. All processing is performed locally on your device, and no files or personal data are stored or transmitted to our servers.
          </Typography>
          <Typography variant="body1" mb={2}>
            The service is provided "as is" and "as available." We do not guarantee the accuracy, reliability, or suitability of the tools for any particular purpose. You use {APP_INFO.name} at your own risk, and we are not responsible for any loss, damage, or consequences resulting from the use of our platform.
          </Typography>
          <Typography variant="body1" mb={2}>
            {APP_INFO.name} displays advertisements to support the service. These ads are managed by third-party providers and may use cookies or similar technologies. We do not control the content or data collection practices of these third parties.
          </Typography>
          <Typography variant="body1">
            By using {APP_INFO.name}, you acknowledge that you are solely responsible for your actions and any content processed through our tools. We disclaim all liability for any direct, indirect, incidental, or consequential damages arising from your use of the service.
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </>
  )
}

export default TOS
