import { LoadingButton } from '@mui/lab';
import { Alert, Avatar, Box, Button, Snackbar, AlertColor } from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState, useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { gql, useMutation } from '@apollo/client';
import logger from '@utils/logger';
import { getImageUrl } from '@utils/image';

export const UPLOAD_IMAGE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      id
      filename
      filepath
    }
  }
`;

const schema = yup.object().shape({
  image: yup.mixed().required('Image is required'),
});

const HiddenInput = styled('input')(() => ({
  display: 'none',
}));

export interface ImageUploadProps {
  onUpload?: (data: Image) => void | Promise<void>;
  placeholder?: Image | null;
}

function ImageUpload({ onUpload = () => {}, placeholder = null }: ImageUploadProps) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<AlertColor>();
  const {
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [imgFile, setImgFile] = useState<null | File>(null);

  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      setValue('image', acceptedFiles, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    },
    [setValue],
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    },
    maxSize: 2097152,
    onDrop,
  });

  const resetForm = () => {
    reset();
    setImgFile(null);
  };

  const onFormSubmit = async ({ image }: FieldValues) => {
    const [file] = image;

    try {
      const { data } = await uploadImage({ variables: { file } });

      logger.debug('data', data);
      await onUpload(data?.uploadImage);

      setMessageType('success');
      setMessage('Image Saved!');
    } catch (error) {
      logger.error(error);
      setMessageType('error');
      setMessage('Error Uploading Image');
    }

    resetForm();
  };

  useEffect(() => {
    const [file] = acceptedFiles;

    setImgFile(file);
  }, [acceptedFiles]);

  register('image');

  const disabled = !isDirty || isSubmitting;
  const showPlaceholder = !isDirty && !isSubmitting && !isDragActive && !imgFile && placeholder;
  let imageSrc;

  if (showPlaceholder) {
    imageSrc = getImageUrl(placeholder);
  }

  if (imgFile) {
    imageSrc = URL.createObjectURL(imgFile);
  }

  const handleMessageClose = () => {
    setMessage('');
    setMessageType(undefined);
  };

  return (
    <Box
      component="form"
      name="image-upload"
      onSubmit={handleSubmit(onFormSubmit)}
      data-testid="image-upload-form"
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Avatar sx={{ width: 120, height: 120, m: 1 }} alt="Upload Image" src={imageSrc} {...getRootProps()}>
          <CameraAltIcon fontSize="large" />
        </Avatar>
        <Box component="label" htmlFor="image-upload" sx={{ display: 'none' }}>
          <span>Upload Image</span>
          <HiddenInput type="file" name="image" id="image-upload" {...getInputProps()} />
        </Box>
      </Box>
      <Box>
        <LoadingButton
          type="submit"
          loadingPosition="start"
          variant="contained"
          loading={isSubmitting}
          disabled={disabled}
          startIcon={<SaveIcon />}
          sx={{ m: 0.5 }}
        >
          Save
        </LoadingButton>
        <Button
          type="button"
          disabled={disabled}
          variant="contained"
          color="secondary"
          onClick={resetForm}
          sx={{ m: 0.5 }}
        >
          Cancel
        </Button>
      </Box>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleMessageClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert sx={{ width: '100%' }} onClose={handleMessageClose} severity={messageType}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

ImageUpload.defaultProps = {
  placeholder: null,
};

export default ImageUpload;
