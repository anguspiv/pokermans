import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageLayout from '../src/components/layout/PageLayout';

// eslint-disable-next-line react/function-component-definition
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
