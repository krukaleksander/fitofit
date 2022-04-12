import { IExerciseFromServer } from '../../../../common/src/interfaces';

export class ExerciseFromServerDto implements IExerciseFromServer {
  id: number;
  name: string;
  cal: number;
}
