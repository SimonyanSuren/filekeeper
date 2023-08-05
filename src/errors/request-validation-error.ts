//import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(public errors: any[]) {
    super('Invalid request parameters.');
    //  Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((e) => ({ message: e.msg, field: e.param }));
  }
}
