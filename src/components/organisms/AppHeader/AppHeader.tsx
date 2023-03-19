import React from 'react';
import { AppBar, Typography, IconButton, Toolbar, Box, AppBarProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AccountLink } from '@components/molecules/AccountLink';
import Link from 'next/link';

export interface AppHeaderProps extends AppBarProps {
  open?: boolean;
  onMenuToggle?: () => void;
}

const OPEN_LABEL = 'Open Menu';
const CLOSE_LABEL = 'close menu';

function AppHeader({ open = false, onMenuToggle = () => {}, ...props }: AppHeaderProps) {
  return (
    <AppBar position="fixed" component="header" data-testid="app-header" {...props}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label={open ? CLOSE_LABEL : OPEN_LABEL}
            onClick={onMenuToggle}
            edge="start"
            data-testid="menu-button"
            sx={{ mr: 2 }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component={Link} href="/">
            PokerMans
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
          <AccountLink color="inherit" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
