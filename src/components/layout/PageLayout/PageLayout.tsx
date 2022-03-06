import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import AppDrawer from '@components/navigation/AppDrawer';
import { useEffect } from 'react';
import AppHeader from '../AppHeader';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const [isDesktop] = useMediaQuery('(min-width: 980px)');
  const { isOpen, onClose, onToggle } = useDisclosure({ id: 'app-drawer' });

  useEffect(() => {
    if (isDesktop) {
      onClose();
    }
  }, [isDesktop, onClose]);

  return (
    <>
      <AppHeader onMenuToggle={onToggle} isMenuOpen={isOpen && !isDesktop} hideMenuButton={isDesktop} />
      {!isDesktop && <AppDrawer isOpen={isOpen} onClose={onClose} />}
      {children}
    </>
  );
}

export default PageLayout;
