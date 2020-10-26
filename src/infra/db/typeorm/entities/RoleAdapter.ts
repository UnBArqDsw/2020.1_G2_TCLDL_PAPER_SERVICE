import { Role } from '@domain/value_object/Role';
import {
  Entity, PrimaryColumn, Column, OneToMany,
} from 'typeorm';
import { UserAdapter } from './UserAdapter';

@Entity('roles')
export class RoleAdapter implements Role {
  @PrimaryColumn({ unique: true })
  readonly id: number

  @Column({ length: 30, unique: true })
  type: 'admin' | 'sub_admin' | 'collab'

  @OneToMany(() => UserAdapter, (user) => user.role)
  readonly users?: UserAdapter[]

  constructor(data: Omit<Role, 'users'>) {
    Object.assign(this, data);
  }
}
