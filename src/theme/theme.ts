import { createTheme } from '@mui/material/styles';

// Refined editorial theme: deep navy + warm amber accent, DM Sans + DM Serif Display
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1A237E', // Deep indigo
      light: '#3949AB',
      dark: '#0D1642',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F59E0B', // Warm amber
      light: '#FCD34D',
      dark: '#D97706',
      contrastText: '#1A237E',
    },
    background: {
      default: '#F5F5F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
    error: {
      main: '#DC2626',
    },
    success: {
      main: '#059669',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"DM Serif Display", Georgia, serif',
      fontWeight: 400,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"DM Serif Display", Georgia, serif',
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"DM Serif Display", Georgia, serif',
      fontWeight: 400,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    caption: {
      letterSpacing: '0.04em',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 20px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1A237E 0%, #3949AB 100%)',
          boxShadow: '0 2px 8px rgba(26,35,126,0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0D1642 0%, #1A237E 100%)',
            boxShadow: '0 4px 12px rgba(26,35,126,0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#6B7280',
          backgroundColor: '#F9FAFB',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
          fontSize: '0.85rem',
        },
      },
    },
  },
});
