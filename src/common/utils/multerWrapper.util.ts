import { Request } from 'express';
import { existsSync, promises as fsPromises } from 'fs';
import multer, { Multer } from 'multer';
import { extname } from 'path';
import { BadRequestError } from '../../errors/badRequest.error';

export default (path: string): Multer => {
  const storage = multer.diskStorage({
    destination: async (req: Request, file: Express.Multer.File, cb) => {
      if (!existsSync(path)) {
        await fsPromises.mkdir(path, { recursive: true });
      }

      cb(null, path);
    },

    filename: (_req: Request, file: Express.Multer.File, cb) => {
      const filenameWithoutExtension = file.originalname.slice(
        0,
        file.originalname.lastIndexOf('.')
      );

      cb(null, `${filenameWithoutExtension}_${Date.now()}${extname(file.originalname)}`);
    },
  });

  const options: multer.Options = {
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter(req: Request, file: Express.Multer.File, cb) {
      if (!/(image\/jpeg)|(image\/png)|(application\/pdf)/.test(file.mimetype)) {
        cb(new BadRequestError(`Unsupported file type: ${extname(file.originalname)}.`));
      } else {
        cb(null, true);
      }
    },
  };

  return multer(options);
};
