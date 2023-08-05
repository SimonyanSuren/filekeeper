import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.entity';
import { EntityManager } from 'typeorm';
import { dataSource } from '../database/connection';
import { entityManager } from '../database/entityManager';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  console.log(' \x1b[41m ', '000000:  ', '00000vdvdvdvdv0', ' [0m ');
  const { email, password } = req.body;

  const user = new User();

	




	
  user.email = email;
  user.password = password;


  //user.userLastLogin = new Date();
  try {

		









    const newUser = await dataSource.getRepository(User).save(user);
		console.log(" \x1b[41m ", 'newUser:  ', newUser ," [0m " )
		return res.status(201).json(newUser);
  } catch (err) {
    console.log(' \x1b[41m ', 'err:  ', err, ' [0m ');
    throw err;
  }
};

export default { signup };
