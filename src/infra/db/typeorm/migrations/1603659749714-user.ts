import {
  MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey,
} from 'typeorm';

export class user1603659749714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          length: '50',
          isPrimary: true,
          isUnique: true,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '30',
        },
        {
          name: 'lastName',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'createdAt',
          type: 'timestamp with time zone',
        },
        {
          name: 'updatedAt',
          type: 'timestamp with time zone',
        },
        {
          name: 'roleId',
          type: 'int',
          isNullable: false,
        },
      ],
    }), true);

    await queryRunner.createIndex('users', new TableIndex({
      name: 'IDX_USER_EMAIL',
      columnNames: ['email'],
    }));

    await queryRunner.createForeignKey('users', new TableForeignKey({
      columnNames: ['roleId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      const table = await queryRunner.getTable('users');
      if (table) {
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('roleId') !== -1);
        if (foreignKey) {
          await queryRunner.dropForeignKey('users', foreignKey);
        }

        await queryRunner.dropIndex('users', 'IDX_USER_EMAIL');
        await queryRunner.dropTable('users');
      }
    }
  }
}
