export interface IActivity {
  exerciseID: number;
  userID: number;
  name: string;
  start: Date;
  durationInMinutes: number;
  isDone: boolean;
}
