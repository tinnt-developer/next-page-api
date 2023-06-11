import qs from 'querystring';

import React from 'react';

import Link from 'next/link';

import {
  GetServerSideWithInjectedPropsContext,
  withAdminAuth,
  withAutoInjectSession,
  withCacheControl,
  withExternalAuth,
} from 'src/libs/server/gssp';
import { compose } from 'src/util/helper';

export default function GSSP({ events }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <Link
        href={{
          href: '/',
          query: {
            is_published: true,
          },
        }}
      >
        Test
      </Link>
    </main>
  );
}

export const getServerSideProps = compose(
  withExternalAuth,
  withAdminAuth,
  withCacheControl,
  withAutoInjectSession,
)(async ({ query, req }: GetServerSideWithInjectedPropsContext<any, any>) => {
  const response = await fetch(
    `${process.env.API_URL}/events?${qs.stringify(query)}`,
    {
      method: 'GET',
      headers: {
        Authorization: req.headers.authorization!,
      },
    },
  );

  const data = await response.json();

  return {
    props: {
      events: data.data || data,
    },
  };
});
