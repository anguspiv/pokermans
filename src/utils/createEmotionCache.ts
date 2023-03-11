import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

export function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotioninsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]');
    insertionPoint = (emotioninsertionPoint as HTMLElement) ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}

export default createEmotionCache;
