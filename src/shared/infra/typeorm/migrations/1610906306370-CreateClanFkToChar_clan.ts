import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateClanFkToCharClan1610906306370
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'char_clan',
      new TableColumn({
        name: 'clan_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'char_clan',
      new TableForeignKey({
        name: 'ClanChar',
        columnNames: ['clan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clan',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('char_clan', 'ClanChar');

    await queryRunner.dropColumn('char_clan', 'clan_id');
  }
}
