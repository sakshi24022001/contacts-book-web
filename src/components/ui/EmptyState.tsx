import { Box, Typography, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  type: 'no-contacts' | 'no-results';
}

export function EmptyState({ type }: EmptyStateProps) {
  const navigate = useNavigate();

  if (type === 'no-contacts') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 10,
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.12,
          }}
        />
        <PersonAddAlt1Icon sx={{ fontSize: 48, color: 'primary.main', mt: -11, opacity: 0.5 }} />
        <Typography variant="h5" fontWeight={600} color="text.primary" mt={1}>
          No contacts yet
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={280}>
          Your contacts book is empty. Add your first contact to get started.
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate('/new')}
          sx={{ mt: 1 }}
        >
          Add First Contact
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        gap: 1.5,
      }}
    >
      <SearchOffIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.4 }} />
      <Typography variant="h6" fontWeight={600} color="text.secondary">
        No results found
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Try adjusting your search or clearing the filters.
      </Typography>
    </Box>
  );
}
