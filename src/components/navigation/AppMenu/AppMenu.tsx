import { Box } from '@chakra-ui/react';
import { faHome, faUser, faSignOutAlt, faSignInAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { getImageUrl } from '@utils/image';
import NavMenu from '../NavMenu';
import NavLink from '../NavLink';
import NavMenuTitle from '../NavMenuTitle';
import NavMenuUser from '../NavMenuUser';

const profileQuery = gql`
  query GetNavProfile {
    profile {
      firstName
      lastName
      avatar {
        filepath
      }
    }
  }
`;

export interface AppMenuProps {
  variant?: 'default' | 'transparent';
}

const variants = {
  default: {
    bg: 'teal.800',
    color: 'teal.200',
  },
  transparent: {
    bg: 'transparent',
    color: 'teal.600',
  },
};

function AppMenu({ variant }: AppMenuProps) {
  const { status } = useSession();
  const { data } = useQuery(profileQuery);

  const profile = data?.profile || {};

  const isAuthed = status === 'authenticated';
  const { color, bg } = variants[variant ?? 'default'] || variants.default;

  return (
    <Box
      fontSize="sm"
      lineHeight="tall"
      as="nav"
      display="block"
      height="100%"
      color={color}
      bg={bg}
      data-testid="app-menu"
    >
      <NavMenu>
        <NavLink href="/" label="PokerMans" icon={faHome} variant={variant} />
      </NavMenu>
      <NavMenu>
        <NavMenuTitle>User</NavMenuTitle>
        {!isAuthed && <NavLink href="/api/auth/signin" label="Login" icon={faSignInAlt} />}
        {isAuthed && (
          <>
            <Link href="/account" passHref>
              <a>
                <NavMenuUser
                  image={getImageUrl(profile?.avatar || {})}
                  firstName={profile?.firstName}
                  lastName={profile?.lastName}
                />
              </a>
            </Link>
            <NavLink href="/account" label="Account" variant={variant} icon={faUser} />
            <NavLink href="/api/auth/signout" label="Logout" icon={faSignOutAlt} />
          </>
        )}
      </NavMenu>
      {isAuthed && (
        <NavMenu>
          <NavLink href="/players" label="Players" icon={faUsers} />
        </NavMenu>
      )}
    </Box>
  );
}

AppMenu.defaultProps = {
  variant: 'default',
};

export default AppMenu;
