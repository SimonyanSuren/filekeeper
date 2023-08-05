import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from './middlewares/errorHandler.middleware';
import morgan from 'morgan';
import { NotFoundError } from './errors/not-found-error';
import authRouter from './routes/auth/auth.route';
//import cookieSession from 'cookie-session';
//import { NotFoundError, errorHandler } from '@ticketing_2023/common';
//import { currentUserRouter } from './routes/current-user';
//import { signinRouter } from './routes/signin';
//import { signoutRouter } from './routes/signout';
//import { signupRouter } from './routes/signup';

const app = express();

//app.set('trust proxy', true);
app.use(morgan('dev'));
app.use(json());
//app.use(
//  cookieSession({
//    signed: false,
//    httpOnly: true,
//    secure: process.env.NODE_ENV !== 'test',
//  })
//);
//app.set('api/v1');
//app.use(currentUserRouter);
app.use(authRouter);
//app.use(signinRouter);
//app.use(signupRouter);
//app.use(signoutRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
