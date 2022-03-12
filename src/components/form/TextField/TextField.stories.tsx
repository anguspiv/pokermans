import { Story } from '@storybook/react';
import TextField, { TextFieldProps } from './TextField';

export default {
  title: 'components/form/TextField',
  component: TextField,
  argTypes: {
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    onFocus: { action: 'focused' },
  },
};

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Text Field',
  id: 'text-field',
  placeholder: 'Placeholder',
  error: '',
  disabled: false,
  max: 0,
};
