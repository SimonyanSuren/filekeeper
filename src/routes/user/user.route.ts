import { Router } from 'express';
import userController from '../../controllers/user.controller';

const router = Router();

router.get('/info', userController.getCurrentUser);

export default router;
