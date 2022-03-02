import { useEffect } from 'react';
import { FormControl, FormLabel, Input, Button, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface ProfileData {
  firstName?: string;
}

export interface ProfileFormProps {
  profile?: ProfileData;
  onSubmit: (data: ProfileData) => void | Promise<unknown>;
  loading?: boolean;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
});

const defaultvalues = {
  firstName: '',
};

export function ProfileForm({ profile, onSubmit = () => {}, loading = false }: ProfileFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...defaultvalues,
      ...profile,
    },
    resolver: yupResolver(schema),
  });

  const onFormSubmit = (data: ProfileData) => {
    onSubmit(data);
  };

  const firstName = register('firstName');

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
      });
    }
  }, [profile, reset]);

  const disabled = loading || isSubmitting;
  const saveDisabled = !isDirty || disabled;
  const saveLoading = isSubmitting || loading;

  return (
    <form data-testid="profile-form" onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input id="firstName" type="text" placeholder="John" {...firstName} disabled={disabled} />
        <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        mt={2}
        isLoading={saveLoading}
        loadingText="Saving"
        disabled={saveDisabled}
        colorScheme="blue"
      >
        Save
      </Button>
    </form>
  );
}

export default ProfileForm;
