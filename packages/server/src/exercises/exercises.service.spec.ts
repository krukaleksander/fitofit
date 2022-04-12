import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';
import { db } from '../tempdb/db';

describe('ExercisesService', () => {
  let service: ExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercisesService],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
  });

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
    describe('historical activities', () => {
      it('returns historical activity for user ', () => {
        expect(service.getHistoricalActivities()).toEqual({});
      });
    });
  });
});
