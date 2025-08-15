import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { APP_INFO } from "../constants";

// Mui imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

function Header() {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="fixed" color='default' elevation={3}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }}>
          <img src="/images/branding/logo-small.svg" alt={APP_INFO.name} height={25} style={{ marginRight: 4 }} />{APP_INFO.name}
        </Typography>
        {/* Navigation Links */}
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;
