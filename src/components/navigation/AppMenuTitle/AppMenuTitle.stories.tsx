import AppMenuTitle from './AppMenuTitle';

export default {
  title: 'components/navigation/AppMenuTitle',
  component: AppMenuTitle,
};

const Template = (args) => <AppMenuTitle {...args} />;

export const Default = Template.bind({});
Default.args = {};
