import { User } from '@domain/entities/User';
import { Encrypter } from '@data/protocols/Encrypter';
import { CreateUserRepository } from '@data/repositories/CreateUserRepository';
import { CreateUserAdapterDb } from './CreateUserAdapterDb';

class CreateUserRepositoryStub implements CreateUserRepository {
  async execute(userData: Omit<User, 'id'>): Promise<User> {
    return {
      id: 'valid_id',
      ...userData,
    };
  }
}

class EncrypterStub implements Encrypter {
  async encrypt(_value: string): Promise<string> {
    return 'hashed_password';
  }
}

describe('Create User Adapter', () => {
  const createUserRepositoryStub = new CreateUserRepositoryStub();
  const encrypterStub = new EncrypterStub();
  const sut = new CreateUserAdapterDb(createUserRepositoryStub, encrypterStub);

  describe('when calls execute', () => {
    let userData: Omit<User, 'id'>;
    let user: User;
    describe('and promise resolves', () => {
      beforeAll(async () => {
        userData = {
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'valid_password',
        };

        jest.spyOn(encrypterStub, 'encrypt');
        user = await sut.execute(userData);
      });

      it('should return user with id and hashed password', () => {
        expect(user).toEqual({ ...userData, id: 'valid_id', password: 'hashed_password' });
      });

      it('should call encrypter with correct values', () => {
        expect(encrypterStub.encrypt).toHaveBeenCalledWith('valid_password');
      });
    });
  });
});
