import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterCredentialsDto } from './dto/RegisterCredentials.dto';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { LoginCredentialsDto } from './dto/LoginCredentials.dto';
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
      return { status: 500, err: err.driverError.detail };
    }
  }
  async loginUser(dto: LoginCredentialsDto) {
    const user = await this.authRepository.findOne({
      where: { login: dto.login },
    });
    if (!user) throw new ForbiddenException('There is no user with this login');

    const passwordMatch = await argon.verify(user.password, dto.password);
    if (!passwordMatch) throw new ForbiddenException('Password incorrecrt');
    return { msg: 'Logged in', user };
  }
}
