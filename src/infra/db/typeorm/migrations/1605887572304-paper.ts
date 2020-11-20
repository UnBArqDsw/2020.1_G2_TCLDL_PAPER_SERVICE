import {
  MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey,
} from 'typeorm';

export class paper1605887572304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'papers',
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
          name: 'author',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'dateSubmission',
          type: 'date',
        },
        {
          name: 'link',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'codeLink',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'domain',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'dataset',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'modelName',
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
          name: 'userId',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'accuracyInformationId',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'hardwareInformationId',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'modelInformationId',
          type: 'varchar',
          isNullable: false,
        },
      ],
    }), true);

    await queryRunner.createIndex('papers', new TableIndex({
      name: 'IDX_PAPER_NAME',
      columnNames: ['name'],
    }));

    await queryRunner.createIndex('papers', new TableIndex({
      name: 'IDX_PAPER_AUTHOR',
      columnNames: ['author'],
    }));

    await queryRunner.createIndex('papers', new TableIndex({
      name: 'IDX_PAPER_DOMAIN',
      columnNames: ['domain'],
    }));

    await queryRunner.createIndex('papers', new TableIndex({
      name: 'IDX_PAPER_MODEL_NAME',
      columnNames: ['modelName'],
    }));

    await queryRunner.createForeignKey('papers', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('papers', new TableForeignKey({
      columnNames: ['accuracyInformationId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'accuracy_informations',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('papers', new TableForeignKey({
      columnNames: ['hardwareInformationId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'hardware_informations',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('papers', new TableForeignKey({
      columnNames: ['modelInformationId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'model_informations',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      const table = await queryRunner.getTable('papers');
      if (table) {
        const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1);
        const foreignKeyAccuracy = table.foreignKeys.find((fk) => fk.columnNames.indexOf('accuracyInformationId') !== -1);
        const foreignKeyHardware = table.foreignKeys.find((fk) => fk.columnNames.indexOf('hardwareInformationId') !== -1);
        const foreignKeyModel = table.foreignKeys.find((fk) => fk.columnNames.indexOf('modelInformationId') !== -1);

        const foreignKeyArray = [
          foreignKeyUser, foreignKeyAccuracy, foreignKeyHardware, foreignKeyModel,
        ].filter((elem) => elem !== undefined);

        await Promise.all(
          foreignKeyArray.map((foreignKey: TableForeignKey) => queryRunner
            .dropForeignKey('papers', foreignKey)),
        );

        await queryRunner.dropIndex('papers', 'IDX_PAPER_NAME');
        await queryRunner.dropIndex('papers', 'IDX_PAPER_AUTHOR');
        await queryRunner.dropIndex('papers', 'IDX_PAPER_DOMAIN');
        await queryRunner.dropIndex('papers', 'IDX_PAPER_MODEL_NAME');
        await queryRunner.dropTable('papers');
      }
    }
  }
}
