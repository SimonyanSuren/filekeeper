import express, { json } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import passport from 'passport';
import { NotFoundError } from './errors/notFound.error';
import { errorHandler } from './middlewares/errorHandler.middleware';
import authRouter from './routes/auth/auth.route';
import { localStrategy } from './routes/auth/strategy/local.strategy';
//import cookieSession from 'cookie-session';
//import { NotFoundError, errorHandler } from '@ticketing_2023/common';
//import { currentUserRouter } from './routes/current-user';
//import { signinRouter } from './routes/signin';
//import { signoutRouter } from './routes/signout';
//import { signupRouter } from './routes/signup';
//import passport from './routes/auth/strategy/local.strategy';

const app = express();

//app.set('trust proxy', true);
app.use(morgan('dev'));
app.use(json());
//app.use(urlencoded());
app.use(passport.initialize());
localStrategy(passport);

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
