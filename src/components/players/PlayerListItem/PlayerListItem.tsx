import React from 'react';
import NextLink from 'next/link';
import { Stack, HStack, Text, Avatar } from '@chakra-ui/react';

export interface PlayerListItemProps extends Profile {
  image?: string;
}

export function PlayerListItem({ id, firstName, nickname, lastName, image }: PlayerListItemProps) {
  return (
    <NextLink href={`/players/${id}`} passHref>
      <Stack data-testid="player-list-item" as="a">
        <HStack>
          {image && <Avatar name={`${firstName} ${lastName}`} size="sm" src={image} mr={2} />}
          <HStack>
            {firstName && <Text fontSize="sm">{firstName}</Text>}
            {nickname && (
              <Text fontSize="sm" fontStyle="italic">
                &quot;{nickname}&quot;
              </Text>
            )}
            {lastName && <Text fontSize="sm">{lastName}</Text>}
          </HStack>
        </HStack>
      </Stack>
    </NextLink>
  );
}

export default PlayerListItem;
