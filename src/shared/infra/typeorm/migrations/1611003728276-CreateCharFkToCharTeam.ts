import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateCharFkToCharTeam1611003728276
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'char_team',
      new TableColumn({
        name: 'character_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'char_team',
      new TableForeignKey({
        name: 'CharTeam',
        columnNames: ['character_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'characters',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('char_team', 'CharTeam');

    await queryRunner.dropColumn('char_team', 'character_id');
  }
}
