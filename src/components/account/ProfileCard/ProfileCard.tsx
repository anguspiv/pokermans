import React from 'react';
import { Grid, GridItem, Heading, Text, Avatar } from '@chakra-ui/react';

export interface ProfileCardProps {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  email?: string;
  image?: string;
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
      templateRows="auto"
      templateColumns="repeat(2, auto)"
      alignItems="center"
      justifyContent="start"
      maxWidth={480}
    >
      <Avatar name={`${firstName} ${lastName}`} size="xl" src={image} />
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
      </GridItem>
    </Grid>
  );
}

export default ProfileCard;
