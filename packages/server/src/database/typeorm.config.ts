import { ActivityEntity } from '../entities/activity.entity';
import { AuthEntity } from '../entities/auth.entity';

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

    entities: [ActivityEntity, AuthEntity],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: './src/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    schema: 'public',
    keepConnectionAlive: true,
    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,
    entities: ['./src/**/*.entity.ts'], // tests run on TS directly
    migrations: ['./src/**/migrations/*.ts'],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: './src/migrations',
    },
  },
];
