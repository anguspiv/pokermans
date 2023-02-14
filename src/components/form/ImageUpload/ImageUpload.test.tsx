import { fireEvent, render, waitFor } from '@testing-library/react';
import { useDropzone as useDropzoneOrig } from 'react-dropzone';
import { useMutation as useMutationOrig } from '@apollo/client';
import { getImageUrl } from '@utils/image';
import ImageUpload, { ImageUploadProps } from './ImageUpload';

jest.mock<typeof import('@apollo/client')>('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
}));

const FILE = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

jest.mock<typeof import('react-dropzone')>('react-dropzone', () => ({
  ...jest.requireActual('react-dropzone'),
  useDropzone: jest.fn().mockReturnValue({
    acceptedFiles: [],
    getRootProps: jest.fn(),
    getInputProps: jest.fn(),
    isDragActive: false,
  }),
}));

jest.mock<typeof import('@apollo/client')>('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
}));

const useMutation = useMutationOrig as jest.MockedFunction<typeof useMutationOrig>;
const useDropzone = useDropzoneOrig as jest.MockedFunction<typeof useDropzoneOrig>;

describe('<ImageUpload />', () => {
  const setupImageUpload = (props: ImageUploadProps = {}) => {
    return render(<ImageUpload {...props} />);
  };

  it('should render a form', () => {
    expect.assertions(1);

    const { getByRole } = setupImageUpload();

    expect(getByRole('form')).toBeInTheDocument();
  });

  it('should render the file input', () => {
    expect.assertions(1);

    const { getByLabelText } = setupImageUpload();

    expect(getByLabelText('Upload Image')).toBeInTheDocument();
  });

  it('should render the save button', () => {
    expect.assertions(1);

    const { getByRole } = setupImageUpload();

    expect(getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('should render the cancel button', () => {
    expect.assertions(1);

    const { getByRole } = setupImageUpload();

    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('should render the icon', () => {
    expect.assertions(1);

    const { getByRole } = setupImageUpload();

    expect(getByRole('img')).toHaveAttribute('data-icon', 'camera');
  });

  it('should preview the image on image select', async () => {
    expect.hasAssertions();

    global.URL = {
      ...global.URL,
      createObjectURL: jest.fn().mockReturnValue('/image.png'),
    };

    useDropzone.mockClear().mockReturnValue({
      acceptedFiles: [FILE],
      getRootProps: jest.fn(),
      getInputProps: jest.fn(),
      isDragActive: false,
    });

    const { getByRole } = setupImageUpload();

    await waitFor(() => expect(getByRole('img')).toHaveAttribute('src', URL.createObjectURL(FILE)));
  });

  it('should disable the save button', () => {
    expect.assertions(1);

    const { getByRole } = setupImageUpload();

    expect(getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('should disable the cancel button', () => {
    expect.assertions(1);

    const { getByRole } = setupImageUpload();

    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('should enable the save button', async () => {
    expect.assertions(1);

    useDropzone.mockImplementation(({ onDrop }) => {
      onDrop([FILE]);

      return {
        acceptedFiles: [FILE],
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        isDragActive: false,
      };
    });

    const { getByRole } = setupImageUpload();

    await waitFor(() => expect(getByRole('button', { name: 'Save' })).not.toBeDisabled());
  });

  it('should enable the cancel button', async () => {
    expect.assertions(1);

    useDropzone.mockImplementation(({ onDrop }) => {
      onDrop([FILE]);

      return {
        acceptedFiles: [FILE],
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        isDragActive: false,
      };
    });

    const { getByRole } = setupImageUpload();

    await waitFor(() => expect(getByRole('button', { name: 'Cancel' })).not.toBeDisabled());
  });

  it('should call the onUpload callback', async () => {
    expect.hasAssertions();

    const onUpload = jest.fn();

    const data = {
      uploadImage: {
        id: '1',
        url: 'http://image.png',
      },
    };

    useDropzone.mockImplementation(({ onDrop }) => {
      onDrop([FILE]);

      return {
        acceptedFiles: [FILE],
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        isDragActive: false,
      };
    });

    const uploadImage = jest.fn().mockResolvedValue({ data });

    useMutation.mockClear().mockReturnValue([uploadImage, {}]);

    const { getByRole } = setupImageUpload({ onUpload });

    await waitFor(() => fireEvent.click(getByRole('button', { name: 'Save' })));

    expect(onUpload).toHaveBeenCalledWith(data.uploadImage);
  });

  it('should reset the form on upload', async () => {
    expect.hasAssertions();

    const onUpload = jest.fn();

    const data = {
      uploadImage: {
        id: '1',
        url: 'http://image.png',
      },
    };

    useDropzone.mockImplementation(({ onDrop }) => {
      onDrop([FILE]);

      return {
        acceptedFiles: [FILE],
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        isDragActive: false,
      };
    });

    const uploadImage = jest.fn().mockResolvedValue({ data });

    useMutation.mockClear().mockReturnValue([uploadImage, {}]);

    const { getByRole, getByLabelText } = setupImageUpload({ onUpload });

    await waitFor(() => fireEvent.click(getByRole('button', { name: 'Save' })));

    expect(getByLabelText('Upload Image')).toHaveValue('');
  });

  it('should reset the form on cancel', async () => {
    expect.hasAssertions();

    useDropzone.mockImplementation(({ onDrop }) => {
      onDrop([FILE]);

      return {
        acceptedFiles: [FILE],
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        isDragActive: false,
      };
    });

    const { getByRole, getByLabelText } = setupImageUpload();

    await waitFor(() => fireEvent.click(getByRole('button', { name: 'Cancel' })));

    expect(getByLabelText('Upload Image')).toHaveValue('');
  });

  it('should display the placeholder image', () => {
    expect.hasAssertions();

    const placeholder = {
      filename: 'placeholder.png',
      filepath: '/some/path',
    };

    useDropzone.mockImplementation(() => {
      return {
        acceptedFiles: [],
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        isDragActive: false,
      };
    });

    const { getByTestId } = setupImageUpload({ placeholder });

    expect(getByTestId('placeholder-img')).toHaveAttribute('src', getImageUrl(placeholder));
  });
});
