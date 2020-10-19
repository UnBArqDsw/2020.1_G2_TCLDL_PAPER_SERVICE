import { FindUserRepository } from '@data/repositories/FindUserRepository';
import { User } from '@domain/entities/User';
import { FindUserRepositoryAdapter } from './FindUserRepositoryAdapter';

jest.mock('typeorm', () => ({
  getRepository: jest.fn().mockReturnValue({
    findOne: jest.fn().mockImplementation(() => ({
      id: 'valid_id',
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
      createdAt: 'valid_createdAt',
      updatedAt: 'valid_updatedAt',
    })),
  }),
}));

jest.mock('../entities/UserAdapter', () => ({
  UserAdapter: jest.fn().mockImplementation((data) => data),
}));

describe('Find user repository adapter', () => {
  const sut: FindUserRepository = new FindUserRepositoryAdapter();
  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      let result: User | undefined;
      beforeAll(async () => {
        result = await sut.execute('test');
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
  });
});
