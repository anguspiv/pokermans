import { forwardRef } from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export interface FormFieldProps {
  label: string;
  id?: string | undefined;
  error?: string | undefined;
  disabled?: boolean;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  type?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({ label, id, error, ...props }, ref) => {
  return (
    <FormControl isInvalid={!!error} mb={6}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input focusBorderColor="teal.300" id={id} {...props} ref={ref} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  error: PropTypes.string,
};

FormField.displayName = 'FormField';

FormField.defaultProps = {
  id: undefined,
  error: undefined,
};

export default FormField;
