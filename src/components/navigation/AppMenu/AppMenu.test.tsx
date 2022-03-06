import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import AppMenu from './AppMenu';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
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

  it('should not display the user menu', () => {
    expect.assertions(1);

    const { queryByText } = setupAppMenu();

    expect(queryByText('User')).toBeNull();
  });

  it('should render the User Menu', () => {
    expect.assertions(1);

    const session = {
      status: 'authenticated',
    };

    const { getByText } = setupAppMenu({}, { session });

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
});
