import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCredentialsDto } from './dto/RegisterCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly exerciseService: AuthService) {}
  @Post('/register')
  registerUser(@Body() credentials: RegisterCredentialsDto) {
    return this.exerciseService.registerUser(credentials);
  }
}
