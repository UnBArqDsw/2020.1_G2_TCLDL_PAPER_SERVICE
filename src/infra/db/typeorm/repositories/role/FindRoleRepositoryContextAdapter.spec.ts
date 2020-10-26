import { FindRoleRepository } from '@data/repositories/role/FindRoleRepository';
import { Role } from '@domain/value_object/Role';
import { FindRoleRepositoryContextAdapter } from './FindRoleRepositoryContextAdapter';

class FindRoleRepositoryByIdAdapter implements FindRoleRepository {
  async execute(data: Pick<Role, 'id'>): Promise<Role> {
    return {
      id: data.id,
      type: 'collab',
    };
  }
}

describe('Find role repository context adapter', () => {
  const findRoleRepositoryByIdAdapter = new FindRoleRepositoryByIdAdapter();
  const sut = new FindRoleRepositoryContextAdapter(findRoleRepositoryByIdAdapter);

  describe('and calls execute', () => {
    describe('and promise resolves', () => {
      let result: Role;
      beforeAll(async () => {
        result = await sut.execute({ id: 1 });
      });

      it('should return a role', () => {
        expect(result).toEqual({
          id: 1,
          type: 'collab',
        });
      });
    });

    describe('and promise rejects', () => {
      let result: Promise<Role>;

      beforeAll(async () => {
        jest.spyOn(findRoleRepositoryByIdAdapter, 'execute').mockRejectedValueOnce(new Error());
        result = sut.execute({ id: 1 });
      });

      it('should throws', async () => {
        await expect(result).rejects.toThrow();
      });
    });
  });
});
