import React from 'react';

import { NextPageWithAuth } from 'next';

import Protected from './Protected';
import Restricted from './Restricted';

export type Props = {
  className?: string;
  component: NextPageWithAuth<any>;
  pageProps?: any;
};

const ClientAuth: React.FC<Props> = ({
  className,
  pageProps,
  component: Component,
}) => {
  const { isRestricted, isProtected } = Component.auth || {};

  if (isRestricted) {
    return (
      <Restricted {...Component.auth}>
        <Component {...pageProps} />
      </Restricted>
    );
  }

  if (isProtected) {
    return (
      <Protected {...Component.auth}>
        <Component {...pageProps} />
      </Protected>
    );
  }

  return <Component {...pageProps} />;
};

export default ClientAuth;
