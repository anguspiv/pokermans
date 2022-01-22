import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDisclosure } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import AppHeader from './AppHeader';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useDisclosure: jest.fn(),
}));

describe('<AppHeader />', () => {
  const onToggle = jest.fn();
  const onClose = jest.fn();

  const setupAppHeader = (props: object = {}, context: object = {}) => {
    const { disclosure, session } = context;

    useSession.mockClear().mockReturnValue({ ...session });

    onToggle.mockClear();

    useDisclosure.mockClear().mockReturnValue({
      isOpen: false,
      onToggle,
      onClose,
      ...disclosure,
    });

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

  it('should use the app drawer disclosure', () => {
    expect.assertions(1);

    setupAppHeader();

    expect(useDisclosure).toHaveBeenCalledWith({ id: 'app-drawer' });
  });

  it('should toggle the app drawer', () => {
    expect.assertions(1);

    const { getByTestId } = setupAppHeader();

    const menuButton = getByTestId('menu-button');

    fireEvent.click(menuButton);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should hide the app drawer', () => {
    expect.assertions(1);

    const { queryByTestId } = setupAppHeader();

    expect(queryByTestId('app-drawer')).toBeNull();
  });

  it('should display the app drawer', () => {
    expect.assertions(1);

    const { getByTestId } = setupAppHeader({}, { disclosure: { isOpen: true } });

    expect(getByTestId('app-drawer')).toBeInTheDocument();
  });

  it('should close the drawer', () => {
    expect.assertions(1);

    const { queryByLabelText } = setupAppHeader({}, { disclosure: { isOpen: true } });

    queryByLabelText('Close').click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should render the app title', () => {
    expect.assertions(1);

    const { getByText } = setupAppHeader();

    expect(getByText('Pokermans')).toBeInTheDocument();
  });
});
