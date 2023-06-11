import { NextPage } from 'next';

declare module 'next' {
  type NextPageWithAuth<Props> = NextPage<Props> & {
    auth?: AuthProps;
  };

  interface NextApiRequest {
    header?: Headers;
  }
}
