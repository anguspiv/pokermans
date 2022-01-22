import React from 'react';
import { render } from '@testing-library/react';
import NavMenuTitle from './NavMenuTitle';

describe('<NavMenuTitle />', () => {
  const setupNavMenuTitle = (props: object = {}) => {
    return render(<NavMenuTitle {...props} />);
  };

  it('renders the title', () => {
    expect.assertions(1);

    const { getByText } = setupNavMenuTitle({ children: 'App' });

    expect(getByText('App')).toBeInTheDocument();
  });
});
