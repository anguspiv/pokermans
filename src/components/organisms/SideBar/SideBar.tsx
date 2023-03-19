import { Toolbar, Divider, Drawer } from '@mui/material';
import { AppMenu } from '@components/molecules/AppMenu';

interface SideBarProps {
  open?: boolean;
  onClose?: () => void;
}

function SideBar({ open = false, onClose = () => {} }: SideBarProps) {
  return (
    <Drawer
      data-testid="app-sidebar"
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        },
      }}
      onClose={onClose}
    >
      <Toolbar />
      <Divider />
      <AppMenu />
    </Drawer>
  );
}

export default SideBar;
