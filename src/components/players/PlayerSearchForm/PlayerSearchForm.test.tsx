import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PlayerSearchForm } from './PlayerSearchForm';

describe('<PlayerSearchForm />', () => {
  const setupPlayerSearchForm = (props) => {
    return render(<PlayerSearchForm {...props} />);
  };

  it('should render the player search form', () => {
    expect.assertions(1);

    setupPlayerSearchForm();

    expect(screen.getByTestId('player-search-form')).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    expect.assertions(1);

    setupPlayerSearchForm();

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('should display the reset button', () => {
    expect.assertions(1);

    setupPlayerSearchForm();

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Jane' } });

    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('should display the search field', () => {
    expect.assertions(1);

    setupPlayerSearchForm();

    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('should display the search placeholder', () => {
    expect.assertions(1);

    setupPlayerSearchForm();

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should change value for the search', async () => {
    expect.assertions(1);

    setupPlayerSearchForm();

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Jane' } });

    await waitFor(() => expect(screen.getByDisplayValue('Jane')).toBeInTheDocument());
  });

  it('should submit the search term', async () => {
    expect.assertions(1);

    const onSubmit = jest.fn();

    setupPlayerSearchForm({ onSubmit });

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Jane' } });

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      const call = onSubmit.mock.calls.pop();

      const vals = call && call[0];

      expect(vals).toMatchObject({ searchTerm: 'Jane' });
    });
  });

  it('should reset the search term', async () => {
    expect.assertions(1);

    setupPlayerSearchForm();

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Jane' } });

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search')).toHaveValue('');
    });
  });

  it('should disable submit if loading', () => {
    expect.assertions(1);

    setupPlayerSearchForm({ loading: true });

    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
  });

  it('should disable the search field while loading', () => {
    expect.assertions(1);

    setupPlayerSearchForm({ loading: true });

    expect(screen.getByPlaceholderText('Search')).toBeDisabled();
  });

  it('should call the reset function', async () => {
    expect.assertions(1);

    const onReset = jest.fn();

    setupPlayerSearchForm({ onReset });

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Jane' } });
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    await waitFor(() => {
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });

  it('should display the loading indicator', () => {
    expect.assertions(1);

    setupPlayerSearchForm({ loading: true });

    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('should show the sort descending button', () => {
    expect.assertions(1);

    setupPlayerSearchForm();

    expect(screen.getByRole('button', { name: 'Sort Descending' })).toBeInTheDocument();
  });

  it('should submit with sort ascending', async () => {
    expect.assertions(1);

    const onSubmit = jest.fn();

    setupPlayerSearchForm({ onSubmit });

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Jane' } });

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      const call = onSubmit.mock.calls.pop();

      const vals = call && call[0];

      expect(vals).toMatchObject({ sort: 'ASC' });
    });
  });

  it('should submit with sort descending', async () => {
    expect.assertions(1);

    const onSubmit = jest.fn();

    setupPlayerSearchForm({ onSubmit });

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Jane' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sort Descending' }));

    await waitFor(() => {
      const call = onSubmit.mock.calls.pop();

      const vals = call && call[0];

      expect(vals).toMatchObject({ sort: 'DESC' });
    });
  });
});
