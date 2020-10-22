import { Role } from '@domain/value_object/Role';

export interface FindRoleRepository {
  execute: (data: Partial<Omit<Role, 'users'>>) => Promise<Omit<Role, 'users'>>
}
