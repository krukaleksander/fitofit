import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { db } from '../dist/tempdb/db';

describe('Eexercises (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/exercises')
      .expect(200)
      .expect(db);
  });
  it('/exercises/new [Post]', async () => {
    return request(app.getHttpServer())
      .post('/exercises/new')
      .send({
        durationInMinutes: 30,
        exerciseID: 2,
        isDone: false,
        name: 'Bieganie',
        start: new Date(),
        userID: 10,
      })
      .expect(201);
  });
  it.skip(' returns historical activities exercises/user/activity [Get]', async () => {
    const { body: response } = await request(app.getHttpServer())
      .get('/exercises/user/activity')
      .send();

    expect(response).toMatchSnapshot();
  });
  afterAll(async () => {
    await app.close();
  });
});
