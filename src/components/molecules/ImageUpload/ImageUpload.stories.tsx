import { Story } from '@storybook/react';
import ImageUpload, { ImageUploadProps, UPLOAD_IMAGE } from './ImageUpload';

export default {
  title: 'Molecules/ImageUpload',
  component: ImageUpload,
};

const Template: Story<ImageUploadProps> = (args) => <ImageUpload {...args} />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: UPLOAD_IMAGE,
        },
        result: {
          data: {
            uploadImage: {
              id: 'test-image',
              filename: 'test-image.jpg',
              filepath: 'test-image.jpg',
            },
          },
        },
      },
    ],
  },
};
