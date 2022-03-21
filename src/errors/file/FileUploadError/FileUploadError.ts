class FileUploadError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export default FileUploadError;
