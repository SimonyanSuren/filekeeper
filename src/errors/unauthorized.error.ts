import { CustomError } from './custom.error';

export class UnauthorizedError extends CustomError {
  public statusCode = 401;

  constructor() {
    super('Unauthorized.');
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: 'Unauthorized.' }];
  }
}
