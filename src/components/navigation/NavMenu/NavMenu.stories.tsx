import NavMenu from './NavMenu';

export default {
  title: 'components/navigation/NavMenu',
  component: NavMenu,
};

const Template = (args) => <NavMenu {...args} />;

export const Default = Template.bind({});
Default.args = {};
