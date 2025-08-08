import React from 'react';

// Components
import Header from './Header';
import Footer from './Footer';

// MUI imports
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

type BasicLayoutProps = {
  children: React.ReactNode;
};

const Root = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  '& > .main-container': {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 64px - 30px)', // Adjust based on Header and Footer height
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflowY: 'auto',
  }
}));

function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <Root>
      <Header />
      <Paper square elevation={0} className='main-container'>
        {children}
      </Paper>
      <Footer />
    </Root>
  );
}

export default BasicLayout;