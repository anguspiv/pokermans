import React from 'react';
import { render } from '@testing-library/react';
import AppMenuTitle from './AppMenuTitle';

describe('<AppMenuTitle />', () => {
  const setupAppMenuTitle = (props: object = {}) => {
    return render(<AppMenuTitle {...props} />);
  };

  it('renders the title', () => {
    expect.assertions(1);

    const { getByText } = setupAppMenuTitle({ children: 'App' });

    expect(getByText('App')).toBeInTheDocument();
  });
});
