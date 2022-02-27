import * as NextImage from 'next/image';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ChakraProvider } from '@chakra-ui/react';
import { MockedProvider } from '@apollo/client/testing';

const OriginalImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalImage {...props} unoptimized />,
});

import '../styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push() {},
  },
  apolloClient: {
    MockedProvider,
  },
};

const ThemeDecorator = (storyFn) => <ChakraProvider resetCSS>{storyFn()}</ChakraProvider>;

export const decorators = [ThemeDecorator];
