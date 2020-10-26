import { findUserAttribute, FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { User } from '@domain/entities/User';
import FindUserAdapterDb from './FindUserAdapterDb';

class FindUserRepositoryStub implements FindUserRepository {
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

describe('Find user adapter db', () => {
  const findUserRepositoryStub = new FindUserRepositoryStub();
  const sut = new FindUserAdapterDb(findUserRepositoryStub);
  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      let result: User | undefined;
      beforeAll(async () => {
        result = await sut.execute('test', 'id');
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

    describe('and find user repository throws', () => {
      let result: Promise<User | undefined>;
      beforeAll(async () => {
        jest.spyOn(findUserRepositoryStub, 'execute').mockRejectedValueOnce(new Error());
        result = sut.execute('test', 'email');
      });

      it('should throws', async () => {
        await expect(result).rejects.toThrow();
      });
    });
  });
});
