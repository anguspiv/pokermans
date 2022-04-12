class FileError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'FileError';
  }
}

export default FileError;
