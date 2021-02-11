import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPcolorScolorColumn1612291927599
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'affiliation',
      new TableColumn({
        name: 'pcolor',
        type: 'varchar',
        isNullable: true,
        default: '000',
      }),
    );

    await queryRunner.addColumn(
      'affiliation',
      new TableColumn({
        name: 'scolor',
        type: 'varchar',
        isNullable: true,
        default: '000',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('affiliation', 'scolor');
    await queryRunner.dropColumn('affiliation', 'pcolor');
  }
}
