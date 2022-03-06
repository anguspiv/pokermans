import { Box } from '@chakra-ui/react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import NavMenu from '../NavMenu';
import NavLink, { NavLinkProps } from '../NavLink';
import NavMenuTitle from '../NavMenuTitle';

export interface AppMenuProps {
  variant?: NavLinkProps.variant;
}

const variants = {
  default: {
    bg: 'teal.800',
    color: 'teal.200',
  },
  transparent: {
    bg: 'transparent',
    color: 'teal.600',
  },
};

function AppMenu({ variant }: AppMenuProps) {
  const { status } = useSession();

  const isAuthed = status === 'authenticated';
  const { color, bg } = variants[variant ?? 'default'] || variants.default;

  return (
    <Box
      fontSize="sm"
      lineHeight="tall"
      as="nav"
      display="block"
      height="100%"
      color={color}
      bg={bg}
      data-testid="app-menu"
    >
      <NavMenu>
        <NavLink href="/" label="PokerMans" icon={faHome} variant={variant} />
      </NavMenu>
      {isAuthed && (
        <NavMenu>
          <NavMenuTitle>User</NavMenuTitle>
          <NavLink href="/account" label="Account" variant={variant} />
        </NavMenu>
      )}
    </Box>
  );
}

AppMenu.defaultProps = {
  variant: 'default',
};

export default AppMenu;
