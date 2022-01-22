import React from 'react';
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import NavMenu from '../NavMenu';
import NavLink from '../NavLink';
import NavMenuTitle from '../NavMenuTitle';

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
      <DrawerContent color="gray.200" bg="gray.800" data-testid="app-drawer">
        <DrawerCloseButton />
        <DrawerHeader>Pokermans</DrawerHeader>
        <DrawerBody>
          <Box fontSize="sm" lineHeight="tall" as="nav" display="block" height="100%">
            <NavMenu>
              <NavLink href="/" label="Home" icon={faHome} />
            </NavMenu>
            {isAuthed && (
              <NavMenu>
                <NavMenuTitle>User</NavMenuTitle>
                <NavLink href="/account" label="Account" />
              </NavMenu>
            )}
          </Box>
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
