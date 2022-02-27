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
  onSubmit: (data: ProfileData) => void;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
});

export function ProfileForm({ profile, onSubmit = () => {} }: ProfileFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: profile?.firstName || '',
    },
    resolver: yupResolver(schema),
  });

  const onFormSubmit = (data) => {
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

  return (
    <form data-testid="profile-form" onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input id="firstName" type="text" placeholder="John" {...firstName} />
        <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" mt={2}>
        Save
      </Button>
    </form>
  );
}

export default ProfileForm;
