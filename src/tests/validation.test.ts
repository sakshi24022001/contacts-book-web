import { describe, it, expect } from 'vitest';
import { validateContactForm } from '../utils/validation';
import type { ContactFormValues } from '../types/contact';

const BASE_VALUES: ContactFormValues = {
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  company: 'TechCorp',
  notes: '',
  tags: [],
};

// ── Test 1: Form validation ────────────────────────────────
describe('validateContactForm', () => {
  it('returns no errors for valid input', () => {
    const errors = validateContactForm(BASE_VALUES, []);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('requires firstName', () => {
    const errors = validateContactForm({ ...BASE_VALUES, firstName: '' }, []);
    expect(errors.firstName).toBe('First name is required.');
  });

  it('requires email', () => {
    const errors = validateContactForm({ ...BASE_VALUES, email: '' }, []);
    expect(errors.email).toBe('Email is required.');
  });

  it('rejects invalid email format', () => {
    const errors = validateContactForm({ ...BASE_VALUES, email: 'not-an-email' }, []);
    expect(errors.email).toBe('Please enter a valid email address.');
  });

  it('accepts valid email with subdomain', () => {
    const errors = validateContactForm({ ...BASE_VALUES, email: 'user@sub.domain.com' }, []);
    expect(errors.email).toBeUndefined();
  });

  it('rejects invalid phone number', () => {
    const errors = validateContactForm({ ...BASE_VALUES, phone: 'not-a-phone' }, []);
    expect(errors.phone).toBe('Please enter a valid phone number.');
  });

  it('allows empty phone (optional field)', () => {
    const errors = validateContactForm({ ...BASE_VALUES, phone: '' }, []);
    expect(errors.phone).toBeUndefined();
  });

  it('accepts Indian phone format with country code', () => {
    const errors = validateContactForm({ ...BASE_VALUES, phone: '+91 98765 43210' }, []);
    expect(errors.phone).toBeUndefined();
  });
});

// ── Test 2: Duplicate email check ─────────────────────────
describe('duplicate email detection', () => {
  it('flags duplicate email when creating a new contact', () => {
    const existingEmails = ['priya@example.com', 'rahul@example.com'];
    const errors = validateContactForm(BASE_VALUES, existingEmails);
    expect(errors.duplicate).toBe('A contact with this email already exists.');
  });

  it('does not flag when editing own email (currentId provided)', () => {
    const existingEmails = ['priya@example.com'];
    // currentId matches, so we skip the duplicate check for this contact
    const errors = validateContactForm(BASE_VALUES, existingEmails, 'seed-1');
    expect(errors.duplicate).toBeUndefined();
  });

  it('flags duplicate even with different case', () => {
    const existingEmails = ['PRIYA@EXAMPLE.COM'];
    const errors = validateContactForm({ ...BASE_VALUES, email: 'priya@example.com' }, existingEmails);
    expect(errors.duplicate).toBe('A contact with this email already exists.');
  });

  it('does not flag when email is unique', () => {
    const existingEmails = ['someone@example.com', 'other@test.com'];
    const errors = validateContactForm(BASE_VALUES, existingEmails);
    expect(errors.duplicate).toBeUndefined();
  });
});
