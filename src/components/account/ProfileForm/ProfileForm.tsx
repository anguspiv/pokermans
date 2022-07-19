import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormField from '@components/form/FormField';
import TextField from '@components/form/TextField';

export interface ProfileFormProps {
  profile?: Profile;
  onSubmit?: (data: Profile) => void | Promise<unknown>;
  loading?: boolean;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  nickname: yup.string(),
  bio: yup.string().max(250, 'Bio must be less than 255 characters'),
});

const defaultvalues = {
  firstName: '',
  lastName: '',
  nickname: '',
  bio: '',
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, userId, __typename, ...rest } = profile;

      reset(rest);
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
      <FormField
        id="nickname"
        label="Nickname"
        placeholder="River Boat Capt."
        type="text"
        {...register('nickname')}
        disabled={disabled}
        error={errors?.nickname?.message}
      />
      <TextField
        id="bio"
        label="Short Bio"
        placeholder="This is the story of my life"
        {...register('bio')}
        disabled={disabled}
        error={errors?.bio?.message}
        max={255}
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
