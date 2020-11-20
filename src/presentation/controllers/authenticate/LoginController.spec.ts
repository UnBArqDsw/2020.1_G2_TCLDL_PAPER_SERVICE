import { Controller } from '@presentation/protocols/Controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { Login } from '@domain/interactors/Authentication/Login';
import { LoginController } from './LoginController';

class LoginStub implements Login {
  async execute(_data): Promise<string> {
    return 'valid_token';
  }
}

describe('Login controller', () => {
  const loginStub = new LoginStub();
  const sut: Controller = new LoginController(loginStub);

  describe('when call handle', () => {
    describe('and promise resolves', () => {
      let httpResquest: HttpRequest;
      let httpResponse: HttpResponse;
      beforeAll(async () => {
        httpResquest = {
          body: {},
        };
        httpResponse = await sut.handle(httpResquest);
      });

      it('should returns 200', () => {
        expect(httpResponse.statusCode).toBe(200);
      });

      it('should return token in body', () => {
        expect(httpResponse.body).toEqual({ token: 'valid_token' });
      });
    });

    describe('and login interactor throws with a unknow error', () => {
      let httpResquest: HttpRequest;
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(loginStub, 'execute').mockRejectedValueOnce(new Error());
        httpResquest = {
          body: {},
        };
        httpResponse = await sut.handle(httpResquest);
      });

      it('should returns 500', () => {
        expect(httpResponse.statusCode).toBe(500);
      });
    });

    describe('and login interactor throws with a user not found', () => {
      let httpResquest: HttpRequest;
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(loginStub, 'execute').mockRejectedValueOnce(new Error('User not found.'));
        httpResquest = {
          body: {},
        };
        httpResponse = await sut.handle(httpResquest);
      });

      it('should returns 401', () => {
        expect(httpResponse.statusCode).toBe(401);
      });
    });

    describe('and login interactor throws with a invalid credential', () => {
      let httpResquest: HttpRequest;
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(loginStub, 'execute').mockRejectedValueOnce(new Error('Invalid credentials.'));
        httpResquest = {
          body: {},
        };
        httpResponse = await sut.handle(httpResquest);
      });

      it('should returns 401', () => {
        expect(httpResponse.statusCode).toBe(401);
      });
    });
  });
});
