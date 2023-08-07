import { Strategy as LocalStrategy } from 'passport-local';
import authService from '../../../services/auth.service';

export const localStrategy = (passport): void =>
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await authService.validateUser(username, password);
        const { password: userPass, ...rest } = user;

        return done(null, rest);
      } catch (error) {
        return done(error);
      }
    })
  );
