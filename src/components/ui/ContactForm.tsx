import {
  Box, TextField, FormControl,
  InputLabel, Select, MenuItem, OutlinedInput,
  Checkbox, ListItemText,
} from '@mui/material';
import { ALL_TAGS } from '../../types/contact';
import type { TagLabel } from '../../types/contact';
import { useContactForm } from '../../hooks/useContactForm';
import { TagChip } from './TagChip';
import Grid from "@mui/material/Grid";
interface ContactFormProps {
  form: ReturnType<typeof useContactForm>;
  disabled?: boolean;
}

/**
 * ContactForm — fully controlled, reusable form component.
 * Used in both CreateContact and EditContact pages.
 * Receives form state from useContactForm hook — no local state.
 */
export function ContactForm({ form, disabled = false }: ContactFormProps) {
  const { values, errors, touched, handleChange, handleBlur } = form;

  return (
    <Box>
      <Grid container spacing={2.5}>
        {/* First Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name *"
            fullWidth
            value={values.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            error={touched.firstName && !!errors.firstName}
            helperText={touched.firstName && errors.firstName}
            disabled={disabled}
            inputProps={{
              maxLength: 50,
            }}
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            fullWidth
            value={values.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            disabled={disabled}
            inputProps={{
              maxLength: 50,
            }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email *"
            type="email"
            fullWidth
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={touched.email && (!!errors.email || !!errors.duplicate)}
            helperText={
              touched.email && (errors.email || errors.duplicate)
            }
            disabled={disabled}
            inputProps={{
              maxLength: 50,
            }}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            fullWidth
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            error={touched.phone && !!errors.phone}
            helperText={touched.phone && errors.phone}
            disabled={disabled}
            placeholder="+91 98765 43210"
             inputProps={{
              maxLength: 20,
            }}
          />
        </Grid>

        {/* Company */}
        <Grid item xs={12}>
          <TextField
            label="Company"
            fullWidth
            value={values.company}
            onChange={(e) => handleChange('company', e.target.value)}
            disabled={disabled}
             inputProps={{
              maxLength: 100,
            }}
          />
        </Grid>

        {/* Tags multi-select */}
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={values.tags}
              onChange={(e) => {
                const v = e.target.value as TagLabel[];
                handleChange('tags', v);
              }}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as TagLabel[]).map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </Box>
              )}
              disabled={disabled}
            >
              {ALL_TAGS.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={values.tags.includes(tag)} size="small" />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Notes */}
        <Grid item xs={12}>
          <TextField
            label="Notes"
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            value={values.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            disabled={disabled}
             inputProps={{
              maxLength: 100,
            }}
            helperText={`${values.notes.length}/500`}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
