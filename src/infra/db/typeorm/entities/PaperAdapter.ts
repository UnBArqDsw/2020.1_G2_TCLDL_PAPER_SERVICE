import { Paper } from '@domain/entities/Paper';
import {
  Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne,
} from 'typeorm';
import { AccuracyInformationAdapter } from './AccuracyInformationAdapter';
import { HardwareInformationAdapter } from './HardwareInformationAdapter';
import { ModelInformationAdapter } from './ModelInformationAdapter';
import { UserAdapter } from './UserAdapter';

@Entity('papers')
export class PaperAdapter implements Paper {
  @PrimaryColumn({ unique: true })
  readonly id: string

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'date' })
  dateSubmission: Date;

  @Column({ type: 'varchar' })
  link: string;

  @Column({ type: 'varchar' })
  codeLink: string;

  @Column({ type: 'varchar' })
  domain: string;

  @Column({ type: 'varchar' })
  dataset: string;

  @Column({ type: 'varchar' })
  modelName: string;

  @OneToOne(() => AccuracyInformationAdapter)
  @JoinColumn()
  accuracyInformation?: AccuracyInformationAdapter;

  @OneToOne(() => HardwareInformationAdapter)
  @JoinColumn()
  hardwareInformation?: HardwareInformationAdapter;

  @OneToOne(() => ModelInformationAdapter)
  @JoinColumn()
  modelInformation?: ModelInformationAdapter;

  @ManyToOne(() => UserAdapter, (user) => user.papers)
  @JoinColumn()
  user?: UserAdapter;

  @Column('timestamp with time zone')
  readonly createdAt: string;

  @Column('timestamp with time zone')
  updatedAt: string;

  constructor(data: Paper) {
    Object.assign(this, data);
  }
}
