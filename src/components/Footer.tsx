import { APP_INFO } from "../constants";

// Mui imports
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const FooterRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingInline: theme.spacing(2),
  width: '100%',
  height: 30,
  position: 'fixed',
  bottom: 0,
  zIndex: theme.zIndex.appBar,
}));

function Footer() {
  return (
    <FooterRoot>
      <Typography variant="body2" align="center"> {APP_INFO.name} &copy; {new Date().getFullYear()} </Typography>
      <Box display="flex">
        <Link color="text.secondary" href="/tos" underline="none"><Typography variant="body2">Terms of Service</Typography></Link>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Link color="text.secondary" href="/privacy" underline="none"><Typography variant="body2">Privacy Policy</Typography></Link>
      </Box>
    </FooterRoot>
  );
}

export default Footer;
