import React from 'react';
import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import AppDrawer from './AppDrawer';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn().mockReturnValue({ data: { profile: { firstName: 'John' } } }),
  gql: jest.fn(),
}));

describe('<AppDrawer />', () => {
  const setupAppDrawer = (props: object = {}, context: object = {}) => {
    const { session } = context;

    useSession.mockClear().mockReturnValue({ ...session });

    return render(<AppDrawer isOpen {...props} />);
  };

  it('renders the app nav menu', () => {
    expect.assertions(1);

    const { getByRole } = setupAppDrawer();

    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the app menu title', () => {
    expect.assertions(1);

    const { getByText } = setupAppDrawer();

    expect(getByText('Pokermans')).toBeInTheDocument();
  });

  it('should render the User Menu', () => {
    expect.assertions(1);

    const session = {
      status: 'authenticated',
    };

    const { getByText } = setupAppDrawer({}, { session });

    expect(getByText('User')).toBeInTheDocument();
  });

  it('should render the account link', () => {
    expect.assertions(2);

    const session = {
      status: 'authenticated',
    };

    const { getByText } = setupAppDrawer({}, { session });

    expect(getByText('Account')).toBeInTheDocument();
    expect(getByText('Account').closest('a')).toHaveAttribute('href', '/account');
  });

  it('should display a Login Link', () => {
    expect.assertions(3);

    const { getAllByText, queryByText } = setupAppDrawer();

    const loginLink = getAllByText('Login');

    expect(loginLink.length).toBeGreaterThan(0);
    expect(loginLink[loginLink.length - 1].closest('a')).toHaveAttribute('href', '/api/auth/signin');
    expect(queryByText('Logout')).toBeNull();
  });

  it('should display a Logout Link', () => {
    expect.assertions(3);

    const session = {
      status: 'authenticated',
    };

    const { getAllByText, queryByText } = setupAppDrawer({}, { session });

    const loginLink = getAllByText('Logout');

    expect(loginLink.length).toBeGreaterThan(0);
    expect(loginLink[loginLink.length - 1].closest('a')).toHaveAttribute('href', '/api/auth/signout');
    expect(queryByText('Login')).toBeNull();
  });

  it('should hide the app menu', () => {
    expect.assertions(1);

    const { queryByRole } = setupAppDrawer({ isOpen: false });

    expect(queryByRole('navigation')).toBeNull();
  });

  it('should call the onClose function', () => {
    expect.assertions(1);

    const onClose = jest.fn();

    const { queryByLabelText } = setupAppDrawer({ onClose });

    queryByLabelText('Close').click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
