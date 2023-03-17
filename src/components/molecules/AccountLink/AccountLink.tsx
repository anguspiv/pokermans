import { useSession } from 'next-auth/react';
import { useQuery, gql } from '@apollo/client';
import { Avatar } from '@mui/material';
import NavLink, { NavLinkProps } from '@components/atoms/NavLink';
import { getShortName } from '@utils/profile';
import { getImageUrl } from '@utils/image';

export const profileQuery = gql`
  query AccountLinkQuery {
    profile {
      firstName
      lastName
      avatar {
        filepath
      }
    }
  }
`;

const LOGIN_LABEL = 'Login';

export function AccountLink(props: NavLinkProps) {
  const { status } = useSession();
  const { data } = useQuery(profileQuery);

  const isAuthed = status === 'authenticated';

  let label = LOGIN_LABEL;
  let href = '/api/auth/signin';
  let icon = null;

  if (isAuthed) {
    const profile = data?.profile || {};
    const imgSrc = getImageUrl(profile?.avatar || {});

    label = getShortName(profile);
    href = '/account';
    icon = <Avatar alt={label} src={imgSrc} />;
  }

  return <NavLink {...props} href={href} label={label} icon={icon} />;
}
