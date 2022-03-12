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

    expect(getByPlaceholderText('Poker')).toBeInTheDocument();
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

  it('should change the value of the firstName', () => {
    expect.assertions(1);

    const { getByDisplayValue, getByLabelText } = setupProfileForm();

    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Jane' } });

    expect(getByDisplayValue('Jane')).toBeInTheDocument();
  });

  it('should display the last name field', () => {
    expect.assertions(1);

    const { getByLabelText } = setupProfileForm();

    expect(getByLabelText('Last Name')).toBeInTheDocument();
  });

  it('should display the lastName placeholder', () => {
    expect.assertions(1);

    const { getByPlaceholderText } = setupProfileForm();

    expect(getByPlaceholderText('Mans')).toBeInTheDocument();
  });

  it('should set the default value for the lastName', () => {
    expect.assertions(1);

    const profile = {
      lastName: 'Doe',
    };

    const { getByDisplayValue } = setupProfileForm({ profile });

    expect(getByDisplayValue('Doe')).toBeInTheDocument();
  });

  it('should require the lastName value', async () => {
    expect.assertions(1);

    const { getByText, getByLabelText } = setupProfileForm();

    fireEvent.blur(getByLabelText('Last Name'));

    await waitFor(() => expect(getByText('Last Name is required')).toBeInTheDocument());
  });

  it('should change the value of the lastName', () => {
    expect.assertions(1);

    const { getByDisplayValue, getByLabelText } = setupProfileForm();

    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });

    expect(getByDisplayValue('Doe')).toBeInTheDocument();
  });

  it('should set the default value for the nickname', () => {
    expect.assertions(1);

    const profile = {
      nickname: 'boop',
    };

    const { getByDisplayValue } = setupProfileForm({ profile });

    expect(getByDisplayValue('boop')).toBeInTheDocument();
  });

  it('should change the value of the nickname', () => {
    expect.assertions(1);

    const { getByDisplayValue, getByLabelText } = setupProfileForm();

    fireEvent.change(getByLabelText('Nickname'), { target: { value: 'Capt.' } });

    expect(getByDisplayValue('Capt.')).toBeInTheDocument();
  });

  it('should submit the values', async () => {
    expect.assertions(2);

    const onSubmit = jest.fn();

    const { getByLabelText, getByRole } = setupProfileForm({ onSubmit });

    fireEvent.change(getByLabelText('First Name'), { target: { value: 'Jane' } });

    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ firstName: 'Jane', lastName: 'Doe', nickname: '' }));
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
