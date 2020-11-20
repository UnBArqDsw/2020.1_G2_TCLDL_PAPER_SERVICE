import {
  MigrationInterface, QueryRunner, Table,
} from 'typeorm';

export class modelInformation1605887536720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'model_informations',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '50',
          isPrimary: true,
          isUnique: true,
        },
        {
          name: 'trainingTime',
          type: 'varchar',
          length: '30',
        },
        {
          name: 'trainingDataSize',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'epochs',
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
      const table = await queryRunner.getTable('modelInformations');
      if (table) {
        await queryRunner.dropTable('modelInformations');
      }
    }
  }
}
