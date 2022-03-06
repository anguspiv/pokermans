import React from 'react';
import { Container, Grid, GridItem, Text, Box } from '@chakra-ui/react';
import MenuButton from '@components/navigation/MenuButton';

export interface AppHeaderProps {
  isMenuOpen?: boolean;
  hideMenuButton?: boolean;
  onMenuToggle: () => void;
}

function AppHeader({ isMenuOpen, onMenuToggle, hideMenuButton }: AppHeaderProps) {
  return (
    <Box as="header" bg="teal.800" color="gray.200" data-testid="app-header">
      <Container maxW="container.xl" height="46">
        <Grid
          paddingY={1}
          alignContent="center"
          alignItems="center"
          templateRows="1fr"
          templateColumns="repeat(3, 1fr)"
          gap={2}
          templateAreas="'left center right'"
        >
          <GridItem minWidth="1.75em" gridArea="left" textAlign="left">
            {!hideMenuButton && <MenuButton isOpen={isMenuOpen} onClick={onMenuToggle} />}
          </GridItem>
          <GridItem gridArea="center" textAlign="center" alignContent="center">
            <Text fontSize="l" as="div" data-testid="app-title" fontWeight="bold">
              PokerMans
            </Text>
          </GridItem>
          <GridItem gridArea="right" textAlign="right" />
        </Grid>
      </Container>
    </Box>
  );
}

AppHeader.defaultProps = {
  isMenuOpen: false,
  hideMenuButton: false,
  onMenuToggle: () => {},
};

export default AppHeader;
