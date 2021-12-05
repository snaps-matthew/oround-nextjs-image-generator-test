import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import 'styles/globals.css';
import 'tailwindcss/tailwind.css';

function SnapsApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default appWithTranslation(SnapsApp);
