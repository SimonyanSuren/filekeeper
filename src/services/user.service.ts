import { isEmail } from 'class-validator';
import passwordUtil from '../common/utils/password.util';
import { dataSource } from '../database/connection';
import { entityManager } from '../database/entityManager';
import { User } from '../models/user.entity';
import { SignUpDto } from '../routes/auth/dto/auth.dto';

const createUser = async (userData: SignUpDto): Promise<User> => {
  const user = new User();
  user.email = isEmail(userData.username) ? userData.username : null;
  user.phoneNumber = !isEmail(userData.username) ? userData.username : null;
  user.firstName = userData.firstName;
  user.lastName = userData.lastName;
  user.password = await passwordUtil.passwordToHash(userData.password);
  user.active = true;
  // @TODO: implement email verification
  user.emailConfirmed = true;

  return dataSource.getRepository(User).save(user);
};

const findUserById = async (id: number): Promise<User | null> => {
  return dataSource.getRepository(User).findOneBy({ id });
};

const getUserByUsername = async (
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
export default { createUser, getUserByIdentifier: getUserByUsername, findUserById };
