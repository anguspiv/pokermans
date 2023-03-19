import { Box, AppBarProps, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import AppHeader from '@components/organisms/AppHeader';
import SideBar, { DRAWER_WIDTH } from '@components/organisms/SideBar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100vw',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(AppHeader, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  flex: '0 0 auto',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function PageLayout({ children }: PageLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar onMenuToggle={() => setIsDrawerOpen(!isDrawerOpen)} open={isDrawerOpen} />
      <SideBar open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <Main open={isDrawerOpen}>
        <Toolbar />
        <Box sx={{ p: 2, flexGrow: 1 }}>{children}</Box>
      </Main>
    </Box>
  );
}

export default PageLayout;
