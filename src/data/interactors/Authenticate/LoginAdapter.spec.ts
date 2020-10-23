import { Login } from '@domain/interactors/Authentication/Login';
import { Authenticate } from '@domain/entities/Authenticate';
import { JwtGenerator } from '@data/protocols/JwtGenerator';
import { User } from '@domain/entities/User';
import { FindUserRepository } from '@data/repositories/FindUserRepository';
import { LoginAdapter } from './LoginAdapter';

class JwtGeneratorStub implements JwtGenerator {
  async generate(_data: any): Promise<string> {
    return 'valid_token';
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

describe('Login Adapter', () => {
  const jwtGeneratorStub = new JwtGeneratorStub();
  const findUserRepositoryStub = new FindUserRepositoryStub();
  const sut: Login = new LoginAdapter(jwtGeneratorStub, findUserRepositoryStub);
  describe('When call execute', () => {
    describe('and promise resolves', () => {
      let result: string;
      let authObject: Authenticate;
      beforeAll(async () => {
        authObject = {
          email: 'valid_email',
          password: 'valid_password',
        };
        jest.spyOn(findUserRepositoryStub, 'execute');
        jest.spyOn(jwtGeneratorStub, 'generate');
        result = await sut.execute(authObject);
      });

      it('should return a string token', () => {
        expect(result).toBe('valid_token');
      });

      it('should call find user repository with correct values', () => {
        expect(findUserRepositoryStub.execute).toHaveBeenCalledWith(authObject);
      });

      it('should call jwt generator with correct values', () => {
        expect(jwtGeneratorStub.generate).toHaveBeenCalledWith({ id: 'valid_id', email: 'valid_email' });
      });
    });
  });
});
