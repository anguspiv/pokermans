import React from 'react';
import NextLink from 'next/link';
import { Button, ButtonProps } from '@mui/material';

export interface NavLinkProps extends ButtonProps {
  href?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;

  icon?: React.ReactNode;

  component?: React.ElementType;
}

function NavLink({ href = '#', label, children, icon, ...props }: NavLinkProps) {
  return (
    <Button component={NextLink} href={href} startIcon={icon} {...props}>
      {children || label}
    </Button>
  );
}

NavLink.defaultProps = {
  href: '#',
  label: '',
  children: null,
  icon: null,
};

export default NavLink;
