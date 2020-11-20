import {
  MigrationInterface, QueryRunner, Table,
} from 'typeorm';

export class hardwareInformation1605887473883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'hardware_informations',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '50',
          isPrimary: true,
          isUnique: true,
        },
        {
          name: 'cpuModel',
          type: 'varchar',
        },
        {
          name: 'cpuCores',
          type: 'int',
        },
        {
          name: 'cpuGflops',
          type: 'varchar',
        },
        {
          name: 'gpuModel',
          type: 'varchar',
        },
        {
          name: 'gpuCores',
          type: 'int',
        },
        {
          name: 'gpuGflops',
          type: 'varchar',
        },
        {
          name: 'tpuModel',
          type: 'varchar',
        },
        {
          name: 'tpuCores',
          type: 'int',
        },
        {
          name: 'tpuGflops',
          type: 'varchar',
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
      const table = await queryRunner.getTable('hardwareInformations');
      if (table) {
        await queryRunner.dropTable('hardwareInformations');
      }
    }
  }
}
