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
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // speeds up storybook build time
      allowSyntheticDefaultImports: false,
      // speeds up storybook build time
      esModuleInterop: false,
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) => (prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true),
    },
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
          '@context': path.resolve(__dirname, '../src/context'),
          '@pages': path.resolve(__dirname, '../pages'),
          '@db': path.resolve(__dirname, '../src/db'),
          '@graphql': path.resolve(__dirname, '../src/graphql'),
          '@schema': path.resolve(__dirname, '../schema'),
          '@utils': path.resolve(__dirname, '../src/utils'),
          '@errors': path.resolve(__dirname, '../src/errors'),
          '@styles': path.resolve(__dirname, '../src/styles'),
        },
      },
    };
  },
};
