import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Paper, Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useContactForm } from '../hooks/useContactForm';
import { useContactsStore } from '../store/contactsStore';
import { ContactForm } from '../components/ui/ContactForm';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
export function CreateContactPage() {
  const navigate = useNavigate();
  const addContact = useContactsStore((s) => s.addContact);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [pendingNavigate, setPendingNavigate] = useState<string | null>(null);

  const form = useContactForm();
  const { validate, isDirty, values } = form;

  // Warn before browser navigation (refresh / close)
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const handleBack = () => {
    if (isDirty) {
      setShowLeaveDialog(true);
      setPendingNavigate('/');
    } else {
      navigate('/');
    }
  };

  const handleSave = () => {
    if (!validate()) return;
    const contact = addContact(values);
    navigate(`/contact/${contact.id}`, { state: { created: true } });
  };

  const handleConfirmLeave = () => {
    setShowLeaveDialog(false);
    if (pendingNavigate) navigate(pendingNavigate);
  };

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          color="inherit"
          sx={{ color: 'text.secondary', mr: 1 }}
        >
          Back
        </Button>
        <Box>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, color: 'primary.main', lineHeight: 1.1 }}
          >
            New Contact
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mt:0.5}}>
            Fill in the details below
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{ p: { xs: 2.5, md: 3.5 }, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}
      >
        <ContactForm form={form} />

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" sx={{gap:1.5}}>
          <Button variant="outlined" color="inherit" onClick={handleBack}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Contact
          </Button>
        </Stack>
      </Paper>

      <ConfirmDialog
        open={showLeaveDialog}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave? Your changes will be lost."
        confirmLabel="Leave"
        onConfirm={handleConfirmLeave}
        onCancel={() => setShowLeaveDialog(false)}
        dangerous
      />
    </Box>
  );
}
