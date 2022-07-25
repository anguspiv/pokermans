import React from 'react';
import { render } from '@testing-library/react';
import { ProfileCard, ProfileCardProps } from './ProfileCard';

describe('<ProfileCard />', () => {
  const setupProfileCard = (props: ProfileCardProps = {}) => {
    return render(<ProfileCard {...props} />);
  };

  it('should render the profile card', () => {
    expect.assertions(1);

    const { getByTestId } = setupProfileCard();

    expect(getByTestId('profile-card')).toBeInTheDocument();
  });

  it('should render the users first name', () => {
    expect.assertions(1);

    const { getByText } = setupProfileCard({
      firstName: 'John',
    });

    expect(getByText('John')).toBeInTheDocument();
  });

  it('should render the users last name', () => {
    expect.assertions(1);

    const { getByText } = setupProfileCard({
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it('should render the users email', () => {
    expect.assertions(1);

    const email = 'john.doe@email.com';

    const { getByText } = setupProfileCard({
      email: 'john.doe@email.com',
    });

    expect(getByText(email)).toBeInTheDocument();
  });

  it('should render the users nick name', () => {
    expect.assertions(1);

    const { getByText } = setupProfileCard({
      nickname: 'jdoe',
    });

    expect(getByText('jdoe')).toBeInTheDocument();
  });

  it('should show the users initials', () => {
    expect.assertions(1);

    const { getByText } = setupProfileCard({
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(getByText('JD')).toBeInTheDocument();
  });
});
