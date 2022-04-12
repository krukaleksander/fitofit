import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExerciseFromServerDto } from './dto/ExerciseFromServer.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exerciseService: ExercisesService) {}

  @Get('/')
  getExercises(): ExerciseFromServerDto[] {
    return this.exerciseService.getExercises();
  }
  @Post('new')
  addAcivity(@Body() activity) {
    return this.exerciseService.addActivity(activity);
  }
}
