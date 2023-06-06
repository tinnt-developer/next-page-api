import { NextApiRequest, NextApiResponse } from 'next';
import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from 'next-api-decorators';
import { getServerSession } from 'next-auth';

import { options } from 'src/pages/api/auth/[...nextauth]';

export const AuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getServerSession(req, res, options);

    if (session) {
      return next();
    }

    throw new UnauthorizedException('You are not authorized.');
  },
);
