import { Injectable } from '@nestjs/common';
import { db as MOCKED_RESPONSE } from '../tempdb/db';
import { ExerciseFromServerDto } from './dto/ExerciseFromServer.dto';
import { ActivityDto } from './dto/Activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from './activity.entity';
import { Repository } from 'typeorm';
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
}
