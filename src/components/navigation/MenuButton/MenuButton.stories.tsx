import { Story } from '@storybook/react';
import MenuButton, { MenuButtonProps } from './MenuButton';

export default {
  title: 'components/navigation/MenuButton',
  component: MenuButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Template: Story<MenuButtonProps> = (args) => <MenuButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
};
