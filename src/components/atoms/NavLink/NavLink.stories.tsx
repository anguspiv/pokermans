import { Story } from '@storybook/react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLink, { NavLinkProps } from './NavLink';

export default {
  title: 'Atoms/NavLink',
  component: NavLink,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Template: Story<NavLinkProps> = (args) => <NavLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Home',
  href: '#',
  icon: <FontAwesomeIcon icon={faBars} />,
};
