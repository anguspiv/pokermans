import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Skeleton, ListItemAvatar } from '@mui/material';
import { PlayerListItem, PlayerListItemProps } from '@components/molecules/PlayerListItem';

export interface PlayerListProps {
  players?: PlayerListItemProps[];
  loading?: boolean;
}

export function PlayerList({ players = [], loading = false }: PlayerListProps) {
  return (
    <List data-testid="player-list">
      {!loading &&
        players.map(({ id, ...player }, index) => (
          <>
            {index > 0 && <Divider />}
            <PlayerListItem key={id} id={id} {...player} />
          </>
        ))}
      {!loading && !players.length && (
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h6" textAlign="center">
                No players found
              </Typography>
            }
          />
        </ListItem>
      )}
      {loading && (
        <ListItem>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText>
            <Skeleton aria-label="Loading..." />
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
}

export default PlayerList;
