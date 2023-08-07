import { Router } from 'express';
import constants from '../../common/constants';
import fileController from '../../controllers/file.controller';
import multerWrapper from '../../middlewares/multerWrapper.middleware';

const router = Router();

router.post(
  '/file/upload',
  multerWrapper(constants.PATH_TO_FILES_FOLDER).single('file'),
  fileController.uploadFile
);

export default router;
