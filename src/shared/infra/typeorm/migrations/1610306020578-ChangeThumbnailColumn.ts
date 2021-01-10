import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeThumbnailColumn1610306020578
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'characters',
      'render',
      new TableColumn({
        name: 'render',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'characters',
      'render',
      new TableColumn({
        name: 'render',
        type: 'varchar',
      }),
    );
  }
}
