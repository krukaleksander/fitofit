import { createConnection } from 'typeorm';
import { ActivityEntity } from '../entities/activity.entity';
import { AuthEntity } from '../entities/auth.entity';

export async function createMemDB(entities) {
  return createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: 'myPassword123',
    database: 'fitofit',
    entities: [ActivityEntity, AuthEntity],
    dropSchema: true,
    synchronize: true,
  });
}
