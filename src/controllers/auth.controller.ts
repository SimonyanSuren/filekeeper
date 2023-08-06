import { instanceToPlain } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { validatePassword } from '../common/utils/passwordValidator';
import { BadRequestError } from '../errors/badRequest.error';
import { SignInDto, SignUpDto } from '../routes/auth/dto/auth.dto';
import userService from '../services/user.service';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
//import passport from '../routes/auth/strategy/local.strategy';

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
  passport.authenticate('local', { session: false }, (err, user) => {
    console.log(' \x1b[41m ', '888:  ', user, ' [0m '); 
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, 'your-secret-key');
    return res.json({ token });
  })(req, res, next);
};

//const validateUser =  async (email: string, pass: string): Promise<User | null> {
//	const user = await this.repositories.USER.findUserByEmailWithPass(email);
//	if (!user) {
//		throw new NotFoundException('User does not exist.');
//	}
//	const equals = await bcrypt.compare(pass, user?.password ? user.password : '');

//	if (user && equals) {
//		return user;
//	}

//	return null;
//}

//const getCookieWithAccessToken =  async (
//	userId: ObjectId,
//	remoteAddress?: string,
//	userAgent?: string
//): Promise<string> {
//	const payload: JwtPayload = {
//		sub: userId.toString(),
//		remoteAddress,
//		userAgent,
//	};

//	const token =  jwt.sign(payload);

//	//const cookie = `Access=${token}; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=${this.configService.get(
//	//	'jwtConfig.JWT_ACCESS_TOKEN_EXPIRATION_TIME'
//	//)}`;

//	return cookie;
//}

//const getCookieWithRefreshToken =  async (
//	userId: ObjectId,
//	remoteAddress?: string,
//	userAgent?: string
//): Promise<string> {
//	const payload: JwtPayload = {
//		sub: userId.toString(),
//		remoteAddress,
//		userAgent,
//	};

//	const token = await jwt.signAsync(payload, {
//		secret: this.configService.get('jwtConfig.JWT_REFRESH_TOKEN_SECRET'),
//		jwtid: this.configService.get<string>('jwtConfig.JWT_REFRESH_TOKEN_ID'),
//		expiresIn: this.configService.get('jwtConfig.JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
//	});

//	const cookie = `Refresh=${token}; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=${this.configService.get(
//		'jwtConfig.JWT_REFRESH_TOKEN_EXPIRATION_TIME'
//	)}`;

//	await this.saveRefreshToken(userId, token);

//	return cookie;
//}

//const  getCookieForLogOut=  (): string[] {
//	return [
//		'Access=; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=0',
//		'Refresh=; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=0',
//	];
//}

//const  saveRefreshToken=  async (userId: ObjectId, refreshToken: string): Promise<void> {
//	const salt = await bcrypt.genSalt(
//		this.configService.get<number>('jwtConfig.BCRYPT_SALT_ROUNDS', 10)
//	);

//	const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

//	await this.repositories.USER.findByIdAndUpdate(userId, {
//		refreshToken: hashedRefreshToken,
//	});
//}

//const  validateRefreshToken=  async (
//	userId: string,
//	refreshToken: string
//): Promise<User | null> {
//	const user = await this.repositories.USER.findById(userId).select('+refreshToken');

//	if (!user?.refreshToken) {
//		throw new UnauthorizedException();
//	}

//	const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

//	if (isRefreshTokenValid) {
//		return user;
//	}

//	return null;
//}

//const  removeRefreshToken=  async (userId: ObjectId): Promise<void> {
//	await this.repositories.USER.findByIdAndUpdate(userId, {
//		refreshToken: null,
//	});
//}

export default { signup, signin };
