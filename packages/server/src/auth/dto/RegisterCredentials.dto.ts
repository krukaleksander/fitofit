import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterCredentialsDto {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
