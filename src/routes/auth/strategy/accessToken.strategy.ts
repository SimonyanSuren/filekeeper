import { Algorithm } from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { JwtPayload } from '../../../common/interfaces/jwtPayload.interface';
import { UnauthorizedError } from '../../../errors/unauthorized.error';
import authService from '../../../services/auth.service';
import { ConfigService } from '../../../services/config.service';

export const accessTokenStrategy = (passport): void => {
  const { jwtConfig } = ConfigService.getConfigs();
  passport.use(
    'access-token',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfig.JWT_ACCESS_TOKEN_SECRET,
        ignoreExpiration: false,
        jsonWebTokenOptions: {
          algorithms: [jwtConfig.ENCRYPTION_ALGORITHM] as Algorithm[],
        },
      },
      async (payload: JwtPayload, done) => {
        try {
          const existingUser = await authService.findUserById(payload.sub);

          if (!existingUser) throw new UnauthorizedError();

          const { password: userPass, ...rest } = existingUser;

          return done(null, rest);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
