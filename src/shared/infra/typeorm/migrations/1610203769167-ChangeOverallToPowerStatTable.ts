import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeOverallToPowerStatTable1610203769167
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('stats', 'overall', 'power');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('stats', 'power', 'overall');
  }
}
