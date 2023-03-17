import { NextRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { render, screen } from '@testing-library/react';
import { AccountLink } from './AccountLink';

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

describe('<AccountLink />', () => {
  const setupAccountLink = (props: object = {}, context: object = {}) => {
    const { session } = context;

    useSession.mockClear().mockReturnValue({ ...session });

    return render(<AccountLink {...props} />);
  };

  it('renders the AccountLink', () => {
    expect.assertions(1);

    setupAccountLink();

    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/api/auth/signin');
  });

  it('renders the AccountLink with logged in user', () => {
    expect.assertions(2);

    setupAccountLink(
      {},
      {
        session: {
          status: 'authenticated',
        },
      },
    );

    expect(screen.getByRole('link', { name: /John D\./i })).toHaveAttribute('href', '/account');
    expect(screen.getByRole('img', { name: 'John D.' })).toHaveAttribute('src', '/test.jpg');
  });
});
