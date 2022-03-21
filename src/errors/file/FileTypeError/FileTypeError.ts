class FileTypeError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'FileTypeError';
  }
}

export default FileTypeError;
