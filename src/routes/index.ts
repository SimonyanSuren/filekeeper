import { Router } from 'express';
import { accessTokenMiddleware } from '../middlewares/accessToken.middleware';
import authRouter from '../routes/auth/auth.route';
import fileRouter from '../routes/file/file.route';
import userRouter from '../routes/user/user.route';

const router = Router();

router.use('/auth', authRouter);
router.use(accessTokenMiddleware);
router.use('/file', fileRouter);
router.use('/user', userRouter);

export default router;
