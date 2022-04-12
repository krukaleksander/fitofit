import { Injectable } from '@nestjs/common';
import { db as MOCKED_RESPONSE } from '../tempdb/db';
import { ExerciseFromServerDto } from './dto/ExerciseFromServer.dto';
import { ActivityDto } from './dto/Activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from './activity.entity';
import { Repository } from 'typeorm';
import { HistoricalActivitiesDto } from '../../dist/exercises/dto/HistoricalActivities.dto';
@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ActivityEntity)
    private exercisesRepository: Repository<ActivityEntity>,
  ) {}
  getExercises(): ExerciseFromServerDto[] {
    return MOCKED_RESPONSE;
  }

  async addActivity(activity: ActivityDto) {
    try {
      await this.exercisesRepository.save(activity);
      return { status: 200, msg: 'Dodano zadanie', activity };
    } catch (err) {
      return { status: 500, err };
    }
  }

  async getHistoricalActivities() {
    try {
      const allActivities = await this.exercisesRepository.find();
      let totalCalories = 0;
      let totalDuration = 0;
      allActivities.forEach((activity: ActivityDto) => {
        totalDuration += Math.floor(activity.durationInMinutes);
        MOCKED_RESPONSE.find((exercise) => {
          if (exercise.id === activity.exerciseID) {
            totalCalories += Math.floor(exercise.cal * (totalDuration / 60));
          }
        });
      });
      const caloriesToBurgers = Math.floor(totalCalories / 655);
      return {
        totalCalories,
        totalDuration,
        caloriesToBurgers,
        activities: allActivities,
      };
    } catch (err) {
      return { status: 500, err };
    }
  }
}
