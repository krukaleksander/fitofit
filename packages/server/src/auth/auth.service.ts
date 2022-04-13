import { Injectable } from '@nestjs/common';
import { RegisterCredentialsDto } from './dto/RegisterCredentials.dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  async registerUser({ email, login, password }: RegisterCredentialsDto) {
    return {
      status: 200,
      credentials: {
        login: login,
        password: await argon.hash(password),
        email: email,
      },
    };
  }
}
