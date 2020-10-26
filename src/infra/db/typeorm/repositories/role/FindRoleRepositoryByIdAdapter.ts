import { FindRoleRepository } from '@data/repositories/role/FindRoleRepository';
import { Role } from '@domain/value_object/Role';
import { getRepository } from 'typeorm';
import { RoleAdapter } from '../../entities/RoleAdapter';

export class FindRoleRepositoryByIdAdapter implements FindRoleRepository {
  async execute({ id }: Pick<Role, 'id'>): Promise<Role> {
    const roleRepository = getRepository(RoleAdapter);
    return roleRepository.findOneOrFail({ where: { id } });
  }
}
