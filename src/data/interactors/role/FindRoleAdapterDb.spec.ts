import { FindRoleRepository } from '@data/repositories/role/FindRoleRepository';
import { Role } from '@domain/value_object/Role';
import { FindRoleAdapterDb } from './FindRoleAdapterDb';

class FindRoleRepositoryStub implements FindRoleRepository {
  async execute(_data: Partial<Omit<Role, 'users'>>): Promise<Omit<Role, 'users'>> {
    return {
      id: 1,
      type: 'collab',
    };
  }
}

describe('find role adapter', () => {
  const findRoleRepositoryStub = new FindRoleRepositoryStub();
  const sut = new FindRoleAdapterDb(findRoleRepositoryStub);
  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      let result: Omit<Role, 'users'>;

      beforeAll(async () => {
        result = await sut.execute({ type: 'collab' });
      });

      it('should return a role', () => {
        expect(result).toEqual({
          id: 1,
          type: 'collab',
        });
      });
    });
  });
});
