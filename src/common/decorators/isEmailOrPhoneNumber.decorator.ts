/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ValidationOptions,
  isEmail,
  isMobilePhone,
  registerDecorator,
} from 'class-validator';

export function IsEmailOrPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isEmailOrPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: '$property must be a valid email or phone number',
      },
      validator: {
        validate(value: any): boolean {
          return isEmail(value) || isMobilePhone(value, undefined, { strictMode: true });
        },
      },
    });
  };
}
