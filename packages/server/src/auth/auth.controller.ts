import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly exerciseService: AuthService) {}
  @Post('/register')
  registerUser(@Body() credentials) {
    return this.exerciseService.registerUser(credentials);
  }
}
