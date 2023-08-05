import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  public statusCode = 401;

  constructor() {
    super('Unauthorized.');
  }

  serializeErrors() {
    return [{ message: 'Unauthorized.' }];
  }
}
