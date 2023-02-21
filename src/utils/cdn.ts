import { Storage } from '@google-cloud/storage';
// eslint-disable-next-line import/extensions
import type { FileUpload } from 'graphql-upload/Upload.js';
import { FileSizeError } from '../errors/file';

export const MAX_IMAGE_SIZE = 2097152; // 2MB
export const MAX_FILE_SIZE = 5242880; // 5MB

export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

const getBucket = () => {
  const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: {
      client_email: process.env.GCLOUD_CLIENT_EMAIL,
      private_key: process.env.GCLOUD_PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(`${process.env.GCLOUD_STORAGE_BUCKET}`);

  return bucket;
};

export const isImageMimeType = (mimeType: string) => IMAGE_MIME_TYPES.includes(mimeType);

export const getFileSize = async (createReadStream: FileUpload['createReadStream'], max: number = MAX_FILE_SIZE) => {
  const stream = createReadStream();
  let filesize = 0;

  const promise = new Promise((resolve, reject) => {
    stream.on('data', ({ length }) => {
      filesize += length;
    });

    stream.on('end', () => {
      if (filesize > max) {
        reject(
          new FileSizeError(`File size is too large (${filesize} bytes).`, {
            max,
            filesize,
          }),
        );
      }

      resolve(filesize);
    });

    stream.on('error', (err) => reject(err));
  });

  return promise;
};

export const uploadFile = async (createReadStream: FileUpload['createReadStream'], filename: string) => {
  const bucket = getBucket();

  const file = bucket.file(filename);

  const stream = createReadStream();

  const writeStream = file.createWriteStream({
    predefinedAcl: 'publicRead',
    resumable: false,
    gzip: true,
  });

  const promise = new Promise((resolve, reject) => {
    stream.on('error', (err) => reject(err));

    stream.on('end', () => resolve(file));

    stream.pipe(writeStream);
  });

  return promise;
};
