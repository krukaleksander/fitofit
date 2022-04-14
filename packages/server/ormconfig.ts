export default {
  type: 'postgres',
  schema: 'public',
  url: 'postgres://postgres:myPassword123@localhost:5434/fitofit',
  entities: ['./src/entities/*.entity.ts'],
  migrations: ['./migrations/*.ts'],
  cli: {
    migrationsDir: './migrations',
  },
};
