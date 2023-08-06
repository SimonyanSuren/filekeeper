import { FindOptionsWhere } from 'typeorm';
import { dataSource } from '../database/connection';
import { User } from '../models/user.entity';
import { isEmail } from 'class-validator';
import { SignUpDto } from '../routes/auth/dto/auth.dto';
import passwordUtil from '../common/utils/password.util';

const createUser = async (userData: SignUpDto): Promise<User> => {
  const user = new User();
  user.email = isEmail(userData.identifier) ? userData.identifier : null;
  user.phoneNumber = !isEmail(userData.identifier) ? userData.identifier : null;
  user.firstName = userData.firstName;
  user.lastName = userData.lastName;
  user.password = await passwordUtil.passwordToHash(userData.password);
  user.active = true;
  // @TODO: implement email verification
  user.emailConfirmed = true;

  return dataSource.getRepository(User).save(user);
};

const getUserByIdentifier = async (identifier: string): Promise<User | null> => {
  const filters: FindOptionsWhere<User> = isEmail(identifier)
    ? { email: identifier }
    : { phoneNumber: identifier };
  return dataSource.getRepository(User).findOneBy(filters);
};

export default { createUser, getUserByIdentifier };
