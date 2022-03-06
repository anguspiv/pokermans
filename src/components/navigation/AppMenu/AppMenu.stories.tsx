import { Story } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import AppMenu from './AppMenu';

export default {
  title: 'components/navigation/AppMenu',
  component: AppMenu,
  argTypes: {
    variant: {
      options: ['default', 'transparent'],
      control: { type: 'select' },
    },
  },
};

const Template: Story = (args) => {
  return (
    <SessionProvider session={{ expires: '' }}>
      <AppMenu {...args} />
    </SessionProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
