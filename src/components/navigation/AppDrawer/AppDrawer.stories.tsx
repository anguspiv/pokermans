import { Story } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import AppDrawer, { AppDrawerProps } from './AppDrawer';

export default {
  title: 'components/navigation/AppDrawer',
  component: AppDrawer,
};

const Template: Story<AppDrawerProps> = (args) => (
  <SessionProvider session={{ expires: '' }}>
    <AppDrawer {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
};
