import { Story } from '@storybook/react';
import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';

export default {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
};

const Template: Story<BreadcrumbsProps> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});

Default.args = {
  labels: {
    '123abc': 'Test Label',
    profile: 'Players',
  },
};

Default.story = {
  parameters: {
    nextRouter: {
      path: '/profile/[id]',
      asPath: '/profile/123abc',
      query: {
        id: '123abc',
      },
    },
  },
};
