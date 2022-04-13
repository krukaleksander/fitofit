import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  userID: number;
  @Column()
  login: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
