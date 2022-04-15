import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('creates account /auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        login: 'wasaaiak',
        email: 'xaaayz@aagmail.com',
        password: 'akladjdkljdlj122&*&*(&',
      })
      .expect(201);
  });
  it('login user /auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: 'wasaaiak',
        password: 'akladjdkljdlj122&*&*(&',
      })
      .expect(201);
  });
  it('login fails (got 403 Forbidden) with bad credentials /auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: 'somebody',
        password: 'somepassword',
      })
      .expect(403);
  });
});
