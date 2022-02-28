import { Story } from '@storybook/react';
import { ProfileForm, ProfileFormProps } from './ProfileForm';

export default {
  title: 'components/account/ProfileForm',
  component: ProfileForm,
  argTypes: { onSubmit: { action: 'submitted' } },
};

const Template: Story<ProfileFormProps> = ({ firstName, ...args }) => {
  const profile = {
    firstName,
  };

  return <ProfileForm {...args} profile={profile} />;
};

export const Default = Template.bind({});
Default.args = {
  firstName: 'John',
  loading: false,
};
