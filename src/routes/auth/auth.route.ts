import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import { accessTokenMiddleware } from '../../middlewares/accessToken.middleware';
import { refreshTokenMiddleware } from '../../middlewares/refreshToken.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import { SignInDto, SignUpDto } from './dto/auth.dto';

const router = Router();

router.post('/signup', validateRequest({ body: SignUpDto }), authController.signup);
router.post('/signin', validateRequest({ body: SignInDto }), authController.signin);
router.post('/signin/new-token', refreshTokenMiddleware, authController.refresh);
router.get('/signout', accessTokenMiddleware, authController.signout);

export default router;
