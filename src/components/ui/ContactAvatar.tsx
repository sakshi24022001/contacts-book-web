import { Avatar, Tooltip } from '@mui/material';
import { getInitials, getAvatarColor } from '../../utils/validation';

interface ContactAvatarProps {
  firstName: string;
  lastName: string;
  size?: number;
  showTooltip?: boolean;
}

export function ContactAvatar({ firstName, lastName, size = 40, showTooltip = false }: ContactAvatarProps) {
  const initials = getInitials(firstName, lastName);
  const bg = getAvatarColor(`${firstName}${lastName}`);
  const fullName = `${firstName} ${lastName}`.trim();

  const avatar = (
    <Avatar
      sx={{
        width: size,
        height: size,
        bgcolor: bg,
        fontSize: size * 0.38,
        fontWeight: 700,
        letterSpacing: '0.02em',
      }}
    >
      {initials || '?'}
    </Avatar>
  );

  if (showTooltip) {
    return <Tooltip title={fullName}>{avatar}</Tooltip>;
  }
  return avatar;
}
