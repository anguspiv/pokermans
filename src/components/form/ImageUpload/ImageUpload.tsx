import { Circle, VisuallyHiddenInput, VisuallyHidden, Image, Box, Button, Center, Flex } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { gql, useMutation } from '@apollo/client';
import logger from '@utils/logger';
import { getImageUrl } from '@utils/image';

const UPLOAD_IMAGE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      id
      filename
      filepath
      mimetype
      encoding
    }
  }
`;

const schema = yup.object().shape({
  image: yup.mixed().required('Image is required'),
});

export interface ImageUploadProps {
  onUpload: (data: unknown) => void | Promise<unknown>;
  placeholder?: Image;
}

function ImageUpload({ onUpload = () => {}, placeholder = null }: ImageUploadProps) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [imgFile, setImgFile] = useState(null);

  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      setValue('image', files, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    },
  });

  const resetForm = () => {
    reset();
    setImgFile(null);
  };

  const onFormSubmit = async (values) => {
    const { image } = values;

    try {
      const { data } = await uploadImage({ variables: { file: image } });
      await onUpload(data?.uploadImage);
    } catch (error) {
      logger.error(error);
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
          <Image src={getImageUrl(placeholder)} alt={placeholder?.title} data-testid="placeholder-img" />
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
