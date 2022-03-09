import { createRef } from 'react';
import { render } from '@testing-library/react';
import FormField from './FormField';

describe('<FormField />', () => {
  const setupFormField = (props) => {
    return render(<FormField {...props} />);
  };

  it('should render the input field', () => {
    expect.assertions(1);

    const label = 'First Name';

    const { getByRole } = setupFormField({ label });

    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('should render the input label', () => {
    expect.assertions(1);

    const label = 'Test Label';
    const id = 'test-label';

    const { getByLabelText } = setupFormField({ label, id });

    expect(getByLabelText(label)).toBeInTheDocument();
  });

  it('should set the input id', () => {
    expect.assertions(2);

    const id = 'test-id';
    const label = 'Test Label';

    const { getByText, getByRole } = setupFormField({ label, id });

    expect(getByRole('textbox')).toHaveAttribute('id', id);
    expect(getByText(label)).toHaveAttribute('for', id);
  });

  it('should display the error message', () => {
    expect.assertions(1);

    const error = 'Test Error';
    const id = 'test-id';
    const label = 'Test Label';

    const { getByText } = setupFormField({ error, id, label });

    expect(getByText(error)).toBeInTheDocument();
  });

  it('should disable the form field', () => {
    expect.assertions(1);

    const label = 'Test Label';
    const id = 'test-label';
    const disabled = true;

    const { getByLabelText } = setupFormField({ label, id, disabled });

    expect(getByLabelText(label)).toBeDisabled();
  });

  it('should set the form field placeholder', () => {
    expect.assertions(1);

    const label = 'Test Label';
    const id = 'test-label';
    const placeholder = 'Test Placeholder';

    const { getByLabelText } = setupFormField({ label, id, placeholder });

    expect(getByLabelText(label)).toHaveAttribute('placeholder', placeholder);
  });

  it('should set the form field type', () => {
    expect.assertions(1);

    const label = 'Test Label';
    const id = 'test-label';
    const type = 'tel';

    const { getByLabelText } = setupFormField({ label, id, type });

    expect(getByLabelText(label)).toHaveAttribute('type', type);
  });

  it('should forward the ref', () => {
    expect.assertions(1);

    const ref = createRef();
    const id = 'test-label';
    const label = 'Test Label';

    setupFormField({ ref, id, label });

    expect(ref.current).toBeInTheDocument();
  });
});
