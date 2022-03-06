import { SessionProvider } from 'next-auth/react';
import AppHeader from './AppHeader';

export default {
  title: 'components/layout/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (props) => (
  <SessionProvider>
    <AppHeader {...props} />
  </SessionProvider>
);

export const Default = Template.bind({});

Default.args = {
  isMenuOpen: false,
  hideMenuButton: false,
};
