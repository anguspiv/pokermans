import React from 'react';
import { Container, Flex, Box, useDisclosure, Text } from '@chakra-ui/react';
import MenuButton from '../../navigation/MenuButton';
import AppDrawer from '../../navigation/AppDrawer';

function AppHeader() {
  const { isOpen, onToggle, onClose } = useDisclosure({ id: 'app-drawer' });

  return (
    <>
      <Container as="header" data-testid="app-header" background="transparent" maxW="container.xl">
        <Flex paddingY={1} justifyContent="space-between" alignContent="center" alignItems="center">
          <Box>
            <MenuButton isOpen={isOpen} onClick={onToggle} />
          </Box>
          <Box>
            <Text fontSize="l" as="div" data-testid="app-title">
              Pokermans
            </Text>
          </Box>
          <Box minWidth="1.75em" />
        </Flex>
      </Container>
      <AppDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default AppHeader;
