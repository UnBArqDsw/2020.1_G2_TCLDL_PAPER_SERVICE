import { User } from '@domain/entities/User';
import { CreateUserRepository } from 'data/repositories/CreateUserRepository';
import { CreateUserAdapterDb } from './CreateUserAdapterDb';

class CreateUserRepositoryStub implements CreateUserRepository {
  async execute(userData: Omit<User, 'id'>): Promise<User> {
    return {
      id: 'valid_id',
      ...userData,
    };
  }
}

describe('Create User Adapter', () => {
  const createUserRepositoryStub = new CreateUserRepositoryStub();
  const sut = new CreateUserAdapterDb(createUserRepositoryStub);

  describe('when calls execute', () => {
    let userData: Omit<User, 'id'>;
    let user: User;
    describe('and promise resolves', () => {
      beforeAll(async () => {
        userData = {
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'password',
        };
        user = await sut.execute(userData);
      });

      it('should return user with id', () => {
        expect(user).toEqual({ id: 'valid_id', ...userData });
      });
    });
  });
});
