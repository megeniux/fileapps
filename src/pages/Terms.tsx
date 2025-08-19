import { APP_INFO } from "../constants";

// MUI Imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function TOS() {
  return (
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Typography variant="h1" gutterBottom>
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
  )
}

export default TOS
