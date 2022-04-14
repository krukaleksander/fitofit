import { Injectable } from '@nestjs/common';
import { db as MOCKED_RESPONSE } from '../tempdb/db';
import { ExerciseFromServerDto } from './dto/ExerciseFromServer.dto';
import { ActivityDto } from './dto/Activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from '../entities/activity.entity';
import { Repository } from 'typeorm';

import { AllActivities } from './helpers/AllActivities';
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
      return new AllActivities(allActivities, MOCKED_RESPONSE).init();
    } catch (err) {
      return { status: 500, err };
    }
  }
}
