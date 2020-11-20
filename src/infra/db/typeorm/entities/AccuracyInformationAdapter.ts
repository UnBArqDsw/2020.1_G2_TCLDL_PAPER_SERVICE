import { AccuracyInformation } from '@domain/value_object/AccuracyInformation';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

@Entity('accuracy_informations')
export class AccuracyInformationAdapter implements AccuracyInformation {
  @PrimaryColumn({ unique: true })
  readonly id: string

  @Column({ length: 100, type: 'varchar' })
  accuracy: string;

  @Column('timestamp with time zone')
  readonly createdAt: string;

  @Column('timestamp with time zone')
  updatedAt: string;

  constructor(data: AccuracyInformation) {
    Object.assign(this, data);
  }
}
