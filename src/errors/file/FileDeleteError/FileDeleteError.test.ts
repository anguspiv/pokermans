import FileDeleteError from './FileDeleteError';

describe('fileDeleteError', () => {
  it('should through a file Delete error', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileDeleteError('test');
    };

    expect(expected).toThrow(FileDeleteError);
  });

  it('should through a file Delete error message', () => {
    expect.assertions(1);

    const expected = () => {
      throw new FileDeleteError('test');
    };

    expect(expected).toThrow('test');
  });
});
