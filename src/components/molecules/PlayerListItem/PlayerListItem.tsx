import React from 'react';
import NextLink from 'next/link';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export interface PlayerListItemProps extends Profile {
  image?: string;
}

export function PlayerListItem({ id, firstName, nickname, lastName, image }: PlayerListItemProps) {
  return (
    <ListItem
      button
      component={NextLink}
      href={`/players/${id}`}
      alignItems="flex-start"
      data-testid="player-list-item"
    >
      <ListItemAvatar>
        <Avatar alt={`${firstName} ${lastName}`} src={image} />
      </ListItemAvatar>
      <ListItemText primary={`${firstName} ${lastName}`} secondary={nickname} />
    </ListItem>
  );
}

export default PlayerListItem;
