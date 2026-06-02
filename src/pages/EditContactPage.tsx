import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, Paper, Stack, Divider, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";
import { useContactForm } from '../hooks/useContactForm';
import { useContactsStore } from '../store/contactsStore';
import { ContactForm } from '../components/ui/ContactForm';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useEffect, useState } from 'react';
import type { ContactFormValues } from '../types/contact';
import { Typography } from '@mui/material';
export function EditContactPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, updateContact, deleteContact } = useContactsStore();
  const contact = contacts.find((c) => c.id === id);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);

  const initialValues: Partial<ContactFormValues> = contact
    ? {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        notes: contact.notes,
        tags: contact.tags,
      }
    : {};

  const form = useContactForm({ initial: initialValues, currentId: id });
  const { validate, isDirty, values } = form;

  // Warn on browser unload if dirty
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

  if (!contact) {
    return (
      <Box sx={{ maxWidth: 680, mx: 'auto' }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          Contact not found.{' '}
          <Button size="small" onClick={() => navigate('/')}>
            Back to list
          </Button>
        </Alert>
      </Box>
    );
  }

  const handleBack = () => {
    if (isDirty) {
      setShowLeaveDialog(true);
    } else {
      navigate(`/contact/${id}`);
    }
  };

  const handleSave = () => {
    if (!validate()) return;
    updateContact(id!, values);
    navigate(`/contact/${id}`);
  };

  const handleDelete = () => {
    deleteContact(id!);
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
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
            Edit Contact
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mt:0.5}}>
            {contact.firstName} {contact.lastName}
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{ p: { xs: 2.5, md: 3.5 }, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}
      >
        <ContactForm form={form} />

        <Divider sx={{ my: 3 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{gap:1.5}}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon  />}
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Contact
          </Button>
          <Stack direction="row" sx={{gap:1.5}}>
            <Button variant="outlined" color="inherit" onClick={handleBack}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Delete confirm */}
      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Contact"
        message={`Are you sure you want to delete ${contact.firstName} ${contact.lastName}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        dangerous
      />

      {/* Unsaved changes confirm */}
      <ConfirmDialog
        open={showLeaveDialog}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave? Your changes will be lost."
        confirmLabel="Leave"
        onConfirm={() => {
          setShowLeaveDialog(false);
          navigate(`/contact/${id}`);
        }}
        onCancel={() => setShowLeaveDialog(false)}
        dangerous
      />
    </Box>
  );
}
