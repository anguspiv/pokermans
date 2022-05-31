import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlayerListItem } from './PlayerListItem';

describe('<PlayerListItem />', () => {
  const setupPlayerListItem = (props) => {
    return render(<PlayerListItem {...props} />);
  };

  it('should render the player list item', () => {
    expect.assertions(1);

    setupPlayerListItem();

    expect(screen.getByTestId('player-list-item')).toBeInTheDocument();
  });

  it('should render the users first name', () => {
    expect.assertions(1);

    setupPlayerListItem({
      firstName: 'John',
    });

    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('should render the users nickname', () => {
    expect.assertions(1);

    setupPlayerListItem({
      nickname: 'Boat Face',
    });

    expect(screen.getByText(/Boat Face/)).toBeInTheDocument();
  });

  it('should render the last name', () => {
    expect.assertions(1);

    setupPlayerListItem({
      lastName: 'Doe',
    });

    expect(screen.getByText(/Doe/)).toBeInTheDocument();
  });

  it('should render the users avatar', () => {
    expect.assertions(1);

    setupPlayerListItem({
      image: 'https://picsum.photos/id/237/200/300',
    });

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should link to the user player', () => {
    expect.assertions(1);

    setupPlayerListItem({
      id: '123',
    });

    expect(screen.getByTestId('player-list-item')).toHaveAttribute('href', '/players/123');
  });
});
