import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, BreadcrumbsProps as MuiBreadcrumbProps } from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export interface BreadcrumbsProps extends MuiBreadcrumbProps {
  homeLabel?: string;
  labels?: { [key: string]: string };
}

const getPathLabel = (path: string) => {
  const pathParts = path.split('-');
  const pathLabel = pathParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

  return pathLabel;
};

function Breadcrumbs({ homeLabel = 'Home', labels = {} }: BreadcrumbsProps) {
  const { asPath } = useRouter();

  const paths = asPath.split('/').filter(Boolean);

  return (
    <MuiBreadcrumbs data-testid="breadcrumbs" aria-label="breadcrumb">
      <Link href="/" component={NextLink} underline="hover" color="inherit">
        {homeLabel}
      </Link>
      {paths.map((path, index) => {
        const label = labels?.[path] || path.charAt(0).toUpperCase() + path.slice(1);
        const href = `/${paths.slice(0, index + 1).join('/')}`;

        const isCurrent = href === asPath;
        const title = getPathLabel(label);

        const crumb = isCurrent ? (
          <Typography color="text.primary" key={href}>
            {title}
          </Typography>
        ) : (
          <Link component={NextLink} href={href} key={href} underline="hover" color="inherit">
            {title}
          </Link>
        );

        return crumb;
      })}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
