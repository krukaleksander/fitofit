import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from '../exercises/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'myPassword123',
      database: 'fitofit',
      entities: [ActivityEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
