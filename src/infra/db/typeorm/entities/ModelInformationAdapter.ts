import { ModelInformation } from '@domain/value_object/ModelInformation';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

@Entity('model_informations')
export class ModelInformationAdapter implements ModelInformation {
  @PrimaryColumn({ unique: true })
  readonly id: string

  @Column({ type: 'varchar' })
  trainingTime: string;

  @Column({ type: 'varchar' })
  trainingDataSize: string;

  @Column({ type: 'varchar' })
  epochs: string;

  @Column('timestamp with time zone')
  readonly createdAt: string;

  @Column('timestamp with time zone')
  updatedAt: string;

  constructor(data: ModelInformation) {
    Object.assign(this, data);
  }
}
