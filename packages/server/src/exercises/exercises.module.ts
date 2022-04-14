import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { ActivityEntity } from '../entities/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ExercisesService],
  imports: [TypeOrmModule.forFeature([ActivityEntity])],
  controllers: [ExercisesController],
  exports: [TypeOrmModule.forFeature([ActivityEntity])],
})
export class ExercisesModule {}
