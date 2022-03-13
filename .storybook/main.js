const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
    'storybook-addon-apollo-client',
  ],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': '@emotion/react',
          'emotion-theming': '@emotion/react',
          '@components': path.resolve(__dirname, '../src/components'),
          '@pages': path.resolve(__dirname, '../pages'),
          '@db': path.resolve(__dirname, '../src/db'),
          '@graphql': path.resolve(__dirname, '../src/graphql'),
          '@schema': path.resolve(__dirname, '../src/schema'),
          '@utils': path.resolve(__dirname, '../src/utils'),
        },
      },
    };
  },
};
