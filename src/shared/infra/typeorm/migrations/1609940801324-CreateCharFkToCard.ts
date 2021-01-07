import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateCharFkToCard1609940801324
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'character_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        name: 'CharacterCard',
        columnNames: ['character_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'characters',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cards', 'CharacterCard');

    await queryRunner.dropColumn('cards', 'character_id');
  }
}
