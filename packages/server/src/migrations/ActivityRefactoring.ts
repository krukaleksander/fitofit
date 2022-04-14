import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLogsTable1649849370000 implements MigrationInterface {
  name = 'CreateLogsTable1649849370000';

  table = new Table({
    name: 'auth',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
      },
      {
        name: 'durationInMinutes',
        type: 'int',
      },
      {
        name: 'exerciseID',
        type: 'int',
      },
      {
        name: 'isDone',
        type: 'boolean',
      },
      {
        name: 'name',
        type: 'text',
      },
      {
        name: 'start',
        type: 'data',
      },
      {
        name: 'userID',
        type: 'int',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
