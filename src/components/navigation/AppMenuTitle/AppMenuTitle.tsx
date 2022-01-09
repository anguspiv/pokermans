import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

function AppMenuTitle(props: TextProps) {
  return (
    <Text
      casing="uppercase"
      fontSize="xs"
      fontWeight="semibold"
      letterSpacing="wide"
      paddingStart="3"
      color="gray.400"
      {...props}
    />
  );
}

export default AppMenuTitle;
