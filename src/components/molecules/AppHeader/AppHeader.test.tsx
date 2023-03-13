import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { useSession as useSessionOrig } from 'next-auth/react';
import AppHeader, { AppHeaderProps } from './AppHeader';

jest.mock<typeof import('next-auth/react')>('next-auth/react', () => ({
  ...jest.requireActual<typeof import('next-auth/react')>('next-auth/react'),
  useSession: jest.fn(),
}));

interface AppHeaderContext {
  session?: object;
}

const useSession = useSessionOrig as jest.MockedFunction<typeof useSessionOrig>;

describe('<AppHeader />', () => {
  const setupAppHeader = (props: AppHeaderProps = {}, context: AppHeaderContext = {}) => {
    const { session } = context;

    useSession.mockClear().mockReturnValue({ data: null, status: 'loading', ...session });

    return render(<AppHeader {...props} />);
  };

  it('should render a header', () => {
    expect.assertions(1);

    setupAppHeader();

    const header = screen.getByTestId('app-header');

    expect(header).toBeInTheDocument();
  });

  it('should render a menu toggle', () => {
    expect.assertions(1);

    setupAppHeader();

    const menuButton = screen.getByRole('button', { name: /open menu/i });

    expect(menuButton).toBeInTheDocument();
  });

  it('should call the menuToggle function', () => {
    expect.assertions(1);

    const onToggle = jest.fn();

    setupAppHeader({
      onMenuToggle: onToggle,
    });

    const menuButton = screen.getByRole('button', { name: /open menu/i });

    fireEvent.click(menuButton);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should show the close button', () => {
    expect.assertions(1);

    setupAppHeader({ isMenuOpen: true });

    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
  });

  it('should render the app title', () => {
    expect.assertions(1);

    setupAppHeader();

    expect(screen.getByText('PokerMans')).toBeInTheDocument();
  });
});
