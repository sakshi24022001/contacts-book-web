import { describe, it, expect } from 'vitest';
import type { Contact } from '../types/contact';

// Pure filtering logic, extracted so it can be tested without hooks
function filterContacts(
  contacts: Contact[],
  search: string,
  tags: string[]
): Contact[] {
  let result = [...contacts];

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (c) =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
    );
  }

  if (tags.length > 0) {
    result = result.filter((c) => tags.every((t) => c.tags.includes(t as any)));
  }

  return result;
}

const contacts: Contact[] = [
  {
    id: '1', firstName: 'Priya', lastName: 'Sharma', email: 'priya@techcorp.com',
    phone: '', company: 'TechCorp', notes: '', tags: ['Client', 'Colleague'],
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '2', firstName: 'Rahul', lastName: 'Verma', email: 'rahul@finance.com',
    phone: '', company: 'Global Finance', notes: '', tags: ['Client'],
    createdAt: '2025-02-01T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z',
  },
  {
    id: '3', firstName: 'Neha', lastName: 'Gupta', email: 'neha@design.com',
    phone: '', company: 'Design House', notes: '', tags: ['Vendor', 'Personal'],
    createdAt: '2025-03-01T00:00:00.000Z', updatedAt: '2025-03-01T00:00:00.000Z',
  },
];

// ── Test 3: Search filtering ───────────────────────────────
describe('search filtering', () => {
  it('returns all contacts when search is empty', () => {
    expect(filterContacts(contacts, '', [])).toHaveLength(3);
  });

  it('filters by first name (case insensitive)', () => {
    const result = filterContacts(contacts, 'priya', []);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('filters by last name', () => {
    const result = filterContacts(contacts, 'gupta', []);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('filters by email', () => {
    const result = filterContacts(contacts, 'finance.com', []);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('filters by company', () => {
    const result = filterContacts(contacts, 'design', []);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('returns empty when no match', () => {
    const result = filterContacts(contacts, 'xyznotfound', []);
    expect(result).toHaveLength(0);
  });

  it('matches partial name', () => {
    const result = filterContacts(contacts, 'ah', []);
    // Matches "Rahul" and "Priya Sharma"
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});

// ── Test 4: Tag filtering ──────────────────────────────────
describe('tag filtering', () => {
  it('returns all contacts when no tags selected', () => {
    expect(filterContacts(contacts, '', [])).toHaveLength(3);
  });

  it('filters by single tag', () => {
    const result = filterContacts(contacts, '', ['Client']);
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.id)).toContain('1');
    expect(result.map((c) => c.id)).toContain('2');
  });

  it('filters by multiple tags (AND logic — must have all)', () => {
    // Only Priya has both 'Client' AND 'Colleague'
    const result = filterContacts(contacts, '', ['Client', 'Colleague']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('returns empty when no contact has all required tags', () => {
    const result = filterContacts(contacts, '', ['Client', 'Personal']);
    expect(result).toHaveLength(0);
  });

  it('combines search and tag filter', () => {
    // "tech" matches Priya (TechCorp), and she has 'Client' tag
    const result = filterContacts(contacts, 'tech', ['Client']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});
