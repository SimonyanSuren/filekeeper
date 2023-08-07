import { existsSync, promises as fsPromises } from 'fs';
import Logger from '../logger/logger';

export const deleteFileFromLocalStorage = async (path) => {
  try {
    if (existsSync(path)) await fsPromises.unlink(path);
  } catch (err) {
    Logger.error(err);
    throw err;
  }
};
