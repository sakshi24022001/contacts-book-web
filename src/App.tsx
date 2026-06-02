import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AppLayout } from './components/layout/AppLayout';
import { ContactListPage } from './pages/ContactListPage';
import { ContactDetailPage } from './pages/ContactDetailPage';
import { CreateContactPage } from './pages/CreateContactPage';
import { EditContactPage } from './pages/EditContactPage';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-serif-display/400.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<ContactListPage />} />
            <Route path="/new" element={<CreateContactPage />} />
            <Route path="/contact/:id" element={<ContactDetailPage />} />
            <Route path="/contact/:id/edit" element={<EditContactPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
