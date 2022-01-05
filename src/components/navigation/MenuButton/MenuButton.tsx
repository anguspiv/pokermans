import React from 'react';
import { Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

interface MenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

function MenuButton({ onClick, isOpen }: MenuButtonProps) {
  const title = isOpen ? 'Close Menu' : 'Open Menu';

  return (
    <Box
      data-testid="menu-button"
      as="button"
      minWidth="1.75em"
      type="button"
      rounded="md"
      p="1"
      fontSize="xl"
      color="gray.500"
      _hover={{
        bg: 'gray.100',
      }}
      onClick={onClick}
    >
      <Box srOnly>{title}</Box>
      <FontAwesomeIcon icon={isOpen ? faXmark : faBars} data-testid="menu-button-icon" />
    </Box>
  );
}

export default MenuButton;
