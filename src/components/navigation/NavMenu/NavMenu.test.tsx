import React from 'react';
import { render } from '@testing-library/react';
import NavMenu from './NavMenu';

describe('<NavMenu />', () => {
  const setupNavMenu = (props: object = {}) => {
    return render(<NavMenu {...props} />);
  };

  it('renders the app menu', () => {
    expect.assertions(1);

    const { getByTestId } = setupNavMenu();

    expect(getByTestId('nav-menu')).toBeInTheDocument();
  });

  it('renders the children', () => {
    expect.assertions(1);

    const children = <span>Example</span>;

    const { getByText } = setupNavMenu({ children });

    expect(getByText('Example')).toBeInTheDocument();
  });
});
