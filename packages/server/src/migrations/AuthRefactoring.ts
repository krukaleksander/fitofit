import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AuthRefactoring implements MigrationInterface {
  name = 'AuthRefactoring';

  table = new Table({
    name: 'auth',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
      },
      {
        name: 'login',
        type: 'text',
      },
      {
        name: 'email',
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
