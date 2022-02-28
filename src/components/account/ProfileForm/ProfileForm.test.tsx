import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ProfileForm } from './ProfileForm';

describe('<ProfileForm />', () => {
  const setupProfileForm = (props) => {
    return render(<ProfileForm {...props} />);
  };

  it('should render the profile form', () => {
    expect.assertions(1);

    const { getByTestId } = setupProfileForm();

    expect(getByTestId('profile-form')).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    expect.assertions(1);

    const { getByRole } = setupProfileForm();

    expect(getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('should display the first name field', () => {
    expect.assertions(1);

    const { getByLabelText } = setupProfileForm();

    expect(getByLabelText('First Name')).toBeInTheDocument();
  });

  it('should display the firstName placeholder', () => {
    expect.assertions(1);

    const { getByPlaceholderText } = setupProfileForm();

    expect(getByPlaceholderText('John')).toBeInTheDocument();
  });

  it('should set the default value for the firstName', () => {
    expect.assertions(1);

    const profile = {
      firstName: 'John',
    };

    const { getByDisplayValue } = setupProfileForm({ profile });

    expect(getByDisplayValue('John')).toBeInTheDocument();
  });

  it('should require the firstName value', async () => {
    expect.assertions(1);

    const { getByText, getByLabelText } = setupProfileForm();

    fireEvent.blur(getByLabelText('First Name'));

    await waitFor(() => expect(getByText('First Name is required')).toBeInTheDocument());
  });

  it('should change the value of the input', () => {
    expect.assertions(1);

    const { getByDisplayValue, getByLabelText } = setupProfileForm();

    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Jane' } });

    expect(getByDisplayValue('Jane')).toBeInTheDocument();
  });

  it('should submit the values', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    const { getByLabelText, getByRole } = setupProfileForm({ onSubmit });

    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Jane' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ firstName: 'Jane' }));
  });

  it('should show the form loading button', () => {
    expect.assertions(1);

    const { getByRole } = setupProfileForm({ loading: true });

    const button = getByRole('button', { name: /Saving/i });

    expect(button).toHaveAttribute('disabled');
  });

  it('should disable the fields while loading', () => {
    expect.assertions(1);

    const { getByLabelText } = setupProfileForm({ loading: true });

    expect(getByLabelText('First Name')).toBeDisabled();
  });

  it('should disable the form until dirty', () => {
    expect.assertions(2);

    const { getByRole, getByLabelText } = setupProfileForm();

    expect(getByRole('button', { name: /Save/i })).toBeDisabled();

    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Jane' } });

    expect(getByRole('button', { name: /Save/i })).not.toBeDisabled();
  });
});
