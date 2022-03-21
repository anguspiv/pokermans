import FileTypeError from './FileTypeError';

describe('fileTypeError', () => {
  it('should through a file Type error', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileTypeError('test');
    };

    expect(expected).toThrow(FileTypeError);
  });

  it('should through a file Type error message', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileTypeError('test');
    };

    expect(expected).toThrow('test');
  });
});
