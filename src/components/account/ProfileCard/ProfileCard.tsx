import React from 'react';
import { Grid, GridItem, Heading, Text, Avatar } from '@chakra-ui/react';

export interface ProfileCardProps {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  email?: string;
  image?: string;
  bio?: string;
}

const styles = {
  nickname: {
    '&:before': {
      content: 'open-quote',
    },
    '&:after': {
      content: 'close-quote',
    },
  },
};
export function ProfileCard({
  firstName = '',
  lastName = '',
  nickname = '',
  email = '',
  image = '',
  bio = '',
}: ProfileCardProps) {
  return (
    <Grid
      bg="white"
      p={4}
      borderWidth="thin"
      borderRadius="lg"
      data-testid="profile-card"
      display="grid"
      gap={4}
      gridTemplateRows="auto"
      gridTemplateColumns="repeat(2, auto)"
      gridTemplateAreas="'avatar info'"
      alignItems="center"
      justifyContent="start"
      maxWidth={480}
    >
      <GridItem area="avatar">
        <Avatar name={`${firstName} ${lastName}`} size="xl" src={image} />
      </GridItem>
      <GridItem area="info">
        <Heading as="p" size="md" mb={2}>
          {firstName} {lastName}
        </Heading>
        {nickname && (
          <Heading as="p" size="sm" mb={2} sx={styles.nickname} fontStyle="oblique" color="gray.700">
            <Text as="span">{nickname}</Text>
          </Heading>
        )}
        <Text fontSize="sm" color="gray.500">
          {email}
        </Text>
        {bio && (
          <Text fontSize="sm" color="gray.500">
            {bio}
          </Text>
        )}
      </GridItem>
    </Grid>
  );
}

export default ProfileCard;
