import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { db as MOCKED_RESPONSE } from '../tempdb/db';
describe('ExercisesController', () => {
  let controller: ExercisesController;

  const mockExerciseService = {
    getExercises: jest.fn(() => {
      return MOCKED_RESPONSE;
    }),
    addActivity: jest.fn((dto) => {
      return { status: 200, msg: 'Dodano zadanie', activity: dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesController],
      providers: [ExercisesService],
    })
      .overrideProvider(ExercisesService)
      .useValue(mockExerciseService)
      .compile();

    controller = module.get<ExercisesController>(ExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return db of possible exercises', () => {
    expect(controller.getExercises()).toEqual(MOCKED_RESPONSE);
  });
  it('should add new activity', () => {
    const activity = {
      durationInMinutes: 30,
      exerciseID: 2,
      isDone: false,
      name: 'Bieganie',
      start: new Date(),
      userID: 10,
    };
    expect(controller.addActivity(activity)).toEqual({
      status: 200,
      msg: 'Dodano zadanie',
      activity,
    });
  });
});
