import React from 'react';
import { Stack } from '@chakra-ui/react';

interface AppMenuProps {
  children?: React.ReactNode;
}

function AppMenu({ children }: AppMenuProps) {
  return (
    <Stack data-testid="app-menu" pb="6">
      {children}
    </Stack>
  );
}

AppMenu.defaultProps = {
  children: null,
};

export default AppMenu;
