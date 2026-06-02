import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Contact, ContactFormValues, FilterConfig, TagLabel } from '../types/contact';
import { seedContacts } from '../utils/seedData';

interface ContactsState {
  contacts: Contact[];
  filters: FilterConfig;

  // Actions
  addContact: (values: ContactFormValues) => Contact;
  updateContact: (id: string, values: ContactFormValues) => void;
  deleteContact: (id: string) => void;
  setSearch: (search: string) => void;
  toggleTag: (tag: TagLabel) => void;
  clearTags: () => void;
  setSortField: (field: 'name' | 'dateAdded') => void;
  toggleSortDirection: () => void;
}

export const useContactsStore = create<ContactsState>()(
  persist(
    (set, get) => ({
      contacts: seedContacts,
      filters: {
        search: '',
        tags: [],
        sort: { field: 'name', direction: 'asc' },
      },

      addContact: (values) => {
        const now = new Date().toISOString();
        const newContact: Contact = {
          id: uuidv4(),
          ...values,
          email: values.email.trim(),
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ contacts: [...state.contacts, newContact] }));
        return newContact;
      },

      updateContact: (id, values) => {
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === id
              ? { ...c, ...values, email: values.email.trim(), updatedAt: new Date().toISOString() }
              : c
          ),
        }));
      },

      deleteContact: (id) => {
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
        }));
      },

      setSearch: (search) => {
        set((state) => ({ filters: { ...state.filters, search } }));
      },

      toggleTag: (tag) => {
        const { filters } = get();
        const tags = filters.tags.includes(tag)
          ? filters.tags.filter((t) => t !== tag)
          : [...filters.tags, tag];
        set((state) => ({ filters: { ...state.filters, tags } }));
      },

      clearTags: () => {
        set((state) => ({ filters: { ...state.filters, tags: [] } }));
      },

      setSortField: (field) => {
        set((state) => ({
          filters: { ...state.filters, sort: { ...state.filters.sort, field } },
        }));
      },

      toggleSortDirection: () => {
        set((state) => ({
          filters: {
            ...state.filters,
            sort: {
              ...state.filters.sort,
              direction: state.filters.sort.direction === 'asc' ? 'desc' : 'asc',
            },
          },
        }));
      },
    }),
    {
      name: 'contacts-storage', // key in localStorage
    }
  )
);
