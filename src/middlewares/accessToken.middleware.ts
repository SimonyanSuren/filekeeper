import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { User } from '../models/user.entity';

export const accessTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate('access-token', { session: false }, async (err, user: User) => {
    if (err || !user) return next(new UnauthorizedError());

    req.user = user;
    next();
  })(req, res, next);
};
