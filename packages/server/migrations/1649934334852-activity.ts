import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateActivity1649934334852 implements MigrationInterface {
  name = 'CreateActivity1649934334852';

  table = new Table({
    name: 'activity',
    columns: [
      {
        name: 'activityID',
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
        type: 'date',
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
