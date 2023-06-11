import React from 'react';

import { useSession } from 'next-auth/react';

export type Props = {
  children?: React.ReactNode;
} & AuthProps;

const Protected: React.FC<Props> = ({ children, loading }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return loading || <div>LOADING...</div>;
  }

  if (!session) {
    return <div>YOU NEED TO LOGIN TO SEE THIS PAGE</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Protected;
