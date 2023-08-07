import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error';

export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new UnauthorizedError();

    next();
  } catch (error) {
    throw new UnauthorizedError();
  }
};
