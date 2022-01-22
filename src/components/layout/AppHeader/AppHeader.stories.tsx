import { SessionProvider } from 'next-auth/react';
import AppHeader from './AppHeader';

export default {
  title: 'components/layout/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => (
  <SessionProvider>
    <AppHeader {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});
Default.args = {};
