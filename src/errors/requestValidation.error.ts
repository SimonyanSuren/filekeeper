import { CustomError } from './custom.error';

export class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(public errors: string[]) {
    super('Invalid request parameters.');
  }

  serializeErrors(): { message: string; field?: string }[] {
    return this.errors.map((e) => ({ message: e, field: e.split(' ')[0] }));
  }
}
