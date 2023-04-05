import React from 'react';
import { Avatar, Card, CardHeader, CardContent, Typography } from '@mui/material';

export interface ProfileCardProps {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  email?: string;
  image?: string;
  bio?: string;
}

export function ProfileCard({
  firstName = '',
  lastName = '',
  nickname = '',
  email = '',
  image = '',
  bio = '',
}: ProfileCardProps) {
  return (
    <Card data-testid="profile-card">
      <CardHeader
        avatar={<Avatar alt={`${firstName} ${lastName}`} src={image} />}
        title={`${firstName} ${lastName}`}
        subheader={nickname}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
