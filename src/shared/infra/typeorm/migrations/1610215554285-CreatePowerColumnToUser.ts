import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreatePowerColumnToUser1610215554285
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'power',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'power');
  }
}
