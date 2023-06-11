import React from 'react';

import { NextPageWithAuth } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export type Props = {
  className?: string;
};

const Protected: NextPageWithAuth<Props> = () => {
  const { data } = useSession();

  return (
    <React.Fragment>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        YOU CAN READ NOW
        {data ? (
          <button onClick={() => signOut()}>SignOut</button>
        ) : (
          <button onClick={() => signIn()}>SignIn</button>
        )}
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
    </React.Fragment>
  );
};

Protected.auth = {
  isProtected: true,
};

export default Protected;
