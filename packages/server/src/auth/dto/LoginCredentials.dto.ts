import { IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
