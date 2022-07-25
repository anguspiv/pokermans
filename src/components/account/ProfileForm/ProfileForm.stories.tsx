import { Story } from '@storybook/react';
import { ProfileForm, ProfileFormProps } from './ProfileForm';

export default {
  title: 'components/account/ProfileForm',
  component: ProfileForm,
  argTypes: { onSubmit: { action: 'submitted' }, onReset: { action: 'reset' } },
};

interface StoryArgs {
  firstName: string;
  loading: boolean;
  onSubmit: (data: ProfileFormProps['profile']) => void;
}

const Template: Story<StoryArgs> = ({ firstName, ...args }) => {
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
