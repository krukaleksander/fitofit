export interface IActivity {
  activityID: number;
  exerciseID: number;
  userID: number;
  name: string;
  start: Date;
  durationInMinutes: number;
  isDone: boolean;
}
