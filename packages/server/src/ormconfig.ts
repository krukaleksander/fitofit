/* eslint-disable @typescript-eslint/no-var-requires */
import { AuthEntity } from './auth/auth.entity';
import { ActivityEntity } from './exercises/activity.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getConfig = (databaseUrl: string): PostgresConnectionOptions => ({
  name: 'default', //for all environments
  type: 'postgres',
  url: databaseUrl,
  schema: 'public',

  synchronize: false,
  migrationsRun: true,

  logging: process.env.DATABASE_LOGGING === 'true',

  entities: [AuthEntity, ActivityEntity],

  migrationsTableName: 'migrations',
});
