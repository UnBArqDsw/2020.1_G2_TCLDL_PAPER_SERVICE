import { Role } from '@domain/value_object/Role';
import { FindRoleRepository } from './FindRoleRepository';

export interface FindRoleByTypeRepository extends FindRoleRepository {
  execute: (data: Pick<Role, 'type'>) => Promise<Omit<Role, 'users'>>
}
