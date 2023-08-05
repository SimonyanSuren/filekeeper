import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { IsEmail, MaxLength, validate, validateOrReject } from 'class-validator';

//interface ValidateRequest {
//target: object;
//}
type ClassType<T> = new (...args: any[]) => T;

export enum ValidationTarget {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
}
export class SignUpDto {
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  /**
   * @example string
   */
  //@IsString()
  //@IsNotEmpty()
  //readonly password: string;

  //@IsNotEmpty()
  //@IsString()
  //readonly rePassword: string;

  //@IsString()
  //@MaxLength(30)
  //@MinLength(2)
  //readonly firstName: string;

  //@IsString()
  //@MaxLength(30)
  //@MinLength(2)
  readonly lastName: string;
}

export const validateRequest = (object: ClassType<object>) => {
  console.log(' \x1b[41m ', '77777777777777777777:  ', 77777777777777777777, ' [0m ');
  //switch (target) {
  //	case "body":
  //		const
  //		break;

  //	case "params":

  //		break;

  //	case "query":

  //		break;

  //	default:
  //		break;
  //}
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(' \x1b[41m ', '88888888888888:  ', 88888888888888, ' [0m ');
    req.body = Object.setPrototypeOf(req.body, object.prototype);

    //const targets = Object.keys(object);

    //for (const [key, value] of Object.entries(object)) {

    //const v = req[key];
    //console.log(' \x1b[41m ', 'v:  ', v, ' [0m ');
    //console.log(' \x1b[41m ', 'v:  ', value, ' [0m ');
    const r = await validate(req.body, {
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    });
    console.log(' \x1b[41m ', 'r:  ', r, ' [0m ');
    next();
    //}
  };
};
