import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import AppMenu from '@components/navigation/AppMenu';
import NavLink from '@components/navigation/NavLink';

function SideBar() {
  const { status } = useSession();

  const isAuthed = status === 'authenticated';

  return (
    <Box data-testid="app-sidebar" bg="teal.800" width="240px" height="100vh" py={4} position="sticky" top="0">
      <Grid
        templateAreas="'header' 'body' 'footer'"
        templateRows="auto minmax(0, 1fr) auto"
        templateColumns="1fr"
        justifyContent="stretch"
        height="100%"
      >
        <GridItem gridArea="header" />
        <GridItem gridArea="body" overflowY="auto">
          <Box overflowY="auto" height="100%">
            <AppMenu />
          </Box>
        </GridItem>
        <GridItem gridArea="footer">
          <Flex borderTopWidth="thin" justifyContent="center">
            {!isAuthed && <NavLink href="/api/auth/signin" label="Login" />}
            {isAuthed && <NavLink href="/api/auth/signout" label="Logout" />}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default SideBar;
