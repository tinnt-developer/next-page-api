import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';

import 'src/styles/globals.css';

import { SWRConfig } from 'swr';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}
