import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { validateEnvConfigurations } from '../common/config/env.validation';

//export const accessTokenMiddleware = (
//  req: Request,
//  res: Response,
//  next: NextFunction
//) => {
//  const token = req.header('Authorization')?.replace('Bearer ', '');

//  if (!token) throw new UnauthorizedError();

//  try {
//    const { jwtConfig } = validateEnvConfigurations(process.env);

//    const decoded = jwt.verify(token, jwtConfig.JWT_ACCESS_TOKEN_SECRET, {
//      algorithms: [jwtConfig.ENCRYPTION_ALGORITHM] as jwt.Algorithm[],
//      ignoreExpiration: false,
//      jwtid: jwtConfig.JWT_ACCESS_TOKEN_ID,
//    });

//    req.user = decoded;
//    next();
//  } catch (error) {
//    throw new UnauthorizedError();
//  }
//};
