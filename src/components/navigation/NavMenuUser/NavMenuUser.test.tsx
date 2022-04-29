import React from 'react';
import { render } from '@testing-library/react';
import NavMenuUser from './NavMenuUser';

describe('<NavMenuUser />', () => {
  const setupNavMenuUser = (props) => {
    return render(<NavMenuUser {...props} />);
  };

  it('should render', () => {
    expect.assertions(1);
    const { container } = setupNavMenuUser();
    expect(container).toBeTruthy();
  });

  it('should render the first name and last initial', () => {
    expect.assertions(1);

    const firstName = 'John';
    const lastName = 'Doe';

    const { getByText } = setupNavMenuUser({
      firstName,
      lastName,
    });

    expect(getByText(`${firstName} ${lastName[0]}.`)).toBeInTheDocument();
  });
});
