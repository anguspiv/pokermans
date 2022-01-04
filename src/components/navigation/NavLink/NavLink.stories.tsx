import { faBars } from '@fortawesome/free-solid-svg-icons';
import NavLink from './NavLink';

export default {
  title: 'components/navigation/NavLink',
  component: NavLink,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => <NavLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Home',
  href: '#',
  icon: faBars,
};
