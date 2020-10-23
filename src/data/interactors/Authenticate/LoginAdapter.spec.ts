import { Login } from '@domain/interactors/Authentication/Login';
import { Authenticate } from '@domain/entities/Authenticate';
import { JwtGenerator } from '@data/protocols/JwtGenerator';
import { LoginAdapter } from './LoginAdapter';

class JwtGeneratorStub implements JwtGenerator {
  async generate(_data: any): Promise<string> {
    return 'valid_token';
  }
}

describe('Login Adapter', () => {
  const jwtGeneratorStub = new JwtGeneratorStub();
  const sut: Login = new LoginAdapter(jwtGeneratorStub);
  describe('When call execute', () => {
    describe('and promise resolves', () => {
      let result: string;
      let authObject: Authenticate;
      beforeAll(async () => {
        authObject = {
          email: 'valid_email',
          password: 'valid_password',
        };
        result = await sut.execute(authObject);
      });

      it('should return a string token', () => {
        expect(result).toBe('valid_token');
      });
    });
  });
});
