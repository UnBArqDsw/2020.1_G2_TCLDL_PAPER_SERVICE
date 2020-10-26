import { Role } from '@domain/value_object/Role';
import * as typeorm from 'typeorm';
import { FindRoleRepositoryByIdAdapter } from './FindRoleRepositoryByIdAdapter';

jest.mock('typeorm', () => ({
  getRepository: jest.fn().mockReturnValue({
    findOneOrFail: jest.fn().mockImplementation((data) => ({
      id: data.where.id,
      type: 'collab',
    })),
  }),
}));

jest.mock('../../entities/RoleAdapter', () => ({
  RoleAdapter: jest.fn().mockImplementation((data) => data),
}));

describe('Find role repository context adapter', () => {
  const sut = new FindRoleRepositoryByIdAdapter();

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
        jest.spyOn(typeorm.getRepository('test'), 'findOneOrFail')
          .mockRejectedValueOnce(new Error());
        result = sut.execute({ id: 1 });
      });

      it('should throws', async () => {
        await expect(result).rejects.toThrow();
      });
    });
  });
});
