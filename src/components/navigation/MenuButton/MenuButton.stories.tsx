import MenuButton from './MenuButton';

export default {
  title: 'components/navigation/MenuButton',
  component: MenuButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => <MenuButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
};
