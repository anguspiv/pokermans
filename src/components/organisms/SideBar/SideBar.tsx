import { Toolbar, Divider, Drawer, DrawerProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { AppMenu } from '@components/molecules/AppMenu';

interface SideBarProps extends DrawerProps {
  open?: boolean;
  onClose?: () => void;
}

export const DRAWER_WIDTH = 240;

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

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
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CloseButton onClick={onClose} aria-label="close menu" data-testid="sidebar-close-button">
          <CloseIcon />
        </CloseButton>
      </Toolbar>
      <Divider />
      <AppMenu />
    </Drawer>
  );
}

export default SideBar;
