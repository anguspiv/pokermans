import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { HStack, Link, Text, Box } from '@chakra-ui/react';

export interface NavLinkProps {
  href?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  icon?: IconProp;
  variant?: 'default' | 'transparent';
}

const variants = {
  default: {
    color: 'whiteAlpha.900',
    _hover: {
      bg: 'teal.500',
      color: 'whiteAlpha.900',
    },
    _activeLink: {
      color: 'whiteAlpha.900',
      fontWeight: 'bolder',
    },
  },
  transparent: {
    color: 'gray.600',
    _hover: {
      bg: 'transparent',
      color: 'gray.500',
    },
    _activeLink: {
      bg: 'transparent',
      color: 'gray.700',
    },
  },
};

function NavLink({ href = '#', label, children, icon, variant }: NavLinkProps) {
  const router = useRouter() ?? {};

  const isActive = router.asPath === href;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { color, _hover, _activeLink } = variants[variant ?? 'default'] || {};

  return (
    <NextLink href={href} passHref>
      <Link
        display="block"
        py={2}
        px={3}
        transition="all 0.3s"
        fontWeight="medium"
        lineHeight="1.5rem"
        aria-current={isActive ? 'page' : undefined}
        color={color}
        _hover={_hover}
        _activeLink={_activeLink}
      >
        <HStack spacing={4}>
          {!!icon && <Box width="1em">{icon && <FontAwesomeIcon icon={icon} data-testid="icon" />}</Box>}
          <Text as="span">{children || label}</Text>
        </HStack>
      </Link>
    </NextLink>
  );
}

NavLink.defaultProps = {
  href: '#',
  label: '',
  children: null,
  icon: null,
  variant: 'default',
};

export default NavLink;
