import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('<Home/>', () => {
  it('renders correctly', () => {
    expect.assertions(1);

    render(<Home />);

    const heading = screen.getByRole('heading', { name: /welcome to next\.js!/i });

    expect(heading).toBeInTheDocument();
  });
});
