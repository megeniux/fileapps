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
        <title>Terms and Conditions - {APP_INFO.name} Service Agreement</title>
        <meta name="description" content={`${APP_INFO.name} terms and conditions: Browser-based platform providing free file editing tools. All processing is local, service provided as-is. User responsibilities and service terms.`} />
        <meta name="keywords" content={`terms and conditions, service terms, user agreement, ${APP_INFO.name.toLowerCase()} terms, video editor terms, file editing agreement`} />
        <meta property="og:title" content={`Terms and Conditions - ${APP_INFO.name} Service Agreement`} />
        <meta property="og:description" content={`${APP_INFO.name} terms and conditions: Browser-based platform providing free file editing tools. All processing is local, service provided as-is. User responsibilities and service terms.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fileapps.click/terms" />
        <link rel="canonical" href="https://fileapps.click/terms" />
      </Helmet>
      <Container maxWidth="md" sx={{ py: 2, my: 'auto' }}>
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
            {APP_INFO.name} displays advertisements provided by Google AdSense and other third-party advertising networks to support our free service. These advertisements are clearly marked and may be personalized based on your interests. By using our service, you consent to the display of these advertisements and the data collection practices described in our Privacy Policy.
          </Typography>
          <Typography variant="body1" mb={2}>
            We do not control the content of third-party advertisements and are not responsible for the products, services, or claims made in such advertisements. Any transactions or interactions with advertisers are solely between you and the advertiser.
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
