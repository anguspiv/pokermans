module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!**/src/**/*.stories.{js,jsx,ts,tsx}',
    '!**/src/**/*.index.{js,jsx,ts,tsx}',
    '!**/src/db/**/*',
    '!**/src/graphql/**/*',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/stories/**',
    '!**/coverage/**',
    '!.next/**',
    '!**/styles/**',
    '!**/utils/createEmotionCache.ts',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -25,
    },
  },
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@context(.*)$': '<rootDir>/src/context$1',
    '^@db(.*)$': '<rootDir>/src/db$1',
    '^@graphql(.*)$': '<rootDir>/src/graphql$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@schema(.*)$': '<rootDir>/schema$1',
    '^@errors(.*)$': '<rootDir>/src/errors$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/cypress/'],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
