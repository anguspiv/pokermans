import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSession as useSessionOrig } from 'next-auth/react';
import AppHeader, { AppHeaderProps } from './AppHeader';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

interface AppHeaderContext {
  session?: object;
}

const useSession = useSessionOrig as jest.MockedFunction<typeof useSessionOrig>;

describe('<AppHeader />', () => {
  const setupAppHeader = (props: AppHeaderProps = {}, context: AppHeaderContext = {}) => {
    const { session } = context;

    useSession.mockClear().mockReturnValue({ data: null, status: null, ...session });

    return render(<AppHeader {...props} />);
  };

  it('should render a header', () => {
    expect.assertions(1);

    const { getByTestId } = setupAppHeader();

    const header = getByTestId('app-header');

    expect(header).toBeInTheDocument();
  });

  it('should render a menu toggle', () => {
    expect.assertions(1);

    const { getByTestId } = setupAppHeader();

    const menuButton = getByTestId('menu-button');

    expect(menuButton).toBeInTheDocument();
  });

  it('should call the menuToggle function', () => {
    expect.assertions(1);

    const onToggle = jest.fn();

    const { getByTestId } = setupAppHeader({
      onMenuToggle: onToggle,
    });

    const menuButton = getByTestId('menu-button');

    fireEvent.click(menuButton);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should hide the app drawer', () => {
    expect.assertions(1);

    const { queryByTestId } = setupAppHeader();

    expect(queryByTestId('app-drawer')).toBeNull();
  });

  it('should render the app title', () => {
    expect.assertions(1);

    const { getByText } = setupAppHeader();

    expect(getByText('PokerMans')).toBeInTheDocument();
  });
});
