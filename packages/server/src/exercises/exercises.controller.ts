import { Controller, Get } from '@nestjs/common';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly appService: ExercisesService) {}

  @Get('/')
  getExercises(): any[] {
    return this.appService.getExercises();
  }
}
