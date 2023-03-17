import { Story } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import { profileQuery } from '@components/molecules/AccountLink';
import { AppMenu } from './AppMenu';

export default {
  title: 'Molecules/AppMenu',
  component: AppMenu,
};

const Template: Story = () => {
  return (
    <SessionProvider session={{ expires: '' }}>
      <AppMenu />
    </SessionProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};

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
