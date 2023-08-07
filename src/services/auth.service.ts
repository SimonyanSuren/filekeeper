import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../common/interfaces/jwtPayload.interface';
import passwordUtil from '../common/utils/password.util';
import { dataSource } from '../database/connection';
import { entityManager } from '../database/entityManager';
import { BadRequestError } from '../errors/badRequest.error';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { User } from '../models/user.entity';
import { ConfigService } from './config.service';

const findUserById = async (id: number): Promise<User | null> => {
  return dataSource.getRepository(User).findOneBy({ id });
};

const findUserByUsername = async (
  username: User['email' | 'phoneNumber'],
  cache?: number
): Promise<User | null> => {
  const query = entityManager
    .createQueryBuilder(User, 'user')
    .where('user.email = :username OR user.phoneNumber = :username')
    .setParameters({ username: username })
    .addSelect('user.password');

  if (cache) query.cache(cache);

  return query.getOne();
};

const validateUser = async (username: string, password: string): Promise<User> => {
  const existingUser = await findUserByUsername(username);

  if (!existingUser) throw new BadRequestError('User not exist.');

  const isPasswordMatch = await passwordUtil.passwordCompare(
    existingUser.password,
    password
  );

  if (!isPasswordMatch) throw new UnauthorizedError();

  return existingUser;
};

const generateAccessToken = (
  userId: number,
  remoteAddress?: string,
  userAgent?: string
): string => {
  const payload: JwtPayload = {
    sub: userId,
    remoteAddress,
    userAgent,
  };

  const { jwtConfig } = ConfigService.getConfigs();
  const token = jwt.sign(payload, jwtConfig.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: jwtConfig.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    jwtid: jwtConfig.JWT_ACCESS_TOKEN_ID,
    algorithm: jwtConfig.ENCRYPTION_ALGORITHM as jwt.Algorithm,
  });

  return token;
};

const generateRefreshToken = (
  userId: number,
  remoteAddress?: string,
  userAgent?: string
): string => {
  const payload: JwtPayload = {
    sub: userId,
    remoteAddress,
    userAgent,
  };
	
  const { jwtConfig } = ConfigService.getConfigs();
  const token = jwt.sign(payload, jwtConfig.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: jwtConfig.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    jwtid: jwtConfig.JWT_REFRESH_TOKEN_ID,
    algorithm: jwtConfig.ENCRYPTION_ALGORITHM as jwt.Algorithm,
  });

  return token;
};

const saveRefreshToken = async (userId: number, refreshToken: string): Promise<void> => {
  const { jwtConfig } = ConfigService.getConfigs();

  const salt = await bcrypt.genSalt(jwtConfig.BCRYPT_SALT_ROUNDS || 10);
  const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

  await dataSource.getRepository(User).update(userId, {
    refreshToken: hashedRefreshToken,
  });
};

const validateRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<User | null> => {
  const user = await dataSource
    .getRepository(User)
    .findOne({ where: { id: userId }, select: ['refreshToken', 'id'] });

  if (!user?.refreshToken) {
    throw new UnauthorizedError();
  }

  const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

  if (isRefreshTokenValid) {
    return user;
  }

  return null;
};

const removeRefreshToken = async (userId: number): Promise<void> => {
  await dataSource.getRepository(User).update(userId, {
    refreshToken: null,
  });
};

export default {
  findUserById,
  findUserByUsername,
  generateAccessToken,
  generateRefreshToken,
  validateUser,
  validateRefreshToken,
  saveRefreshToken,
  removeRefreshToken,
};
