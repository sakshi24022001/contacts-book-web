import type { ContactFormValues, ContactFormErrors } from '../types/contact';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts formats: +91 98765 43210, 9876543210, (123) 456-7890, +1-800-555-0199
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,4}$/;

export function validateContactForm(
  values: ContactFormValues,
  existingEmails: string[],
  currentId?: string
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (values.phone.trim() && !PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  // Duplicate email check — skip current contact when editing
  const duplicate = existingEmails.find(
    (e) => e.toLowerCase() === values.email.trim().toLowerCase()
  );
  if (duplicate && !currentId) {
    errors.duplicate = 'A contact with this email already exists.';
  }

  return errors;
}

export function getInitials(firstName: string, lastName: string): string {
  const f = firstName.trim()[0] ?? '';
  const l = lastName.trim()[0] ?? '';
  return (f + l).toUpperCase();
}

export function getAvatarColor(name: string): string {
  const colors = [
    '#1565C0', '#283593', '#6A1B9A', '#AD1457',
    '#C62828', '#2E7D32', '#00695C', '#F9A825',
    '#E65100', '#4527A0',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function formatPhone(phone: string): string {
  return phone || '—';
}
