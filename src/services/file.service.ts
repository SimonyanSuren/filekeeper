import { extname } from 'path';
import { dataSource } from '../database/connection';
import { File } from '../models/file.entity';
import { FindManyOptions } from 'typeorm';
import { GetPaginatedFilesQueryDto } from '../routes/file/dto/file.dto';
import { IPagination } from '../common/interfaces/pagination.interface';
import Logger from '../common/logger/logger';
import { deleteFileFromLocalStorage } from '../common/utils/deleteFileFromLocalStorage.util';

const storeFile = async (
  userId: number,
  fileData: Express.Multer.File
): Promise<File> => {
  const file = new File();

  file.userId = userId;
  file.fileName = fileData.filename;
  file.originalFileName = fileData.originalname;
  file.mimetype = fileData.mimetype;
  file.size = fileData.size;
  file.path = fileData.path;
  file.extension = extname(fileData.originalname);

  return dataSource.getRepository(File).save(file);
};

const getFileById = async (id: number): Promise<File | null> => {
  return dataSource.getRepository(File).findOneBy({ id });
};

const getAllFiles = async (
  options: GetPaginatedFilesQueryDto
): Promise<IPagination<File>> => {
  const { page, listSize } = options;
  const totalCount = await dataSource.getRepository(File).count();
  const totalPages = Math.ceil(totalCount / listSize);

  const filters: FindManyOptions<File> = {
    skip: (page - 1) * listSize,
    take: listSize,
  };

  const data = await dataSource.getRepository(File).find(filters);

  return {
    data,
    listSize,
    totalCount,
    totalPages,
    currentPage: page,
  };
};

const updateFileById = async (
  fileId: number,
  fileData: Express.Multer.File,
  existingFile: File
): Promise<void> => {
  const queryRunner = await dataSource.createQueryRunner();
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.getRepository(File).update(fileId, {
      fileName: fileData.filename,
      originalFileName: fileData.originalname,
      mimetype: fileData.mimetype,
      size: fileData.size,
      path: fileData.path,
      extension: extname(fileData.originalname),
    });

    await deleteFileFromLocalStorage(existingFile.path);

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    Logger.error(err);
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const deleteFileById = async (fileId: number): Promise<void> => {
  await dataSource.getRepository(File).delete(fileId);
};

export default { storeFile, getFileById, getAllFiles, updateFileById, deleteFileById };
