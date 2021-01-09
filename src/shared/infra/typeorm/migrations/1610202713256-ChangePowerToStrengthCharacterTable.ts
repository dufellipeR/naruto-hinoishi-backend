import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangePowerToStrengthCharacterTable1610202713256
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('stats', 'power', 'strength');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('stats', 'strength', 'power');
  }
}
