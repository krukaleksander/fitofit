import { Controller, Get } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExerciseFromServerDto } from './dto/ExerciseFromServer.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly appService: ExercisesService) {}

  @Get('/')
  getExercises(): ExerciseFromServerDto[] {
    return this.appService.getExercises();
  }
}
