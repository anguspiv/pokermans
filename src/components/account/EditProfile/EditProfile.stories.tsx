import { Story } from '@storybook/react';
import { GET_PROFILE, UPDATE_PROFILE } from '@graphql/queries';
import { UPLOAD_IMAGE } from '@components/form/ImageUpload';
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
              lastName: 'Doe',
              nickname: 'JD',
              bio: 'Somewhere over the rainbow...',
              avatar: {
                id: '1',
                filename: 'angus-perkerson.jpeg',
                filepath: '/images',
                mimeType: 'image/jpeg',
                title: 'Angus Perkerson',
                description: 'Angus Perkerson',
              },
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
      {
        request: {
          query: UPLOAD_IMAGE,
        },
        result: {
          data: {
            uploadImage: {
              id: '1',
              filename: 'angus-perkerson.jpeg',
              filepath: '/images',
              mimeType: 'image/jpeg',
              title: 'Angus Perkerson Saved',
              description: 'Angus Perkerson Saved',
            },
          },
        },
      },
    ],
  },
};
