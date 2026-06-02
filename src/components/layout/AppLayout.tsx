import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, useTheme } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Link } from 'react-router-dom';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #0D1642 0%, #1A237E 60%, #3949AB 100%)',
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        <Toolbar sx={{ gap: 1.5 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5,
              }}
            >
              <ImportContactsIcon sx={{ fontSize: 20, color: '#fff' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontWeight: 400,
                fontSize: '1.3rem',
                color: '#fff',
                letterSpacing: '-0.01em',
              }}
            >
              Contacts
            </Typography>
          </Link>
          <Box
            sx={{
              height: 20,
              width: 1,
              bgcolor: 'rgba(255,255,255,0.2)',
              mx: 0.5,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.65rem',
              fontWeight: 600,
            }}
          >
            Book
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}>
        {children}
      </Container>
    </Box>
  );
}
