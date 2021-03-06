import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAffiliation1610747039872
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'affiliation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'icon',
            type: 'varchar',
          },
          {
            name: 'strength',
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
            name: 'stamina',
            type: 'int',
          },
          {
            name: 'willpower',
            type: 'int',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('affiliation');
  }
}
