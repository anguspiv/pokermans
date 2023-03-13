import { Story } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import AppHeader, { AppHeaderProps } from './AppHeader';

export default {
  title: 'Molecules/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: Story<AppHeaderProps> = (props) => (
  <SessionProvider>
    <AppHeader {...props} />
  </SessionProvider>
);

export const Default = Template.bind({});

Default.args = {
  isMenuOpen: false,
};
