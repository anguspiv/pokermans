import React from 'react';
import { render, screen } from '@testing-library/react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextRouter } from 'next/router';
import NavLink from './NavLink';

jest.mock<typeof import('next/router')>('next/router', () => ({
  ...jest.requireActual<typeof import('next/router')>('next/router'),
  useRouter: () =>
    ({
      asPath: '/',
    } as NextRouter),
}));

describe('<NavLink />', () => {
  const setupNavLink = (props: object = { label: 'Link' }) => {
    return render(<NavLink {...props} />);
  };

  it('renders the NavLink', () => {
    expect.assertions(1);

    setupNavLink();

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders the NavLink with the correct href', () => {
    expect.assertions(1);

    setupNavLink({ href: '/' });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('should render the label', () => {
    expect.assertions(1);

    setupNavLink({ label: 'Home' });

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('should render the children', () => {
    expect.assertions(1);

    setupNavLink({ children: 'Home' });

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should render the children over the label', () => {
    expect.assertions(2);

    setupNavLink({ children: 'Home', label: 'Nope' });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('Nope')).toBeNull();
  });

  it('should display an icon', () => {
    expect.assertions(2);

    const icon = <FontAwesomeIcon icon={faBars} data-testid="icon" />;

    setupNavLink({ icon });

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveAttribute('data-icon', 'bars');
  });
});
