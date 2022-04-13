import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from '../exercises/activity.entity';
import { AuthEntity } from '../auth/auth.entity';
import { getConfig } from '../ormconfig';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return getConfig(configService.get<string>('DATABASE_URL'));
      },
    }),
  ],
})
export class DatabaseModule {}
