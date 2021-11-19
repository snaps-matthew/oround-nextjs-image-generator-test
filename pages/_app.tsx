import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Logger from 'logger';
import { NextWebVitalsMetric } from 'next/app';
import { Provider } from 'react-redux';
import store from 'app/store';

import 'styles/globals.css';
import 'tailwindcss/tailwind.css';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  Logger.info('report web vitals');
  Logger.info(metric);
}

function SnapsApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(SnapsApp);
