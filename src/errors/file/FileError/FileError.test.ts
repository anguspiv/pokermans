import FileError from './FileError';

describe('fileError', () => {
  it('should through a file error', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileError('test');
    };

    expect(expected).toThrow(FileError);
  });

  it('should through a file error message', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileError('test');
    };

    expect(expected).toThrow('test');
  });
});
