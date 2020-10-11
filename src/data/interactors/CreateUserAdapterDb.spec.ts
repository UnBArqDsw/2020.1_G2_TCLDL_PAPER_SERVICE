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
    describe('and promise resolves', () => {
      let userData: Omit<User, 'id'>;
      let user: User;

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

    describe('and enctypter throws', () => {
      let userData: Omit<User, 'id'>;

      beforeAll(() => {
        jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());
        userData = {
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'valid_password',
        };
      });

      it('should throw an error', async () => {
        await expect(sut.execute(userData)).rejects.toThrow();
      });
    });
  });
});
