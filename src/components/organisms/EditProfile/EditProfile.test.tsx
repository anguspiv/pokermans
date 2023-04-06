import { useQuery as useQueryOrig, useMutation as useMutationOrig, QueryResult } from '@apollo/client';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { useDropzone } from 'react-dropzone';
import logger from '@utils/logger';
import { EditProfile, EditProfileProps } from './EditProfile';

const FILE = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

jest.mock<typeof import('@apollo/client')>('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
}));

jest.mock<typeof import('react-dropzone')>('react-dropzone', () => ({
  ...jest.requireActual('react-dropzone'),
  useDropzone: jest.fn().mockReturnValue({
    acceptedFiles: [],
    getRootProps: jest.fn(),
    getInputProps: jest.fn(),
    isDragActive: false,
  }),
}));

const useQuery = useQueryOrig as jest.MockedFunction<typeof useQueryOrig>;
const useMutation = useMutationOrig as jest.MockedFunction<typeof useMutationOrig>;

const useMutate = jest.fn();

describe('<EditProfile />', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    logger.wrapAll();
  });

  const setupEditProfile = (
    props: EditProfileProps,
    { profile, ...getQuery } = {
      profile: {},
    },
    results = {} as QueryResult<unknown>,
  ) => {
    logger.mockTypes(() => jest.fn());

    const queryResults = {
      data: {
        profile,
      },
      loading: false,
      ...getQuery,
    } as QueryResult<unknown, unknown>;

    const mutationResults = {
      reset: () => {},
      ...results,
    };

    // ts-ignore
    useQuery.mockReturnValue(queryResults);

    useMutation.mockReturnValue([useMutate, mutationResults]);

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

    setupEditProfile({}, { profile });

    await waitFor(() => expect(screen.getByDisplayValue('John')).toBeInTheDocument());
  });

  it('should save the form values', async () => {
    expect.hasAssertions();

    const profile = {
      id: '1',
      userId: '1',
      firstName: 'John',
      lastName: 'Doe',
    };

    setupEditProfile({}, { profile });

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });

    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Save' })[1]).not.toBeDisabled());

    fireEvent.click(screen.getAllByRole('button', { name: 'Save' })[1]);

    await waitFor(() =>
      expect(useMutate).toHaveBeenCalledWith({
        variables: {
          input: {
            firstName: 'Jane',
            lastName: 'Doe',
            nickname: '',
            bio: '',
          },
        },
      }),
    );
  });

  it('should set the form loading while waiting to fetch profile', () => {
    expect.assertions(1);

    setupEditProfile({}, { loading: true });

    expect(screen.getAllByRole('button', { name: /Save/i })[1]).toBeDisabled();
  });

  it('should set the form loading while waiting to save profile', async () => {
    expect.assertions(1);

    const { getAllByRole } = setupEditProfile({}, {}, { loading: true });

    const button = getAllByRole('button', { name: /Save/i })[1];

    expect(button).toBeDisabled();
  });

  it('should display an error message', async () => {
    expect.hasAssertions();

    const error = new Error('Something went wrong');

    const profile = {
      id: '1',
      userId: '1',
      firstName: 'John',
      lastName: 'Doe',
    };

    setupEditProfile({}, { profile });

    useMutate.mockImplementation(() => {
      throw error;
    });

    fireEvent.change(screen.getByDisplayValue('John'), { target: { value: 'Jane' } });

    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Save' })[1]).not.toBeDisabled());

    fireEvent.click(screen.getAllByRole('button', { name: 'Save' })[1]);

    await waitFor(() => expect(logger.error).toHaveBeenCalledWith(error));

    await waitFor(() => expect(screen.getByText('Error saving profile')).toBeInTheDocument());
  });

  it('should display an succes message', async () => {
    expect.hasAssertions();

    const profile = {
      id: '1',
      userId: '1',
      firstName: 'John',
      lastName: 'Doe',
    };

    const { getByDisplayValue, getAllByRole } = setupEditProfile({}, { profile });

    useMutate.mockResolvedValue(profile);

    fireEvent.change(getByDisplayValue('John'), { target: { value: 'Jane' } });

    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Save' })[1]).not.toBeDisabled());

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    await waitFor(() => expect(screen.getByText('Profile saved')).toBeInTheDocument());
  });

  it('should display the image upload form', () => {
    expect.assertions(1);

    setupEditProfile();

    expect(screen.getByTestId('image-upload-form')).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should set the new avatar id', async () => {
    expect.hasAssertions();

    global.URL = {
      ...global.URL,
      createObjectURL: jest.fn().mockReturnValue('/image.png'),
    };

    const imageId = '1';

    useMutate.mockClear().mockResolvedValue({ data: { uploadImage: { id: imageId } } });

    let clicked = false;

    useDropzone.mockImplementation(({ onDrop }) => {
      // eslint-disable-next-line jest/no-conditional-in-test
      if (!clicked) {
        clicked = true;
        onDrop([FILE]);
      }
      // onDrop([FILE]);

      return {
        acceptedFiles: [FILE],
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        isDragActive: false,
      };
    });

    const { getAllByRole } = setupEditProfile({}, {});

    fireEvent.click(getAllByRole('button', { name: 'Save' })[0]);

    await waitFor(() => {
      return expect(useMutate).toHaveBeenCalledWith({
        variables: {
          input: {
            avatarId: imageId,
          },
        },
      });
    });
  });
});
