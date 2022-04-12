import { Injectable } from '@nestjs/common';
import { RegisterCredentialsDto } from './dto/RegisterCredentials.dto';

@Injectable()
export class AuthService {
  registerUser(credentials: RegisterCredentialsDto) {
    return { status: 200, credentials };
  }
}
