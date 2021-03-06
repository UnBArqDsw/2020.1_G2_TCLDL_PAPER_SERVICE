import { Login } from '@domain/interactors/Authentication/Login';
import { Jwt } from '@data/protocols/Jwt';
import { User } from '@domain/entities/User';
import { FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { Encrypter } from '@data/protocols/Encrypter';
import { LoginAdapter } from './LoginAdapter';

class JwtGeneratorStub implements Jwt {
  generate(_data: any): string {
    return 'valid_token';
  }

  verify(_data: string): any {
    return {
      id: 'valid_id',
      email: 'valid_email',
    };
  }
}

class FindUserRepositoryStub implements FindUserRepository {
  async execute(_data: Partial<Omit<User, 'createdAt' | 'updatedAt'>>): Promise<User | undefined> {
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
  async encrypt(_data: string): Promise<string> {
    return 'encrypted_string';
  }

  async compare(_stingEncrypted: string, _stringNotEncrypted: string): Promise<boolean> {
    return true;
  }
}

describe('Login Adapter', () => {
  const jwtGeneratorStub = new JwtGeneratorStub();
  const findUserRepositoryStub = new FindUserRepositoryStub();
  const encrypterStub = new EncrypterStub();
  const sut: Login = new LoginAdapter(jwtGeneratorStub, findUserRepositoryStub, encrypterStub);
  const authObject = {
    email: 'valid_email',
    password: 'valid_password',
  };

  describe('When call execute', () => {
    describe('and promise resolves', () => {
      let result: string;

      beforeAll(async () => {
        jest.spyOn(findUserRepositoryStub, 'execute');
        jest.spyOn(jwtGeneratorStub, 'generate');
        result = await sut.execute(authObject);
      });

      it('should return a string token', () => {
        expect(result).toBe('valid_token');
      });

      it('should call find user repository with correct values', () => {
        expect(findUserRepositoryStub.execute).toHaveBeenCalledWith({ email: authObject.email });
      });

      it('should call jwt generator with correct values', () => {
        expect(jwtGeneratorStub.generate).toHaveBeenCalledWith({ id: 'valid_id', email: 'valid_email' });
      });
    });

    describe('and user is not found', () => {
      let result: Promise<string>;
      beforeAll(() => {
        jest.spyOn(findUserRepositoryStub, 'execute').mockResolvedValueOnce(undefined);

        result = sut.execute(authObject);
      });

      it('should throws', () => {
        expect(result).rejects.toThrowError('User not found.');
      });
    });

    describe('and password is invalid', () => {
      let result: Promise<string>;
      beforeAll(() => {
        jest.spyOn(encrypterStub, 'compare').mockResolvedValueOnce(false);

        result = sut.execute(authObject);
      });

      it('should throws', () => {
        expect(result).rejects.toThrowError('Invalid credentials.');
      });
    });

    describe('and find user repository throws', () => {
      let result: Promise<string>;
      beforeAll(() => {
        jest.spyOn(findUserRepositoryStub, 'execute').mockRejectedValue(new Error());

        result = sut.execute(authObject);
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });

    describe('and jwt generator throws', () => {
      let result: Promise<string>;
      beforeAll(() => {
        jest.spyOn(jwtGeneratorStub, 'generate').mockImplementationOnce(() => {
          throw new Error();
        });

        result = sut.execute(authObject);
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });

    describe('and encrypter throws', () => {
      let result: Promise<string>;
      beforeAll(() => {
        jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());

        result = sut.execute(authObject);
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });
  });
});
