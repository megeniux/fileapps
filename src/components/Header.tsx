import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { APP_INFO } from "../constants";

// Mui imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Icons
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  // Custom styles for the AppBar
}));

function Header() {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" onClick={() => navigate('/')} sx={{ flexGrow: 1, cursor: 'pointer' }}><MovieFilterIcon sx={{ fontSize: 26, mb: -0.75, mr: 0.5 }} /> {APP_INFO.name} </Typography>
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
