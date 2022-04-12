import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ActivityDto {
  @IsNotEmpty()
  @IsNumber()
  activityID: number;

  @IsNotEmpty()
  @IsNumber()
  durationInMinutes: number;

  @IsNotEmpty()
  @IsNumber()
  exerciseID: number;

  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  start: Date;

  @IsNotEmpty()
  @IsNumber()
  userID: number;
}