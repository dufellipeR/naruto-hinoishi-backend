import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateCharFKtoCharAft1610747352951
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'char_aft',
      new TableColumn({
        name: 'character_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'char_aft',
      new TableForeignKey({
        name: 'CharAffiliation',
        columnNames: ['character_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'characters',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('char_aft', 'CharAffiliation');

    await queryRunner.dropColumn('char_aft', 'character_id');
  }
}
