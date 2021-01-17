import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateAffiliationFKtoCharAft1610747365913
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'char_aft',
      new TableColumn({
        name: 'affiliation_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'char_aft',
      new TableForeignKey({
        name: 'AffiliationChar',
        columnNames: ['affiliation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'affiliation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('char_aft', 'CharAffiliation');

    await queryRunner.dropColumn('char_aft', 'affiliation_id');
  }
}
