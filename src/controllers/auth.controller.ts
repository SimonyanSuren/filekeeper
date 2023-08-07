import { instanceToPlain } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { validatePassword } from '../common/utils/passwordValidator';
import { BadRequestError } from '../errors/badRequest.error';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { User } from '../models/user.entity';
import { SignUpDto } from '../routes/auth/dto/auth.dto';
import authService from '../services/auth.service';
import userService from '../services/user.service';

const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, password, rePassword }: SignUpDto = req.body;

  const validationErrors = validatePassword(password, rePassword);

  if (validationErrors.length) {
    throw new BadRequestError(validationErrors.join(' '));
  }

  const isUserExists = await userService.getUserByIdentifier(username);

  if (isUserExists) throw new BadRequestError('User already exists.');

  const user = await userService.createUser(req.body);
  // Serialize the user data with class transformer to exclude properties
  // based on User model decorators
  const serializedPayload = instanceToPlain(user);

  res.status(201).json({
    success: true,
    payload: serializedPayload,
  });
};

const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  passport.authenticate('local', { session: false }, async (err, user: User) => {
    if (err) return next(err);

    const accessToken = authService.generateAccessToken(user.id);
    const refreshToken = authService.generateRefreshToken(user.id);

    // Save refresh token in database for future  validation and for sign out
    // We can also have blacklist for refresh tokens if token stollen store it in blacklist
    // and delete it from user table
    await authService.saveRefreshToken(user.id, refreshToken);

    return res
      .status(200)
      .json({ success: true, payload: { accessToken, refreshToken } });
  })(req, res, next);
};

const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate('access-token', { session: false }, async (err, user: User) => {
    if (err || !user) return next(new UnauthorizedError());

    await authService.removeRefreshToken(user.id);

    return res.status(200).json({ success: true, payload: null });
  })(req, res, next);
};

const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate('refresh-token', { session: false }, async (err, user: User) => {
    if (err || !user) return next(new UnauthorizedError());

    const accessToken = authService.generateAccessToken(user.id);

    return res.status(200).json({ success: true, payload: { accessToken } });
  })(req, res, next);
};

export default { signup, signin, signout, refresh };
