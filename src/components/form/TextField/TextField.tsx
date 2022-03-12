import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Textarea, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

export interface TextFieldProps {
  label: string;
  id?: string | undefined;
  error?: string | undefined;
  placeholder?: string | undefined;
  disabled?: boolean;
  max?: number | undefined;
  value?: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ label, id, error, max, value, onChange, ...props }, ref) => {
    const [fieldValue, setFieldValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFieldValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Textarea
          colorScheme="teal"
          focusBorderColor="teal.300"
          id={id}
          ref={ref}
          value={fieldValue}
          onChange={handleChange}
          maxLength={max || undefined}
          {...props}
        />
        {!!max && <FormHelperText>{`${fieldValue ? fieldValue.length : 0} / ${max}`}</FormHelperText>}
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  },
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  error: PropTypes.string,
  max: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.displayName = 'TextField';

TextField.defaultProps = {
  id: undefined,
  error: undefined,
  max: 0,
  value: '',
  onChange: () => {},
};

export default TextField;
