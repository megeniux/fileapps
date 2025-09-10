import React from 'react';

// Components
import Header from './Header';
import Footer from './Footer';

// MUI imports
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

type BasicLayoutProps = {
  children: React.ReactNode;
};

const Root = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  '& > .main-container': {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    paddingTop: theme.spacing(3),
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