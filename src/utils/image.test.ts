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
      filepath: '/foo/bar',
    };

    process.env.CDN_URL = 'https://cdn.example.com';

    const url = getImageUrl(image);

    expect(url).toBe(`${process.env.CDN_URL}/foo/bar/test.jpg`);

    teardown();
  });

  it('should handle CDN_URL not set', () => {
    expect.assertions(1);

    setup();

    const image = {
      filename: 'test.jpg',
      filepath: '/foo/bar',
    };

    const url = getImageUrl(image);

    expect(url).toBe(`/foo/bar/test.jpg`);

    teardown();
  });
});
