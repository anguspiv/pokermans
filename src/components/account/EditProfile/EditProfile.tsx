import { Box } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import ProfileForm from '@components/account/ProfileForm';
import { GET_PROFILE, UPDATE_PROFILE } from '@graphql/queries';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditProfileProps {}

export function EditProfile() {
  const { data } = useQuery(GET_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const { profile } = data || {};

  const onSubmit = (values) => {
    updateProfile({ variables: { input: values } });
  };

  return (
    <Box data-testid="edit-profile" p={4}>
      <ProfileForm profile={profile} onSubmit={onSubmit} />
    </Box>
  );
}

export default EditProfile;
