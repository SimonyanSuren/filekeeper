import { isEmail } from 'class-validator';
import { FindOneOptions } from 'typeorm';
import passwordUtil from '../common/utils/password.util';
import { dataSource } from '../database/connection';
import { User } from '../models/user.entity';
import { SignUpDto } from '../routes/auth/dto/auth.dto';
import { entityManager } from '../database/entityManager';

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

//const getUserByIdentifier = async (username: string): Promise<User | null> => {
//  const filters: FindOneOptions<User> = {
//    where: isEmail(username) ? { email: username } : { phoneNumber: username },
//    select: ['password'],
//		add
//  };
//  return dataSource.getRepository(User).findOne(filters);
//};

const  getUserByIdentifier = async (username: User['email'|'phoneNumber'], cache?: number): Promise<User | null> {
	const query =  entityManager
		.createQueryBuilder(User, 'user')
		.where('user.email = :email OR user.phoneNumber = :username')
		.setParameters({ username: username })
		.addSelect('user.password');

	if (cache) query.cache(cache);

	return await query.getOne();
}
export default { createUser, getUserByIdentifier };
