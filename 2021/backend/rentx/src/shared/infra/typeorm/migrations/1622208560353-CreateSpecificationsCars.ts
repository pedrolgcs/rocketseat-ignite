import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSpecificationsCars1622208560353
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('specifications_cars', [
      new TableForeignKey({
        name: 'FKCarSpecification',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKSpecificationCar',
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKSpecificationCar',
    );

    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKCarSpecification',
    );

    await queryRunner.dropTable('specifications_cars');
  }
}
