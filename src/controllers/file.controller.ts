import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import { deleteFileFromLocalStorage } from '../common/utils/deleteFileFromLocalStorage.util';
import { BadRequestError } from '../errors/badRequest.error';
import { ForbiddenError } from '../errors/forbidden.error';
import { User } from '../models/user.entity';
import { GetPaginatedFilesQueryDto } from '../routes/file/dto/file.dto';
import fileService from '../services/file.service';

const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.file) throw new BadRequestError(`File required for upload.`);

  const { id } = req.user as User;
  const file = await fileService.storeFile(id, req.file);

  res.status(201).json({
    success: true,
    payload: file,
  });
};

const getFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const fileId = Number(req.params.id);
  const exitingFile = await fileService.getFileById(fileId);

  if (!exitingFile) throw new BadRequestError(`File with id ${fileId} not found`);

  res.status(200).json({
    success: true,
    payload: exitingFile,
  });
};

const getList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const options = req.query as unknown as GetPaginatedFilesQueryDto;
  const paginatedData = await fileService.getAllFiles(options);

  res.status(200).json({
    success: true,
    payload: paginatedData,
  });
};

const updateFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.file) throw new BadRequestError(`File required for update.`);

  const { id: userId } = req.user as User;
  const fileId = Number(req.params.id);
  const exitingFile = await fileService.getFileById(fileId);

  if (!exitingFile) throw new BadRequestError(`File with id ${fileId} not found`);
  if (exitingFile.userId !== userId) throw new ForbiddenError();

  await fileService.updateFileById(fileId, req.file, exitingFile);

  res.status(200).json({
    success: true,
    payload: exitingFile,
  });
};

const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id: userId } = req.user as User;
  const fileId = Number(req.params.id);
  const exitingFile = await fileService.getFileById(fileId);

  if (!exitingFile) throw new BadRequestError(`File with id ${fileId} not found`);
  if (exitingFile.userId !== userId) throw new ForbiddenError();

  const fileStream = fs.createReadStream(exitingFile.path);

  res.setHeader('Content-Disposition', `attachment; filename="${exitingFile.fileName}"`);
  res.setHeader('Content-Type', 'application/octet-stream');

  fileStream.pipe(res);
};

const deleteFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id: userId } = req.user as User;
  const fileId = Number(req.params.id);
  const exitingFile = await fileService.getFileById(fileId);

  if (!exitingFile) throw new BadRequestError(`File with id ${fileId} not found`);
  if (exitingFile.userId !== userId) throw new ForbiddenError();

  await fileService.deleteFileById(fileId);
  await deleteFileFromLocalStorage(exitingFile.path);

  res.status(200).json({
    success: true,
    message: 'File deleted successfully.',
    payload: exitingFile,
  });
};

export default { uploadFile, getFile, getList, updateFile, downloadFile, deleteFile };
