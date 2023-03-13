import { useDisclosure, useMediaQuery, Grid, GridItem, Box } from '@chakra-ui/react';
import AppDrawer from '@components/navigation/AppDrawer';
import { useEffect } from 'react';
import AppHeader from '@components/molecules/AppHeader';
import SideBar from '@components/layout/SideBar';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const [isDesktop] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onClose, onToggle } = useDisclosure({ id: 'app-drawer' });

  useEffect(() => {
    if (isDesktop) {
      onClose();
    }
  }, [isDesktop, onClose]);

  return (
    <Grid
      templateRows="auto 1fr auto"
      templateColumns="auto 1fr"
      templateAreas={{
        base: '"header header" "content content" "footer footer"',
        lg: '"sidebar header" "sidebar content" "sidebar footer"',
      }}
      minHeight="100vh"
    >
      <GridItem gridArea="header">
        {!isDesktop && (
          <>
            <AppHeader onMenuToggle={onToggle} isMenuOpen={isOpen && !isDesktop} />
            <AppDrawer isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </GridItem>
      <GridItem gridArea="sidebar">{isDesktop && <SideBar />}</GridItem>
      <GridItem gridArea="content">
        <Box maxWidth="3xl" marginX="auto" height="100%" px="2">
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
}

export default PageLayout;
