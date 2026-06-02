import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, InputAdornment, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Stack, IconButton, Chip,
  useMediaQuery, useTheme, Card, CardContent, CardActionArea, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useContactsStore } from '../store/contactsStore';
import { useFilteredContacts } from '../hooks/useFilteredContacts';
import { TagChip } from '../components/ui/TagChip';
import { ContactAvatar } from '../components/ui/ContactAvatar';
import { EmptyState } from '../components/ui/EmptyState';
import { ALL_TAGS } from '../types/contact';
export function ContactListPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { filters, setSearch, toggleTag, clearTags, setSortField, toggleSortDirection } =
    useContactsStore();
  const contacts = useContactsStore((s) => s.contacts);
  const filtered = useFilteredContacts();

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const handleSortChange = (_: React.MouseEvent<HTMLElement>, value: 'name' | 'dateAdded' | null) => {
    if (!value) return;
    if (value === filters.sort.field) {
      toggleSortDirection();
    } else {
      setSortField(value);
    }
  };

  const SortIcon = filters.sort.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              color: 'primary.main',
              lineHeight: 1.1,
            }}
          >
            All Contacts
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mt:0.5}}>
            {contacts.length} total · {filtered.length} shown
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/new')}
          sx={{ minWidth: 150, alignSelf: { xs: 'stretch', sm: 'auto' } }}
        >
          New Contact
        </Button>
      </Box>

      {/* Filters bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Stack spacing={2}>
          {/* Search */}
          <TextField
            placeholder="Search by name, email or company…"
            fullWidth
            size="small"
            value={filters.search}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: 'text.secondary',
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: filters.search ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearch('')}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
              },
            }}
          />

          {/* Tags + Sort row */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 0.5 }}>
              <FilterListIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight:600}}>
                Tags
              </Typography>
            </Box>
            {ALL_TAGS.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                selected={filters.tags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
            {filters.tags.length > 0 && (
              <Chip
                label="Clear"
                size="small"
                onDelete={clearTags}
                onClick={clearTags}
                variant="outlined"
                sx={{ fontSize: '0.7rem', height: 22 }}
              />
            )}

            <Box sx={{ ml: 'auto' }}>
              <ToggleButtonGroup
                size="small"
                exclusive
                value={filters.sort.field}
                onChange={handleSortChange}
                sx={{ '& .MuiToggleButton-root': { px: 1.5, py: 0.5, fontSize: '0.75rem', fontWeight: 600 } }}
              >
                <ToggleButton value="name">
                  <SortByAlphaIcon sx={{ fontSize: 15, mr: 0.5 }} />
                  Name
                  {filters.sort.field === 'name' && <SortIcon sx={{ fontSize: 13, ml: 0.5 }} />}
                </ToggleButton>
                <ToggleButton value="dateAdded">
                  <AccessTimeIcon sx={{ fontSize: 15, mr: 0.5 }} />
                  Date
                  {filters.sort.field === 'dateAdded' && <SortIcon sx={{ fontSize: 13, ml: 0.5 }} />}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* Contact list */}
      {contacts.length === 0 ? (
        <EmptyState type="no-contacts" />
      ) : filtered.length === 0 ? (
        <EmptyState type="no-results" />
      ) : isMobile ? (
        <MobileCardList contacts={filtered} />
      ) : (
        <DesktopTable contacts={filtered} />
      )}
    </Box>
  );
}

/* ── Desktop Table ─────────────────────────────────────── */
function DesktopTable({ contacts }: { contacts: ReturnType<typeof useFilteredContacts> }) {
  const navigate = useNavigate();
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, idx) => (
            <TableRow
              key={contact.id}
              hover
              onClick={() => navigate(`/contact/${contact.id}`)}
              sx={{
                cursor: 'pointer',
                '&:last-child td': { borderBottom: 0 },
                bgcolor: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.012)',
                transition: 'background 0.12s',
                '&:hover': { bgcolor: '#EEF2FF' },
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <ContactAvatar firstName={contact.firstName} lastName={contact.lastName} size={34} />
                  <Typography variant="body2" sx={{fontWeight:600}}>
                    {contact.firstName} {contact.lastName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {contact.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {contact.phone || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {contact.company || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {contact.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ── Mobile Cards ──────────────────────────────────────── */
function MobileCardList({ contacts }: { contacts: ReturnType<typeof useFilteredContacts> }) {
  const navigate = useNavigate();
  return (
    <Stack spacing={1.5}>
      {contacts.map((contact) => (
        <Card key={contact.id} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardActionArea onClick={() => navigate(`/contact/${contact.id}`)}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <ContactAvatar firstName={contact.firstName} lastName={contact.lastName} size={44} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body1" sx={{fontWeight:700}}  noWrap>
                    {contact.firstName} {contact.lastName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                    {contact.email}
                  </Typography>
                  {contact.company && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      sx={{ display: 'block' }}>
                      {contact.company}
                    </Typography>
                  )}
                  {contact.tags.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
                      {contact.tags.map((tag) => (
                        <TagChip key={tag} tag={tag} />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}
