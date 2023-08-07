import { CustomError } from './custom.error';

export class ForbiddenError extends CustomError {
  public statusCode = 403;

  constructor() {
    super('Permission denied.');
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
