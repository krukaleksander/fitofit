import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activity' })
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  activityID: number;
  @Column()
  durationInMinutes: number;
  @Column()
  exerciseID: number;
  @Column()
  isDone: boolean;
  @Column()
  name: string;
  @Column()
  start: Date;
  @Column()
  userID: number;
}
