class FileDeleteError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'FileDeleteError';
  }
}

export default FileDeleteError;
