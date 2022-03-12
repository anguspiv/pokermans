import { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextField from './TextField';

describe('<TextField />', () => {
  const setupTextField = (props) => {
    return render(<TextField {...props} />);
  };

  it('should render the input field', () => {
    expect.assertions(1);

    const label = 'First Name';

    const { getByRole } = setupTextField({ label });

    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('should render the input label', () => {
    expect.assertions(1);

    const label = 'Test Label';
    const id = 'test-label';

    const { getByLabelText } = setupTextField({ label, id });

    expect(getByLabelText(label)).toBeInTheDocument();
  });

  it('should set the input id', () => {
    expect.assertions(2);

    const id = 'test-id';
    const label = 'Test Label';

    const { getByText, getByRole } = setupTextField({ label, id });

    expect(getByRole('textbox')).toHaveAttribute('id', id);
    expect(getByText(label)).toHaveAttribute('for', id);
  });

  it('should display the error message', () => {
    expect.assertions(1);

    const error = 'Test Error';
    const id = 'test-id';
    const label = 'Test Label';

    const { getByText } = setupTextField({ error, id, label });

    expect(getByText(error)).toBeInTheDocument();
  });

  it('should display the placeholder', () => {
    expect.assertions(1);

    const label = 'Test Label';
    const id = 'test-label';
    const placeholder = 'Test Placeholder';

    const { getByPlaceholderText } = setupTextField({ label, id, placeholder });

    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('should disable the form field', () => {
    expect.assertions(1);

    const label = 'Test Label';
    const id = 'test-label';
    const disabled = true;

    const { getByRole } = setupTextField({ label, id, disabled });

    expect(getByRole('textbox')).toBeDisabled();
  });

  it('should forward the ref', () => {
    expect.assertions(1);

    const ref = createRef();
    const id = 'test-label';
    const label = 'Test Label';

    setupTextField({ ref, id, label });

    expect(ref.current).toBeInTheDocument();
  });

  it('should display a max number character count', () => {
    expect.assertions(2);

    const label = 'Test Label';
    const id = 'test-label';
    const input = '123456789';
    const max = 250;

    const { getByText, getByRole } = setupTextField({ label, id, max });

    expect(getByText(`0 / ${max}`)).toBeInTheDocument();

    fireEvent.change(getByRole('textbox'), { target: { value: input } });

    expect(getByText(`${input.length} / ${max}`)).toBeInTheDocument();
  });

  it('should call the onChange event', () => {
    expect.assertions(1);

    const label = 'Test Label';
    const id = 'test-label';
    const input = '123456789';
    const onChange = jest.fn();
    const event = { target: { value: input } };

    const { getByRole } = setupTextField({ label, id, onChange });

    fireEvent.change(getByRole('textbox'), event);

    expect(onChange).toHaveBeenCalledWith(event);
  });
});
