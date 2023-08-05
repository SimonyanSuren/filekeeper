import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import { validateRequest } from '../../middlewares/validation.middleware';
import { SignUpDto } from './auth.dto';

const router = Router();

router.post(
  '/auth/signup',
  validateRequest(SignUpDto),
  authController.signup
);

export default router;
