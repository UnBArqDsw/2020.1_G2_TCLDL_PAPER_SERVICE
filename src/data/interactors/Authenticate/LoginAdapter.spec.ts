import { Login } from '@domain/interactors/Authentication/Login';
import { Authenticate } from '@domain/entities/Authenticate';
import { LoginAdapter } from './LoginAdapter';

describe('Login Adapter', () => {
  const sut: Login = new LoginAdapter();
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
