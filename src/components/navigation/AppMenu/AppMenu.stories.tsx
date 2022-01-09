import AppMenu from './AppMenu';

export default {
  title: 'components/navigation/AppMenu',
  component: AppMenu,
};

const Template = (args) => <AppMenu {...args} />;

export const Default = Template.bind({});
Default.args = {};
