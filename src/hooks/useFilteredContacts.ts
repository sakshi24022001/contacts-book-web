import { useMemo } from 'react';
import { useContactsStore } from '../store/contactsStore';
import type { Contact } from '../types/contact';

/**
 * useFilteredContacts
 *
 * Extracts all search, tag-filter, and sort logic from the component layer.
 * Returns only the filtered+sorted contacts, keeping components presentational.
 */
export function useFilteredContacts(): Contact[] {
  const contacts = useContactsStore((s) => s.contacts);
  const { search, tags, sort } = useContactsStore((s) => s.filters);

  return useMemo(() => {
    let result = [...contacts];

    // Text search: matches name, email, company
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)
      );
    }

    // Tag filter: contact must have ALL selected tags
    if (tags.length > 0) {
      result = result.filter((c) => tags.every((t) => c.tags.includes(t)));
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sort.field === 'name') {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        cmp = nameA.localeCompare(nameB);
      } else {
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sort.direction === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [contacts, search, tags, sort]);
}
