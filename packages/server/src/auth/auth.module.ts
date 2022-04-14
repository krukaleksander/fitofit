import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from '../entities/activity.entity';
import { AuthEntity } from '../entities/auth.entity';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([AuthEntity])],
})
export class AuthModule {}
