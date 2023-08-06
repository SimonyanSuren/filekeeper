import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsEmailOrPhoneNumber } from '../../../common/decorators/isEmailOrPhoneNumber.decorator';

export class SignUpDto {
  // Custom decorator for validating user identifier base on task requirements
  @IsEmailOrPhoneNumber()
  readonly identifier: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly rePassword: string;

  @IsString()
  @MaxLength(30)
  @MinLength(2)
  readonly firstName: string;

  @IsString()
  @MaxLength(30)
  @MinLength(2)
  readonly lastName: string;
}

export class SignInDto {
  @IsEmail()
  readonly identifier: string;

  @IsString()
  readonly password: string;
}
