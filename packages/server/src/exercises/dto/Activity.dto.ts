import { IActivity } from '../../../../common/src/interfaces';

export class ActivityDto implements IActivity {
  activityID: number;
  durationInMinutes: number;
  exerciseID: number;
  isDone: boolean;
  name: string;
  start: Date;
  userID: number;
}
