import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from '../exercises/activity.entity';
import { AuthEntity } from '../auth/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'myPassword123',
      database: 'fitofit',
      entities: [ActivityEntity, AuthEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
