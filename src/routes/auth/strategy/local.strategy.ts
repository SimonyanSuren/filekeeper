import { Strategy as LocalStrategy } from 'passport-local';
import passwordUtil from '../../../common/utils/password.util';
import userService from '../../../services/user.service';

export const localStrategy = (passport) =>
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log(' \x1b[41m ', '7777777777:  ', 7777777777, ' [0m ');
      console.log(' \x1b[41m ', 'username:  ', password, ' [0m ');
      try {
        const existingUser = await userService.getUserByIdentifier(username);
        console.log(' \x1b[41m ', 'user:  ', existingUser, ' [0m ');
        if (!existingUser) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const isPasswordMatch = await passwordUtil.passwordCompare(
          existingUser.password,
          password
        );
        if (!isPasswordMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, existingUser);
      } catch (error) {
        return done(error);
      }
    })
  );
