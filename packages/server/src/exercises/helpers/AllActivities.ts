import { ActivityDto } from '../dto/Activity.dto';
import { ExerciseFromServerDto } from '../dto/ExerciseFromServer.dto';

export class AllActivities {
  totalCalories: number;
  totalDuration: number;
  private caloriesToBurgers: number;
  private activitiesList: ActivityDto[];
  private db: ExerciseFromServerDto[];
  constructor(activitiesList, db) {
    this.totalCalories = 0;
    this.totalDuration = 0;
    this.caloriesToBurgers = 0;
    this.activitiesList = activitiesList;
    this.db = db;
  }

  init() {
    this.activitiesList.forEach((activity: ActivityDto) => {
      this.totalDuration += Math.floor(activity.durationInMinutes);
      this.db.find((exercise) => {
        if (exercise.id === activity.exerciseID) {
          this.totalCalories += Math.floor(
            exercise.cal * (this.totalDuration / 60),
          );
        }
      });
    });

    return {
      totalCalories: this.totalCalories,
      totalDuration: this.totalDuration,
      caloriesToBurgers: (this.caloriesToBurgers = Math.floor(
        this.totalCalories / 655,
      )),
      activities: this.activitiesList,
    };
  }
}
