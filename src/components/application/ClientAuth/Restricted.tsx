import React from 'react';

import { useSession } from 'next-auth/react';
import Router from 'next/router';

export type Props = {
  children?: React.ReactNode;
} & AuthProps;

const Restricted: React.FC<Props> = ({ children, loading, redirect }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated: redirect ? () => Router.push(redirect) : undefined,
  });

  if (status === 'loading') {
    return loading || <div>LOADING...</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Restricted;
