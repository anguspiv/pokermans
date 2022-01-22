import React from 'react';
import { Stack } from '@chakra-ui/react';

interface NavMenuProps {
  children?: React.ReactNode;
}

function NavMenu({ children }: NavMenuProps) {
  return (
    <Stack data-testid="nav-menu" pb="6">
      {children}
    </Stack>
  );
}

NavMenu.defaultProps = {
  children: null,
};

export default NavMenu;
