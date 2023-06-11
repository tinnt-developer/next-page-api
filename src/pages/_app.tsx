import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import 'src/styles/globals.css';

import { SWRConfig } from 'swr';

import { ClientAuth } from 'src/components/application';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig>
        <ClientAuth component={Component} pageProps={pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}
