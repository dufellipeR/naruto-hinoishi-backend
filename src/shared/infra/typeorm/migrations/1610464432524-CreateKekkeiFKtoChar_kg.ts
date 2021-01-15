import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateKekkeiFKtoCharKg1610464432524
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'char_kg',
      new TableColumn({
        name: 'kekkei_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'char_kg',
      new TableForeignKey({
        name: 'KekkeiChar',
        columnNames: ['kekkei_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'kekkei_genkai',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('char_kg', 'KekkeiChar');

    await queryRunner.dropColumn('char_kg', 'kekkei_id');
  }
}
