import { useQuery, useMutation } from '@apollo/client';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useToast } from '@chakra-ui/react';
import logger from '@utils/logger';
import { EditProfile } from './EditProfile';

const updateProfileMock = jest.fn();

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn().mockReturnValue(jest.fn()),
}));

describe('<EditProfile />', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    logger.wrapAll();
  });

  const setupEditProfile = (props, { profile, ...getQuery } = {}, updateQuery = {}) => {
    logger.mockTypes(() => jest.fn());

    useQuery.mockReturnValue({
      data: {
        profile,
      },
      loading: false,
      ...getQuery,
    });

    useMutation.mockReturnValue([updateProfileMock, updateQuery]);

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
      lastName: 'Doe',
    };

    const { getByDisplayValue, getByRole } = setupEditProfile({}, { profile });

    fireEvent.change(getByDisplayValue('John'), { target: { value: 'Jane' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() =>
      expect(updateProfileMock).toHaveBeenCalledWith({
        variables: {
          input: {
            firstName: 'Jane',
            lastName: 'Doe',
          },
        },
      }),
    );
  });

  it('should set the form loading while waiting to fetch profile', () => {
    expect.assertions(1);

    const { getByRole } = setupEditProfile({}, { loading: true });

    expect(getByRole('button', { name: /Saving/i })).toBeDisabled();
  });

  it('should set the form loading while waiting to save profile', async () => {
    expect.assertions(1);

    const { getByRole } = setupEditProfile({}, {}, { loading: true });

    expect(getByRole('button', { name: /Saving/i })).toBeDisabled();
  });

  it('should log the get profile error', () => {
    expect.assertions(1);

    const error = new Error('Error');

    setupEditProfile({}, { error });

    expect(logger.error).toHaveBeenCalledWith(error);
  });

  it('should log the update profile error', () => {
    expect.assertions(1);

    const error = new Error('Error');

    setupEditProfile({}, {}, { error });

    expect(logger.error).toHaveBeenCalledWith(error);
  });

  it('should display an error message', () => {
    expect.assertions(1);

    const toast = jest.fn();

    useToast.mockReturnValue(toast);

    const error = new Error('Error');

    setupEditProfile({}, { error });

    expect(toast).toHaveBeenCalledWith({
      title: 'Error Saving Changes',
      description: 'We could not save your changes. Please try again.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  });

  it('should display an succes message', () => {
    expect.assertions(1);

    const toast = jest.fn();

    useToast.mockReturnValue(toast);

    const profile = {
      id: '1',
    };

    setupEditProfile({}, {}, { data: { updateProfile: profile } });

    expect(toast).toHaveBeenCalledWith({
      title: 'Profile saved!',
      description: 'Changes saved successfully.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  });
});
