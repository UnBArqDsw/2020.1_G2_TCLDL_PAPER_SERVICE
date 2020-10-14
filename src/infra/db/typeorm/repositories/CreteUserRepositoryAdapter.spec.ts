import { User } from '@domain/entities/User';
import * as typeorm from 'typeorm';
import { UserAdapter } from '../entities/UserAdapter';
import { CreateUserRepositoryAdapter } from './CreteUserRepositoryAdapter';

jest.mock('typeorm', () => ({
  getRepository: jest.fn().mockReturnValue({
    save: jest.fn().mockImplementation((data) => data),
  }),
}));

jest.mock('../entities/UserAdapter', () => ({
  UserAdapter: jest.fn().mockImplementation((data) => data),
}));

describe('Create user repository adapter', () => {
  const sut = new CreateUserRepositoryAdapter();
  describe('when calls execute', () => {
    describe('and promises resolves', () => {
      let result: User;
      let user: User;
      beforeAll(async () => {
        user = {
          id: 'valid_id',
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'valid_password',
          createdAt: 'valid_date',
          updatedAt: 'valid_date',
        };
        result = await sut.execute(user);
      });

      it('should called getRepository with correct params', () => {
        expect(typeorm.getRepository).toHaveBeenCalledWith(UserAdapter);
      });

      it('should called UserAdapter with correct params', () => {
        expect(UserAdapter).toHaveBeenCalledWith(user);
      });

      it('should called UserRepository with correct params', () => {
        expect(typeorm.getRepository(UserAdapter).save).toHaveBeenCalledWith(user);
      });

      it('should return user', () => {
        expect(result).toEqual(user);
      });
    });
  });
});
