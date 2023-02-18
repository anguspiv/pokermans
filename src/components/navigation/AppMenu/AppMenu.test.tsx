import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import AppMenu from './AppMenu';

jest.mock<typeof import('next/router')>('next/router', () => ({
  useRouter() {
    return {
      route: '/test',
      pathname: '',
      query: '',
      asPath: '/test',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

jest.mock<typeof import('next-auth/react')>('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock<typeof import('@apollo/client')>('@apollo/client', () => ({
  useQuery: jest.fn().mockReturnValue({ data: { profile: { firstName: 'John' } } }),
  gql: jest.fn(),
}));

describe('<AppMenu />', () => {
  const setupAppMenu = (props: object = {}, context: object = {}) => {
    const { session } = context;

    useSession.mockClear().mockReturnValue({ ...session });

    return render(<AppMenu {...props} />);
  };

  it('renders the app nav menu', () => {
    expect.assertions(1);

    const { getByRole } = setupAppMenu();

    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the app menu title', () => {
    expect.assertions(1);

    const { getByRole } = setupAppMenu();

    expect(getByRole('link', { name: 'PokerMans' })).toBeInTheDocument();
  });

  it('should use the default style', () => {
    expect.assertions(1);

    const { getByRole } = setupAppMenu();

    expect(getByRole('link', { name: 'PokerMans' })).toHaveStyle('background: var(--chakra-colors-blue-700);');
  });

  it('should use the transparent color scheme', () => {
    expect.assertions(1);

    const { getByRole } = setupAppMenu({ variant: 'transparent' });

    expect(getByRole('link', { name: 'PokerMans' })).toHaveStyle('color: var(--chakra-colors-gray-600)');
  });

  it('should render the User Menu', () => {
    expect.assertions(1);

    const { getByText } = setupAppMenu({});

    expect(getByText('User')).toBeInTheDocument();
  });

  it('should render the account link', () => {
    expect.assertions(1);

    const session = {
      status: 'authenticated',
    };

    const { getByRole } = setupAppMenu({}, { session });

    expect(getByRole('link', { name: 'Account' })).toHaveAttribute('href', '/account');
  });

  it('should render the players link', () => {
    expect.assertions(1);

    const session = {
      status: 'authenticated',
    };

    const { getByRole } = setupAppMenu({}, { session });

    expect(getByRole('link', { name: 'Players' })).toHaveAttribute('href', '/players');
  });
});
