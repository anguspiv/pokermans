import React from 'react';
import AppHeader from '../AppHeader';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}

export default PageLayout;
