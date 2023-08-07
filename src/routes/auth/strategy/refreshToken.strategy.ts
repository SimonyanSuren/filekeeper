import { Request } from 'express';
import { Algorithm } from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { JwtPayload } from '../../../common/interfaces/jwtPayload.interface';
import { UnauthorizedError } from '../../../errors/unauthorized.error';
import authService from '../../../services/auth.service';
import { ConfigService } from '../../../services/config.service';

export const refreshTokenStrategy = (passport): void => {
  const { jwtConfig } = ConfigService.getConfigs();

  passport.use(
    'refresh-token',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfig.JWT_REFRESH_TOKEN_SECRET,
        ignoreExpiration: false,
        passReqToCallback: true,
        jsonWebTokenOptions: {
          algorithms: [jwtConfig.ENCRYPTION_ALGORITHM] as Algorithm[],
        },
      },
      async (req: Request, payload: JwtPayload, done) => {
        try {
          // Get valid(valid secret and timestamp) refresh token
          const refreshToken = req.header('Authorization')?.replace('Bearer ', '');

          // Check if refresh token belongs current token or if it exists in user table
          const existingUser = await authService.validateRefreshToken(
            payload.sub,
            refreshToken!
          );

          // If not, throw exception
          if (!existingUser) throw new UnauthorizedError();

          // else continue execution in controller
          return done(null, existingUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
