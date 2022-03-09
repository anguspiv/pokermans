import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormField from '@components/form/FormField';

export interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (data: Profile) => void | Promise<unknown>;
  loading?: boolean;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});

const defaultvalues = {
  firstName: '',
  lastName: '',
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

  const onFormSubmit = (data: Profile) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
      });
    }
  }, [profile, reset]);

  const disabled = loading || isSubmitting;
  const saveDisabled = !isDirty || disabled;
  const saveLoading = isSubmitting || loading;

  return (
    <form data-testid="profile-form" onSubmit={handleSubmit(onFormSubmit)}>
      <FormField
        id="firstName"
        label="First Name"
        placeholder="Poker"
        type="text"
        {...register('firstName')}
        disabled={disabled}
        error={errors?.firstName?.message}
      />
      <FormField
        id="lastName"
        label="Last Name"
        placeholder="Mans"
        type="text"
        {...register('lastName')}
        disabled={disabled}
        error={errors?.lastName?.message}
      />
      <Button
        type="submit"
        mt={2}
        isLoading={saveLoading}
        loadingText="Saving"
        disabled={saveDisabled}
        colorScheme="teal"
      >
        Save
      </Button>
    </form>
  );
}

export default ProfileForm;
