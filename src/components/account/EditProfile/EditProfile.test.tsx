import { useQuery, useMutation } from '@apollo/client';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { EditProfile } from './EditProfile';

const updateProfileMock = jest.fn();

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
}));

describe('<EditProfile />', () => {
  const setupEditProfile = (props, { profile, loading = false, error = null } = {}) => {
    useQuery.mockReturnValue({
      data: {
        profile,
      },
      loading,
      error,
    });

    useMutation.mockReturnValue([updateProfileMock, { data: { updateProfile: { id: '1' } } }]);

    return render(<EditProfile {...props} />);
  };

  it('renders the component', () => {
    expect.assertions(1);

    const { getByTestId } = setupEditProfile();

    expect(getByTestId('edit-profile')).toBeInTheDocument();
  });

  it('should render the profile form', () => {
    expect.assertions(1);

    const { getByTestId } = setupEditProfile();

    expect(getByTestId('profile-form')).toBeInTheDocument();
  });

  it('should display the users firstname', async () => {
    expect.assertions(1);

    const profile = {
      id: '1',
      userId: '1',
      firstName: 'John',
    };

    const { getByDisplayValue } = setupEditProfile({}, { profile });

    await waitFor(() => expect(getByDisplayValue('John')).toBeInTheDocument());
  });

  it('should save the form values', async () => {
    expect.hasAssertions();

    const profile = {
      id: '1',
      userId: '1',
      firstName: 'John',
    };

    const { getByDisplayValue, getByRole } = setupEditProfile({}, { profile });

    fireEvent.change(getByDisplayValue('John'), { target: { value: 'Jane' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() =>
      expect(updateProfileMock).toHaveBeenCalledWith({
        variables: {
          input: {
            firstName: 'Jane',
          },
        },
      }),
    );
  });
});
