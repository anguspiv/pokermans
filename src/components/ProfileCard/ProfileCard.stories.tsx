import { Story } from '@storybook/react';
import { ProfileCard, ProfileCardProps } from './ProfileCard';

export default {
  title: 'components/account/ProfileCard',
  component: ProfileCard,
};

const Template: Story<ProfileCardProps> = (args) => <ProfileCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  firstName: 'John',
  lastName: 'Doe',
  nickname: 'River Boat Captain',
  email: 'john.doe@email.com',
  image: 'https://picsum.photos/id/237/200/300',
};
