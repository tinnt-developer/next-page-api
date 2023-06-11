import React from 'react';

import { NextPageWithAuth } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import useSWR from 'swr';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPageWithAuth<{ events: any[] }> = ({ events }) => {
  const { data } = useSession();

  const { data: list } = useSWR('/api/events', (url) =>
    fetch(url).then((res) => res.json()),
  );

  console.log(list);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
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
  );
};

export default Home;
