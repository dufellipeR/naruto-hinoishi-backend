import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeDescColumn1610306031022
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'characters',
      'desc',
      new TableColumn({
        name: 'desc',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'characters',
      'desc',
      new TableColumn({
        name: 'desc',
        type: 'varchar',
      }),
    );
  }
}
