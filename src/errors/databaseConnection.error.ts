import { CustomError } from './custom.error';

export class DatabaseConnectionError extends CustomError {
  public reason = 'Error connecting to database.';

  public statusCode = 500;

  constructor() {
    super('Error connecting to db.');
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
