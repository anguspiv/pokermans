import { Story } from '@storybook/react';
import PageHeader, { PageHeaderProps } from './PageHeader';

export default {
  title: 'Organisms/PageHeader',
  component: PageHeader,
};

const Template: Story<PageHeaderProps> = (args) => <PageHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Test Title',
  subtitle: 'Test Subtitle',
};
