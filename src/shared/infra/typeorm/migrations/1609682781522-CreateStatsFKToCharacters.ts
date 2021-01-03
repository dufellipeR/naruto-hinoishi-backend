import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateStatsFKToCharacters1609682781522
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'characters',
      new TableColumn({
        name: 'stat_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'characters',
      new TableForeignKey({
        name: 'CharacterStat',
        columnNames: ['stat_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stats',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('characters', 'CharacterStat');
    await queryRunner.dropColumn('characters', 'stat_id');
  }
}
