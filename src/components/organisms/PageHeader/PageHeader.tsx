import React from 'react';
import { Typography, Box } from '@mui/material';
import Breadcrumbs from '../../molecules/Breadcrumbs';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbLabels?: { [key: string]: string };
}

function PageHeader({ title = '', subtitle = '', breadcrumbLabels = {} }: PageHeaderProps) {
  return (
    <Box component="header" sx={{ mb: 4 }}>
      <Breadcrumbs labels={breadcrumbLabels} />
      <Typography variant="h3" component="h1">
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="subtitle1" component="span">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
export default PageHeader;
