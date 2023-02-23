import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import PageLayout from '@components/layout/PageLayout';
import client from '@utils/apollo-client';
import '../styles/globals.css';

// eslint-disable-next-line react/function-component-definition
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </ApolloProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
