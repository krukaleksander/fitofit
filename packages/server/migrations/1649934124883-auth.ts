import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuth1649934124883 implements MigrationInterface {
  name = 'CreateAuth1649934124883';

  table = new Table({
    name: 'auth',
    columns: [
      {
        name: 'userID',
        type: 'int',
        isPrimary: true,
      },
      {
        name: 'login',
        type: 'text',
      },
      {
        name: 'password',
        type: 'text',
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
