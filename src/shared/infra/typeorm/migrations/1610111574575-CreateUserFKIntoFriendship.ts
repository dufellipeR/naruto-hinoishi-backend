import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateUserFKIntoFriendship1610111574575
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'friendship',
      new TableColumn({
        name: 'user1_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'friendship',
      new TableForeignKey({
        name: 'User1Friendship',
        columnNames: ['user1_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'friendship',
      new TableColumn({
        name: 'user2_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'friendship',
      new TableForeignKey({
        name: 'User2Friendship',
        columnNames: ['user2_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('friendship', 'User2Friendship');

    await queryRunner.dropColumn('friendship', 'user2_id');

    await queryRunner.dropForeignKey('friendship', 'User1Friendship');

    await queryRunner.dropColumn('friendship', 'user1_id');
  }
}
