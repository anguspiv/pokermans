import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import PageLayout from '@components/layout/PageLayout';
import client from '@utils/apollo-client';
import theme from '@styles/theme';
import { createEmotionCache } from '@utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: typeof clientSideEmotionCache;
}

// eslint-disable-next-line react/function-component-definition
function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ChakraProvider>
            <ApolloProvider client={client}>
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </ApolloProvider>
          </ChakraProvider>
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

export default MyApp;
