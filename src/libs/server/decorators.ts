import { NextApiRequest, NextApiResponse } from 'next';
import {
  createMiddlewareDecorator,
  createParamDecorator,
  NextFunction,
  UnauthorizedException,
} from 'next-api-decorators';
import { getServerSession } from 'next-auth';

import { options } from 'src/pages/api/auth/[...nextauth]';
import { isAdmin } from 'src/util/helper';

export const AuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getServerSession(req, res, options);

    if (!session) {
      throw new UnauthorizedException(
        'Unauthorized. Internal auth guard error.',
      );
    }

    req.headers.authorization = `Bearer ${session.token.access_token}`;

    return next();
  },
);

export const AdminGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getServerSession(req, res, options);

    if (!session || !isAdmin(session)) {
      throw new UnauthorizedException(
        'Unauthorized. Internal admin guard error.',
      );
    }

    req.headers.authorization = `Bearer ${session.token.access_token}`;

    return next();
  },
);

export const Auth = createParamDecorator((req) => req.headers.authorization);
