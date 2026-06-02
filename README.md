# Contacts Book

A responsive Contacts Book Single Page Application built with React, TypeScript, Vite, Material UI, and Zustand.

The application allows users to create, view, update, delete, search, filter, and manage contacts entirely on the client side without a backend.

---

## Live Demo

Add deployment URL here:

`https://your-vercel-or-netlify-url.com`

---

## Repository

GitHub Repository:

`https://github.com/sakshi24022001/contacts-book`

---

## Features

### Contact List (Landing Page)

* Display all contacts in a sortable table/list
* Columns:

  * Name
  * Email
  * Phone
  * Company
  * Tags
* Real-time search across:

  * First Name
  * Last Name
  * Email
  * Company
* Multi-select tag filtering
* Sorting:

  * Name (A-Z)
  * Name (Z-A)
  * Date Added
* Empty state when no contacts exist
* Initial seeded contacts on first load

### Add / Edit Contact

* Shared reusable form component
* Create new contacts
* Edit existing contacts
* Validation using Zod:

  * First name is required
  * Valid email format
  * Valid phone format
  * Duplicate emails prevented
* Multi-select tags
* Notes field
* Unsaved changes detection

### Contact Detail Page

* Dedicated contact detail route
* Read-only contact information display
* Avatar initials generation
* Edit contact action
* Delete contact with confirmation dialog

### Responsive Design

* Desktop table layout
* Mobile-friendly card layout
* Optimized for:

  * Desktop (1280px+)
  * Mobile (375px+)

---

## Tech Stack

### Core

* React 19
* TypeScript (Strict Mode)
* Vite

### UI

* Material UI v5
* Emotion Styling
* DM Sans
* DM Serif Display

### Routing

* React Router

### Forms & Validation

* React Hook Form
* Zod
* Hook Form Resolvers

### State Management

* Zustand

### Testing

* Vitest
* React Testing Library
* Jest DOM

---

## Why Zustand?

I chose Zustand because:

* Minimal boilerplate compared to Redux
* Excellent TypeScript support
* Lightweight and performant
* Simple API for managing global contact state
* Easy persistence and local storage integration
* Suitable for medium-sized applications where Redux would be unnecessary

For this assignment, Zustand provided a clean balance between scalability and simplicity.

---

## Project Structure

```text
src
│
├── assets
│
├── components
│   ├── contacts
│   ├── filters
│   ├── layout
│   └── common
│
├── hooks
│   ├── useContactForm.ts
│   └── useContactsFilter.ts
│
├── pages
│   ├── ContactListPage.tsx
│   ├── AddContactPage.tsx
│   ├── EditContactPage.tsx
│   └── ContactDetailPage.tsx
│
├── store
│   └── contactsStore.ts
│
├── tests
│   ├── contactValidation.test.ts
│   ├── duplicateEmail.test.ts
│   └── contactsFilter.test.ts
│
├── theme
│   └── theme.ts
│
├── types
│   └── contact.ts
│
├── utils
│   ├── validation.ts
│   ├── contactHelpers.ts
│   └── seedContacts.ts
│
├── App.tsx
├── main.tsx
├── App.css
└── index.css
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/sakshi24022001/contacts-book.git

cd contacts-book
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will run at:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## Run Tests

```bash
npm run test
```

If using Vitest directly:

```bash
npx vitest
```

---

## Validation Rules

### First Name

* Required

### Email

* Required
* Must be valid email format
* Must be unique across all contacts

### Phone

* Required
* Must follow valid phone number format

---

## Unit Tests

The project includes tests covering:

### Contact Validation

* Required fields validation
* Email validation
* Phone validation

### Duplicate Email Validation

* Prevents creation of contacts with duplicate email addresses

### Search & Filter Logic

* Search by name
* Search by email
* Search by company
* Tag filtering behavior

---

## Accessibility & UX Considerations

* Keyboard-accessible form controls
* Clear validation feedback
* Confirmation before destructive actions
* Empty states for improved usability
* Responsive layouts for mobile and desktop

---

## Trade-offs / Shortcuts

Due to the assignment time constraints (2–3 hours):

* Data is stored only in client-side state
* No backend integration
* No authentication
* No server-side persistence
* Basic confirmation dialog implementation

These decisions allowed more focus on component architecture, state management, validation, and user experience.

---

## Future Improvements

With additional time, I would implement:

* Local Storage persistence
* Contact import/export functionality
* Pagination for large contact lists
* Advanced sorting options
* Contact grouping
* Dark mode support
* Contact profile images
* End-to-end testing
* Backend API integration
* Optimistic updates and caching

---

## Author

**Sakshi Balodiya**
