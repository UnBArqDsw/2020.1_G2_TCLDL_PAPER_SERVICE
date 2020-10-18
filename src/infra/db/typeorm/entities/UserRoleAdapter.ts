import { UserRole } from '@domain/agreggates/UserRole';
import { Entity, PrimaryColumn, ManyToMany, JoinColumn } from 'typeorm';
import { RoleAdapter } from './RoleAdapter';
import { UserAdapter } from './UserAdapter';

@Entity('user_role')
export class UserRoleAdapter implements UserRole {
  @ManyToMany(type => UserAdapter)
  @JoinColumn()
  @PrimaryColumn({ unique: true })
  readonly user: UserAdapter;

  @ManyToMany(type => RoleAdapter)
  @JoinColumn()
  @PrimaryColumn()
  role: RoleAdapter;

  constructor(user: UserAdapter, role: RoleAdapter) {
    this.user = user;
    this.role = role;
  }

}
