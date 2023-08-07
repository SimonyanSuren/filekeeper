import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { NotFoundError } from './errors/notFound.error';
import { errorHandler } from './middlewares/errorHandler.middleware';
import routers from './routes';
import { accessTokenStrategy } from './routes/auth/strategy/accessToken.strategy';
import { localStrategy } from './routes/auth/strategy/local.strategy';
import { refreshTokenStrategy } from './routes/auth/strategy/refreshToken.strategy';
import * as swaggerDocument from './swagger.json';

// Initialize express app
const app = express();
app.use(json());

// Morgan for request logs
app.use(morgan('dev'));

// Enable CORS
app.use(
  cors({
    origin: '*',
    methods: ['OPTIONS', 'POST', 'PATCH', 'PUT', 'GET', 'DELETE'],
    optionsSuccessStatus: 204,
  })
);

// Passport initialization
app.use(passport.initialize());
localStrategy(passport);
accessTokenStrategy(passport);
refreshTokenStrategy(passport);

// Swagger implementation
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/v1', routers);

app.all('*', async () => {
  throw new NotFoundError();
});

// Error handler
app.use(errorHandler);

export { app };
