import { Story } from '@storybook/react';
import { GET_PROFILE, UPDATE_PROFILE } from '@graphql/queries';
import { EditProfileProps, EditProfile } from './EditProfile';

export default {
  title: 'components/account/EditProfile',
  component: EditProfile,
};

const Template: Story<EditProfileProps> = (args) => <EditProfile {...args} />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  apolloClient: {
    // do not put MockedProvider here, you can, but its preferred to do it in preview.js
    mocks: [
      {
        request: {
          query: GET_PROFILE,
        },
        result: {
          data: {
            profile: {
              id: '1',
              userId: '1',
              firstName: 'John',
            },
          },
        },
      },
      {
        request: {
          query: UPDATE_PROFILE,
        },
        result: {
          data: {
            updateProfile: {
              id: '1',
            },
          },
        },
      },
    ],
  },
};
