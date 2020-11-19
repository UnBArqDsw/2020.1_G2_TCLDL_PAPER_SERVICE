import { Encrypter } from '@data/protocols/Encrypter';
import { UpdateUserRepository } from '@data/repositories/user/UpdateUserRepository';
import { User } from '@domain/entities/User';
import { UpdateUserAttribute } from '@domain/interactors/user/UpdateUser';
import { UpdateUserAdapterDb } from './UpdateUserAdapterDb';

class UpdateUserRepositoryStub implements UpdateUserRepository {
  async execute(_data: UpdateUserAttribute): Promise<User | undefined> {
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

class EncrypterStub implements Encrypter {
  async encrypt(_value: string): Promise<string> {
    return 'encrypted_string';
  }

  async compare(_stringEncrypted: string, _stringNotEncrypted: string): Promise<boolean> {
    return true;
  }
}

describe('Update user adapter db', () => {
  const updateUserRepositoryStub = new UpdateUserRepositoryStub();
  const encrypterStub = new EncrypterStub();
  const sut = new UpdateUserAdapterDb(updateUserRepositoryStub, encrypterStub);

  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      let result: User | undefined;
      const data: UpdateUserAttribute = {
        name: 'valid_name',
        lastName: 'valid_lastname',
        email: 'valid_email',
        password: 'valid_password',
      };

      beforeAll(async () => {
        result = await sut.execute(data);
      });

      afterAll(() => {
        jest.resetAllMocks();
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

    describe('and password is not given', () => {
      let result: User | undefined;
      const data: UpdateUserAttribute = {
        name: 'valid_name',
        lastName: 'valid_lastname',
        email: 'valid_email',
      };

      beforeAll(async () => {
        jest.spyOn(encrypterStub, 'encrypt');
        result = await sut.execute(data);
      });

      afterAll(() => {
        jest.resetAllMocks();
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

      it('should not call encrypt', () => {
        expect(encrypterStub.encrypt).not.toHaveBeenCalled();
      });
    });

    describe('and encrypter throws', () => {
      let result: Promise<User | undefined>;
      const data = {
        name: 'valid_name',
        lastName: 'valid_lastname',
        email: 'valid_email',
        password: 'valid_password',
      };

      beforeAll(async () => {
        jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());
        result = sut.execute(data);
      });

      afterAll(() => {
        jest.resetAllMocks();
      });

      it('should throws', async () => {
        await expect(result).rejects.toThrow();
      });
    });

    describe('and update user repository throws', () => {
      let result: Promise<User | undefined>;
      const data = {
        name: 'valid_name',
        lastName: 'valid_lastname',
        email: 'valid_email',
        password: 'valid_password',
      };

      beforeAll(async () => {
        jest.spyOn(updateUserRepositoryStub, 'execute').mockRejectedValueOnce(new Error());
        result = sut.execute(data);
      });

      afterAll(() => {
        jest.resetAllMocks();
      });

      it('should throws', async () => {
        await expect(result).rejects.toThrow();
      });
    });
  });
});
