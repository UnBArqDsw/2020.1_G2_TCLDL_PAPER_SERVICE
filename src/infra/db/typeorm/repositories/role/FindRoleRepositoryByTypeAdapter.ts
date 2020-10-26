import { FindRoleRepository } from '@data/repositories/role/FindRoleRepository';
import { Role } from '@domain/value_object/Role';
import { getRepository } from 'typeorm';
import { RoleAdapter } from '../../entities/RoleAdapter';

export class FindRoleRepositoryByTypeAdapter implements FindRoleRepository {
  async execute({ type }: Pick<Role, 'type'>): Promise<Role> {
    const roleRepository = getRepository(RoleAdapter);
    return roleRepository.findOneOrFail({ where: { type } });
  }
}
