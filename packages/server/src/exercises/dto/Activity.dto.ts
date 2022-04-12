import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ActivityDto {
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
  @IsDateString()
  start: Date;

  @IsNotEmpty()
  @IsNumber()
  userID: number;
}
