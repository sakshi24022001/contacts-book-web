import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Box, Button, Typography, Paper, Stack,
  Divider, Alert, Collapse,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useContactsStore } from '../store/contactsStore';
import { ContactAvatar } from '../components/ui/ContactAvatar';
import { TagChip } from '../components/ui/TagChip';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useState, useEffect } from 'react';

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
}) {
  if (!value) return null;
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: '#EEF2FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>
          {label}
        </Typography>
        {typeof value === 'string' ? (
          <Typography variant="body1" fontWeight={500} sx={{ wordBreak: 'break-all' }}>
            {value}
          </Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  );
}

export function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { contacts, deleteContact } = useContactsStore();
  const contact = contacts.find((c) => c.id === id);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(
    !!(location.state as { created?: boolean })?.created
  );

  // Auto-dismiss success alert
  useEffect(() => {
    if (showCreatedAlert) {
      const t = setTimeout(() => setShowCreatedAlert(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showCreatedAlert]);

  if (!contact) {
    return (
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          Contact not found.{' '}
          <Button size="small" onClick={() => navigate('/')}>
            Back to list
          </Button>
        </Alert>
      </Box>
    );
  }

  const handleDelete = () => {
    deleteContact(id!);
    navigate('/');
  };

  const createdDate = new Date(contact.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      {/* Success alert */}
      <Collapse in={showCreatedAlert}>
        <Alert
          icon={<CheckCircleIcon />}
          severity="success"
          sx={{ mb: 2, borderRadius: 2 }}
          onClose={() => setShowCreatedAlert(false)}
        >
          Contact created successfully!
        </Alert>
      </Collapse>

      {/* Back */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        color="inherit"
        sx={{ color: 'text.secondary', mb: 2 }}
      >
        All Contacts
      </Button>

      {/* Hero card */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        {/* Top banner */}
        <Box
          sx={{
            height: 72,
            background: 'linear-gradient(135deg, #0D1642 0%, #1A237E 60%, #3949AB 100%)',
          }}
        />

        {/* Avatar + name */}
        <Box sx={{ px: { xs: 2.5, md: 3.5 }, pb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mt: '-28px', mb: 2 }}>
            <Box
              sx={{
                border: '3px solid #fff',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <ContactAvatar firstName={contact.firstName} lastName={contact.lastName} size={72} />
            </Box>
            <Box sx={{ pb: 0.5 }}>
              <Typography variant="h4" fontWeight={700} lineHeight={1.1}>
                {contact.firstName} {contact.lastName}
              </Typography>
              {contact.company && (
                <Typography variant="body2" color="text.secondary" mt={0.25}>
                  {contact.company}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Tags */}
          {contact.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2.5 }}>
              {contact.tags.map((tag) => (
                <TagChip key={tag} tag={tag} size="medium" />
              ))}
            </Box>
          )}

          <Divider sx={{ mb: 3 }} />

          {/* Details grid */}
          <Stack spacing={2.5}>
            <DetailRow
              icon={<EmailIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
              label="Email"
              value={contact.email}
            />
            <DetailRow
              icon={<PhoneIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
              label="Phone"
              value={contact.phone}
            />
            <DetailRow
              icon={<BusinessIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
              label="Company"
              value={contact.company}
            />
            {contact.notes && (
              <DetailRow
                icon={<NotesIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
                label="Notes"
                value={
                  <Typography variant="body1" fontWeight={400} sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
                    {contact.notes}
                  </Typography>
                }
              />
            )}
            <DetailRow
              icon={<CalendarTodayIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
              label="Added"
              value={createdDate}
            />
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Actions */}
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1.5}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/contact/${id}/edit`)}
            >
              Edit Contact
            </Button>
          </Stack>
        </Box>
      </Paper>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Contact"
        message={`Are you sure you want to delete ${contact.firstName} ${contact.lastName}? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        dangerous
      />
    </Box>
  );
}
