import { useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import ProfileForm from '@components/account/ProfileForm';
import { GET_PROFILE, UPDATE_PROFILE } from '@graphql/queries';
import logger from '@utils/logger';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditProfileProps {}

export function EditProfile() {
  const toast = useToast();
  const { data, loading: getLoading, error: getError } = useQuery(GET_PROFILE);
  const [updateProfile, updateStatus] = useMutation(UPDATE_PROFILE);

  const { profile } = data || {};

  const loading = getLoading || updateStatus?.loading;
  const error = getError || updateStatus?.error;

  const onSubmit = (values: Profile) => updateProfile({ variables: { input: values } });

  useEffect(() => {
    if (!loading && error) {
      logger.error(error);
      toast({
        title: 'Error Saving Changes',
        description: 'We could not save your changes. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, toast, loading]);

  useEffect(() => {
    if (!loading && updateStatus?.data) {
      toast({
        title: 'Profile saved!',
        description: 'Changes saved successfully.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [updateStatus, toast, loading]);

  return (
    <Box data-testid="edit-profile" p={4} maxW="xl">
      <ProfileForm profile={profile} onSubmit={onSubmit} loading={loading} />
    </Box>
  );
}

export default EditProfile;
