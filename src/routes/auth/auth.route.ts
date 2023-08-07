import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import { accessTokenMiddleware } from '../../middlewares/accessToken.middleware';
import { refreshTokenMiddleware } from '../../middlewares/refreshToken.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import { SignInDto, SignUpDto } from './dto/auth.dto';

const router = Router();

router.post('/auth/signup', validateRequest({ body: SignUpDto }), authController.signup);
router.post('/auth/signin', validateRequest({ body: SignInDto }), authController.signin);
router.post('/auth/signin/new-token', refreshTokenMiddleware, authController.refresh);
router.get('/auth/signout', accessTokenMiddleware, authController.signout);

export default router;
