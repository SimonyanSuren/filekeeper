import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { validatePassword } from '../common/utils/passwordValidator';
import { BadRequestError } from '../errors/badRequest.error';
import { SignInDto, SignUpDto } from '../routes/auth/dto/auth.dto';
import userService from '../services/user.service';

const signup = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password, rePassword }: SignUpDto = req.body;

  const validationErrors = validatePassword(password, rePassword);

  if (validationErrors.length) {
    throw new BadRequestError(validationErrors.join(' '));
  }

  const isUserExists = await userService.getUserByIdentifier(identifier);

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

const signin = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password }: SignInDto = req.body;

  const isUserExists = await userService.getUserByIdentifier(identifier);

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

export default { signup, signin };
