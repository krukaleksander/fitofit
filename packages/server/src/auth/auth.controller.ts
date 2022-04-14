import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCredentialsDto } from './dto/RegisterCredentials.dto';
import { LoginCredentialsDto } from './dto/LoginCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  registerUser(@Body() credentials: RegisterCredentialsDto) {
    return this.authService.registerUser(credentials);
  }
  @Post('/login')
  loginUser(@Body() credentials: LoginCredentialsDto) {
    return this.authService.loginUser(credentials);
  }
}
