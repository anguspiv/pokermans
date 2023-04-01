import { Story } from '@storybook/react';
import { PlayerSearchForm, PlayerSearchFormProps } from './PlayerSearchForm';

export default {
  title: 'Molecules/PlayerSearchForm',
  component: PlayerSearchForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
};

const Template: Story<PlayerSearchFormProps> = (args) => <PlayerSearchForm {...args} />;

export const Default = Template.bind({});

Default.args = {
  loading: false,
};
