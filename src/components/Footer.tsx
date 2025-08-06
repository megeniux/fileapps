import { Link } from 'react-router-dom';
import { APP_INFO } from "../constants";

// Mui imports
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const FooterRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingInline: theme.spacing(2),
  height: 30,
  backgroundColor: theme.palette.divider,
  overflow: 'hidden',
}));

function Footer() {
  return (
    <FooterRoot>
      <Typography variant="body2" align="center">
        {APP_INFO.name} &copy; {new Date().getFullYear()}
      </Typography>

      <Box display="flex">
        <Button color="inherit" size='small' component={Link} to="/tos"> Terms of Service </Button>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Button color="inherit" size='small' component={Link} to="/privacy"> Privacy Policy </Button>
      </Box>
    </FooterRoot>
  );
}

export default Footer;
