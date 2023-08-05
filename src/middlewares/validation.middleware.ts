import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { validateOrReject } from 'class-validator';

//interface ValidateRequest {
//target: object;
//}

export enum ValidationTarget {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
}

//export const validateRequest = (object: { [key: ValidationTarget]: string }) => {
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
  //return (err: Error, req: Request, res: Response, next: NextFunction) => {
  //  validateOrReject(schemaName);
  //};
//};
