import { Connection, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';
import { db } from '../tempdb/db';
import { ActivityEntity } from './activity.entity';
import { createMemDB } from '../utils/CreateMemDb';

describe('ExercisesService', () => {
  let database: Connection;
  let service: ExercisesService;
  let exrcisesRepository: Repository<ActivityEntity>;

  beforeAll(async () => {
    database = await createMemDB([ActivityEntity]);
    exrcisesRepository = await database.getRepository(ActivityEntity);
    service = new ExercisesService(exrcisesRepository);
  });
  afterAll(() => database.close());

  describe('exercise endpoint', () => {
    it(' / should return db of tasks"', () => {
      expect(service.getExercises()).toEqual(db);
    });
    describe('validate Activity', () => {
      it('accepts only validate data', function () {
        const MOCK_REQUEST = {
          activityID: 3,
          exerciseID: 5,
          userID: 10,
          name: 'Jazda na rowerze',
          start: new Date(),
          durationInMinutes: 30,
          isDone: true,
        };
        expect(service.addActivity(MOCK_REQUEST)).toEqual({
          status: 200,
          msg: 'Dodano zadanie',
          activity: MOCK_REQUEST,
        });
      });
    });
    describe.skip('historical activities', () => {
      it('returns historical activity for user ', () => {
        expect(service.getHistoricalActivities()).toEqual({});
      });
    });
  });
});
