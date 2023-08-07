import { Router } from 'express';
import constants from '../../common/constants';
import multerWrapper from '../../common/utils/multerWrapper.util';
import fileController from '../../controllers/file.controller';
import multerErrorHandlerMiddleware from '../../middlewares/multerErrorHandler.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import { FileId, GetPaginatedFilesQueryDto } from './dto/file.dto';

const router = Router();

router.post(
  '/upload',
  multerWrapper(constants.PATH_TO_FILES_FOLDER).single('file'),
  fileController.uploadFile
);

router.get(
  '/list',
  validateRequest({ query: GetPaginatedFilesQueryDto }),
  fileController.getList
);

router.get('/:id', validateRequest({ params: FileId }), fileController.getFile);

router.patch(
  '/:id',
  validateRequest({ params: FileId }),
  multerWrapper(constants.PATH_TO_FILES_FOLDER).single('file'),
  fileController.updateFile
);

router.get(
  '/download/:id',
  validateRequest({ params: FileId }),
  fileController.downloadFile
);

router.delete(
  '/delete/:id',
  validateRequest({ params: FileId }),
  fileController.deleteFile
);

router.use(multerErrorHandlerMiddleware);
export default router;
