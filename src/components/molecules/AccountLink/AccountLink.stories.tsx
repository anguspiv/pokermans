import { Story } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import { AccountLink, profileQuery } from './AccountLink';

export default {
  title: 'Molecules/AccountLink',
  component: AccountLink,
};

const Template: Story = (args) => {
  return (
    <SessionProvider session={{ expires: '' }}>
      <AccountLink {...args} />
    </SessionProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  apolloClient: {
    // do not put MockedProvider here, you can, but its preferred to do it in preview.js
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
