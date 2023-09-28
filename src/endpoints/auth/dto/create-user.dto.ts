import { IsEmail, IsStrongPassword } from "class-validator";

export class UserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 0
  })
  password: string;
}
