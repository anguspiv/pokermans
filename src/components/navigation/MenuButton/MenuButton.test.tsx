import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MenuButton from './MenuButton';

describe('<MenuButton />', () => {
  const setupMenuButton = (props) => {
    return render(<MenuButton {...props} />);
  };

  it('should render the menu button', () => {
    expect.assertions(1);
    const { getByTestId } = setupMenuButton();
    const menuButton = getByTestId('menu-button');

    expect(menuButton).toBeInTheDocument();
  });

  it('should call the onClick handler', () => {
    expect.assertions(1);
    const onClick = jest.fn();
    const { getByTestId } = setupMenuButton({ onClick });
    const menuButton = getByTestId('menu-button');

    fireEvent.click(menuButton);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should show the close icon and text', () => {
    expect.assertions(2);

    const { getByText, getByTestId } = setupMenuButton({ isOpen: true });

    expect(getByText('Close Menu')).toBeInTheDocument();
    expect(getByTestId('menu-button-icon')).toHaveAttribute('data-icon', 'xmark');
  });

  it('should show the open icon and text', () => {
    expect.assertions(2);

    const { getByText, getByTestId } = setupMenuButton({ isOpen: false });

    expect(getByText('Open Menu')).toBeInTheDocument();
    expect(getByTestId('menu-button-icon')).toHaveAttribute('data-icon', 'bars');
  });
});
