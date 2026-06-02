export type TagLabel = 'Client' | 'Vendor' | 'Personal' | 'Colleague' | 'Friend' | 'Other';

export const ALL_TAGS: TagLabel[] = ['Client', 'Vendor', 'Personal', 'Colleague', 'Friend', 'Other'];

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  tags: TagLabel[];
  createdAt: string; // ISO date string
  updatedAt: string;
}

export type SortField = 'name' | 'dateAdded';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  search: string;
  tags: TagLabel[];
  sort: SortConfig;
}

// Form state type — all fields are strings for controlled inputs
export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  tags: TagLabel[];
}

export interface ContactFormErrors {
  firstName?: string;
  email?: string;
  phone?: string;
  duplicate?: string;
}
