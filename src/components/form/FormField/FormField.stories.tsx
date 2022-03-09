import { Story } from '@storybook/react';
import FormField, { FormFieldProps } from './FormField';

interface StoryProps extends FormFieldProps {
  placeholder?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
}

export default {
  title: 'components/form/FormField',
  component: FormField,
  argTypes: {
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    onFocus: { action: 'focused' },
  },
};

const Template: Story<StoryProps> = (args) => <FormField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Form Field',
  id: 'form-field',
  placeholder: 'Placeholder',
  error: '',
  type: 'text',
  disabled: false,
};
