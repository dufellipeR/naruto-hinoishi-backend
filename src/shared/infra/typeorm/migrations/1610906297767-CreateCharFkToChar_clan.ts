import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateCharFkToCharClan1610906297767
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'char_clan',
      new TableColumn({
        name: 'character_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'char_clan',
      new TableForeignKey({
        name: 'CharClan',
        columnNames: ['character_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'characters',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('char_clan', 'CharClan');

    await queryRunner.dropColumn('char_clan', 'character_id');
  }
}
