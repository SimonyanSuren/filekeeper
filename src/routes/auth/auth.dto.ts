import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  /**
   * @example string
   */
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
  readonly email: string;

  @IsString()
  readonly password: string;
}
