import { Story } from '@storybook/react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NavLink, { NavLinkProps } from './NavLink';

export default {
  title: 'components/navigation/NavLink',
  component: NavLink,
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      options: ['default', 'transparent'],
      control: { type: 'select' },
    },
  },
};

const Template: Story<NavLinkProps> = (args) => <NavLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Home',
  href: '#',
  icon: faBars,
};
