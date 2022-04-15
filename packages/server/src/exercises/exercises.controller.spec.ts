import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { db as MOCKED_RESPONSE } from '../tempdb/db';

const historicalResponseMock = {
  totalCalories: 50665,
  totalDuration: 2600,
  caloriesToBurgers: 77,
  activities: [
    {
      activityID: 1,
      durationInMinutes: 500,
      exerciseID: 2,
      isDone: true,
      name: 'Badbinton',
      start: '2022-04-12T10:49:12.089Z',
      userID: 10,
    },
    {
      activityID: 2,
      durationInMinutes: 500,
      exerciseID: 2,
      isDone: true,
      name: 'Badbinton',
      start: '2022-04-12T10:49:12.089Z',
      userID: 10,
    },
    {
      activityID: 3,
      durationInMinutes: 500,
      exerciseID: 2,
      isDone: true,
      name: 'Badbinton',
      start: '2022-04-12T10:49:12.089Z',
      userID: 10,
    },
    {
      activityID: 4,
      durationInMinutes: 500,
      exerciseID: 2,
      isDone: true,
      name: 'Badbinton',
      start: '2022-04-12T10:49:12.089Z',
      userID: 10,
    },
    {
      activityID: 5,
      durationInMinutes: 600,
      exerciseID: 2,
      isDone: true,
      name: 'Badbinton',
      start: '2022-04-12T10:49:12.089Z',
      userID: 10,
    },
  ],
};
describe('ExercisesController', () => {
  let controller: ExercisesController;

  const mockExerciseService = {
    getExercises: jest.fn(() => {
      return MOCKED_RESPONSE;
    }),
    addActivity: jest.fn((dto) => {
      return { status: 200, msg: 'Dodano zadanie', activity: dto };
    }),
    getHistoricalActivities: jest.fn(() => {
      return historicalResponseMock;
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
  it('should return historical activity', () => {
    expect(controller.getHistoricalActivities()).toEqual(
      historicalResponseMock,
    );
  });
});
