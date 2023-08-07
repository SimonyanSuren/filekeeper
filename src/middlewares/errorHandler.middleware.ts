import { NextFunction, Request, Response } from 'express';
import Logger from '../common/logger/logger';
import { CustomError } from '../errors/custom.error';

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  Logger.error(err);
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ statusCode: err.statusCode, errors: err.serializeErrors() });
  }

  return res.status(400).send({ errors: [{ message: 'Something went wrong.' }] });
};
