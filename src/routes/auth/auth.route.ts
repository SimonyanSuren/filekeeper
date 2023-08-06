import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import { validateRequest } from '../../middlewares/validation.middleware';
import { SignInDto, SignUpDto } from './dto/auth.dto';

const router = Router();

router.post('/auth/signup', validateRequest({ body: SignUpDto }), authController.signup);
router.post('/auth/signin', validateRequest({ body: SignInDto }), authController.signin);

export default router;
