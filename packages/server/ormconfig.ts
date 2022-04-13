/* eslint-disable @typescript-eslint/no-var-requires */
import { AuthEntity } from './src/auth/auth.entity';
import { ActivityEntity } from './src/exercises/activity.entity';

module.exports = [
  {
    name: 'default', //for all environments
    type: 'postgres',
    url: process.env.DATABASE_URL,
    schema: 'public',

    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: [AuthEntity, ActivityEntity],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: './src/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    schema: 'public',

    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: ['./packages/backend/src/**/*.entity.ts'], // tests run on TS directly
    migrations: ['./packages/backend/src/**/migrations/*.ts'],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: './packages/backend/src/migrations',
    },
  },
];
