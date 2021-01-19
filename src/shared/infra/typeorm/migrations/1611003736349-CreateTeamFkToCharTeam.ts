import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateTeamFkToCharTeam1611003736349
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'char_team',
      new TableColumn({
        name: 'team_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'char_team',
      new TableForeignKey({
        name: 'CharClan',
        columnNames: ['team_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'team',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('char_team', 'CharClan');

    await queryRunner.dropColumn('char_team', 'team_id');
  }
}
