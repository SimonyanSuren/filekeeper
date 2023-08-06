import { ValidationError, ValidatorOptions, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/requestValidation.error';

type ClassType<T> = new (...args: any[]) => T;

export interface ValidationArguments<T = object> {
  body?: ClassType<T>;
  params?: ClassType<T>;
  query?: ClassType<T>;
}

const validatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidUnknownValues: true,
  forbidNonWhitelisted: true,
};

export const validateRequest = (args: ValidationArguments) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validationErrors: ValidationError[] = [];

    for (const [target, schema] of Object.entries(args)) {
      // Set prototype of each target(body, params, query) appropriate schema that
      // class-validator can validate it
      const targetObject = Object.setPrototypeOf(req[target], schema.prototype);
      // Validate target object
      const errors = await validate(targetObject, validatorOptions);

      validationErrors.push(...errors);
    }

    if (!validationErrors.length) return next();

    // Get validation error messages
    const errorMessages: string[] = validationErrors.reduce(
      (acc, err) => [...acc, ...Object.values(err.constraints || {})],
      [] as string[]
    );

    throw new RequestValidationError(errorMessages);
  };
};
