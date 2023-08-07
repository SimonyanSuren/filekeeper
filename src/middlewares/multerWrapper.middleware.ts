import { NextFunction, Request, Response } from 'express';
import multer, { DiskStorageOptions, Multer } from 'multer';
import { promises as fsPromises, existsSync } from 'fs';

const multerWrapper = (path: string): Multer => {
  //return async (req: Request, res: Response, next: NextFunction) => {
  const options: multer.Options = {
    fileFilter(req, file, cb) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  };

  const diskStorageOptions: DiskStorageOptions = {
    destination: (_req: Request, file: Express.Multer.File, cb) => {
      if (!existsSync(path)) {
        fsPromises.mkdir(path, { recursive: true });
      }
      cb(null, path);
    },
    filename: (_req: Request, file: Express.Multer.File, cb) => {
      cb(null, file.originalname);
    },
  };

  multer.diskStorage(diskStorageOptions);
  return multer(options);
};
//};

export default multerWrapper;
