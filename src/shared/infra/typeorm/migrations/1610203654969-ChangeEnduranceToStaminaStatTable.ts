import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeEnduranceToStaminaStatTable1610203654969
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('stats', 'endurance', 'stamina');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('stats', 'stamina', 'endurance');
  }
}
