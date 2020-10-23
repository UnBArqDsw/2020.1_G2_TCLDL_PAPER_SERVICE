import { Controller } from '@presentation/protocols/Controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { LoginController } from './LoginController';

describe('Login controller', () => {
  const sut: Controller = new LoginController();
  describe('when call handle', () => {
    let httpResquest: HttpRequest;
    let httpResponse: HttpResponse;

    describe('and promise resolves', () => {
      beforeAll(async () => {
        httpResponse = await sut.handle(httpResquest);
      });

      it('should returns 200', () => {
        expect(httpResponse.statusCode).toBe(200);
      });
    });
  });
});
