import { Role } from '@domain/value_object/Role';
import * as typeorm from 'typeorm';
import { FindRoleRepositoryByTypeAdapter } from './FindRoleRepositoryByTypeAdapter';

jest.mock('typeorm', () => ({
  getRepository: jest.fn().mockReturnValue({
    findOneOrFail: jest.fn().mockImplementation((data) => ({
      id: 1,
      type: data.where.type,
    })),
  }),
}));

jest.mock('../../entities/RoleAdapter', () => ({
  RoleAdapter: jest.fn().mockImplementation((data) => data),
}));

describe('Find role repository by type adapter', () => {
  const sut = new FindRoleRepositoryByTypeAdapter();

  describe('and calls execute', () => {
    describe('and promise resolves', () => {
      let result: Role;
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

    describe('and promise rejects', () => {
      let result: Promise<Role>;

      beforeAll(async () => {
        jest.spyOn(typeorm.getRepository('test'), 'findOneOrFail')
          .mockRejectedValueOnce(new Error());
        result = sut.execute({ type: 'collab' });
      });

      it('should throws', async () => {
        await expect(result).rejects.toThrow();
      });
    });
  });
});
