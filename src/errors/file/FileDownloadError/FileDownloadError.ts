class FileDownloadError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'FileDownloadError';
  }
}

export default FileDownloadError;
