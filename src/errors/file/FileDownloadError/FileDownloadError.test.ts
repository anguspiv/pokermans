import FileDownloadError from './FileDownloadError';

describe('fileDownloadError', () => {
  it('should through a file download error', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileDownloadError('test');
    };

    expect(expected).toThrow(FileDownloadError);
  });

  it('should through a file download error message', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileDownloadError('test');
    };

    expect(expected).toThrow('test');
  });
});
