import { HardwareInformation } from '@domain/value_object/HardwareInformation';
import {
  Entity, PrimaryColumn, Column,
} from 'typeorm';

@Entity('hardware_informations')
export class HardwareInformationAdapter implements HardwareInformation {
  @PrimaryColumn({ unique: true })
  readonly id: string

  @Column({ type: 'varchar' })
  cpuModel: string;

  @Column({ type: 'int' })
  cpuCores: number;

  @Column({ type: 'varchar' })
  cpuGflops: string;

  @Column({ type: 'varchar' })
  gpuModel: string;

  @Column({ type: 'int' })
  gpuCores: number;

  @Column({ type: 'varchar' })
  gpuGflops: string;

  @Column({ type: 'varchar' })
  tpuModel: string;

  @Column({ type: 'int' })
  tpuCores: number;

  @Column({ type: 'varchar' })
  tpuGflops: string;

  @Column('timestamp with time zone')
  readonly createdAt: string;

  @Column('timestamp with time zone')
  updatedAt: string;

  constructor(data: HardwareInformation) {
    Object.assign(this, data);
  }
}
