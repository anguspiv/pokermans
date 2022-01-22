import { Story } from '@storybook/react';
import NavMenu, { NavMenuProps } from './NavMenu';

export default {
  title: 'components/navigation/NavMenu',
  component: NavMenu,
};

const Template: Story<NavMenuProps> = (args) => <NavMenu {...args} />;

export const Default = Template.bind({});
Default.args = {};
