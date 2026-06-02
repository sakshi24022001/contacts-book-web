import { Chip } from '@mui/material';
import type { TagLabel } from '../../types/contact';

const TAG_COLORS: Record<TagLabel, { bg: string; color: string }> = {
  Client:    { bg: '#EEF2FF', color: '#3730A3' },
  Vendor:    { bg: '#FEF3C7', color: '#92400E' },
  Personal:  { bg: '#FCE7F3', color: '#9D174D' },
  Colleague: { bg: '#D1FAE5', color: '#065F46' },
  Friend:    { bg: '#DBEAFE', color: '#1E40AF' },
  Other:     { bg: '#F3F4F6', color: '#374151' },
};

interface TagChipProps {
  tag: TagLabel;
  size?: 'small' | 'medium';
  onClick?: () => void;
  onDelete?: () => void;
  selected?: boolean;
}

export function TagChip({ tag, size = 'small', onClick, onDelete, selected }: TagChipProps) {
  const colors = TAG_COLORS[tag];
  return (
    <Chip
      label={tag}
      size={size}
      onClick={onClick}
      onDelete={onDelete}
      sx={{
        bgcolor: selected ? colors.color : colors.bg,
        color: selected ? '#fff' : colors.color,
        fontWeight: 600,
        fontSize: '0.7rem',
        height: size === 'small' ? 22 : 28,
        border: `1px solid ${colors.color}22`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        '&:hover': onClick
          ? {
              bgcolor: colors.color,
              color: '#fff',
              transform: 'translateY(-1px)',
            }
          : {},
        '& .MuiChip-deleteIcon': {
          color: selected ? '#ffffffaa' : `${colors.color}99`,
          '&:hover': { color: selected ? '#fff' : colors.color },
        },
      }}
    />
  );
}
