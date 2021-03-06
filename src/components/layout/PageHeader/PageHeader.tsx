import React from 'react';
import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import Breadcrumbs from '../../navigation/Breadcrumbs';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

function PageHeader({ title = '', subtitle = '' }: PageHeaderProps) {
  return (
    <Box as="header" p={4}>
      <Stack spacing={0}>
        <Box>
          <Breadcrumbs />
        </Box>
        <Box>
          <Heading as="h1" size="lg" mt={2}>
            {title}
          </Heading>
        </Box>
        {subtitle && (
          <Box>
            <Text as="span" fontSize="md" color="gray.600" mt={0}>
              {subtitle}
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
export default PageHeader;
