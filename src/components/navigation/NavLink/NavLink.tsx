import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { HStack, Link, Text, Box } from '@chakra-ui/react';

interface NavLinkProps {
  href?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  icon?: IconProp;
}

function NavLink({ href = '#', label, children, icon }: NavLinkProps) {
  const router = useRouter() ?? {};

  const isActive = router.asPath === href;

  return (
    <NextLink href={href} passHref>
      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <Link
        display="block"
        py={2}
        px={3}
        borderRadius="md"
        transition="all 0.3s"
        fontWeight="medium"
        lineHeight="1.5rem"
        aria-current={isActive ? 'page' : undefined}
        color="whiteAlpha.900"
        _hover={{
          bg: 'blue.500',
          color: 'white',
        }}
        _activeLink={{
          bg: 'blue.700',
          color: 'white',
        }}
      >
        <HStack spacing={4}>
          {!!icon && <Box width="1em">{icon && <FontAwesomeIcon icon={icon} data-testid="icon" />}</Box>}
          <Text as="span">{children || label}</Text>
        </HStack>
      </Link>

      {/* eslint-ensable jsx-a11y/anchor-is-valid */}
    </NextLink>
  );
}

NavLink.defaultProps = {
  href: '#',
  label: '',
  children: null,
  icon: null,
};

export default NavLink;
