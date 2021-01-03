import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStatTable1609641070539
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stats',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'power',
            type: 'int',
          },
          {
            name: 'intelligence',
            type: 'int',
          },
          {
            name: 'speed',
            type: 'int',
          },
          {
            name: 'taijutsu',
            type: 'int',
          },
          {
            name: 'ninjutsu',
            type: 'int',
          },
          {
            name: 'genjutsu',
            type: 'int',
          },
          {
            name: 'endurance',
            type: 'int',
          },
          {
            name: 'willpower',
            type: 'int',
          },
          {
            name: 'overall',
            type: 'int',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stats');
  }
}
