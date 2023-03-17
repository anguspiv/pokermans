import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { AppMenu } from '@components/molecules/AppMenu';
import NavLink from '@components/atoms/NavLink';

export interface AppDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function AppDrawer({ isOpen = false, onClose = () => {} }: AppDrawerProps) {
  const { status } = useSession();

  const isAuthed = status === 'authenticated';

  return (
    <Drawer placement="left" isOpen={!!isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent color="gray.200" bg="teal.800" data-testid="app-drawer">
        <DrawerCloseButton />
        <DrawerHeader>Pokermans</DrawerHeader>
        <DrawerBody>
          <AppMenu />
        </DrawerBody>
        <DrawerFooter borderTopWidth="thin" justifyContent="center">
          {!isAuthed && <NavLink href="/api/auth/signin" label="Login" />}
          {isAuthed && <NavLink href="/api/auth/signout" label="Logout" />}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AppDrawer;
