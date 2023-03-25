import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface ProfileFormProps {
  profile?: Profile;
  onSubmit?: (data: Profile) => void | Promise<unknown>;
  loading?: boolean;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  nickname: yup.string(),
  bio: yup.string().max(255, ({ max, value }) => `Bio must be less than ${max} characters\n${value.length}/${max}`),
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
    formState: { errors, isDirty, isSubmitting },
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...defaultvalues,
      ...profile,
    },
    resolver: yupResolver(schema),
  });

  const onFormSubmit = (data: Profile) => onSubmit(data);

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
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <TextField
            id="firstName"
            label="First Name"
            placeholder="Poker"
            disabled={disabled}
            error={!!errors?.firstName?.message}
            helperText={errors?.firstName?.message || ' '}
            fullWidth
            sx={{
              my: 1,
              display: 'block',
            }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <TextField
            id="lastName"
            label="Last Name"
            placeholder="Mans"
            disabled={disabled}
            error={!!errors?.lastName?.message}
            helperText={errors?.lastName?.message || ' '}
            fullWidth
            sx={{
              my: 1,
              display: 'block',
            }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="nickname"
        render={({ field }) => (
          <TextField
            id="nickname"
            label="Nickname"
            placeholder="River Boat Capt."
            disabled={disabled}
            error={!!errors?.nickname?.message}
            helperText={errors?.nickname?.message || ' '}
            fullWidth
            sx={{
              my: 1,
              display: 'block',
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="bio"
        control={control}
        render={({ field }) => {
          const charsUsed = `${field.value.length}/255`;
          return (
            <TextField
              multiline
              label="Short Bio"
              placeholder="This is the story of my life"
              id="bio"
              disabled={disabled}
              error={!!errors?.bio?.message}
              helperText={errors?.bio?.message || charsUsed}
              variant="outlined"
              fullWidth
              minRows={3}
              maxRows={6}
              sx={{
                my: 1,
                display: 'block',
              }}
              {...field}
            />
          );
        }}
      />
      <LoadingButton
        type="submit"
        loadingPosition="center"
        loading={saveLoading}
        disabled={saveDisabled}
        variant="contained"
      >
        Save
      </LoadingButton>
    </form>
  );
}

export default ProfileForm;
