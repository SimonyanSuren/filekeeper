import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { BadRequestError } from '../errors/badRequest.error';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      throw new BadRequestError(`Unexpected field: ${err.field}`);
    }
  }
  next(err);
};
