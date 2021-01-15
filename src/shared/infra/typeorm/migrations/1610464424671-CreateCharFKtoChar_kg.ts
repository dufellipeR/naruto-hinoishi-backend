import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateCharFKtoCharKg1610464424671
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'char_kg',
      new TableColumn({
        name: 'character_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'char_kg',
      new TableForeignKey({
        name: 'CharKekkei',
        columnNames: ['character_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'characters',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('char_kg', 'CharKekkei');

    await queryRunner.dropColumn('char_kg', 'character_id');
  }
}
