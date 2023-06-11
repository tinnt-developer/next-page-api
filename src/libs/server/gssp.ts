import { ParsedUrlQuery } from 'querystring';

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getServerSession, Session } from 'next-auth';

import { options } from 'src/pages/api/auth/[...nextauth]';
import { isAdmin } from 'src/util/helper';

export type GetServerSideWithInjectedPropsContext<
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Injected extends InjectedProps = InjectedProps,
> = GetServerSidePropsContext<Params> & {
  injected: Injected;
};

export type GetServerSideWithInjectedProps<
  Props,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Injected extends InjectedProps = InjectedProps,
> = (
  context: GetServerSideWithInjectedPropsContext<Params, Injected>,
) => Promise<GetServerSidePropsResult<Props>>;

export type InjectedProps = {
  session: Session;
};

export type Options = Partial<{
  cacheMaxAge: number;
}>;

export function withExternalAuth<
  Props extends Record<string, any> = Record<string, any>,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
>(gssp: GetServerSideWithInjectedProps<Props, Params>, gsspOptions?: Options) {
  return async (ctx: GetServerSideWithInjectedPropsContext<Params>) => {
    const { req, res } = ctx;

    const session = await getServerSession(req, res, options);

    if (!session) {
      return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        },
      };
    }

    req.headers.authorization = `Bearer ${session.token.access_token}`;

    return gssp({ ...ctx, injected: { session } });
  };
}

export function withAdminAuth<
  Props extends Record<string, any> = Record<string, any>,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
>(gssp: GetServerSideWithInjectedProps<Props, Params>, options?: Options) {
  return async (ctx: GetServerSideWithInjectedPropsContext<Params>) => {
    const { injected } = ctx;

    if (!isAdmin(injected.session)) {
      return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        },
      };
    }

    return gssp(ctx);
  };
}

export function withAutoInjectSession<
  Props extends Record<string, any> = Record<string, any> & {
    session: Session;
  },
  Params extends ParsedUrlQuery = ParsedUrlQuery,
>(gssp: GetServerSideWithInjectedProps<Props, Params>, options?: Options) {
  return async (ctx: GetServerSideWithInjectedPropsContext<Params>) => {
    const { injected } = ctx;
    const result = await gssp(ctx);

    if ('props' in result) {
      return {
        props: {
          ...result.props,
          session: injected.session,
        },
      };
    }

    return result;
  };
}

export function withCacheControl<
  Props extends Record<string, any> = Record<string, any>,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
>(gssp: GetServerSideWithInjectedProps<Props, Params>, options?: Options) {
  return async (ctx: GetServerSideWithInjectedPropsContext<Params>) => {
    const { res } = ctx;

    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${
        options?.cacheMaxAge || 10
      }, stale-while-revalidate=59`,
    );

    return gssp(ctx);
  };
}
