import { IActivity } from './IActivity';

export interface IUserActivities {
  totalCalories: number;
  totalDuration: number;
  caloriesToBurgers: number;
  activities: Array<IUserActivity>;
}

export interface IUserActivity extends IActivity {
  activityID: number;
}
