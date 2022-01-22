import { TextProps } from '@chakra-ui/react';
import { Story } from '@storybook/react';
import NavMenuTitle from './NavMenuTitle';

export default {
  title: 'components/navigation/NavMenuTitle',
  component: NavMenuTitle,
};

const Template: Story<TextProps> = (args) => <NavMenuTitle {...args} />;

export const Default = Template.bind({});
Default.args = {};
