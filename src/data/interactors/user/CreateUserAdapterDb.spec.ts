import { User } from '@domain/entities/User';
import { Encrypter } from '@data/protocols/Encrypter';
import { CreateUserRepository } from '@data/repositories/user/CreateUserRepository';
import { UuidGenerator } from '@data/protocols/UuidGenerator';
import { DateGenerator } from '@data/protocols/DateGenerator';
import { Role } from '@domain/value_object/Role';
import { CreateUserAdapterDb } from './CreateUserAdapterDb';

class RoleStub implements Role {
  readonly id: string

  readonly type: 'Admin' | 'SubAdmin' | 'Collab'

  constructor(data: Role) {
    Object.assign(this, data);
  }
}
class CreateUserRepositoryStub implements CreateUserRepository {
  async execute(userData: User): Promise<User> {
    return userData;
  }
}

class UuidGeneratorStub implements UuidGenerator {
  generate() {
    return 'valid_uuid';
  }
}
class EncrypterStub implements Encrypter {
  async encrypt(_value: string): Promise<string> {
    return 'hashed_password';
  }
}

class DateGeneratorStub implements DateGenerator {
  generate() {
    return 'valid_date';
  }
}

describe('Create User Adapter', () => {
  const createUserRepositoryStub = new CreateUserRepositoryStub();
  const encrypterStub = new EncrypterStub();
  const uuidGeneratorStub = new UuidGeneratorStub();
  const dateGeneratorStub = new DateGeneratorStub();
  const roleStub = new RoleStub({ id: 'valid_id', type: 'Collab' });
  const sut = new CreateUserAdapterDb(
    createUserRepositoryStub, encrypterStub, uuidGeneratorStub, dateGeneratorStub, roleStub,
  );

  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      let userData: Omit<User, 'id' | 'createdAt'| 'updatedAt'>;
      let user: User;

      beforeAll(async () => {
        userData = {
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'valid_password',
        };

        jest.spyOn(encrypterStub, 'encrypt');
        jest.spyOn(dateGeneratorStub, 'generate');
        user = await sut.execute(userData);
      });

      it('should return user with id and hashed password', () => {
        expect(user).toEqual({
          ...userData,
          id: 'valid_uuid',
          password: 'hashed_password',
          createdAt: 'valid_date',
          updatedAt: 'valid_date',
        });
      });

      it('should call encrypter with correct values', () => {
        expect(encrypterStub.encrypt).toHaveBeenCalledWith('valid_password');
      });

      it('should call date generator with correct values', () => {
        expect(dateGeneratorStub.generate).toHaveBeenCalledTimes(1);
      });
    });

    describe('and enctypter throws', () => {
      let userData: Omit<User, 'id' | 'createdAt'| 'updatedAt'>;

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

    describe('and date generator throws', () => {
      let userData: Omit<User, 'id' | 'createdAt'| 'updatedAt'>;

      beforeAll(() => {
        jest.spyOn(dateGeneratorStub, 'generate').mockImplementationOnce(() => {
          throw new Error();
        });
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

    describe('and create user repository throws', () => {
      let userData: Omit<User, 'id' | 'createdAt'| 'updatedAt'>;

      beforeAll(() => {
        jest.spyOn(createUserRepositoryStub, 'execute').mockRejectedValueOnce(new Error());
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
