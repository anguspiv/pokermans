import '../styles/globals.css';
import type { AppProps } from 'next/app';

// eslint-disable-next-line react/function-component-definition
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
