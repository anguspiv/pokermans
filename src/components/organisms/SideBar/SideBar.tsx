import { Toolbar, Divider, Drawer, DrawerProps } from '@mui/material';
import { AppMenu } from '@components/molecules/AppMenu';

interface SideBarProps extends DrawerProps {
  open?: boolean;
  onClose?: () => void;
}

export const DRAWER_WIDTH = 240;

function SideBar({ open = false, onClose = () => {}, ...props }: SideBarProps) {
  return (
    <Drawer
      data-testid="app-sidebar"
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      {...props}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: (theme) => theme.palette.primary.dark,
          color: (theme) => theme.palette.primary.contrastText,
        },
        ...props.sx,
      }}
    >
      <Toolbar />
      <Divider />
      <AppMenu />
    </Drawer>
  );
}

export default SideBar;
