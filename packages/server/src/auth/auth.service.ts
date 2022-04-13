import { Injectable } from '@nestjs/common';
import { RegisterCredentialsDto } from './dto/RegisterCredentials.dto';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}
  async registerUser({ email, login, password }: RegisterCredentialsDto) {
    const userCredentials = {
      login: login,
      password: await argon.hash(password),
      email: email,
    };
    try {
      await this.authRepository.save(userCredentials);
      return {
        status: 200,
        msg: 'Your account was created :)',
        credentials: userCredentials,
      };
    } catch (err) {
      return { status: 500, err };
    }
  }
}
