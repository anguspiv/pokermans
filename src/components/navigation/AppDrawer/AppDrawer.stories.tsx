import { SessionProvider } from 'next-auth/react';
import AppDrawer from './AppDrawer';

export default {
  title: 'components/navigation/AppDrawer',
  component: AppDrawer,
};

const Template = (args) => (
  <SessionProvider session={{}}>
    <AppDrawer {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});
Default.args = {};
