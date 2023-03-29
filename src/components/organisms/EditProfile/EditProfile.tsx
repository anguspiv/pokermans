import { useState, useEffect } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import ProfileForm from '@components/molecules/ProfileForm';
import ImageUpload from '@components/molecules/ImageUpload';
import { GET_PROFILE, UPDATE_PROFILE } from '@graphql/queries';
import logger from '@utils/logger';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditProfileProps {}

export function EditProfile() {
  const { data, loading } = useQuery(GET_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [isLoading, setIsLoading] = useState(loading);
  const [userProfile, setUserProfile] = useState(data?.profile || {});
  const [alert, setAlert] = useState<Alert>({ open: false, message: '', severity: 'success' });

  const handleMessageClose = () => {
    setAlert({ open: false, message: '', severity: 'success' });
  };

  const { avatar, ...profile } = userProfile;

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    setUserProfile(data?.profile || {});
  }, [data]);

  const onSubmit = async (values: Profile) => {
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, userId, __typename, ...input } = values;
    try {
      const updated = await updateProfile({ variables: { input } });

      setUserProfile(updated?.data?.updateProfile || {});

      setAlert({
        open: true,
        message: 'Profile saved',
        severity: 'success',
      });
    } catch (err) {
      logger.error(err);

      setAlert({
        open: true,
        message: 'Error saving profile',
        severity: 'error',
      });
    }

    setIsLoading(false);
  };

  const onAvatarUpload = async ({ id }: Image) => {
    setIsLoading(true);

    try {
      const updated = await updateProfile({ variables: { input: { avatarId: id } } });

      setUserProfile(updated?.data?.updateProfile || {});

      setAlert({
        open: true,
        message: 'Avatar updated',
        severity: 'success',
      });
    } catch (err) {
      logger.error(err);

      setAlert({
        open: true,
        message: 'Error Saving Avatar',
        severity: 'error',
      });
    }

    setIsLoading(false);
  };

  return (
    <Box data-testid="edit-profile" sx={{ p: 4, width: '100%', maxWidth: 640 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <ImageUpload onUpload={onAvatarUpload} placeholder={avatar} />
      </Box>
      <ProfileForm profile={profile} onSubmit={onSubmit} loading={isLoading} />
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleMessageClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert sx={{ width: '100%' }} onClose={handleMessageClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EditProfile;
