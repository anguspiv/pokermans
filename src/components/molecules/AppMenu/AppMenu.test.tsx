import { screen, render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { AppMenu } from './AppMenu';

jest.mock<typeof import('next/router')>('next/router', () => ({
  ...jest.requireActual<typeof import('next/router')>('next/router'),
  useRouter: () =>
    ({
      asPath: '/',
    } as NextRouter),
}));

jest.mock<typeof import('next-auth/react')>('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock<typeof import('@apollo/client')>('@apollo/client', () => ({
  useQuery: jest.fn().mockReturnValue({
    data: { profile: { firstName: 'John', lastName: 'Doe', avatar: { filepath: 'test.jpg' } } },
  }),
  gql: jest.fn(),
}));

describe('<AppMenu />', () => {
  const setupAppMenu = (props: object = {}, context: object = {}) => {
    const { session } = context;

    useSession.mockClear().mockReturnValue({ ...session });

    return render(<AppMenu {...props} />);
  };

  it('renders the app menu', () => {
    expect.assertions(1);

    setupAppMenu();

    expect(screen.getByRole('navigation', { name: 'account' })).toBeInTheDocument();
  });

  it('should render the login link when not authenticated', () => {
    expect.assertions(1);

    setupAppMenu({}, { session: { status: 'unauthenticated' } });

    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
  });

  it('should render the user menu when authenticated', () => {
    expect.assertions(4);

    setupAppMenu({}, { session: { status: 'authenticated' } });

    expect(screen.getByRole('link', { name: /John D/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'John D.' })).toHaveAttribute('src', '/test.jpg');
    expect(screen.getByRole('link', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Logout' })).toBeInTheDocument();
  });

  it('should render the players nav menu', () => {
    expect.assertions(1);

    setupAppMenu({}, { session: { status: 'authenticated' } });

    expect(screen.getByRole('link', { name: 'Players' })).toBeInTheDocument();
  });
});
