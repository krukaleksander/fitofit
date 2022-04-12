import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';
import { db } from '../../tempdb/db';

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
  });
});
