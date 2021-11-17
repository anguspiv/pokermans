import * as NextImage from 'next/image';

import { ChakraProvider } from '@chakra-ui/react';

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
};

const ThemeDecorator = (storyFn) => <ChakraProvider resetCSS>{storyFn()}</ChakraProvider>;

export const decorators = [ThemeDecorator];
