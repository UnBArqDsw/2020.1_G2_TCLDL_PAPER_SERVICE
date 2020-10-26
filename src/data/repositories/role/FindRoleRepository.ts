import { Role } from '@domain/value_object/Role';

export interface FindRoleRepository {
  execute: (data: Partial<Role>) => Promise<Role>
}
