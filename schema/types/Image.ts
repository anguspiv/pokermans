import { v4 as uuid } from 'uuid';
import { objectType, extendType, inputObjectType, arg } from 'nexus';
// eslint-disable-next-line import/extensions
import { FileUpload } from 'graphql-upload/processRequest.mjs';
import bytes from 'bytes';
import path from 'path';
import { UserInputError, AuthenticationError } from 'apollo-server-micro';
import { isImageMimeType, MAX_IMAGE_SIZE, getFileSize, uploadFile } from '../../src/utils/cdn';
import { FileTypeError, FileSizeError } from '../../src/errors/file';
import logger from '../../src/utils/logger';

interface ImageWhere {
  id?: string;
}

interface StorageFileOptions {
  filename?: string;
  path?: string;
}

const uploadImage = async (
  { filename, mimetype, encoding, createReadStream }: FileUpload,
  { filename: rename, path: subpath }: StorageFileOptions,
) => {
  logger.debug(`Uploading image:`, { filename, mimetype, encoding, createReadStream });

  const isImage = isImageMimeType(mimetype);

  if (!isImage) {
    throw new FileTypeError('file is not a valid image');
  }

  const ext = path.extname(filename);
  const newFilename = rename || filename.replace(ext, '');
  const filepath = path.join('images', subpath || '', `${newFilename}${ext}`);

  try {
    await getFileSize(createReadStream, MAX_IMAGE_SIZE);
  } catch (err) {
    let error = err;

    if (err instanceof FileSizeError) {
      const message = `file size is too large. Max size is ${bytes(MAX_IMAGE_SIZE)}`;
      error = new UserInputError(message);
    }

    throw error;
  }

  await uploadFile(createReadStream, filepath);

  return {
    filename: newFilename,
    filepath,
    mimetype,
    encoding,
  };
};

export const Image = objectType({
  name: 'Image',
  description: 'Image information for display',
  definition(t) {
    t.string('id', { description: 'The Image ID' });
    t.string('filename', { description: 'The Image filename' });
    t.string('mimeType', { description: 'The Image mimeType' });
    t.string('encoding', { description: 'The Image encoding' });
    t.string('filepath', { description: 'The Image filepath' });
    t.string('description', { description: 'The Image description' });
    t.string('title', { description: 'The Image title' });
  },
});

export const ImageInput = inputObjectType({
  name: 'ImageInput',
  description: 'Image Input',
  definition(t) {
    t.string('id', { description: 'The Image ID' });
  },
});

export const ImageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('image', {
      type: 'Image',
      description: 'Find an Image',
      args: { input: ImageInput },
      resolve(_parent, args, { prisma }) {
        const { id } = args.input || {};

        const where: ImageWhere = {};

        if (id) {
          where.id = id;
        }

        return prisma.image.findUnique({
          where,
        });
      },
    });
  },
});

export const ImageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('uploadImage', {
      type: 'Image',
      description: 'Upload an Image',
      args: {
        file: arg({ type: 'Upload' }),
      },
      resolve: async (_parent, args, { prisma, token }) => {
        const file = await args.file;
        logger.debug('uploadImage', { file });
        const guid = uuid();
        const userId = token?.sub || '';

        if (!userId) {
          throw new AuthenticationError('You must be logged in to upload an image');
        }

        const fileData = await uploadImage(file, {
          filename: guid,
          path: 'uploads',
        });

        const data = {
          ...fileData,
          uploadUser: userId,
          id: guid,
        };

        return prisma.image.create({
          data,
        });
      },
    });
  },
});
