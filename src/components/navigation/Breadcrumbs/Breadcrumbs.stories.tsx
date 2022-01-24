import { Story } from '@storybook/react';
import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';

export default {
  title: 'components/navigation/Breadcrumbs',
  component: Breadcrumbs,
};

const Template: Story<BreadcrumbsProps> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});

Default.args = {};

Default.story = {
  parameters: {
    nextRouter: {
      pathname: '/test/page-breadcrumbs',
    },
  },
};
