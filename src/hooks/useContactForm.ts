import { useState, useCallback, useRef, useEffect } from 'react';
import type { ContactFormValues, ContactFormErrors, Contact } from '../types/contact';
import { validateContactForm } from '../utils/validation';
import { useContactsStore } from '../store/contactsStore';

const DEFAULT_VALUES: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  notes: '',
  tags: [],
};

interface UseContactFormOptions {
  initial?: Partial<ContactFormValues>;
  currentId?: string; // present when editing
}

export function useContactForm({ initial, currentId }: UseContactFormOptions = {}) {
  const contacts = useContactsStore((s) => s.contacts);
  const [values, setValues] = useState<ContactFormValues>({
    ...DEFAULT_VALUES,
    ...initial,
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});

  // Track original values to detect dirty state
  const originalRef = useRef<ContactFormValues>({ ...DEFAULT_VALUES, ...initial });
  const isDirty = JSON.stringify(values) !== JSON.stringify(originalRef.current);

  // Re-initialize when initial values change (e.g. contact loaded from store)
  useEffect(() => {
    const init = { ...DEFAULT_VALUES, ...initial };
    setValues(init);
    originalRef.current = init;
    setErrors({});
    setTouched({});
  }, [initial?.email]); // email is a stable unique key

  const handleChange = useCallback(
    (field: keyof ContactFormValues, value: ContactFormValues[typeof field]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setTouched((prev) => ({ ...prev, [field]: true }));
      // Clear field error on change
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof ContactFormErrors];
        return next;
      });
    },
    []
  );

  const handleBlur = useCallback((field: keyof ContactFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validate = useCallback((): boolean => {
    const existingEmails = contacts
      .filter((c: Contact) => c.id !== currentId)
      .map((c: Contact) => c.email);

    const errs = validateContactForm(values, existingEmails, currentId);
    setErrors(errs);
    // Mark all fields touched on submit attempt
    setTouched({ firstName: true, email: true, phone: true });
    return Object.keys(errs).length === 0;
  }, [values, contacts, currentId]);

  const reset = useCallback(() => {
    const init = { ...DEFAULT_VALUES, ...initial };
    setValues(init);
    setErrors({});
    setTouched({});
  }, [initial]);

  return {
    values,
    errors,
    touched,
    isDirty,
    handleChange,
    handleBlur,
    validate,
    reset,
  };
}
