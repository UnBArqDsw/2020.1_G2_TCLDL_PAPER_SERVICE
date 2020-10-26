import { FindRoleRepository } from '@data/repositories/role/FindRoleRepository';
import { Role } from '@domain/value_object/Role';

export class FindRoleRepositoryContextAdapter implements FindRoleRepository {
  private readonly findRoleRepositoryStrategy: FindRoleRepository

  constructor(findRoleRepositoryStrategy: FindRoleRepository) {
    this.findRoleRepositoryStrategy = findRoleRepositoryStrategy;
  }

  async execute(data: Partial<Role>): Promise<Role> {
    return this.findRoleRepositoryStrategy.execute(data);
  }
}
