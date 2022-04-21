import {
  Circle,
  VisuallyHiddenInput,
  VisuallyHidden,
  Image,
  Box,
  Button,
  Center,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
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

export interface ImageUploadProps {
  onUpload: (data: Image) => void | Promise<void>;
  placeholder?: Image | null;
}

function ImageUpload({ onUpload = () => {}, placeholder = null }: ImageUploadProps) {
  const toast = useToast();
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

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
    maxSize: 2097152,
    onDrop: (files) => {
      setValue('image', files, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    },
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
    } catch (error) {
      logger.error(error);

      toast({
        title: 'Error Uploading Image',
        description: 'We could not upload your image. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
  const showIcon = !showPlaceholder && !imgFile;

  return (
    <Center
      as="form"
      name="image-upload"
      flexDirection="column"
      display="inline-flex"
      onSubmit={handleSubmit(onFormSubmit)}
      data-testid="image-upload-form"
    >
      <Circle
        bg="gray.100"
        color="gray.600"
        height="32"
        width="32"
        boxShadow={isDragActive ? 'outline' : 'none'}
        transition="all 0.2s ease-in-out"
        overflow="hidden"
        {...getRootProps()}
      >
        <Box as="label" htmlFor="image-upload">
          {showIcon && <FontAwesomeIcon icon={faCamera} title="Upload Image" size="2x" />}
          <VisuallyHidden>Upload Image</VisuallyHidden>
          <VisuallyHiddenInput type="file" name="image" id="image-upload" {...getInputProps()} />
        </Box>
        {showPlaceholder && (
          <Image
            src={getImageUrl(placeholder)}
            alt={placeholder?.title}
            data-testid="placeholder-img"
            height="100%"
            maxWidth="none"
          />
        )}
        {imgFile && <Image src={URL.createObjectURL(imgFile)} alt="Uploaded Image" height="100%" maxWidth="none" />}
      </Circle>
      <Flex mt={2} gap={1}>
        <Button
          type="submit"
          loadingText="Saving"
          colorScheme="teal"
          disabled={disabled}
          isLoading={isSubmitting}
          size="sm"
          flex="1 1 50%"
        >
          Save
        </Button>
        <Button size="sm" type="button" colorScheme="red" disabled={disabled} onClick={resetForm} flex="1 1 50%">
          Cancel
        </Button>
      </Flex>
    </Center>
  );
}

ImageUpload.defaultProps = {
  placeholder: null,
};

export default ImageUpload;
