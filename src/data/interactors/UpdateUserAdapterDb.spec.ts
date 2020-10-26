import { findUserAttribute, FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { User } from '@domain/entities/User';
import { UpdateUserAdapterDb } from './UpdateUserAdapterDb';

class UpdateUserRepositoryStub implements FindUserRepository {
  async execute(_parameter: findUserAttribute) {
    return {
      id: 'valid_id',
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
      createdAt: 'valid_createdAt',
      updatedAt: 'valid_updatedAt',
    };
  }
}

describe('Update user adapter db', () => {
  const updateUserRepositoryStub = new UpdateUserRepositoryStub();
  const sut = new UpdateUserAdapterDb(updateUserRepositoryStub);
  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      let result: User;
      const data = {
        name: 'Test',
        lastName: 'Test',
        id: 'valid_id',
      };
      beforeAll(async () => {
        result = await sut.execute(data);
      });

      it('should return user', () => {
        expect(result).toEqual({
          id: 'valid_id',
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'valid_password',
          createdAt: 'valid_createdAt',
          updatedAt: 'valid_updatedAt',
        });
      });
    });

    describe('and update user repository throws', () => {
      let result: Promise<User>;
      const data = {
        name: 'Test',
        lastName: 'Test',
        id: 'valid_id',
      };
      beforeAll(async () => {
        jest.spyOn(updateUserRepositoryStub, 'execute').mockRejectedValueOnce(new Error());
        result = sut.execute(data);
      });

      it('should throws', async () => {
        await expect(result).rejects.toThrow();
      });
    });
  });
});
