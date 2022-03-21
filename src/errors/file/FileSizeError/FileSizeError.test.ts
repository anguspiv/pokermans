import FileSizeError from './FileSizeError';

describe('fileSizeError', () => {
  it('should through a file Size error', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileSizeError('test');
    };

    expect(expected).toThrow(FileSizeError);
  });

  it('should through a file Size error message', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileSizeError('test');
    };

    expect(expected).toThrow('test');
  });

  it('should have the max file size', () => {
    expect.assertions(1);
    let error;

    try {
      throw new FileSizeError('test', { max: 10 });
    } catch (err) {
      error = err;
    }

    expect(error.max).toBe(10);
  });

  it('should have the file size', () => {
    expect.assertions(1);
    let error;

    try {
      throw new FileSizeError('test', { filesize: 100 });
    } catch (err) {
      error = err;
    }

    expect(error.filesize).toBe(100);
  });
});
