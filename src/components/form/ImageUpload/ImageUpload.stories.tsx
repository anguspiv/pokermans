import { Story } from '@storybook/react';
import ImageUpload, { ImageUploadProps } from './ImageUpload';

export default {
  title: 'components/form/ImageUpload',
  component: ImageUpload,
  argTypes: {},
};

const Template: Story<ImageUploadProps> = (args) => <ImageUpload {...args} />;

export const Default = Template.bind({});

Default.args = {
  placeholder: {
    id: '1',
    title: 'Placeholder',
    filename: 'angus-perkerson.jpeg',
    filepath: '/images',
  },
};
