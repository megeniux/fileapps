import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)
