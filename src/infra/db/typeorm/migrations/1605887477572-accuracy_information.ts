import {
  MigrationInterface, QueryRunner, Table,
} from 'typeorm';

export class accuracyInformation1605887477572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'accuracy_informations',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '50',
          isPrimary: true,
          isUnique: true,
        },
        {
          name: 'accuracy',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'createdAt',
          type: 'timestamp with time zone',
        },
        {
          name: 'updatedAt',
          type: 'timestamp with time zone',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      const table = await queryRunner.getTable('accuracyInformations');
      if (table) {
        await queryRunner.dropTable('accuracyInformations');
      }
    }
  }
}
