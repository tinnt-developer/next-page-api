import React from 'react';

import { NextPage } from 'next';

declare module 'next' {
  type NextPageWithAuth<Props> = NextPage<Props> & {
    auth?:
      | boolean
      | {
          roles?: string[];
          redirect?: string;
          loading?: React.ReactElement;
        };
  };
}
