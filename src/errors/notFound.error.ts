import { CustomError } from './custom.error';

export class NotFoundError extends CustomError {
  public statusCode = 404;

  constructor() {
    super('Route not found.');
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: 'Not Found.' }];
  }
}
