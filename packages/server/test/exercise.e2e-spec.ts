import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ExercisesModule } from '../dist/exercises/exercises.module';
import { ExercisesService } from '../dist/exercises/exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from '../src/exercises/activity.entity';
describe('ExerciseController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ExercisesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5434,
          username: 'postgres',
          password: 'myPassword123',
          database: 'fitofit',
          entities: [ActivityEntity],
          logging: true,
        }),
      ],
      providers: [ExercisesService],
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
});
