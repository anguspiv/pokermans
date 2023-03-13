import React from 'react';
import { AppBar, Typography, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export interface AppHeaderProps {
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
}

const OPEN_LABEL = 'Open Menu';
const CLOSE_LABEL = 'close menu';

function AppHeader({ isMenuOpen = false, onMenuToggle = () => {} }: AppHeaderProps) {
  return (
    <AppBar position="fixed" component="header" data-testid="app-header">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label={isMenuOpen ? CLOSE_LABEL : OPEN_LABEL}
          onClick={onMenuToggle}
          edge="start"
          data-testid="menu-button"
          sx={{ mr: 2 }}
        >
          {isMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          PokerMans
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
