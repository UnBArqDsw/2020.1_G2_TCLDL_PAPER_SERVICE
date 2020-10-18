import { Role } from '@domain/value_object/Role';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('role')
export class RoleAdapter implements Role {
  @PrimaryColumn({ unique: true })
  readonly id: string

  @Column({ length: 30, unique: true })
  type: 'Admin' | 'SubAdmin' | 'Collab'
}
