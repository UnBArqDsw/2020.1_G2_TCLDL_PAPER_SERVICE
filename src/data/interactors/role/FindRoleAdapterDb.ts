import { FindRoleRepository } from '@data/repositories/role/FindRoleRepository';
import { FindRole } from '@domain/interactors/role/FindRole';
import { Role } from '@domain/value_object/Role';

export class FindRoleAdapterDb implements FindRole {
  private readonly findRoleRepository: FindRoleRepository

  constructor(findRoleRepository: FindRoleRepository) {
    this.findRoleRepository = findRoleRepository;
  }

  execute(data: Partial<Omit<Role, 'users'>>): Promise<Omit<Role, 'users'>> {
    return this.findRoleRepository.execute(data);
  }
}
