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
    <Container maxWidth="md" sx={{ my: 'auto' }}>
      <Typography variant="h1" gutterBottom>
        Contact Us
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="body1" mb={2}>
            Thank you for using {APP_INFO.name}. If you have any questions, feedback, or require support, please feel free to reach out to us.
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            We value your input and strive to provide the best possible experience. For all inquiries, please use the contact information below:
          </Typography>
          <Typography variant="body1" color="primary">
            Email: <Link color="primary" href="mailto:ayazullahburki@gmail.com">ayazullahburki@gmail.com</Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            Developed and maintained by Ayaz Ullah Burki.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Contact
