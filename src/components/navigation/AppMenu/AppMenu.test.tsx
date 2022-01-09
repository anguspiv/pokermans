import React from 'react';
import { render } from '@testing-library/react';
import AppMenu from './AppMenu';

describe('<AppMenu />', () => {
  const setupAppMenu = (props: object = {}) => {
    return render(<AppMenu {...props} />);
  };

  it('renders the app menu', () => {
    expect.assertions(1);

    const { getByTestId } = setupAppMenu();

    expect(getByTestId('app-menu')).toBeInTheDocument();
  });

  it('renders the children', () => {
    expect.assertions(1);

    const children = <span>Example</span>;

    const { getByText } = setupAppMenu({ children });

    expect(getByText('Example')).toBeInTheDocument();
  });
});
