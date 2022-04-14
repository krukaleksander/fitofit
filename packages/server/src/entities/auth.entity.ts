import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthEntity {
  @PrimaryGeneratedColumn()
  userID: number;
  @Column({ unique: true })
  login: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
}
