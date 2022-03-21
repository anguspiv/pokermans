import FileUploadError from './FileUploadError';

describe('fileUploadError', () => {
  it('should through a file upload error', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileUploadError('test');
    };

    expect(expected).toThrow(FileUploadError);
  });

  it('should through a file upload error message', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileUploadError('test');
    };

    expect(expected).toThrow('test');
  });
});
