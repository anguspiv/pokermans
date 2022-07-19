import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlayerList } from './PlayerList';

describe('<PlayerList />', () => {
  const setupPlayerList = (props) => {
    render(<PlayerList {...props} />);
  };

  it('should render', () => {
    expect.assertions(1);

    setupPlayerList();

    expect(screen.getByTestId('player-list')).toBeInTheDocument();
  });

  it('should render a list of players', () => {
    expect.assertions(1);

    setupPlayerList({
      players: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          nickname: 'River Boat Captain',
          image: 'https://picsum.photos/id/237/200/300',
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          nickname: 'River Boat Captain',
          image: 'https://picsum.photos/id/237/200/300',
        },
      ],
    });

    expect(screen.getAllByTestId('player-list-item')).toHaveLength(2);
  });

  it('should display an empty list message', () => {
    expect.assertions(1);

    setupPlayerList();

    expect(screen.getByText('No players found')).toBeInTheDocument();
  });

  it('should display a loading message', () => {
    expect.assertions(1);

    setupPlayerList({ loading: true });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
