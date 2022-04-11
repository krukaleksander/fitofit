import { Injectable } from '@nestjs/common';
import { db as MOCKED_RESPONSE } from '../../tempdb/db';
@Injectable()
export class ExercisesService {
  getExercises() {
    return MOCKED_RESPONSE;
  }
}
