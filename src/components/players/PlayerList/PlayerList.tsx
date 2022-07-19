import React from 'react';
import { Stack, Divider, Center, Spinner } from '@chakra-ui/react';
import logger from '@utils/logger';
import { PlayerListItem } from '../PlayerListItem';

export interface PlayerListProps {
  players: PlayerListItemProps[];
  loading?: boolean;
}

export function PlayerList({ players = [], loading = false }: PlayerListProps) {
  const ids = players.map(({ id }) => id);

  logger.debug('PlayerList', { ids });

  return (
    <Stack spacing={4} data-testid="player-list" divider={<Divider />}>
      {!loading && players.map(({ id, ...player }) => <PlayerListItem key={id} id={id} {...player} />)}
      {!loading && !players.length && (
        <Center color="gray.500" height="100%">
          No players found
        </Center>
      )}
      {loading && (
        <Center color="gray.500" height="100%">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
        </Center>
      )}
    </Stack>
  );
}

export default PlayerList;
