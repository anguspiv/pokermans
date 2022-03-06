import React from 'react';
import { render } from '@testing-library/react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NavLink from './NavLink';

jest.mock('next/router', () => ({
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

describe('<NavLink />', () => {
  const setupNavLink = (props: object = { label: 'Link' }) => {
    return render(<NavLink {...props} />);
  };

  it('renders the NavLink', () => {
    expect.assertions(1);

    const { getByRole } = setupNavLink();

    expect(getByRole('link')).toBeInTheDocument();
  });

  it('renders the NavLink with the correct href', () => {
    expect.assertions(1);

    const { getByRole } = setupNavLink({ href: '/' });

    expect(getByRole('link')).toHaveAttribute('href', '/');
  });

  it('should render the label', () => {
    expect.assertions(1);

    const { getByText } = setupNavLink({ label: 'Home' });

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('should render the children', () => {
    expect.assertions(1);

    const { getByText } = setupNavLink({ children: 'Home' });

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('should render the children over the label', () => {
    expect.assertions(2);

    const { queryByText, getByText } = setupNavLink({ children: 'Home', label: 'Nope' });

    expect(getByText('Home')).toBeInTheDocument();
    expect(queryByText('Nope')).toBeNull();
  });

  it('should display an icon', () => {
    expect.assertions(2);

    const { getByTestId } = setupNavLink({ icon: faBars });

    expect(getByTestId('icon')).toBeInTheDocument();
    expect(getByTestId('icon')).toHaveAttribute('data-icon', 'bars');
  });

  it('should set the link active', () => {
    expect.assertions(1);

    const { getByRole } = setupNavLink({ href: '/test' });

    expect(getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('should use the default style', () => {
    expect.assertions(1);

    const { getByRole } = setupNavLink({ href: '/test' });

    expect(getByRole('link')).toHaveStyle('background: var(--chakra-colors-blue-700);');
  });

  it('should use the transparent color scheme', () => {
    expect.assertions(1);

    const { getByRole } = setupNavLink({ href: '/test', variant: 'transparent' });

    expect(getByRole('link')).toHaveStyle('background-color: transparent');
  });
});
