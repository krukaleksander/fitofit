import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  registerUser(credentials) {
    return { status: 200, credentials };
  }
}
