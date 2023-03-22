import { useState, useEffect } from 'react';
import { Box, Center, useToast } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import ProfileForm from '@components/account/ProfileForm';
import ImageUpload from '@components/molecules/ImageUpload';
import { GET_PROFILE, UPDATE_PROFILE } from '@graphql/queries';
import logger from '@utils/logger';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditProfileProps {}

export function EditProfile() {
  const toast = useToast();
  const { data, loading } = useQuery(GET_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [isLoading, setIsLoading] = useState(loading);
  const [userProfile, setUserProfile] = useState(data?.profile || {});

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

      toast({
        title: 'Profile saved!',
        description: 'Changes saved successfully.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      logger.error(err);
      toast({
        title: 'Error saving profile',
        description: 'Please try again later.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  const onAvatarUpload = async ({ id }: Image) => {
    setIsLoading(true);

    try {
      const updated = await updateProfile({ variables: { input: { avatarId: id } } });

      setUserProfile(updated?.data?.updateProfile || {});

      toast({
        title: 'Avatar updated',
        description: 'Your avatar has been updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      logger.error(err);

      toast({
        title: 'Error Saving Avatar',
        description: 'We could not save your avatar. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Box data-testid="edit-profile" p={4} maxW="xl" width="100%">
      <Center mb={4}>
        <ImageUpload onUpload={onAvatarUpload} placeholder={avatar} />
      </Center>
      <ProfileForm profile={profile} onSubmit={onSubmit} loading={isLoading} />
    </Box>
  );
}

export default EditProfile;
