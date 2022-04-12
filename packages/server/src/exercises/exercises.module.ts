import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from './activity.entity';

@Module({
  providers: [ExercisesService],
  imports: [TypeOrmModule.forFeature([ActivityEntity])],
  controllers: [ExercisesController],
})
export class ExercisesModule {}
