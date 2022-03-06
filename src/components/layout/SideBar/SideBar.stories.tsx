import { SessionProvider } from 'next-auth/react';
import SideBar from './SideBar';

export default {
  title: 'components/layout/SideBar',
  component: SideBar,
};

const Template = () => (
  <SessionProvider session={{ expires: '' }}>
    <SideBar />
  </SessionProvider>
);

export const Default = Template.bind({});
