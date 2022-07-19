import React from 'react';
import { Stack, Divider } from '@chakra-ui/react';
import logger from '@utils/logger';
import { PlayerListItem } from '../PlayerListItem';

export interface PlayerListProps {
  players: PlayerListItemProps[];
}

export function PlayerList({ players = [] }: PlayerListProps) {
  const ids = players.map(({ id }) => id);

  logger.debug('PlayerList', { ids });

  return (
    <Stack spacing={4} data-testid="player-list" divider={<Divider />}>
      {players.map(({ id, ...player }) => (
        <PlayerListItem key={id} id={id} {...player} />
      ))}
    </Stack>
  );
}

export default PlayerList;
