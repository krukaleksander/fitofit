import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExerciseFromServerDto } from './dto/ExerciseFromServer.dto';
import { ActivityDto } from './dto/Activity.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exerciseService: ExercisesService) {}

  @Get('/')
  getExercises(): ExerciseFromServerDto[] {
    return this.exerciseService.getExercises();
  }
  @Post('new')
  addActivity(@Body() activity: ActivityDto) {
    return this.exerciseService.addActivity(activity);
  }
  @Get('/user/activity')
  getHistoricalActivities() {
    return this.exerciseService.getHistoricalActivities();
  }
}
