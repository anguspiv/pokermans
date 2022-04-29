import { Story } from '@storybook/react';
import NavMenuUser, { NavMenuUserProps } from './NavMenuUser';

export default {
  title: 'components/navigation/NavMenuUser',
  component: NavMenuUser,
};

const Template: Story<NavMenuUserProps> = (args) => {
  return <NavMenuUser {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  image: 'https://picsum.photos/id/237/200/300',
  firstName: 'John',
  lastName: 'Doe',
};
