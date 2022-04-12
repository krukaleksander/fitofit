import { ActivityDto } from './Activity.dto';

export class HistoricalActivitieDto {
  totalCalories: number;
  caloriesToBurgers: number;
  totalDuraration: number;
  activities: ActivityDto[];
}
