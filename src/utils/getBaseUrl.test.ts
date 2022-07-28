import { getBaseUrl } from './getBaseUrl';

describe('getBaseUrl', () => {
  const orig = process.env;

  const setup = (env) => {
    process.env = { ...orig, ...env };
  };

  const teardown = () => {
    process.env = orig;
  };

  it('should return the dev base url', () => {
    expect.assertions(1);

    setup({
      NODE_ENV: 'development',
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    });

    const baseUrl = getBaseUrl();

    expect(baseUrl).toBe('http://localhost:3000');

    teardown();
  });

  it('should return the public base url', () => {
    expect.assertions(1);

    setup({
      NODE_ENV: 'production',
      NEXT_PUBLIC_VERCEL_URL: 'vercel.example.com',
    });

    const baseUrl = getBaseUrl();

    expect(baseUrl).toBe('https://vercel.example.com');

    teardown();
  });
});
