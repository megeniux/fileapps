import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#845ec2',
      light: '#9c7ece',
      dark: '#5c4187',
    },
    secondary: {
      main: '#95417b',
      light: '#e08ac8',
      dark: '#de7dc0',
    },
  },
  typography: {
    htmlFontSize: window.innerWidth < 600 ? 18 : 16,
    fontFamily: `NataSans, Arial, sans-serif`,
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 'initial',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        size: 'small'
      },
      styleOverrides: {
        root: {
          minWidth: 80,
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        notched: true,
        size: 'small' as any,
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: 'small' as any,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small' as any,
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small' as any,
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small' as any,
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small' as any,
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: 'small' as any,
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
