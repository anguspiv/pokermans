import { getImageUrl } from './image';

describe('getImageUrl', () => {
  const OLD_ENV = process.env;

  const setup = () => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  };

  const teardown = () => {
    process.env = OLD_ENV;
  };

  it('should return a url for a given image', () => {
    expect.assertions(1);

    setup();

    const image = {
      filename: 'test.jpg',
      filepath: 'foo/bar/test.jpg',
    };

    process.env.NEXT_PUBLIC_CDN_URL = 'https://cdn.example.com';

    const url = getImageUrl(image);

    expect(url).toBe(`${process.env.NEXT_PUBLIC_CDN_URL}/foo/bar/test.jpg`);

    teardown();
  });

  it('should handle NEXT_PUBLIC_CDN_URL not set', () => {
    expect.assertions(1);

    setup();

    const image = {
      filename: 'test.jpg',
      filepath: 'foo/bar/test.jpg',
    };

    const url = getImageUrl(image);

    expect(url).toBe(`/foo/bar/test.jpg`);

    teardown();
  });
});
