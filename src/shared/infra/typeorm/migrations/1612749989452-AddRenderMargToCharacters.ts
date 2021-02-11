import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRenderMargToCharacters1612749989452
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'characters',
      new TableColumn({
        name: 'rendermarg',
        type: 'int',
        isNullable: true,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('characters', 'rendermarg');
  }
}
