import { Injectable } from '@nestjs/common';
import { db as MOCKED_RESPONSE } from '../../tempdb/db';
import { ExerciseFromServerDto } from './dto/ExerciseFromServer.dto';
import { ActivityDto } from './dto/Activity.dto';
@Injectable()
export class ExercisesService {
  getExercises(): ExerciseFromServerDto[] {
    return MOCKED_RESPONSE;
  }

  addActivity(activity: ActivityDto) {
    return { status: 200, msg: 'Dodano zadanie', activity };
  }
}
