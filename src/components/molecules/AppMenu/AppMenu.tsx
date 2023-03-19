import Link from 'next/link';
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getImageUrl } from '@utils/image';
import { getShortName } from '@utils/profile';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';

export const profileQuery = gql`
  query AccountLinkQuery {
    profile {
      firstName
      lastName
      avatar {
        filepath
      }
    }
  }
`;

export function AppMenu() {
  const { status } = useSession();
  const { data } = useQuery(profileQuery);

  const isAuthed = status === 'authenticated';
  const profile = data?.profile || {};

  const imgSrc = getImageUrl(profile?.avatar || {});
  const label = profile.firstName ? getShortName(profile || {}) : 'User';

  return (
    <Box data-testid="app-menu">
      <nav aria-label="account">
        <List>
          <ListItem disablePadding>
            {isAuthed ? (
              <ListItemButton href="/account" component={Link}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <Avatar alt={label} src={imgSrc} sx={{ width: 24, height: 24 }} />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            ) : (
              <ListItemButton href="/api/auth/signin" component={Link}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            )}
          </ListItem>
          {isAuthed && (
            <>
              <ListItem disablePadding>
                <ListItemButton href="/account" component={Link}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton href="/api/auth/signout" component={Link} alignItems="center">
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </nav>
      <nav aria-label="players">
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton href="/players" component={Link}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Players" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
