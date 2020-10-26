import {
  MigrationInterface, QueryRunner, Table, TableIndex,
} from 'typeorm';
import { roleSeed } from '../seed/role.seed';

export class role1603658737370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'roles',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isUnique: true,
        },
        {
          name: 'type',
          type: 'varchar',
          length: '30',
          isUnique: true,
        },
      ],
    }), true);

    await queryRunner.createIndex('roles', new TableIndex({
      name: 'IDX_ROLE_TYPE',
      columnNames: ['type'],
    }));

    await Promise.all(
      roleSeed.map(
        (role) => queryRunner.query(`INSERT INTO roles (id, type) VALUES ('${role.id}', '${role.type}')`),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      const table = await queryRunner.getTable('roles');
      if (table) {
        await queryRunner.dropIndex('roles', 'IDX_ROLE_TYPE');
        await queryRunner.dropTable('roles');
      }
    }
  }
}
