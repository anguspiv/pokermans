import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface BreadcrumbsProps {
  homeLabel?: string;
}

const getPathLabel = (path: string) => {
  const pathParts = path.split('-');
  const pathLabel = pathParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

  return pathLabel;
};

function Breadcrumbs({ homeLabel = 'Home' }: BreadcrumbsProps) {
  const { pathname } = useRouter();

  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    const href = `/${paths.slice(0, index + 1).join('/')}`;

    return {
      label,
      href,
    };
  });

  return (
    <Breadcrumb data-testid="breadcrumbs">
      <BreadcrumbItem>
        <BreadcrumbLink href="/" as={Link}>
          {homeLabel}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {breadcrumbs.map(({ label, href }, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isCurrent = href === pathname;
        const title = getPathLabel(label);

        return (
          <BreadcrumbItem key={href} isCurrentPage={isCurrent} isLastChild={isLast}>
            {isCurrent ? (
              <Text color="gray.500">{title}</Text>
            ) : (
              <Link href={href} passHref>
                <BreadcrumbLink isCurrentPage={isCurrent}>{title}</BreadcrumbLink>
              </Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default Breadcrumbs;
