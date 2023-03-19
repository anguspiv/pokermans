import { Story } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import { profileQuery } from '@components/molecules/AccountLink';
import SideBar from './SideBar';

export default {
  title: 'Organisms/SideBar',
  component: SideBar,
};

const Template: Story = (args) => (
  <SessionProvider session={{ expires: '' }}>
    <SideBar {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});

Default.args = {
  open: true,
};

Default.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: profileQuery,
        },
        result: {
          data: {
            profile: {
              firstName: 'John',
              lastName: 'Doe',
              avatar: {
                filepath: 'https://i.pravatar.cc/300',
              },
            },
          },
        },
      },
    ],
  },
};
