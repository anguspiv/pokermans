import FileError from '../FileError';

export interface FileSizeErrorOptions {
  max?: number;
  filesize?: number;
}

class FileSizeError extends FileError {
  max: number | undefined;

  filesize: number | undefined;

  constructor(message?: string, { max, filesize }: FileSizeErrorOptions = {}) {
    super(message);
    this.name = 'FileSizeError';
    this.max = max;
    this.filesize = filesize;
  }
}

export default FileSizeError;
