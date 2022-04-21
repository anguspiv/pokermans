import { Readable, Writable } from 'stream';
import { FileSizeError } from '../errors/file';
import { getFileSize, uploadFile, isImageMimeType } from './cdn';

const mockReadStream = jest.fn().mockImplementation(() => {
  const readable = new Readable();
  readable.push('hello');
  readable.push('world');
  readable.push(null);

  return readable;
});

class WriteMemory extends Writable {
  constructor() {
    super();
    this.buffer = '';
  }

  // eslint-disable-next-line no-underscore-dangle
  _write(chunk, _, next) {
    this.buffer += chunk;
    next();
  }

  reset() {
    this.buffer = '';
  }
}

const MockWriteStream = new WriteMemory();

// eslint-disable-next-line jest/require-hook
let mockedCreateWriteStream = jest.fn();
// eslint-disable-next-line jest/require-hook
let mockedFile = jest.fn();

let mockedBucket;

jest.mock('@google-cloud/storage', () => {
  return {
    Storage: jest.fn().mockImplementation(() => {
      mockedBucket = jest.fn().mockImplementation(() => {
        mockedFile = jest.fn().mockImplementation(() => {
          mockedCreateWriteStream = jest.fn().mockImplementation(() => {
            MockWriteStream.reset();
            return MockWriteStream;
          });

          return {
            createReadStream: jest.fn(),
            createWriteStream: mockedCreateWriteStream,
          };
        });

        return {
          file: mockedFile,
        };
      });

      return {
        bucket: mockedBucket,
      };
    }),
  };
});

describe('cdn utils', () => {
  describe('getBucket', () => {});

  describe('getFileSize', () => {
    it('should resolve with filesize', async () => {
      expect.assertions(1);
      const expected = 10;

      const filesize = await getFileSize(mockReadStream);
      expect(filesize).toBe(expected);
    });

    it('should throw a FileSizeError', async () => {
      expect.assertions(4);

      let error;

      try {
        await getFileSize(mockReadStream, 1);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(FileSizeError);
      expect(error.message).toBe('File size is too large (10 bytes).');
      expect(error.max).toBe(1);
      expect(error.filesize).toBe(10);
    });
  });

  describe('uploadFile', () => {
    it('should resolve the file upload', async () => {
      expect.assertions(2);

      await uploadFile(mockReadStream, 'test');

      expect(mockedFile).toHaveBeenCalledWith('test');
      expect(mockedCreateWriteStream).toHaveBeenCalledWith({
        predefinedAcl: 'publicRead',
        resumable: false,
        gzip: true,
      });
    });
  });

  describe('isImageMimeType', () => {
    it.each([
      ['image/jpeg', true],
      ['image/png', true],
      ['image/gif', true],
      ['image/webp', true],
      ['image/svg+xml', true],
      ['text/plain', false],
      ['application/pdf', false],
      ['application/msword', false],
      ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', false],
      ['application/vnd.ms-excel', false],
      ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', false],
    ])('%s should return %s', (mimeType, expected) => {
      expect.assertions(1);

      expect(isImageMimeType(mimeType)).toBe(expected);
    });
  });
});
