// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  webpack: (config) => ({
    ...config,
    reactStrictMode: true,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'graphql-upload': path.join(__dirname, 'node_modules/graphql-upload/dist/graphql-upload.umd.js'),
      },
    },
  }),
};
